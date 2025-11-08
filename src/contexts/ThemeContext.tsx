import React, { createContext, useContext, useEffect, ReactNode } from 'react'
import { useThemeStore } from '@/stores/themeStore'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme, setTheme, getEffectiveTheme } = useThemeStore()

  const toggleTheme = () => {
    const currentTheme = getEffectiveTheme()
    setTheme(currentTheme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const effectiveTheme = getEffectiveTheme()
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, getEffectiveTheme])

  const value: ThemeContextType = {
    theme: getEffectiveTheme(),
    toggleTheme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
