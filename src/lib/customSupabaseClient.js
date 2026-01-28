import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gqqnmwohtrtfrkrfwxya.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcW5td29odHJ0ZnJrcmZ3eHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzU4MTcsImV4cCI6MjA4NDY1MTgxN30.2pojm9xoKEIyHK02JFme6KVDhsDXF33gvJib7NZYX-U';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
