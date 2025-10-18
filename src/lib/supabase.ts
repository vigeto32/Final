import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: string;
  updated_at: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}
