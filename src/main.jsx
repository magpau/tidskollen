import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './i18n';
import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

// Component to handle language detection and redirection
function LanguageWrapper({ children }) {
  const { i18n } = useTranslation();
  const { lang } = useParams(); // Use React Router's useParams to get the language from the URL
  const [isLanguageSet, setIsLanguageSet] = useState(false);

  useEffect(() => {
    const validLanguages = ['en', 'sv'];

    if (lang && validLanguages.includes(lang) && lang !== i18n.language) {
      i18n.changeLanguage(lang).then(() => {
        setIsLanguageSet(true); // Mark language as set after i18n has changed it
      });
    } else {
      setIsLanguageSet(true); // If no language change is needed, mark as set
    }
  }, [lang, i18n]);

  // Render children only when the language is correctly set
  if (!isLanguageSet) return null;

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Define language-specific paths */}
          <Route
            path="/:lang/*"
            element={
              <LanguageWrapper>
                <App />
              </LanguageWrapper>
            }
          />

          {/* Redirect root path to a default language (e.g., Swedish) */}
          <Route path="/" element={<Navigate to="/sv/" />} />
        </Routes>
      </Router>
    </HelmetProvider>
  </StrictMode>
);