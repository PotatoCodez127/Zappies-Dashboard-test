// Supabase Edge Function: provision-free-bot
// This function automates deploying a new Python bot to Railway.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// These are the secrets we set in GitHub
const RAILWAY_API_TOKEN = Deno.env.get('RAILWAY_API_TOKEN')
const RAILWAY_PROJECT_ID = Deno.env.get('RAILWAY_PROJECT_ID')
const BOT_TEMPLATE_REPO_URL = Deno.env.get('BOT_TEMPLATE_REPO_URL')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

// We use our new, non-conflicting secret names
const BOT_SUPABASE_URL = Deno.env.get('BOT_SUPABASE_URL')
const BOT_SUPABASE_SERVICE_KEY = Deno.env.get('BOT_SUPABASE_SERVICE_KEY')

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

    // 2. Create a Supabase Admin Client to get secret data
    // --- THIS IS THE FIX ---
    // We must use the 'BOT_' prefixed variables we defined in our secrets.
    const adminSupabase = createClient(
      BOT_SUPABASE_URL!,
      BOT_SUPABASE_SERVICE_KEY!
    )
    // -----------------------

    // 3. Fetch the new company's data (including their WhatsApp keys)
    const { data: company, error: companyError } = await adminSupabase
      .from('companies')
      .select('id, owner_id, name, whatsapp_api_token, whatsapp_phone_id, whatsapp_verify_token')
      .eq('id', company_id)
      .single()

    if (companyError || !company) {
      throw new Error(`Failed to fetch company: ${companyError?.message}`)
    }

    // 4. --- Call Railway API to Create the Service ---
    console.log(`Starting deployment for company: ${company.name}`)
    const railwayApiUrl = `https://api.railway.app/v2/projects/${RAILWAY_PROJECT_ID}/services`
    
    const createServiceResponse = await fetch(railwayApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
      },
      body: JSON.stringify({
        name: `zappy-bot-${company.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        repo: BOT_TEMPLATE_REPO_URL,
        branch: 'main', // Or your default branch
      }),
    })

    if (!createServiceResponse.ok) {
      const errorBody = await createServiceResponse.text()
      throw new Error(`Failed to create Railway service: ${errorBody}`)
    }

    const newService = await createServiceResponse.json()
    const serviceId = newService.id
    console.log(`Railway service created with ID: ${serviceId}`)

    // 5. --- Call Railway API to Set Environment Variables ---
    const setVarsUrl = `https://api.railway.app/v2/services/${serviceId}/variables`
    
    const variables = {
      // Bot Config
      WHATSAPP_TOKEN: company.whatsapp_api_token,
      VERIFY_TOKEN: company.whatsapp_verify_token,
      // Gemini Config
      GEMINI_API_KEY: GEMINI_API_KEY,
      // Supabase Config (using our newly named secrets)
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

    const setVarsResponse = await fetch(setVarsUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAILWAY_API_TOKEN}`,
      },
      body: JSON.stringify(variables),
    })

    if (!setVarsResponse.ok) {
      const errorBody = await setVarsResponse.text()
      throw new Error(`Failed to set Railway variables: ${errorBody}`)
    }
    
    console.log(`All environment variables set for service: ${serviceId}`)

    // 6. --- Trigger the first deployment ---
    const deployUrl = `https://api.railway.app/v2/services/${serviceId}/deployments`
    const deployResponse = await fetch(deployUrl, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RAILWAY_API_TOKEN}` },
    })

    if (!deployResponse.ok) {
      throw new Error('Failed to trigger initial deployment.')
    }
    console.log('Initial deployment triggered.')

    // 7. --- Get the new Service URL and save it to our database ---
    const serviceUrl = newService.serviceDomains?.[0]?.name || `${newService.id}.up.railway.app`
    const fullWebhookUrl = `https://${serviceUrl}/webhook` // The full URL our bot will use

    const { error: updateError } = await adminSupabase
      .from('companies')
      .update({ service_url: fullWebhookUrl }) // Save the full webhook URL
      .eq('id', company.id)

    if (updateError) {
      console.error(`Failed to update company with service URL: ${updateError.message}`)
    }

    // 8. Return a success response
    return new Response(
      JSON.stringify({
        message: 'Deployment started successfully!',
        service_id: serviceId,
        service_url: fullWebhookUrl,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in Edge Function:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})