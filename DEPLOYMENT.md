# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### 1. Push to GitHub (Already Done ✅)
Your code is already on GitHub at: `https://github.com/mawlid1431/Portfolio2.0`

### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Import** your `Portfolio2.0` repository
5. **Configure** project settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 3. Add Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

```
VITE_SUPABASE_URL=https://stfrwzveehgxhwwqfbtt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZnJ3enZlZWhneGh3d3FmYnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTcxNTQsImV4cCI6MjA3NDUzMzE1NH0.DZqx3Xx_QOvPqzkFD33yEr13e_rm6ifGyWoi6KrOUCo
VITE_APP_ENV=production
VITE_ADMIN_USERNAME=admin@malit.dev
VITE_ADMIN_PASSWORD=Adminadmin123
```

### 4. Deploy!

Click **"Deploy"** and wait 2-3 minutes. Your site will be live at:
`https://your-project-name.vercel.app`

## 🔧 Custom Domain (Optional)

1. **Buy domain** (e.g., `mowlid.dev`)
2. **In Vercel**: Settings > Domains
3. **Add domain** and follow DNS instructions
4. **Wait 24-48 hours** for propagation

## 📱 Features Ready for Production

✅ **Portfolio Website** - Fully responsive  
✅ **Admin Dashboard** - `/admin` route  
✅ **Contact Forms** - Database integrated  
✅ **Order System** - E-commerce ready  
✅ **Dark/Light Mode** - Theme switching  
✅ **Mobile Navigation** - Touch-friendly  
✅ **SEO Optimized** - Meta tags included  

## 🎯 Post-Deployment

1. **Test all features** on live site
2. **Update social media** with new URL
3. **Add to resume/CV** as live project
4. **Share with potential clients**

Your portfolio is production-ready! 🚀