# Portfolio 2.0

A modern, professional portfolio website built with React, TypeScript, and Supabase featuring dynamic content management and integrated order system.

## 🌟 Features

- 🎨 **Modern Design**: Responsive design with Tailwind CSS and Framer Motion animations
- 🔧 **Admin Dashboard**: Complete content management system for services, projects, orders, and contacts
- 📧 **Contact System**: Integrated contact form with database storage and status management
- 🛒 **Order Management**: Full e-commerce functionality with cart, checkout, and order tracking
- 📱 **Mobile-First**: Fully responsive design with mobile navigation
- 🔒 **Secure**: Environment-based authentication and Supabase RLS policies
- 🚀 **Fast**: Built with Vite for optimal performance

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Email**: SMTP integration for notifications

## 📸 Screenshots

### Desktop View
![Desktop Homepage](./Mockups/Screenshot%202025-10-11%20131723.png)
![Desktop Admin Dashboard](./Mockups/Screenshot%202025-10-11%20131736.png)

### Mobile View
![Mobile Homepage](./Mockups/Screenshot%202025-10-11%20131754.png)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/mawlid1431/Portfolio2.0.git
cd Portfolio2.0
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials:
# - Supabase URL and anon key
# - Admin login credentials
# - Gmail SMTP credentials (optional)
```

### 4. Database Setup

Create a Supabase project and run the following SQL to set up tables:

```sql
-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(100) NOT NULL,
  technology VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  technology VARCHAR(500),
  link VARCHAR(500),
  is_live BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  address_street VARCHAR(500),
  address_city VARCHAR(100),
  address_postal VARCHAR(20),
  address_country VARCHAR(100),
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contacts table
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Run the application

```bash
npm run dev
```

## 📱 Usage

- **Portfolio**: Visit `http://localhost:5173`
- **Admin Dashboard**: Visit `http://localhost:5173/admin`
  - Default credentials: `admin@malit.dev` / `Adminadmin123`

## 🔧 Admin Features

- **Services Management**: Add, edit, delete services
- **Projects Management**: Manage portfolio projects
- **Orders Management**: View and manage customer orders
- **Contacts Management**: Handle contact form submissions
- **Dark/Light Mode**: Theme switching
- **Status Management**: Update order and contact statuses

## 🌐 Social Media

- **GitHub**: [mawlid1431](https://github.com/mawlid1431)
- **LinkedIn**: [Mowlid Mohamoud Haibe](https://www.linkedin.com/in/mowlid-mohamoud-haibe-8b7b6a189/)
- **Instagram**: [@malitfx](https://www.instagram.com/malitfx/)

## 🎓 Education

- **Bachelor of Computer Science** - Albukhary International University (Malaysia)
- **Google Project Management Certificate** (2023-2024)
- **Full Stack Web Developer** - FikrCamp (2023-2024)
- **IBM Full Stack Developer** (2025)
- **ALX Africa Software Engineering Graduate**

## 🚀 Deployment

1. Update environment variables in your hosting platform
2. Set up production Supabase configuration
3. Configure domain and SSL certificates
4. Set up email notifications (optional)

## 🔒 Security

- Environment variables in `.env.local` (not tracked by Git)
- Supabase Row Level Security (RLS) policies
- Secure admin authentication
- Input validation and sanitization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Mowlid Mohamud**