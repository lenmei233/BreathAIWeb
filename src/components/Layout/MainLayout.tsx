import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useTheme } from '@/contexts/ThemeContext'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={`min-h-screen bg-fluent-background text-fluent-text ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar 
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="h-full">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default MainLayout
