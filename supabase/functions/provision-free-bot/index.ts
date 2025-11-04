// Supabase Edge Function: provision-free-bot
// v1.4 - DEBUGGING - Printing variable CONTENT.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

// These are the secrets we are debugging
const RAILWAY_API_TOKEN = Deno.env.get('RAILWAY_API_TOKEN')
const RAILWAY_PROJECT_ID = Deno.env.get('RAILWAY_PROJECT_ID')
const BOT_TEMPLATE_REPO_URL = Deno.env.get('BOT_TEMPLATE_REPO_URL')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const BOT_SUPABASE_URL = Deno.env.get('BOT_SUPABASE_URL')
const BOT_SUPABASE_SERVICE_KEY = Deno.env.get('BOT_SUPABASE_SERVICE_KEY')

Deno.serve(async (req) => {
  // Handle preflight (CORS) requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // --- DEBUGGING ---
  // We will return the actual content of the non-sensitive variables.
  // We will NOT return the keys or tokens for security.
  
  const debugInfo = {
    message: "DEBUG: Printing variable CONTENT.",
    secrets: {
      BOT_SUPABASE_URL_CONTENT: BOT_SUPABASE_URL || "NOT SET",
      RAILWAY_PROJECT_ID_CONTENT: RAILWAY_PROJECT_ID || "NOT SET",
      BOT_TEMPLATE_REPO_URL_CONTENT: BOT_TEMPLATE_REPO_URL || "NOT SET",
      
      // We check for existence but DO NOT print the value
      BOT_SUPABASE_SERVICE_KEY_IS_SET: !!BOT_SUPABASE_SERVICE_KEY,
      RAILWAY_API_TOKEN_IS_SET: !!RAILWAY_API_TOKEN,
      GEMINI_API_KEY_IS_SET: !!GEMINI_API_KEY,
    }
  }

  return new Response(
    JSON.stringify(debugInfo),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )

  // --- Original Code is disabled below ---

  /*
  try {
    // ... (original code) ...
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
  */
})