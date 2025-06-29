# 🚀 GitHub Pages Deployment Guide

## Quick Setup (5 Minutes)

### 1. Prepare Your Repository
```bash
# Clone your repository
git clone https://github.com/yourusername/overwatch-counter-picks.git
cd overwatch-counter-picks

# Navigate to frontend directory
cd frontend
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using yarn (recommended)
yarn install
```

### 3. Update Package Configuration
Edit `package.json` and change the homepage:
```json
{
  "homepage": "https://yourusername.github.io/overwatch-counter-picks"
}
```

### 4. Deploy to GitHub Pages
```bash
# Build and deploy in one command
npm run deploy

# Or with yarn
yarn deploy
```

### 5. Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** 
5. Folder: **/ (root)**
6. Click **Save**

✅ **Done!** Your site will be live at: `https://yourusername.github.io/overwatch-counter-picks`

---

## 🖼️ How to Change Hero Images

### Option 1: Replace Image URLs (Easiest)
1. Open `src/data.js`
2. Find your hero in the `heroesData` array
3. Replace the image URL:

```javascript
// Before
{ name: "Tracer", role: "Damage", image: "https://old-image.com/tracer.png" }

// After  
{ name: "Tracer", role: "Damage", image: "https://your-new-image.com/tracer.jpg" }
```

### Option 2: Use Local Images
1. Create folder: `public/images/heroes/`
2. Add your image: `public/images/heroes/tracer.jpg`
3. Update the data:

```javascript
{ name: "Tracer", role: "Damage", image: "/images/heroes/tracer.jpg" }
```

### Image Requirements
- **Format**: JPG, PNG, WebP
- **Size**: 256x256px minimum
- **Ratio**: Square (1:1)
- **Quality**: High resolution portraits

---

## 🔧 Advanced Configuration

### Custom Domain (Optional)
1. Add `CNAME` file to `public/` folder:
```
your-custom-domain.com
```

2. Configure DNS at your domain provider:
```
Type: CNAME
Name: www (or @)
Value: yourusername.github.io
```

### Environment Variables
Create `.env` file in frontend directory:
```bash
REACT_APP_SITE_NAME=My Counter Picks
REACT_APP_ANALYTICS_ID=your-analytics-id
```

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or with yarn
rm -rf node_modules yarn.lock  
yarn install
```

### Deployment Issues
```bash
# Force deployment
npm run deploy -- --force

# Check deployment status
git status
git log --oneline -5
```

### Page Not Loading
1. Check repository settings → Pages
2. Verify branch is `gh-pages`
3. Wait 5-10 minutes for propagation
4. Clear browser cache

### Images Not Showing
1. Verify image URLs are accessible
2. Check browser console for errors
3. Ensure image paths start with `/` for local files
4. Test image URLs in browser directly

---

## 📊 Performance Tips

### Image Optimization
```bash
# Install optimization tools
npm install --save-dev imagemin imagemin-webp

# Optimize images automatically
npm run optimize-images
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx serve -s build

# Bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npm run analyze
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm install
        
    - name: Build and Deploy
      run: |
        cd frontend
        npm run deploy
      env:
        GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📞 Support

### Common Commands
```bash
# Start development server
npm start

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Test the build locally
npx serve -s build
```

### Getting Help
1. Check the [Issues](https://github.com/yourusername/overwatch-counter-picks/issues) page
2. Review the [README.md](README.md) file
3. Search Stack Overflow for React/GitHub Pages issues

---

**🎯 Remember**: This is a static website that runs entirely in the browser - no servers, no databases, completely safe for gaming!