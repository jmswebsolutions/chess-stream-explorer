import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { ThemeProvider } from './contexts/ThemeContext';
import { QueryProvider } from './contexts/QueryClientProvider';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <ThemeProvider>
          <BrowserRouter basename="/chess-stream-explorer">
            <a 
              href="#main-content" 
              className="skip-to-main"
              aria-label="Skip to main content"
            >
              Skip to main content
            </a>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
}

export default App;
