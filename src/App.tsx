import { Home } from './pages/Home';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
