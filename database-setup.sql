-- Services Table
-- This table will store your portfolio services with name, price, and description
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table 
-- This table will store your portfolio projects with all the details you specified
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    is_live BOOLEAN DEFAULT FALSE,
    link TEXT,
    image TEXT,
    technology TEXT NOT NULL,
    official_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for both tables
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (for displaying on your portfolio)
-- But require authentication for write operations (for managing your data)
CREATE POLICY "Allow public read access on services" ON services
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects  
    FOR SELECT USING (true);

-- Create policies for authenticated users to manage data
-- You can modify these based on your needs (e.g., only allow specific users)
CREATE POLICY "Allow authenticated insert on services" ON services
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on services" ON services
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on services" ON services
    FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert on projects" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on projects" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on projects" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create updated_at triggers to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO services (name, price, description) VALUES 
    ('Web Development', '$500-$2000', 'Custom website development using modern technologies like React, TypeScript, and Tailwind CSS'),
    ('Mobile App Development', '$1000-$5000', 'Cross-platform mobile applications using React Native or Flutter'),
    ('E-commerce Solutions', '$800-$3000', 'Complete e-commerce platforms with payment integration and inventory management'),
    ('UI/UX Design', '$300-$1000', 'User interface and experience design for web and mobile applications'),
    ('Database Design', '$400-$1500', 'Database architecture and optimization for scalable applications'),
    ('API Development', '$600-$2500', 'RESTful API development and integration services');

INSERT INTO projects (name, description, is_live, link, image, technology, official_link) VALUES 
    ('Portfolio Website', 'Modern, responsive portfolio website with animations and dark mode', true, 'https://mowlid.dev', '/images/portfolio-project.jpg', 'React, TypeScript, Tailwind CSS, Framer Motion', 'https://github.com/mawlid1431/portfolio'),
    ('E-commerce Platform', 'Full-stack e-commerce solution with payment processing and inventory management', true, 'https://shop.example.com', '/images/ecommerce-project.jpg', 'Next.js, Supabase, Stripe, PostgreSQL', 'https://github.com/mawlid1431/ecommerce'),
    ('Task Management App', 'Collaborative task management application with real-time updates', false, '', '/images/task-app-project.jpg', 'React, Node.js, Socket.io, MongoDB', 'https://github.com/mawlid1431/task-manager'),
    ('Social Media Dashboard', 'Analytics dashboard for social media management and scheduling', true, 'https://social-dashboard.example.com', '/images/dashboard-project.jpg', 'Vue.js, Express.js, Chart.js, MySQL', 'https://github.com/mawlid1431/social-dashboard');