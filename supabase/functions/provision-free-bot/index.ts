// Supabase Edge Function: provision-free-bot
// [DEBUGGING MODE] - This code just prints environment secrets.

import { corsHeaders } from '../_shared/cors.ts'

console.log(`[Debug] Function cold start.`)

Deno.serve(async (req) => {
  // Handle preflight (CORS) requestsx
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log(`[Debug] Function invoked. Dumping secrets...`)

    // Get all the secrets we CARE about
    // We check if they exist and report "true" or "false"
    const secrets = {
      BOT_SUPABASE_URL_IS_SET: Deno.env.get('BOT_SUPABASE_URL') ? true : false,
      BOT_SUPABASE_SERVICE_KEY_IS_SET: Deno.env.get('BOT_SUPABASE_SERVICE_KEY') ? true : false,
      RAILWAY_API_TOKEN_IS_SET: Deno.env.get('RAILWAY_API_TOKEN') ? true : false,
      RAILWAY_PROJECT_ID_IS_SET: Deno.env.get('RAILWAY_PROJECT_ID') ? true : false,
      BOT_TEMPLATE_REPO_URL_IS_SET: Deno.env.get('BOT_TEMPLATE_REPO_URL') ? true : false,
      GEMINI_API_KEY_IS_SET: Deno.env.get('GEMINI_API_KEY') ? true : false,
    }

    console.log('[Debug] Secrets found:', secrets)

    // Return this as a JSON response
    return new Response(
      JSON.stringify({
        message: "DEBUG: Printing environment variables.",
        secrets: secrets,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // We are forcing a 200 OK
      }
    )
  } catch (error) {
    console.error('Error in Debug Edge Function:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

