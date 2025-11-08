import React, { useState, useRef, useEffect } from 'react'
import { Send24Regular, Attach24Regular } from '@fluentui/react-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import FileUpload, { UploadedFile } from './FileUpload'

interface MessageInputProps {
  onSendMessage: (message: string, files?: UploadedFile[]) => void
  disabled?: boolean
  placeholder?: string
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "输入您的问题..." 
}) => {
  const [message, setMessage] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [showFileUpload, setShowFileUpload] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 自动调整文本框高度
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [message])

  // 发送消息
  const handleSend = () => {
    if ((message.trim() || uploadedFiles.length > 0) && !disabled) {
      onSendMessage(message.trim(), uploadedFiles)
      setMessage('')
      setUploadedFiles([])
      setShowFileUpload(false)
    }
  }

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // 快捷键支持
  useHotkeys('ctrl+enter, cmd+enter', () => {
    handleSend()
  }, { enableOnFormTags: true })

  return (
    <div className="space-y-3">
      {/* 文件上传区域 */}
      {showFileUpload && (
        <div className="p-3 bg-fluent-surface dark:bg-fluent-dark-surface rounded-lg border border-fluent-border dark:border-fluent-dark-border">
          <FileUpload
            onFilesChange={setUploadedFiles}
            maxFiles={5}
            disabled={disabled}
          />
        </div>
      )}

      {/* 输入区域 */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={`
            w-full px-4 py-3 pr-24 rounded-lg border resize-none
            bg-fluent-background dark:bg-fluent-dark-background
            border-fluent-border dark:border-fluent-dark-border
            text-fluent-text dark:text-fluent-dark-text
            placeholder-fluent-text-secondary dark:placeholder-fluent-dark-text-secondary
            focus:outline-none focus:ring-2 focus:ring-fluent-primary dark:focus:ring-fluent-dark-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            min-h-[48px] max-h-[200px]
          `}
        />
        
        {/* 左侧：附件按钮 */}
        <button
          onClick={() => setShowFileUpload(!showFileUpload)}
          disabled={disabled}
          className={`
            absolute left-2 bottom-2 p-2 rounded-md transition-all duration-200
            ${showFileUpload
              ? 'bg-fluent-primary dark:bg-fluent-dark-primary text-white'
              : 'bg-fluent-surface dark:bg-fluent-dark-surface text-fluent-text-secondary dark:text-fluent-dark-text-secondary hover:bg-fluent-border dark:hover:bg-fluent-dark-border'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          aria-label="Attach file"
          title="上传文件"
        >
          <Attach24Regular className="w-4 h-4" />
        </button>
        
        {/* 右侧：发送按钮 */}
        <button
          onClick={handleSend}
          disabled={(!message.trim() && uploadedFiles.length === 0) || disabled}
          className={`
            absolute right-2 bottom-2 p-2 rounded-md transition-all duration-200
            ${(message.trim() || uploadedFiles.length > 0) && !disabled
              ? 'bg-fluent-primary dark:bg-fluent-dark-primary text-white hover:bg-fluent-primary-hover dark:hover:bg-fluent-dark-primary-hover'
              : 'bg-fluent-surface dark:bg-fluent-dark-surface text-fluent-text-secondary dark:text-fluent-dark-text-secondary cursor-not-allowed'
            }
          `}
          aria-label="Send message"
        >
          <Send24Regular className="w-4 h-4" />
        </button>
        
        {/* 文件计数指示器 */}
        {uploadedFiles.length > 0 && (
          <div className="absolute right-12 bottom-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-fluent-primary dark:bg-fluent-dark-primary text-white">
              {uploadedFiles.length} 个文件
            </span>
          </div>
        )}
        
        {/* 字符计数和提示 */}
        <div className="absolute left-12 -top-6 text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
          {message.length > 0 && (
            <span>{message.length} 字符</span>
          )}
          {uploadedFiles.length > 0 && message.length > 0 && (
            <span className="mx-1">•</span>
          )}
          {uploadedFiles.length > 0 && (
            <span>{uploadedFiles.length} 个文件已选择</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageInput
