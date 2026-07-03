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
│   ├── components/          # React components
│   │   ├── Badge.tsx
│   │   ├── ErrorState.tsx
│   │   ├── Filters.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Sort.tsx
│   │   ├── Spinner.tsx
│   │   ├── Stats.tsx
│   │   └── StreamerCard.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── useStreamers.ts
│   ├── pages/              # Page components
│   │   └── Home.tsx
│   ├── services/           # API services
│   │   └── chessApi.ts
│   ├── types/              # TypeScript types
│   │   └── streamer.ts
│   ├── utils/              # Utility functions
│   ├── assets/             # Static assets
│   ├── styles/             # Global styles
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

## Screenshots

![Desktop View](https://via.placeholder.com/800x600/1a1a2e/16213e?text=Desktop+View)
![Mobile View](https://via.placeholder.com/400x800/1a1a2e/16213e?text=Mobile+View)
