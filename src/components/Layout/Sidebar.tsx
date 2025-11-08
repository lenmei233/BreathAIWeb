import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Chat24Regular, 
  Settings24Regular,
  Document24Regular,
  Info24Regular,
  ArrowLeft24Regular
} from '@fluentui/react-icons'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation()

  const menuItems = [
    {
      icon: Chat24Regular,
      label: '对话',
      path: '/',
      description: '开始新的AI对话'
    },
    {
      icon: Settings24Regular,
      label: '设置',
      path: '/settings',
      description: '配置API和偏好设置'
    },
    {
      icon: Document24Regular,
      label: '用户协议',
      path: '/terms',
      description: '查看用户协议和隐私政策'
    },
    {
      icon: Info24Regular,
      label: '关于',
      path: '/about',
      description: '了解BreathAI'
    }
  ]

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-fluent-surface dark:bg-fluent-dark-surface 
        border-r border-fluent-border dark:border-fluent-dark-border
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${open ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-fluent-border dark:border-fluent-dark-border">
            <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text">
              菜单
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors"
              aria-label="Close sidebar"
            >
              <ArrowLeft24Regular className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-fluent-primary text-white dark:bg-fluent-dark-primary dark:text-white' 
                      : 'text-fluent-text dark:text-fluent-dark-text hover:bg-fluent-border dark:hover:bg-fluent-dark-border'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-fluent-border dark:border-fluent-dark-border">
            <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
              BreathAI v1.0.0
            </div>
            <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              基于Fluent Design System
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-fluent-surface lg:dark:bg-fluent-dark-surface lg:border-r lg:border-fluent-border lg:dark:border-fluent-dark-border">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="h-16 px-4 border-b border-fluent-border dark:border-fluent-dark-border flex items-center">
            <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text">
              导航
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-fluent-primary text-white dark:bg-fluent-dark-primary dark:text-white' 
                      : 'text-fluent-text dark:text-fluent-dark-text hover:bg-fluent-border dark:hover:bg-fluent-dark-border'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-70">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-fluent-border dark:border-fluent-dark-border">
            <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
              BreathAI v1.0.0
            </div>
            <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              基于Fluent Design System
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
