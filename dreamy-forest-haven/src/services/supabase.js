import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://thvupyklxwvkawmeocvo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRodnVweWtseHd2a2F3bWVvY3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NjEyMDIsImV4cCI6MjA0NTEzNzIwMn0.3L20JT2Fj74pUrI_nRehwqFIJghn-ciIrlQvquo7pfM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
