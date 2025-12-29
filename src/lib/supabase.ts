import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Service Role 클라이언트 (서버 사이드 전용)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
