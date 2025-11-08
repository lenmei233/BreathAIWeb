import React from 'react'
import { Bot24Regular } from '@fluentui/react-icons'

interface LoadingIndicatorProps {
  modelName?: string
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ modelName }) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-3 max-w-3xl">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border">
          <Bot24Regular className="w-4 h-4 text-fluent-text dark:text-fluent-dark-text fluent-pulse" />
        </div>

        {/* Loading content */}
        <div className="px-4 py-3 rounded-2xl bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-fluent-primary dark:bg-fluent-dark-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-fluent-primary dark:bg-fluent-dark-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-fluent-primary dark:bg-fluent-dark-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
              {modelName ? `${modelName}正在思考...` : '正在思考...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingIndicator
