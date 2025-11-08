import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsStore {
  apiKey: string
  apiEndpoint: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  autoSave: boolean
  showTimestamps: boolean
  enableMarkdown: boolean
  enableSyntaxHighlighting: boolean
  enableMathRendering: boolean
  
  setApiKey: (apiKey: string) => void
  setApiEndpoint: (apiEndpoint: string) => void
  setTemperature: (temperature: number) => void
  setMaxTokens: (maxTokens: number) => void
  setSystemPrompt: (systemPrompt: string) => void
  setAutoSave: (autoSave: boolean) => void
  setShowTimestamps: (showTimestamps: boolean) => void
  setEnableMarkdown: (enableMarkdown: boolean) => void
  setEnableSyntaxHighlighting: (enableSyntaxHighlighting: boolean) => void
  setEnableMathRendering: (enableMathRendering: boolean) => void
  
  resetSettings: () => void
}

const defaultSettings = {
  apiKey: '',
  apiEndpoint: 'https://chat.breathai.top/api',
  temperature: 0.7,
  maxTokens: 4096,
  systemPrompt: '你是一个有用的AI助手。',
  autoSave: true,
  showTimestamps: true,
  enableMarkdown: true,
  enableSyntaxHighlighting: true,
  enableMathRendering: true,
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      
      setApiKey: (apiKey: string) => set({ apiKey }),
      setApiEndpoint: (apiEndpoint: string) => set({ apiEndpoint }),
      setTemperature: (temperature: number) => set({ temperature }),
      setMaxTokens: (maxTokens: number) => set({ maxTokens }),
      setSystemPrompt: (systemPrompt: string) => set({ systemPrompt }),
      setAutoSave: (autoSave: boolean) => set({ autoSave }),
      setShowTimestamps: (showTimestamps: boolean) => set({ showTimestamps }),
      setEnableMarkdown: (enableMarkdown: boolean) => set({ enableMarkdown }),
      setEnableSyntaxHighlighting: (enableSyntaxHighlighting: boolean) => set({ enableSyntaxHighlighting }),
      setEnableMathRendering: (enableMathRendering: boolean) => set({ enableMathRendering }),
      
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'breathai-settings',
    }
  )
)
