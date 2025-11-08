import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from '@/stores/themeStore'
import MainLayout from '@/components/Layout/MainLayout'
import ChatPage from '@/pages/ChatPage'
import SettingsPage from '@/pages/SettingsPage'
import TermsPage from '@/pages/TermsPage'
import { ThemeProvider } from '@/contexts/ThemeContext'

function App() {
  const { theme } = useThemeStore()

  // 应用主题到 document
  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeProvider>
      <Router>
        <div className={`min-h-screen bg-fluent-background text-fluent-text transition-colors duration-200`}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </MainLayout>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
