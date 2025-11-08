import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'

// SVG Icons
const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const BotIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
)

interface HeaderProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <header className="h-16 bg-fluent-surface border-b border-fluent-border dark:bg-fluent-dark-surface dark:border-fluent-dark-border">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side - Menu and Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 text-fluent-primary dark:text-fluent-dark-primary">
              <BotIcon />
            </div>
            <span className="text-xl font-semibold text-fluent-text dark:text-fluent-dark-text">
              BreathAI
            </span>
          </Link>
        </div>

        {/* Center - Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-fluent-primary dark:text-fluent-dark-primary'
                : 'text-fluent-text-secondary dark:text-fluent-dark-text-secondary hover:text-fluent-text dark:hover:text-fluent-dark-text'
            }`}
          >
            对话
          </Link>
          <Link
            to="/settings"
            className={`text-sm font-medium transition-colors ${
              location.pathname === '/settings'
                ? 'text-fluent-primary dark:text-fluent-dark-primary'
                : 'text-fluent-text-secondary dark:text-fluent-dark-text-secondary hover:text-fluent-text dark:hover:text-fluent-dark-text'
            }`}
          >
            设置
          </Link>
        </nav>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Settings button (Mobile) */}
          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors md:hidden"
            aria-label="Settings"
          >
            <SettingsIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
