import React, { useState, useRef, useEffect } from 'react'
import { 
  Mic24Regular, 
  Delete24Regular,
  ArrowClockwise24Regular
} from '@fluentui/react-icons'
import MessageList from '@/components/Chat/MessageList'
import MessageInput from '@/components/Chat/MessageInput'
import ModelSelector from '@/components/Chat/ModelSelector'
import { useChatStore } from '@/stores/chatStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { UploadedFile } from '@/components/Chat/FileUpload'

const ChatPage: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { 
    messages, 
    isLoading, 
    sendMessage, 
    clearMessages,
    currentModel,
    setCurrentModel
  } = useChatStore()
  const { apiKey, apiEndpoint } = useSettingsStore()

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string, files?: UploadedFile[]) => {
    if ((!content.trim() && (!files || files.length === 0)) || !apiKey) {
      if (!apiKey) {
        alert('请先在设置中配置API密钥')
      }
      return
    }
    
    await sendMessage(content, {
      apiKey,
      apiEndpoint,
      model: currentModel,
      files
    })
  }

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording)
    // TODO: 实现语音录制功能
  }

  const handleClearChat = () => {
    if (window.confirm('确定要清空对话历史吗？')) {
      clearMessages()
    }
  }

  return (
    <div className="flex flex-col h-full bg-fluent-background dark:bg-fluent-dark-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-fluent-border dark:border-fluent-dark-border bg-fluent-surface dark:bg-fluent-dark-surface">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-fluent-text dark:text-fluent-dark-text">
            灵息AI对话
          </h1>
          <ModelSelector 
            selectedModel={currentModel}
            onModelChange={setCurrentModel}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors"
            aria-label="Clear chat"
          >
            <Delete24Regular className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors"
            aria-label="Regenerate response"
          >
            <ArrowClockwise24Regular className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden relative">
        <MessageList 
          messages={messages}
          isLoading={isLoading}
          currentModel={currentModel}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-fluent-border dark:border-fluent-dark-border bg-fluent-surface dark:bg-fluent-dark-surface">
        <div className="p-4">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <MessageInput 
                onSendMessage={handleSendMessage}
                disabled={isLoading}
                placeholder={apiKey ? "输入您的问题..." : "请先在设置中配置API密钥"}
              />
            </div>
            
            <button
              onClick={handleVoiceRecord}
              className={`p-2 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-fluent-error text-white' 
                  : 'hover:bg-fluent-border dark:hover:bg-fluent-dark-border'
              }`}
              aria-label="Voice input"
            >
              <Mic24Regular className="w-5 h-5" />
            </button>
          </div>
          
          {/* API Status */}
          {!apiKey && (
            <div className="mt-2 text-xs text-fluent-warning dark:text-fluent-warning">
              ⚠️ 请先配置API密钥以开始对话
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatPage
