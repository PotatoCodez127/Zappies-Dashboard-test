// Supabase Edge Function: provision-free-bot
// v2.7 - FINAL FIX: Correcting GraphQL structure to nest repo details under 'source'.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// These are the secrets we have 100% VERIFIED are set correctly
const RAILWAY_API_TOKEN = Deno.env.get('RAILWAY_API_TOKEN')
const RAILWAY_PROJECT_ID = Deno.env.get('RAILWAY_PROJECT_ID')
const BOT_TEMPLATE_REPO_URL = Deno.env.get('BOT_TEMPLATE_REPO_URL')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const BOT_SUPABASE_URL = Deno.env.get('BOT_SUPABASE_URL')
const BOT_SUPABASE_SERVICE_KEY = Deno.env.get('BOT_SUPABASE_SERVICE_KEY')

// Define the GraphQL endpoint
const RAILWAY_GRAPHQL_URL = 'https://api.railway.app/graphql/v2'

// Helper function to make GraphQL requests
async function fetchRailway(query: string, variables: object) {
  const requestBody = JSON.stringify({ query, variables });
  
  // --- DEBUG LOGGING ADDED HERE ---
  console.log(`Sending request body: ${requestBody}`);
  // --- END DEBUG LOGGING ---

  const response = await fetch(RAILWAY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
    },
    body: requestBody, // Use the pre-stringified body
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error(`Railway API request failed with status ${response.status}: ${errorBody}`)
    throw new Error(`Railway API request failed: ${response.status} ${errorBody}`)
  }

  const json = await response.json()
  if (json.errors) {
    console.error('Railway API returned GraphQL errors:', json.errors)
    // Throw the first, most specific error message
    throw new Error(`Railway API Error: ${json.errors[0].message}`)
  }
  
  return json.data
}

Deno.serve(async (req) => {
  // Handle preflight (CORS) requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Get the new company's ID from the request
    const { company_id } = await req.json()
    if (!company_id) {
      throw new Error('Missing company_id')
    }

    // 2. Create a Supabase Admin Client
    const adminSupabase = createClient(
      BOT_SUPABASE_URL!,
      BOT_SUPABASE_SERVICE_KEY!
    )

    // 3. Fetch the new company's data
    console.log(`Step 3: Fetching company data for ID: ${company_id}`)
    const { data: company, error: companyError } = await adminSupabase
      .from('companies')
      .select('id, owner_id, name, whatsapp_api_token, whatsapp_phone_id, whatsapp_verify_token')
      .eq('id', company_id)
      .single()

    if (companyError || !company) {
      throw new Error(`Failed to fetch company: ${companyError?.message}`)
    }
    console.log(`Successfully fetched data for company: ${company.name}`)

    // 4. --- Call Railway API to Create the Service (GraphQL Mutation) ---
    console.log(`Step 4: Creating Railway service with repo: ${BOT_TEMPLATE_REPO_URL}`)
    
    // --- FIX: Simplify name slug for Railway to ensure compliance ---
    const serviceNameSlug = company.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // --- NEW FIX: Tweak repository path to be simple owner/repo format ---
    const repoPath = BOT_TEMPLATE_REPO_URL!.replace('https://github.com/', '').replace('.git', '');
    console.log(`Step 4a: Using simplified repo path: ${repoPath}`);
    
    const createServiceMutation = `
      mutation serviceCreate($input: ServiceCreateInput!) {
        serviceCreate(input: $input) {
          id
          serviceDomains { name }
        }
      }
    `
    const createServiceVars = {
      input: {
        name: `zappybot${serviceNameSlug}`, // New simplified name
        projectId: RAILWAY_PROJECT_ID,
        // --- THE STRUCTURAL FIX: Nesting under 'source' object ---
        source: {
            type: "GITHUB_REPO", // Must be explicitly defined
            repo: repoPath,
            branch: 'main', 
            isPrivate: true,
        }
      },
    }
    
    const createData = await fetchRailway(createServiceMutation, createServiceVars)
    const serviceId = createData.serviceCreate.id
    const serviceDomains = createData.serviceCreate.serviceDomains
    console.log(`Step 4b: Service created with ID: ${serviceId}`)

    // 5. --- Call Railway API to Set Environment Variables (GraphQL Mutation) ---
    console.log(`Step 5: Setting variables for service ID: ${serviceId}`)
    const setVarsMutation = `
      mutation variableCollectionUpsert($input: VariableCollectionUpsertInput!) {
        variableCollectionUpsert(input: $input)
      }
    `
    const variables = {
      // Bot Config
      WHATSAPP_TOKEN: company.whatsapp_api_token,
      VERIFY_TOKEN: company.whatsapp_verify_token,
      // Gemini Config
      GEMINI_API_KEY: GEMINI_API_KEY,
      // Supabase Config
      SUPABASE_URL: BOT_SUPABASE_URL,
      SUPABASE_KEY: BOT_SUPABASE_SERVICE_KEY,
      // Tenant Config
      OWNER_USER_ID: company.owner_id,
      COMPANY_ID: company.id,
      COMPANY_NAME: company.name,
      // Railway/Python Config
      FLASK_ENV: 'production',
      PORT: '8080', 
      PYTHONUNBUFFERED: '1',
    }
    
    const setVarsVars = {
      input: {
        serviceId: serviceId,
        variables: variables,
      },
    }

    await fetchRailway(setVarsMutation, setVarsVars)
    console.log(`Step 5b: Environment variables set.`)

    // 6. --- Trigger the first deployment (GraphQL Mutation) ---
    console.log(`Step 6: Triggering deployment for service ID: ${serviceId}`)
    const deployMutation = `
      mutation serviceDeploy($input: ServiceDeployInput!) {
        serviceDeploy(input: $input)
      }
    `
    const deployVars = {
      input: {
        serviceId: serviceId,
      },
    }

    await fetchRailway(deployMutation, deployVars)
    console.log('Step 6b: Deployment triggered.')

    // 7. --- Get the new Service URL and save it to our database ---
    console.log(`Step 7: Saving service URL to database...`)
    const serviceUrl = serviceDomains?.[0]?.name || `${serviceId}.up.railway.app`
    const fullWebhookUrl = `https://${serviceUrl}/webhook`

    const { error: updateError } = await adminSupabase
      .from('companies')
      .update({ service_url: fullWebhookUrl })
      .eq('id', company.id)

    if (updateError) {
      console.error(`Failed to update company with service URL: ${updateError.message}`)
    }

    // 8. Return a success response
    console.log('Step 8: All steps complete. Returning success.')
    return new Response(
      JSON.stringify({
        message: 'Deployment started successfully!',
        service_id: serviceId,
        service_url: fullWebhookUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error(`Error in Edge Function (catch block): ${error.message}`)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})