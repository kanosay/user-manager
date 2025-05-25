import { createClient } from '@supabase/supabase-js';

const subUrl = 'https://pkemhtycxjsfipoizbmr.supabase.co';
const subKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrZW1odHljeGpzZmlwb2l6Ym1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODA1MDgsImV4cCI6MjA2MzY1NjUwOH0.yGqBrdj0qWZzPjzFfPkDePCTjZA-Yfa8wVVx0dgQmdU';


const supabase = createClient(subUrl, subKey);

export default supabase