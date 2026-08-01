import { Home } from './pages/Home';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Home />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
