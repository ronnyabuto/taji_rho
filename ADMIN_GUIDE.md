# Admin Guide - Taji Rho Blog

## 🔐 Admin Access & Password Management

### **Accessing the Admin Panel**

1. **Navigate to Admin**: Go to `http://localhost:3000/admin`
2. **Login**: Use your admin password (default: `admin123`)
3. **Dashboard**: Access posts, editor, analytics, and settings

### **Changing Your Admin Password**

#### **Method 1: Through Admin Settings Panel (Recommended)**

1. **Access Settings**:
   - Login to admin panel (`/admin`)
   - Click **"Settings"** in the navigation
   - Go to the **"Security"** tab

2. **Change Password**:
   - Enter your current password
   - Enter new password (minimum 8 characters)
   - Confirm new password
   - Click **"Change Password"**

3. **Complete the Change**:
   - The system will confirm the password change request
   - **IMPORTANT**: You must manually update your environment variables
   - Restart your development server for changes to take effect

#### **Method 2: Direct Environment Variable Update**

1. **Edit Environment File**:
   ```bash
   # In .env.local file
   ADMIN_PASSWORD=your-new-secure-password-here
   ```

2. **Restart Server**:
   ```bash
   npm run dev
   ```

### **Security Best Practices**

- ✅ Use passwords with at least 12 characters
- ✅ Include uppercase, lowercase, numbers, and symbols
- ✅ Don't use common passwords or personal information
- ✅ Monitor login attempts (logged in console)
- ✅ Change passwords regularly

## 📝 Blog Management Features

### **Posts Management**
- **View Posts**: See all published and draft posts
- **Edit Posts**: Click on any post to edit
- **Create Posts**: Use the "New Post" button
- **Delete Posts**: Remove unwanted content

### **Content Editor**
- **Rich Text Editing**: Full-featured content editor
- **Markdown Support**: Write in markdown format
- **Media Upload**: Add images and media (future feature)
- **SEO Settings**: Meta descriptions and keywords

### **Analytics Dashboard**
- **View Metrics**: See blog statistics
- **Post Performance**: Track individual post views
- **Engagement Data**: Monitor reader interaction

## ⚙️ Settings Configuration

### **General Settings**
- **Blog Title**: Change your blog's main title
- **Author Information**: Update your name and contact details
- **Blog Description**: Modify the site description
- **Social Media**: Configure Twitter handle and other social links
- **Base URL**: Set your domain URL

### **SEO & Analytics**
- **Google Verification**: Add Google Search Console verification
- **Google Analytics**: Configure GA4 tracking ID
- **Meta Keywords**: Set default SEO keywords
- **Structured Data**: Automatic schema markup

### **Security Settings**
- **Password Management**: Change admin password
- **Session Management**: Control login sessions
- **Access Logging**: Monitor login attempts

## 🚀 Environment Configuration

### **Required Environment Variables**

Create or update your `.env.local` file:

```bash
# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Admin Authentication
ADMIN_PASSWORD=your-secure-password

# SEO & Analytics (Optional)
GOOGLE_VERIFICATION_CODE=your-google-verification-code
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Email (Future Feature)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### **Development vs Production**

**Development** (`.env.local`):
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_PASSWORD=your-dev-password
```

**Production** (`.env.production` or hosting platform):
```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
ADMIN_PASSWORD=your-very-secure-production-password
```

## 🔧 Troubleshooting

### **Can't Login?**
1. Check your password in `.env.local`
2. Restart the development server
3. Clear browser cache and cookies
4. Check console for error messages

### **Settings Not Saving?**
1. Currently uses mock data (no database connected)
2. For persistence, you'll need to connect a database
3. Changes to environment variables require server restart

### **Hydration Errors?**
- These are now suppressed for browser extension compatibility
- If you see hydration warnings, they won't affect functionality

## 📦 Future Enhancements

### **Database Integration**
To make settings persistent, consider adding:
- **Prisma + PostgreSQL** for full database functionality
- **Vercel KV** for simple key-value storage
- **MongoDB** for document-based storage

### **Enhanced Authentication**
- **NextAuth.js** for OAuth login (Google, GitHub, etc.)
- **JWT tokens** for better session management
- **Role-based access** for multiple admin users

### **Advanced Features**
- **Media management** for image uploads
- **Comment system** for reader engagement
- **Newsletter integration** for email subscriptions
- **Backup/export** functionality for content

---

**Need Help?** Check the console logs for detailed error messages or refer to the development documentation.