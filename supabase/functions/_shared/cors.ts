// supabase/functions/_shared/cors.ts
// These are the standard CORS headers that allow your web app
// to call this Edge Function.

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
