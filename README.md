# Portfolio 2.0

A modern, professional portfolio website built with React, TypeScript, and Supabase.

## Features

- 🎨 Modern responsive design with Tailwind CSS
- 🔧 Dynamic content management with admin dashboard
- 📧 Email notifications for orders and contact forms
- 📱 Mobile-responsive with smooth animations
- 🔒 Secure authentication and environment configuration
- 🚀 Built with Vite for fast development and builds

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Email**: Node.js + Nodemailer + Gmail SMTP
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## Quick Start

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

# Edit .env.local with your credentials
# - Supabase URL and anon key
# - Gmail credentials for email server
# - Admin login credentials
```

### 4. Database Setup
- Create a Supabase project
- Set up the required tables (services, projects)
- Update RLS policies as needed

### 5. Email Setup
- Enable 2-Step Verification on your Gmail account
- Generate an App Password for SMTP
- Update GMAIL_USER and GMAIL_APP_PASSWORD in .env.local

### 6. Run the application
```bash
# Start the development server
npm run dev

# In another terminal, start the email server
node email-server.js
```

## Usage

- **Portfolio**: Visit `http://localhost:5173`
- **Admin Dashboard**: Visit `http://localhost:5173/admin`
- **Email Testing**: Visit `http://localhost:5173/email-test`

## Deployment

Before deploying:

1. Update environment variables in your hosting platform
2. Set up production Supabase configuration
3. Configure email server for production use
4. Ensure all sensitive information is properly secured

## Security

- All sensitive configuration is in `.env.local` (not tracked by Git)
- Admin authentication with environment-based credentials
- Supabase RLS policies for data protection
- Email server with secure SMTP authentication

## License

This project is licensed under the MIT License.