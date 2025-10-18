/*
  # Portfolio Content Management Schema

  1. New Tables
    - `portfolio_content`
      - `id` (uuid, primary key)
      - `section` (text) - Section identifier (hero, about, contact, etc.)
      - `key` (text) - Content key within section
      - `value` (text) - Content value
      - `type` (text) - Content type (text, json, etc.)
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `technologies` (text[])
      - `image_url` (text)
      - `project_url` (text)
      - `github_url` (text)
      - `featured` (boolean)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for portfolio display
    - No write access (content managed via admin interface)

  3. Initial Data
    - Populate with default portfolio content
    - Add sample projects
*/

-- Create portfolio_content table
CREATE TABLE IF NOT EXISTS portfolio_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  type text DEFAULT 'text',
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  image_url text,
  project_url text,
  github_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access to portfolio content"
  ON portfolio_content
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

-- Insert default portfolio content
INSERT INTO portfolio_content (section, key, value, type) VALUES
  ('hero', 'name', 'Ryan Christopher G. Co', 'text'),
  ('hero', 'title', 'Front-End Developer', 'text'),
  ('hero', 'tagline', 'Crafting immersive digital experiences through code and creativity', 'text'),
  ('hero', 'cta_text', 'Explore My Work', 'text'),
  ('about', 'heading', 'About Me', 'text'),
  ('about', 'bio', 'I am a passionate Front-End Developer specializing in creating cutting-edge web applications with modern technologies. With a keen eye for design and a deep understanding of user experience, I transform ideas into interactive digital realities.', 'text'),
  ('contact', 'heading', 'Get In Touch', 'text'),
  ('contact', 'description', 'Have a project in mind? Let''s build something extraordinary together.', 'text'),
  ('loading', 'text', 'INITIALIZING SYSTEM', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, technologies, featured, order_index, image_url) VALUES
  ('Cyberpunk Dashboard', 'A futuristic admin dashboard with real-time data visualization and neon aesthetics', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'], true, 1, 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg'),
  ('Neural Network Visualizer', 'Interactive visualization tool for machine learning models with 3D graphics', ARRAY['React', 'Three.js', 'WebGL', 'D3.js'], true, 2, 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg'),
  ('Quantum Commerce', 'E-commerce platform with advanced animations and seamless user experience', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], true, 3, 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
DROP TRIGGER IF EXISTS update_portfolio_content_updated_at ON portfolio_content;
CREATE TRIGGER update_portfolio_content_updated_at
  BEFORE UPDATE ON portfolio_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();