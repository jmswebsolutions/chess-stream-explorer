import { Home } from './pages/Home';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryProvider } from './contexts/QueryClientProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <Home />
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
