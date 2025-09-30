# 🚀 Deployment Checklist

Before deploying your Portfolio 2.0 to production, make sure you complete these steps:

## ✅ Pre-Deployment Security Check

- [ ] All sensitive files are in `.gitignore`
- [ ] `.env.local` contains your actual credentials (not committed)
- [ ] `.env.example` has placeholder values only
- [ ] No API keys, passwords, or URLs in committed code
- [ ] Database credentials are secure

## ✅ Environment Setup

### Supabase Configuration

- [ ] Create production Supabase project (if different from dev)
- [ ] Update `VITE_SUPABASE_URL` in production environment
- [ ] Update `VITE_SUPABASE_ANON_KEY` in production environment
- [ ] Set up database tables (services, projects)
- [ ] Configure Row Level Security (RLS) policies
- [ ] Test database connectivity

### Email Configuration

- [ ] Set up Gmail App Password for production email
- [ ] Update `GMAIL_USER` in production environment
- [ ] Update `GMAIL_APP_PASSWORD` in production environment
- [ ] Update `VITE_EMAIL_TO` with your production email
- [ ] Deploy email server separately or use serverless functions

### Admin Configuration

- [ ] Change `VITE_ADMIN_USERNAME` to secure username
- [ ] Change `VITE_ADMIN_PASSWORD` to strong password
- [ ] Test admin login functionality

## ✅ Code Preparation

- [ ] Run `npm run build` successfully
- [ ] Test all features in production build
- [ ] Verify mobile responsiveness
- [ ] Check email functionality
- [ ] Test admin dashboard
- [ ] Verify all images load correctly

## ✅ Hosting Platform Setup

### Environment Variables (set these in your hosting platform)

```
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_ADMIN_USERNAME=your_secure_username
VITE_ADMIN_PASSWORD=your_secure_password
VITE_EMAIL_TO=your_email@gmail.com
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
EMAIL_SERVER_PORT=3001
```

### Build Settings

- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Set Node.js version: 18+

## ✅ Post-Deployment Testing

- [ ] Visit deployed site and test navigation
- [ ] Test service detail modals
- [ ] Submit test contact form
- [ ] Complete test order (if applicable)
- [ ] Test admin login at `/admin`
- [ ] Verify email notifications work
- [ ] Check mobile responsiveness
- [ ] Test all links and buttons

## ✅ Email Server Deployment

Choose one option:

### Option 1: Separate Server

- [ ] Deploy `email-server.js` to a server (Railway, Heroku, etc.)
- [ ] Update email service URL in `emailService.ts`
- [ ] Set up environment variables on email server

### Option 2: Serverless Function

- [ ] Convert email server to serverless function (Vercel, Netlify)
- [ ] Update API endpoints accordingly
- [ ] Test serverless email functionality

## ✅ Domain & SSL

- [ ] Configure custom domain (if applicable)
- [ ] Verify SSL certificate is active
- [ ] Test HTTPS redirects
- [ ] Update any hardcoded URLs

## 🎉 Go Live!

Once all items are checked:

1. Push to GitHub: `git push origin master`
2. Deploy to your hosting platform
3. Test everything one final time
4. Share your amazing portfolio with the world!

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify environment variables are set correctly
3. Test database connectivity
4. Check email server logs
5. Review hosting platform logs

---

**Remember**: Keep your `.env.local` file safe and never commit it to Git!
