import React, { useState } from 'react'
import { ChevronDown24Regular, Bot24Regular } from '@fluentui/react-icons'
import { AVAILABLE_MODELS } from '@/stores/chatStore'

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const currentModel = AVAILABLE_MODELS.find(model => model.id === selectedModel) || AVAILABLE_MODELS[0]

  const handleModelSelect = (modelId: string) => {
    onModelChange(modelId)
    setIsOpen(false)
  }

  // 按提供商分组模型
  const modelsByProvider = AVAILABLE_MODELS.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = []
    }
    acc[model.provider].push(model)
    return acc
  }, {} as Record<string, typeof AVAILABLE_MODELS>)

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-fluent-border dark:border-fluent-dark-border bg-fluent-surface dark:bg-fluent-dark-surface hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors min-w-[200px]"
      >
        <Bot24Regular className="w-4 h-4 text-fluent-primary dark:text-fluent-dark-primary" />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-fluent-text dark:text-fluent-dark-text">
            {currentModel.name}
          </div>
          <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
            {currentModel.provider}
          </div>
        </div>
        <ChevronDown24Regular className={`w-4 h-4 text-fluent-text-secondary dark:text-fluent-dark-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute top-full left-0 mt-2 w-80 max-h-96 overflow-y-auto bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border rounded-lg shadow-fluent-lg z-20">
            <div className="p-2">
              {Object.entries(modelsByProvider).map(([provider, models]) => (
                <div key={provider} className="mb-4 last:mb-0">
                  <div className="px-3 py-2 text-xs font-semibold text-fluent-text-secondary dark:text-fluent-dark-text-secondary uppercase tracking-wide">
                    {provider}
                  </div>
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left
                        ${selectedModel === model.id
                          ? 'bg-fluent-primary dark:bg-fluent-dark-primary text-white'
                          : 'hover:bg-fluent-border dark:hover:bg-fluent-dark-border text-fluent-text dark:text-fluent-dark-text'
                        }
                      `}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm">{model.name}</div>
                        <div className="text-xs opacity-70">{model.description}</div>
                      </div>
                      {selectedModel === model.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ModelSelector
