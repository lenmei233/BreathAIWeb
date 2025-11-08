import React, { useState } from 'react'
import { 
  Checkmark24Regular,
  Eye24Regular,
  EyeOff24Regular,
  ArrowReset24Regular
} from '@fluentui/react-icons'
import { useSettingsStore } from '@/stores/settingsStore'
import { AVAILABLE_MODELS } from '@/stores/chatStore'

const SettingsPage: React.FC = () => {
  const { 
    apiKey,
    apiEndpoint,
    temperature, 
    maxTokens, 
    systemPrompt,
    autoSave,
    showTimestamps,
    enableMarkdown,
    enableSyntaxHighlighting,
    enableMathRendering,
    setApiKey,
    setTemperature,
    setMaxTokens,
    setSystemPrompt,
    setAutoSave,
    setShowTimestamps,
    setEnableMarkdown,
    setEnableSyntaxHighlighting,
    setEnableMathRendering,
    resetSettings
  } = useSettingsStore()

  const [showApiKey, setShowApiKey] = useState(false)
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [tempApiEndpoint, setTempApiEndpoint] = useState(apiEndpoint)
  const [hasChanges, setHasChanges] = useState(false)

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey)
    setHasChanges(false)
  }

  
  const handleResetSettings = () => {
    if (window.confirm('确定要重置所有设置吗？')) {
      resetSettings()
      setTempApiKey('')
      setTempApiEndpoint('https://chat.breathai.top/api')
      setHasChanges(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fluent-text dark:text-fluent-dark-text mb-2">
          设置
        </h1>
        <p className="text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
          配置您的API密钥和偏好设置
        </p>
      </div>

      {/* API Configuration */}
      <section className="fluent-card dark:fluent-card-dark p-6">
        <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-4">
          API 配置
        </h2>
        
        <div className="space-y-4">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-fluent-text dark:text-fluent-dark-text mb-2">
              API 密钥
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={tempApiKey}
                  onChange={(e) => {
                    setTempApiKey(e.target.value)
                    setHasChanges(true)
                  }}
                  placeholder="输入您的API密钥"
                  className="fluent-input dark:fluent-input-dark pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-fluent-border dark:hover:bg-fluent-dark-border"
                >
                  {showApiKey ? (
                    <EyeOff24Regular className="w-4 h-4" />
                  ) : (
                    <Eye24Regular className="w-4 h-4" />
                  )}
                </button>
              </div>
              {hasChanges && (
                <button
                  onClick={handleSaveApiKey}
                  className="fluent-button"
                >
                  <Checkmark24Regular className="w-4 h-4 mr-1" />
                  保存
                </button>
              )}
            </div>
            <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              在您的账户设置中创建API密钥
            </p>
          </div>

          {/* API Endpoint */}
          <div>
            <label className="block text-sm font-medium text-fluent-text dark:text-fluent-dark-text mb-2">
              API 端点
            </label>
            <input
              type="url"
              value={tempApiEndpoint}
              onChange={(e) => {
                setTempApiEndpoint(e.target.value)
                setHasChanges(true)
              }}
              placeholder="https://chat.breathai.top/api"
              className="fluent-input dark:fluent-input-dark"
            />
            <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              注意：地址末尾不要加斜杠
            </p>
          </div>
        </div>
      </section>

      {/* Model Settings */}
      <section className="fluent-card dark:fluent-card-dark p-6">
        <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-4">
          模型设置
        </h2>
        
        <div className="space-y-4">
          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-fluent-text dark:text-fluent-dark-text mb-2">
              温度: {temperature}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              控制回复的随机性，值越高越随机
            </p>
          </div>

          {/* Max Tokens */}
          <div>
            <label className="block text-sm font-medium text-fluent-text dark:text-fluent-dark-text mb-2">
              最大令牌数
            </label>
            <input
              type="number"
              min="1"
              max="8192"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e.target.value))}
              className="fluent-input dark:fluent-input-dark"
            />
            <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              限制回复的最大长度
            </p>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-sm font-medium text-fluent-text dark:text-fluent-dark-text mb-2">
              系统提示词
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={3}
              className="fluent-input dark:fluent-input-dark"
            />
            <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
              设置AI助手的角色和行为
            </p>
          </div>
        </div>
      </section>

      {/* Display Settings */}
      <section className="fluent-card dark:fluent-card-dark p-6">
        <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-4">
          显示设置
        </h2>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(e) => setAutoSave(e.target.checked)}
              className="w-4 h-4 text-fluent-primary rounded focus:ring-fluent-primary"
            />
            <span className="text-sm text-fluent-text dark:text-fluent-dark-text">
              自动保存对话历史
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showTimestamps}
              onChange={(e) => setShowTimestamps(e.target.checked)}
              className="w-4 h-4 text-fluent-primary rounded focus:ring-fluent-primary"
            />
            <span className="text-sm text-fluent-text dark:text-fluent-dark-text">
              显示消息时间戳
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableMarkdown}
              onChange={(e) => setEnableMarkdown(e.target.checked)}
              className="w-4 h-4 text-fluent-primary rounded focus:ring-fluent-primary"
            />
            <span className="text-sm text-fluent-text dark:text-fluent-dark-text">
              启用 Markdown 渲染
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableSyntaxHighlighting}
              onChange={(e) => setEnableSyntaxHighlighting(e.target.checked)}
              className="w-4 h-4 text-fluent-primary rounded focus:ring-fluent-primary"
            />
            <span className="text-sm text-fluent-text dark:text-fluent-dark-text">
              启用代码语法高亮
            </span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enableMathRendering}
              onChange={(e) => setEnableMathRendering(e.target.checked)}
              className="w-4 h-4 text-fluent-primary rounded focus:ring-fluent-primary"
            />
            <span className="text-sm text-fluent-text dark:text-fluent-dark-text">
              启用数学公式渲染 (LaTeX)
            </span>
          </label>
        </div>
      </section>

      {/* Available Models */}
      <section className="fluent-card dark:fluent-card-dark p-6">
        <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-4">
          可用模型
        </h2>
        
        <div className="text-sm text-fluent-text-secondary dark:text-fluent-dark-text-secondary mb-4">
          共 {AVAILABLE_MODELS.length} 个模型可用
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
          {AVAILABLE_MODELS.map((model) => (
            <div
              key={model.id}
              className="p-3 rounded-lg border border-fluent-border dark:border-fluent-dark-border bg-fluent-background dark:bg-fluent-dark-background"
            >
              <div className="font-medium text-sm text-fluent-text dark:text-fluent-dark-text">
                {model.name}
              </div>
              <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
                {model.provider}
              </div>
              <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
                {model.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reset Settings */}
      <section className="fluent-card dark:fluent-card-dark p-6">
        <h2 className="text-lg font-semibold text-fluent-text dark:text-fluent-dark-text mb-4">
          重置设置
        </h2>
        
        <button
          onClick={handleResetSettings}
          className="fluent-button fluent-button-secondary"
        >
          <ArrowReset24Regular className="w-4 h-4 mr-2" />
          重置所有设置
        </button>
        
        <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-2">
          此操作将重置所有设置到默认值
        </p>
      </section>
    </div>
  )
}

export default SettingsPage
