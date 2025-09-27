# 🚀 Complete Database Setup Instructions

## Step 1: Create Database Tables

1. **Open your Supabase SQL Editor**: https://supabase.com/dashboard/project/stfrwzveehgxhwwqfbtt/sql/new

2. **Copy and paste this SQL code** and click "Run":

```sql
-- Services Table
CREATE TABLE IF NOT EXISTS services (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
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

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read access on projects" ON projects FOR SELECT USING (true);
```

## Step 2: Test Your Portfolio

1. **Open your portfolio**: http://localhost:5176/
2. **Click "Test Database"** button (top-right corner)
3. **Click "Add Sample Data"** to populate your database
4. **You should see services and projects** loaded from your Supabase database!

## Step 3: Add Your Own Data

### Option 1: Using Supabase Table Editor

1. Go to your Supabase project: https://supabase.com/dashboard/project/stfrwzveehgxhwwqfbtt
2. Click "Table Editor"
3. Select "services" or "projects" table
4. Click "Insert" → "Insert row"
5. Add your data and save

### Option 2: Using SQL

Add services:

```sql
INSERT INTO services (name, price, description) VALUES
('Your Service Name', '$100-$500', 'Your service description');
```

Add projects:

```sql
INSERT INTO projects (name, description, is_live, link, image, technology, official_link) VALUES
('Your Project Name', 'Project description', true, 'https://your-project.com', 'https://image-url.jpg', 'React, Node.js', 'https://github.com/your-repo');
```

## 🎉 That's It!

Your portfolio is now connected to Supabase! Any data you add will automatically appear on your website.

### What You Can Do Now:

✅ **Add new services** - They'll appear in the Services section  
✅ **Add new projects** - They'll appear in the Projects section  
✅ **Update existing data** - Changes reflect immediately  
✅ **Delete data** - Items will be removed from your site

### Managing Your Data:

- **Services**: Control what services you offer and their pricing
- **Projects**: Showcase your portfolio projects with live links
- **Real-time updates**: No need to redeploy - changes are instant!

---

**Need Help?**

- Check the browser console for any errors
- Use the "Test Database" button to verify connections
- Ensure your .env.local file has the correct Supabase credentials
