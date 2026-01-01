# 🎬 Movie Generator

A modern movie search application that helps you discover films and manage your personal watchlist. Built with vanilla JavaScript and powered by the OMDB API.

## ✨ Features

- **Movie Search**: Search for any movie using the OMDB database
- **Detailed Information**: View movie posters, ratings, runtime, genre, and plot summaries
- **Personal Watchlist**: Save your favorite movies to a persistent watchlist
- **Local Storage**: Your watchlist persists across browser sessions
- **Responsive Design**: Clean, modern interface that works on all devices

## 🚀 Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🛠️ Technologies Used

- **JavaScript** - Core functionality and API integration
- **HTML/CSS** - Structure and styling
- **Vite** - Build tool and dev server
- **OMDB API** - Movie data
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter)

## 📖 How to Use

1. Enter a movie title in the search bar
2. Browse through the search results
3. Click the "+" button to add movies to your watchlist
4. Access your watchlist anytime via the "My Watchlist" link

## 🔗 API

This project uses the [OMDB API](http://www.omdbapi.com/) to fetch movie data.

## 📝 Project Structure

```
├── index.html          # Main search page
├── index.js            # Search functionality
├── index.css           # Main styles
├── watchlist.html      # Watchlist page
├── watchlist.js        # Watchlist functionality
├── watchlist.css       # Watchlist styles
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## 🎓 About

This project was built as part of the Scrimba Full-Stack Developer Path, focusing on API integration and asynchronous JavaScript.

---

Built with ❤️ as part of [Scrimba's Full-Stack Developer Path](https://scrimba.com/fullstack-path-c0fullstack)