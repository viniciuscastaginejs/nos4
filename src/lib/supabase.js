import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://rfdtfkqkxsqylagujmcv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZHRma3FreHNxeWxhZ3VqbWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDY4NTEsImV4cCI6MjA5MDcyMjg1MX0.ndlZCBcrfbWBIWzbfdwpx3YGZ9n5MnLZIRcSiKVDv38'
)
