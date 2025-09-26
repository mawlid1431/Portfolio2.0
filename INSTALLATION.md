# 🚀 Mowlid Mohamud Portfolio - Installation & Setup Guide

Welcome to the comprehensive setup guide for Mowlid Mohamud's modern, animated portfolio website. This guide will walk you through the complete installation process and get your development environment running smoothly.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Environment Configuration](#environment-configuration)
- [Supabase Setup](#supabase-setup)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)
- [Features](#features)

## ✅ Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v8.0.0 or higher) - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

### Optional (Recommended)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **VS Code Extensions**:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - Auto Rename Tag

### Check Your Versions
```bash
node --version    # Should be v18.0.0 or higher
npm --version     # Should be v8.0.0 or higher
git --version     # Any recent version
```

## 🚀 Quick Start

Get up and running in under 5 minutes:

```bash
# 1. Download and extract the source code
# Extract the portfolio files to your desired directory
cd mowlid-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open your browser
# Visit: http://localhost:5173
```

**Note**: If you encounter any dependency issues during installation, try:
```bash
npm install --legacy-peer-deps
```

### **Important: Profile Images Setup**

This portfolio uses custom profile images that are imported from Figma. When downloading the source code, you'll need to:

1. **Replace the image imports** in `/App.tsx` (lines 25-27) with your own images
2. **Add your images** to a `/public/images/` directory 
3. **Update the imports** to use your local images:

```tsx
// Replace these lines in App.tsx:
import profileImage1 from "figma:asset/40a7fb5cb3cdb862254f1641162fc216be7f04cb.png";
import profileImage2 from "figma:asset/c279079b2d312dc2c48df0ceff0b6caa224eeb2b.png";

// With your local images:
const profileImage1 = "/images/your-profile-photo-1.jpg";
const profileImage2 = "/images/your-profile-photo-2.jpg";
```

That's it! The portfolio should now be running locally. 🎉

## 🔧 Detailed Setup

### Step 1: Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/mowlidmohamud/portfolio.git

# OR clone using SSH (if you have SSH keys set up)
git clone git@github.com:mowlidmohamud/portfolio.git

# Navigate to the project directory
cd portfolio
```

### Step 2: Install Dependencies

```bash
# Install all dependencies (this may take a few minutes)
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed correctly
npm run type-check

# Run linting
npm run lint
```

## ⚙️ Environment Configuration

### Local Development

For local development, the application works out of the box. However, for full functionality (email notifications, database features), you'll need to set up environment variables.

Create a `.env.local` file in the root directory:

```bash
# Create environment file
touch .env.local
```

Add the following variables to `.env.local`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Email Configuration (Optional)
VITE_EMAIL_SERVICE_API_KEY=your_email_service_key

# Development
VITE_APP_ENV=development
```

### Production Environment

For production deployment, ensure you have the following environment variables configured:

```env
# Supabase Configuration
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration
EMAIL_SERVICE_API_KEY=your_production_email_key

# Production Settings
NODE_ENV=production
```

## 🗄️ Supabase Setup

The portfolio includes a full-featured e-commerce system with order management. Here's how to set up Supabase:

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new account or sign in
3. Create a new project
4. Note down your project URL and API keys

### 2. Database Setup

The project uses a simple key-value store table that's automatically configured. No manual database setup required!

### 3. Authentication Setup (Optional)

If you want to add user authentication:

1. Go to Authentication → Settings in your Supabase dashboard
2. Configure your preferred auth providers (Google, GitHub, etc.)
3. Update the redirect URLs

### 4. Storage Setup (Optional)

For file uploads:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `portfolio-assets`
3. Configure appropriate permissions

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format

# Supabase commands
npm run supabase:start
npm run supabase:stop
npm run supabase:status
```

### Development Server

```bash
# Start the development server
npm run dev

# The application will be available at:
# - Local:   http://localhost:5173
# - Network: http://[your-ip]:5173
```

### Hot Reload

The development server includes hot reload. Changes to your code will automatically refresh the browser.

### Building for Production

```bash
# Create production build
npm run build

# The build output will be in the 'dist' directory
# You can preview the production build with:
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist` folder to your web server

## 🐛 Troubleshooting

### Common Issues

#### Node Version Error
```bash
Error: This project requires Node.js v18.0.0 or higher
```
**Solution**: Update Node.js to the latest LTS version.

#### Dependency Installation Fails
```bash
npm ERR! peer dep missing
```
**Solution**: 
```bash
npm install --legacy-peer-deps
```

#### Build Errors
```bash
TypeScript errors during build
```
**Solution**:
```bash
npm run type-check
# Fix any TypeScript errors shown
```

#### Supabase Connection Issues
```bash
Error: Invalid Supabase URL
```
**Solution**: Check your environment variables in `.env.local`

#### Import Errors
```bash
Module not found: Can't resolve 'sonner@2.0.3'
```
**Solution**: This has been fixed. The correct import is now `import { toast, Toaster } from 'sonner';`

#### Motion/Framer Motion Issues
```bash
Module not found: Can't resolve 'motion/react'
```
**Solution**: Make sure you have the correct Motion package installed:
```bash
npm install motion@^10.18.0
```

### Performance Issues

If the development server is slow:

```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 5173 is in use:

```bash
# Use a different port
npm run dev -- --port 3000
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components (shadcn/ui)
│   │   └── figma/        # Figma-specific components
│   ├── styles/           # CSS and styling
│   ├── utils/            # Utility functions
│   └── supabase/         # Supabase configuration
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## ✨ Features

### Core Features
- 🎨 **Modern Design**: Smooth animations with Framer Motion
- 📱 **Responsive**: Works perfectly on all devices
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 🛒 **E-commerce**: Full shopping cart and checkout system
- 📧 **Contact Forms**: Email notifications for orders and inquiries
- 🌍 **WhatsApp Integration**: Floating WhatsApp button
- ⚡ **Performance**: Optimized for speed and SEO

### Technical Features
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Supabase** for backend services
- **Lucide React** for icons
- **Sonner** for toast notifications

### Sections
1. **Hero Section** - Animated introduction with profile images
2. **About** - Personal introduction and expertise
3. **Education** - Academic background and certifications
4. **Experience** - Work experience and social impact
5. **Projects** - Featured development projects
6. **Services** - Professional services with e-commerce functionality
7. **Contact** - Contact form and information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or need help:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/mowlidmohamud/portfolio/issues)
3. Create a new issue with detailed information
4. Contact Mowlid directly:
   - Email: malitmohamud@gmail.com
   - WhatsApp: +6017 258 9925

## 🎉 Success!

Congratulations! You now have Mowlid Mohamud's portfolio running locally. The application includes:

- ✅ Animated, responsive design
- ✅ Dark/light mode toggle
- ✅ Shopping cart system
- ✅ Contact form functionality
- ✅ WhatsApp integration
- ✅ Professional portfolio sections

Happy coding! 🚀

---

**Last Updated**: January 2024  
**Version**: 1.0.0  
**Maintainer**: Mowlid Mohamud (malitmohamud@gmail.com)