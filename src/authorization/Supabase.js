import { createClient } from  "@supabase/supabase-js";
export const supabase = createClient(
  "https://zdzjovwbkxxuxsycyrob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkempvdndia3h4dXhzeWN5cm9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5MjY4MDIsImV4cCI6MjAyMzUwMjgwMn0.eR3XgG02IVzJIGQ3FYaGQgFAoF-knJHErcGjEaO4QzA"
);
