import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import 'katex/dist/katex.min.css'
import { 
  Copy24Regular,
  Checkmark24Regular,
  Person24Regular,
  Bot24Regular,
  Code24Regular
} from '@fluentui/react-icons'
import { useSettingsStore } from '@/stores/settingsStore'
import { Message } from '@/stores/chatStore'
import FileMessage from './FileMessage'

interface MessageItemProps {
  message: Message
  theme: 'light' | 'dark'
}

const MessageItem: React.FC<MessageItemProps> = ({ message, theme }) => {
  const [copied, setCopied] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { showTimestamps, enableMarkdown, enableSyntaxHighlighting, enableMathRendering } = useSettingsStore()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const handleCopyCode = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(codeId)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('复制代码失败:', err)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isUser = message.role === 'user'
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex items-start space-x-3 max-w-3xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${isUser 
            ? 'bg-fluent-primary text-white' 
            : 'bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border'
          }
        `}>
          {isUser ? (
            <Person24Regular className="w-4 h-4" />
          ) : (
            <Bot24Regular className="w-4 h-4 text-fluent-text dark:text-fluent-dark-text" />
          )}
        </div>

        {/* Message Content */}
        <div className={`
          relative px-4 py-3 rounded-2xl
          ${isUser 
            ? 'bg-fluent-primary text-white' 
            : 'bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border text-fluent-text dark:text-fluent-dark-text'
          }
        `}>
          {/* Model info for assistant messages */}
          {!isUser && message.model && (
            <div className="text-xs opacity-70 mb-1">
              {message.model}
            </div>
          )}

          {/* Message content */}
          <div className="prose prose-sm max-w-none">
            {/* 显示文件 */}
            {message.files && message.files.length > 0 && (
              <div className="mb-3">
                <FileMessage files={message.files} theme={theme} />
              </div>
            )}
            
            {/* 显示文本内容 */}
            {message.content && (
              enableMarkdown ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, ...(enableMathRendering ? [remarkMath] : [])]}
                  rehypePlugins={enableMathRendering ? [rehypeKatex] : []}
                  components={{
                    code({ node, inline: isInline = false, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '')
                      const language = match ? match[1] : ''
                      const codeContent = String(children).replace(/\n$/, '')
                      const codeId = `code-${Math.random().toString(36).substr(2, 9)}`
                      
                      if (!isInline && enableSyntaxHighlighting && language) {
                        return (
                          <div className="enhanced-code-block">
                            <div className="code-header">
                              <div className="code-language">
                                <Code24Regular className="w-4 h-4" />
                                <span>{language}</span>
                              </div>
                              <button
                                onClick={() => handleCopyCode(codeContent, codeId)}
                                className={`copy-button ${copiedCode === codeId ? 'copied' : ''}`}
                                aria-label="Copy code"
                              >
                                {copiedCode === codeId ? (
                                  <>
                                    <Checkmark24Regular className="w-3 h-3" />
                                    <span>已复制</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy24Regular className="w-3 h-3" />
                                    <span>复制</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <SyntaxHighlighter
                              style={theme === 'dark' ? vscDarkPlus : undefined}
                              language={language}
                              PreTag="div"
                              className="rounded-t-none rounded-b-lg"
                              {...props}
                            >
                              {codeContent}
                            </SyntaxHighlighter>
                          </div>
                        )
                      }
                      
                      return (
                        <code className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm`} {...props}>
                          {children}
                        </code>
                      )
                    },
                    pre({ children }) {
                      return <>{children}</>
                    }
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )
            )}
          </div>

          {/* Timestamp and Actions */}
          <div className={`
            flex items-center justify-between mt-2 text-xs
            ${isUser ? 'text-white/70' : 'text-fluent-text-secondary dark:text-fluent-dark-text-secondary'}
          `}>
            {showTimestamps && (
              <span>{formatTimestamp(message.timestamp)}</span>
            )}
            
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Copy message"
              >
                {copied ? (
                  <Checkmark24Regular className="w-3 h-3" />
                ) : (
                  <Copy24Regular className="w-3 h-3" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageItem
