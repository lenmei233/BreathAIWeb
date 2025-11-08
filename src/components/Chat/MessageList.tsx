import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'
import MessageItem from '@/components/Chat/MessageItem'
import LoadingIndicator from '@/components/Chat/LoadingIndicator'
import { Message } from '@/stores/chatStore'
import { getModelName } from '@/stores/chatStore'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
  currentModel?: string
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, currentModel }) => {
  const { theme } = useTheme()
  const modelName = currentModel ? getModelName(currentModel) : undefined

  return (
    <div className="h-full overflow-y-auto px-4 py-6 space-y-4">
      <AnimatePresence initial={false}>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center h-full text-center"
          >
            <div className="mb-4">
              <div className="w-16 h-16 bg-fluent-primary dark:bg-fluent-dark-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-fluent-text dark:text-fluent-dark-text mb-2">
              欢迎来到灵息AI！
            </h2>
            <p className="text-fluent-text-secondary dark:text-fluent-dark-text-secondary max-w-md">
              我是您的助手"灵息"。有什么我可以帮助您的吗？
            </p>
            <div className="mt-6 text-sm text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
              <p>💡 提示：请先在设置中配置API密钥以开始对话</p>
            </div>
          </motion.div>
        )}
        
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <MessageItem 
              message={message}
              theme={theme}
            />
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LoadingIndicator modelName={modelName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MessageList
