# Overwatch 2 Counter Picks

A comprehensive web application for strategic hero counter-picking in Overwatch 2. Features both 1v1 counter recommendations and 5v5 team composition suggestions with multilingual support (English/Spanish).

## 🚀 Features

### Counter Picks 1v1
- Select any hero to see effective counters
- Detailed explanations for why each counter works
- Effectiveness ratings (1-10 scale)
- Role-based filtering (Tank, Damage, Support)

### Counter Picks de Equipo 5v5
- Select up to 5 enemy heroes
- Get balanced team recommendations (1 Tank, 2 DPS, 2 Support)
- Smart counter prioritization based on enemy team composition
- Adaptive role balancing when strong counters are available

### Additional Features
- **Bilingual Support**: Full English/Spanish language toggle
- **Complete Hero Database**: All 43 Overwatch 2 heroes with latest additions
- **Hero Information**: Strengths and weaknesses for each hero
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real Hero Images**: Authentic Overwatch 2 character portraits

## 🌐 Live Demo

Visit the live application: [Overwatch 2 Counter Picks](https://yourusername.github.io/overwatch-counter-picks)

## 🛠️ GitHub Pages Deployment

### Step 1: Fork and Clone
1. Fork this repository to your GitHub account
2. Clone the forked repository:
   ```bash
   git clone https://github.com/yourusername/overwatch-counter-picks.git
   cd overwatch-counter-picks/frontend
   ```

### Step 2: Update Configuration
1. Edit `package.json` and update the homepage URL:
   ```json
   "homepage": "https://yourusername.github.io/overwatch-counter-picks"
   ```

### Step 3: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 4: Deploy to GitHub Pages
```bash
npm run deploy
# or
yarn deploy
```

### Step 5: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/ (root)" folder
6. Click "Save"

Your site will be available at: `https://yourusername.github.io/overwatch-counter-picks`

## 🖼️ Changing Hero Images

### Method 1: Direct File Replacement
1. Navigate to `src/data.js`
2. Find the hero you want to update in the `heroesData` array
3. Replace the image URL:
   ```javascript
   { name: "Hero Name", role: "Role", image: "YOUR_NEW_IMAGE_URL", ... }
   ```

### Method 2: Using Local Images
1. Add your image to `public/images/heroes/`
2. Update the data file:
   ```javascript
   { name: "Hero Name", role: "Role", image: "/images/heroes/hero-name.jpg", ... }
   ```

### Image Requirements
- Format: JPG, PNG, or WebP
- Recommended size: 256x256px or larger
- Aspect ratio: 1:1 (square)
- Good quality portraits work best

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── images/           # Local hero images (optional)
├── src/
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   ├── components.js    # React components
│   ├── data.js          # Hero data and counter information
│   └── index.js         # Application entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🎮 Counter Data Sources

The counter recommendations are based on:
- Community sites (heropicker.com, esportport.com)
- Professional gameplay analysis
- Meta trends from competitive Overwatch 2
- Community feedback from Reddit and forums

## 🔧 Development

### Local Development
```bash
npm start
# or 
yarn start
```

### Building for Production
```bash
npm run build
# or
yarn build
```

### Testing
```bash
npm test
# or
yarn test
```

## 🌍 Language Support

Currently supported languages:
- **English** (Default)
- **Spanish** (Español)

To add more languages:
1. Edit `src/data.js`
2. Add new language object to `translations`
3. Update the language selector in components

## 🚨 Important Notes

### Safety & Compliance
- **100% Web-Based**: This is a static website with no game client interaction
- **Read-Only**: No connection to Overwatch 2 or Battle.net servers
- **Anti-Cheat Safe**: Cannot interfere with game files or processes
- **Community Tool**: Educational resource for strategy improvement

### Disclaimer
This is an unofficial fan-made tool. Overwatch 2 is a trademark of Blizzard Entertainment, Inc. This project is not affiliated with or endorsed by Blizzard Entertainment.

## 📈 Updates

The application is regularly updated with:
- New hero additions
- Meta changes and balance updates
- Counter data refinements
- Community feedback integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ for the Overwatch 2 community**