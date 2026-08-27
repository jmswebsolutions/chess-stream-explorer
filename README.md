# Chess Stream Explorer

A modern React application to discover and follow chess streamers from around the world. Built with React, Vite, TypeScript, and Tailwind CSS.

## Features

- **Live Streamer Data**: Automatically fetches streamers from the Chess.com public API
- **Real-time Status**: Shows live/offline status with color-coded badges
- **Advanced Filtering**: Search by username, filter by status (online/offline), and community streamers
- **Multiple Sorting Options**: Sort by name (A-Z, Z-A) or status (online first, offline first)
- **Statistics Dashboard**: Displays total streamers, online count, offline count, and community streamers
- **Auto-refresh**: Data updates automatically every 60 seconds
- **Manual Refresh**: One-click refresh button
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with smooth animations and transitions
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Friendly error messages with retry functionality

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/chess-stream-explorer.git
cd chess-stream-explorer
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

Create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview

Preview the production build locally:
```bash
npm run preview
```

## Linting

Run ESLint to check for code issues:
```bash
npm run lint
```

## Formatting

Format code with Prettier:
```bash
npm run format
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### GitHub Pages Setup

1. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

2. Push your code to the `main` branch:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

3. The GitHub Actions workflow will automatically:
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages

Your application will be available at: `https://your-username.github.io/chess-stream-explorer/`

## Project Structure

```
chess-stream-explorer/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── src/
│   ├── api/                # Data layer - API communication
│   │   └── chessApi.ts     # Chess.com API client with types
│   ├── components/         # React components
│   │   ├── Badge.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Filters.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Sort.tsx
│   │   ├── Spinner.tsx
│   │   ├── Stats.tsx
│   │   └── StreamerCard.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useStreamers.ts # Data fetching hook
│   │   └── useHome.ts      # Application logic hook
│   ├── pages/              # Page components
│   │   └── Home.tsx         # Main page (presentation only)
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global CSS
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Public assets
├── index.html              # HTML template
├── package.json           # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── .eslintrc.cjs           # ESLint configuration
├── .prettierrc             # Prettier configuration
└── README.md               # This file
```

## API

This application uses the Chess.com public API:
- Endpoint: `https://api.chess.com/pub/streamers`
- No authentication required
- Rate limits apply (respect the API)

## License

MIT License - feel free to use this project for any purpose.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Future Features & Roadmap

### Short-term (Days)
- [x] **Favorite Streamers**: Allow users to save favorite streamers to local storage
- [x] **Stream Preview**: Add embedded video preview for live streamers (Twitch/YouTube)
- [x] **Advanced Search**: Add search by platform (Twitch, YouTube, Chess.com)
- [x] **Keyboard Shortcuts**: Add keyboard shortcuts for common actions (refresh, clear filters)
- [x] **Performance Optimization**: Implement React.memo for component optimization

### Medium-term (Weeks)
- [x] **Streamer Profiles**: Detailed view with more information (rating, country, games)
- [x] **Notifications**: Browser notifications when favorite streamers go live
- [x] **Charts & Analytics**: Visualize streaming trends and statistics
- [x] **Multi-language Support**: Add i18n for Portuguese, Spanish, and other languages
- [x] **Dark/Light Theme Toggle**: Allow users to switch between themes
- [x] **Export Data**: Export filtered results to CSV/JSON

### Long-term (Months)
- [ ] **User Accounts**: Authentication with GitHub/Google for cloud sync
- [x] **Recommendation System**: Suggest streamers based on viewing history
- [ ] **Community Features**: Comments, ratings, and reviews for streamers
- [x] **Mobile App**: PWA with offline support and app store distribution
- [ ] **Real-time WebSocket**: Real-time updates without polling
- [x] **Admin Dashboard**: Analytics dashboard for administrators

### Technical Improvements
- [x] **Testing**: Add unit tests with Vitest and integration tests with Playwright
- [x] **Component Tests**: Add React Testing Library tests for components
- [x] **State Management**: Consider Zustand or Jotai for complex state scenarios
- [x] **API Caching**: Implement React Query for better caching and synchronization
- [x] **Error Boundaries**: Add React error boundaries for better error handling
- [x] **Bundle Optimization**: Code splitting and lazy loading for better performance
- [x] **Accessibility**: Full WCAG 2.1 AA compliance with ARIA labels and keyboard navigation
- [x] **Automatic Dark Mode**: Detect system preference and auto-switch theme
- [x] **Compact Mode**: Toggle for denser streamer card layout
- [x] **Smooth Animations**: Add transitions and animations for better UX
- [x] **Additional Keyboard Shortcuts**: More shortcuts for navigation and filters
- [x] **Customizable Themes**: Add color themes (blue, purple, green, orange, pink)
- [x] **Mobile Header Improvements**: Better responsive layout with hamburger menu
- [x] **Advanced Search**: Search by name, platform, or status
- [x] **Favorites Groups**: Organize favorites in categories/groups
- [x] **Personal Statistics**: Track viewing time and views per streamer
- [x] **Advanced Export**: Export data to Excel (.xlsx) and PDF formats
- [x] **Drag & Drop**: Reorder streamer cards with drag and drop
- [x] **Recently Viewed**: Track and display recently viewed streamers
- [x] **Favorite Notes**: Add custom notes to favorite streamers
- [x] **Social Sharing**: Share streamers on Twitter, Facebook, and WhatsApp
- [x] **Settings Export/Import**: Backup and restore user preferences
- [x] **Cinema Mode**: Fullscreen viewing for stream previews
- [x] **Custom Tags**: Add custom tags to organize streamers
- [x] **Streamer Comparison**: Compare 2 streamers side-by-side

## Screenshots

![Desktop View](https://via.placeholder.com/800x600/1a1a2e/16213e?text=Desktop+View)
![Mobile View](https://via.placeholder.com/400x800/1a1a2e/16213e?text=Mobile+View)
