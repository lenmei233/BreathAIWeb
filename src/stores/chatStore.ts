import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UploadedFile } from '@/components/Chat/FileUpload'

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  model?: string
  files?: UploadedFile[]
}

interface ChatStore {
  messages: Message[]
  isLoading: boolean
  currentModel: string
  sendMessage: (content: string, config: ChatConfig) => Promise<void>
  clearMessages: () => void
  setCurrentModel: (model: string) => void
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  updateMessage: (id: string, content: string) => void
}

interface ChatConfig {
  apiKey: string
  apiEndpoint: string
  model: string
  files?: UploadedFile[]
}

// 默认模型列表
export const AVAILABLE_MODELS = [
  // OpenAI系列
  { id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI', description: '最新一代GPT模型' },
  { id: 'gpt-5-chat', name: 'GPT-5 Chat', provider: 'OpenAI', description: '对话优化版' },
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'OpenAI', description: '轻量版' },
  { id: 'gpt-5-nano', name: 'GPT-5 Nano', provider: 'OpenAI', description: '超轻量版（⚠️不稳定）' },
  
  // GPT-OSS系列
  { id: 'gpt-oss-120b', name: 'GPT-OSS 120B', provider: 'GPT-OSS', description: '120B参数大模型' },
  { id: 'gpt-oss-120b-high', name: 'GPT-OSS 120B High', provider: 'GPT-OSS', description: '120B高性能版' },
  { id: 'gpt-oss-120b-low', name: 'GPT-OSS 120B Low', provider: 'GPT-OSS', description: '120B低资源版' },
  { id: 'gpt-oss-120b-medium', name: 'GPT-OSS 120B Medium', provider: 'GPT-OSS', description: '120B平衡版' },
  { id: 'gpt-oss-20b', name: 'GPT-OSS 20B', provider: 'GPT-OSS', description: '20B参数模型' },
  { id: 'gpt-oss-20b-high', name: 'GPT-OSS 20B High', provider: 'GPT-OSS', description: '20B高性能版' },
  { id: 'gpt-oss-20b-low', name: 'GPT-OSS 20B Low', provider: 'GPT-OSS', description: '20B低资源版' },
  { id: 'gpt-oss-20b-medium', name: 'GPT-OSS 20B Medium', provider: 'GPT-OSS', description: '20B平衡版' },
  
  // 灵息自有模型
  { id: 'breath', name: 'Breath', provider: 'BreathAI', description: '灵息自有模型' },
  { id: 'compound', name: 'Compound', provider: 'BreathAI', description: '复合模型' },
  { id: 'compound-mini', name: 'Compound Mini', provider: 'BreathAI', description: '轻量复合模型' },
  
  // Claude系列
  { id: 'claude-haiku-4.5', name: 'Claude Haiku 4.5', provider: 'Anthropic', description: 'Claude轻量版' },
  { id: 'claude-haiku-4.5-thinking', name: 'Claude Haiku 4.5 Thinking', provider: 'Anthropic', description: 'Claude轻量思考版' },
  { id: 'claude-opus-4.1', name: 'Claude Opus 4.1', provider: 'Anthropic', description: 'Claude高性能版' },
  { id: 'claude-opus-4.1-thinking', name: 'Claude Opus 4.1 Thinking', provider: 'Anthropic', description: 'Claude高性能思考版' },
  { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', provider: 'Anthropic', description: 'Claude平衡版' },
  { id: 'claude-sonnet-4.5-thinking', name: 'Claude Sonnet 4.5 Thinking', provider: 'Anthropic', description: 'Claude平衡思考版' },
  
  // DeepSeek系列
  { id: 'deepseek-ocr', name: 'DeepSeek OCR', provider: 'DeepSeek', description: 'OCR专用模型' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', description: '推理模型' },
  { id: 'deepseek-r1-0528-qwen3-8b', name: 'DeepSeek R1 0528 Qwen3 8B', provider: 'DeepSeek', description: '轻量推理版' },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', description: 'DeepSeek最新模型' },
  { id: 'deepseek-v3.1-terminus', name: 'DeepSeek V3.1 Terminus', provider: 'DeepSeek', description: '增强版' },
  { id: 'deepseek-v3.2-exp', name: 'DeepSeek V3.2 Exp', provider: 'DeepSeek', description: '实验版' },
  
  // Dolphin系列
  { id: 'dolphin-mistral-24b-venice-edition', name: 'Dolphin Mistral 24B Venice', provider: 'Dolphin', description: '威尼斯版' },
  { id: 'dolphin3.0-r1-mistral-24b', name: 'Dolphin 3.0 R1 Mistral 24B', provider: 'Dolphin', description: '推理版' },
  
  // Gemini系列
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: '快速响应版' },
  { id: 'gemini-2.5-flash-nothinking', name: 'Gemini 2.5 Flash NoThinking', provider: 'Google', description: '快速无思考版' },
  { id: 'gemini-2.5-flash-thinking', name: 'Gemini 2.5 Flash Thinking', provider: 'Google', description: '快速思考版' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: '专业版' },
  { id: 'gemini-2.5-pro-exp', name: 'Gemini 2.5 Pro Exp', provider: 'Google', description: '专业实验版' },
  { id: 'gemini-2.5-pro-nothinking', name: 'Gemini 2.5 Pro NoThinking', provider: 'Google', description: '专业无思考版' },
  { id: 'gemini-2.5-pro-thinking', name: 'Gemini 2.5 Pro Thinking', provider: 'Google', description: '专业思考版' },
  
  // Gemma系列
  { id: 'gemma-3-12b-it', name: 'Gemma 3 12B IT', provider: 'Google', description: '指令微调版' },
  { id: 'gemma-3-27b-it', name: 'Gemma 3 27B IT', provider: 'Google', description: '大参数指令版' },
  { id: 'gemma-3-4b-it', name: 'Gemma 3 4B IT', provider: 'Google', description: '轻量指令版' },
  
  // GLM系列
  { id: 'glm-4.1v-9b-thinking', name: 'GLM 4.1V 9B Thinking', provider: 'Zhipu AI', description: '视觉思考版' },
  { id: 'glm-4.1v-9b-thinking-pro', name: 'GLM 4.1V 9B Thinking Pro', provider: 'Zhipu AI', description: '视觉思考专业版' },
  { id: 'glm-4.5', name: 'GLM 4.5', provider: 'Zhipu AI', description: '智谱AI基础模型' },
  { id: 'glm-4.5-air', name: 'GLM 4.5 Air', provider: 'Zhipu AI', description: '轻量版' },
  { id: 'glm-4.5v', name: 'GLM 4.5V', provider: 'Zhipu AI', description: '视觉版本' },
  { id: 'glm-4.6', name: 'GLM 4.6', provider: 'Zhipu AI', description: '最新版本' },
  
  // Grok系列
  { id: 'grok-3-mini', name: 'Grok 3 Mini', provider: 'xAI', description: '轻量版' },
  { id: 'grok-3-mini-nsfw', name: 'Grok 3 Mini NSFW', provider: 'xAI', description: '轻量无限制版' },
  { id: 'grok-4-fast-non-reasoning', name: 'Grok 4 Fast Non-Reasoning', provider: 'xAI', description: '快速非推理版' },
  { id: 'grok-4-fast-non-reasoning-nsfw', name: 'Grok 4 Fast Non-Reasoning NSFW', provider: 'xAI', description: '快速非推理无限制版' },
  { id: 'grok-4-fast-reasoning', name: 'Grok 4 Fast Reasoning', provider: 'xAI', description: '快速推理版' },
  
  // Hunyuan系列
  { id: 'hunyuan-mt-7b', name: 'Hunyuan MT 7B', provider: 'Tencent', description: '腾讯翻译模型' },
  
  // Qwen3系列
  { id: 'qwen3-235b-a22b', name: 'Qwen3 235B A22B', provider: 'Alibaba', description: '通义千问大模型' },
  { id: 'qwen3-235b-a22b-instruct-2507', name: 'Qwen3 235B A22B Instruct', provider: 'Alibaba', description: '指令微调版' },
  { id: 'qwen3-235b-a22b-instruct-2507-maxspeed', name: 'Qwen3 235B A22B Instruct MaxSpeed', provider: 'Alibaba', description: '高速指令版' },
  { id: 'qwen3-235b-a22b-thinking-2507', name: 'Qwen3 235B A22B Thinking', provider: 'Alibaba', description: '思考版' },
  { id: 'qwen3-235b-a22b-thinking-2507-maxspeed', name: 'Qwen3 235B A22B Thinking MaxSpeed', provider: 'Alibaba', description: '高速思考版' },
  { id: 'qwen3-30b-a3b', name: 'Qwen3 30B A3B', provider: 'Alibaba', description: '30B参数版' },
  { id: 'qwen3-30b-a3b-instruct-2507', name: 'Qwen3 30B A3B Instruct', provider: 'Alibaba', description: '30B指令版' },
  { id: 'qwen3-30b-a3b-thinking-2507', name: 'Qwen3 30B A3B Thinking', provider: 'Alibaba', description: '30B思考版' },
  { id: 'qwen3-32b', name: 'Qwen3 32B', provider: 'Alibaba', description: '32B参数模型' },
  { id: 'qwen3-32b-maxspeed', name: 'Qwen3 32B MaxSpeed', provider: 'Alibaba', description: '32B高速版' },
  { id: 'qwen3-32b-ultrafast', name: 'Qwen3 32B UltraFast', provider: 'Alibaba', description: '32B超高速版' },
  { id: 'qwen3-coder-30b-a3b-instruct', name: 'Qwen3 Coder 30B A3B Instruct', provider: 'Alibaba', description: '编程专用版' },
  { id: 'qwen3-coder-480b-a35b-instruct', name: 'Qwen3 Coder 480B A35B Instruct', provider: 'Alibaba', description: '大参数编程版' },
  { id: 'qwen3-next-80b-a3b-instruct', name: 'Qwen3 Next 80B A3B Instruct', provider: 'Alibaba', description: '下一代80B版' },
  { id: 'qwen3-next-80b-a3b-thinking', name: 'Qwen3 Next 80B A3B Thinking', provider: 'Alibaba', description: '下一代80B思考版' },
  { id: 'qwen3-omni-30b-a3b-captioner', name: 'Qwen3 Omni 30B A3B Captioner', provider: 'Alibaba', description: '多模态描述版' },
  { id: 'qwen3-omni-30b-a3b-instruct', name: 'Qwen3 Omni 30B A3B Instruct', provider: 'Alibaba', description: '多模态指令版' },
  { id: 'qwen3-omni-30b-a3b-thinking', name: 'Qwen3 Omni 30B A3B Thinking', provider: 'Alibaba', description: '多模态思考版' },
  { id: 'qwen3-vl-235b-a22b-instruct', name: 'Qwen3 VL 235B A22B Instruct', provider: 'Alibaba', description: '视觉大模型指令版' },
  { id: 'qwen3-vl-235b-a22b-thinking', name: 'Qwen3 VL 235B A22B Thinking', provider: 'Alibaba', description: '视觉大模型思考版' },
  { id: 'qwen3-vl-30b-a3b-instruct', name: 'Qwen3 VL 30B A3B Instruct', provider: 'Alibaba', description: '视觉30B指令版' },
  { id: 'qwen3-vl-30b-a3b-thinking', name: 'Qwen3 VL 30B A3B Thinking', provider: 'Alibaba', description: '视觉30B思考版' },
  { id: 'qwen3-vl-32b-instruct', name: 'Qwen3 VL 32B Instruct', provider: 'Alibaba', description: '视觉32B指令版' },
  { id: 'qwen3-vl-32b-thinking', name: 'Qwen3 VL 32B Thinking', provider: 'Alibaba', description: '视觉32B思考版' },
  { id: 'qwen3-vl-8b-instruct', name: 'Qwen3 VL 8B Instruct', provider: 'Alibaba', description: '视觉8B指令版' },
  { id: 'qwen3-vl-8b-thinking', name: 'Qwen3 VL 8B Thinking', provider: 'Alibaba', description: '视觉8B思考版' },
  
  // 其他模型
  { id: 'kat-dev', name: 'KAT Dev', provider: 'Other', description: '开发版' },
  { id: 'kimi-dev-72b', name: 'Kimi Dev 72B', provider: 'Moonshot', description: 'Kimi开发版' },
  { id: 'kimi-k2-instruct-0905', name: 'Kimi K2 Instruct', provider: 'Moonshot', description: 'Kimi指令版' },
  { id: 'kimi-vl-a3b-thinking', name: 'Kimi VL A3B Thinking', provider: 'Moonshot', description: 'Kimi视觉思考版' },
  { id: 'ling-1t', name: 'Ling 1T', provider: 'Other', description: '1T参数模型' },
  { id: 'ling-flash-2.0', name: 'Ling Flash 2.0', provider: 'Other', description: '快速版' },
  { id: 'ling-mini-2.0', name: 'Ling Mini 2.0', provider: 'Other', description: '轻量版' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'Meta', description: '即时响应版' },
  { id: 'llama-3.1-nemotron-ultra-253b-v1', name: 'Llama 3.1 Nemotron Ultra 253B', provider: 'Meta', description: '超大参数版' },
  { id: 'llama-3.3-70b-maxspeed', name: 'Llama 3.3 70B MaxSpeed', provider: 'Meta', description: '高速70B版' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Meta', description: '通用70B版' },
  { id: 'llama-4-maverick', name: 'Llama 4 Maverick', provider: 'Meta', description: 'Maverick版' },
  { id: 'llama-4-scout', name: 'Llama 4 Scout', provider: 'Meta', description: 'Scout版' },
  { id: 'llama3.1-8b-maxspeed', name: 'Llama 3.1 8B MaxSpeed', provider: 'Meta', description: '高速8B版' },
  { id: 'longcat-flash-chat', name: 'LongCat Flash Chat', provider: 'Other', description: '长文本对话版' },
  { id: 'minimax-m1-80k', name: 'MiniMax M1 80K', provider: 'MiniMax', description: '80K上下文版' },
  { id: 'minimax-m2', name: 'MiniMax M2', provider: 'MiniMax', description: 'MiniMax M2' },
  { id: 'nemotron-nano-9b-v2', name: 'Nemotron Nano 9B V2', provider: 'NVIDIA', description: '轻量版' },
  { id: 'pangu-pro-moe', name: 'Pangu Pro MoE', provider: 'Huawei', description: '盘古专家模型' },
  { id: 'qwenlong-l1-32b', name: 'QwenLong L1 32B', provider: 'Alibaba', description: '长文本版' },
  { id: 'qwq-32b', name: 'QWQ 32B', provider: 'Alibaba', description: '推理专用版' },
  { id: 'ring-1t', name: 'Ring 1T', provider: 'Other', description: '1T参数环形模型' },
  { id: 'ring-flash-2.0', name: 'Ring Flash 2.0', provider: 'Other', description: '快速环形模型' },
  { id: 'step3', name: 'Step 3', provider: 'Other', description: '第三代模型' },
  { id: 'tongyi-deepresearch-30b-a3b', name: 'Tongyi DeepResearch 30B A3B', provider: 'Alibaba', description: '深度研究版' }
]

// 获取模型名称的辅助函数
export const getModelName = (modelId: string): string => {
  const model = AVAILABLE_MODELS.find(m => m.id === modelId)
  return model?.name || modelId
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      currentModel: 'gpt-oss-120b',
      
      sendMessage: async (content: string, config: ChatConfig) => {
        const { messages, addMessage, updateMessage } = get()
        
        // 保存当前消息数组用于API调用
        const messagesForApi = [...messages]
        
        // 添加用户消息
        const userMessage: Omit<Message, 'id' | 'timestamp'> = {
          role: 'user',
          content,
          model: config.model,
          files: config.files
        }
        addMessage(userMessage)
        
        // 添加助手消息占位符
        const assistantMessageId = `${Date.now()}-assistant-${Math.random().toString(36).substr(2, 9)}`
        const assistantMessage: Message = {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
          model: config.model
        }
        
        set((state) => ({
          messages: [...state.messages, assistantMessage],
          isLoading: true
        }))
        
        try {
          let response: Response
          
          // 如果有文件上传，使用FormData
          if (config.files && config.files.length > 0) {
            const formData = new FormData()
            
            // 添加文件
            config.files.forEach((uploadedFile, index) => {
              formData.append(`file_${index}`, uploadedFile.file)
            })
            
            // 添加其他参数
            formData.append('model', config.model)
            formData.append('messages', JSON.stringify([
              ...messagesForApi.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              { role: 'user', content }
            ]))
            formData.append('stream', 'true')
            
            response = await fetch(`${config.apiEndpoint}/v1/chat/completions`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${config.apiKey}`
                // 不设置Content-Type，让浏览器自动设置multipart/form-data边界
              },
              body: formData
            })
          } else {
            // 原有的纯文本API调用
            response = await fetch(`${config.apiEndpoint}/v1/chat/completions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
              },
              body: JSON.stringify({
                model: config.model,
                messages: [
                  ...messagesForApi.map(msg => ({
                    role: msg.role,
                    content: msg.content
                  })),
                  { role: 'user', content }
                ],
                stream: true
              })
            })
          }
          
          if (!response.ok) {
            throw new Error(`API请求失败: ${response.status}`)
          }
          
          const reader = response.body?.getReader()
          const decoder = new TextDecoder()
          let accumulatedContent = ''
          
          if (reader) {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              
              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split('\n')
              
              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6)
                  if (data === '[DONE]') continue
                  
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    if (content) {
                      accumulatedContent += content
                      updateMessage(assistantMessageId, accumulatedContent)
                    }
                  } catch (e) {
                    console.error('解析SSE数据失败:', e)
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error('发送消息失败:', error)
          updateMessage(assistantMessageId, `错误: ${error instanceof Error ? error.message : '未知错误'}`)
        } finally {
          set({ isLoading: false })
        }
      },
      
      clearMessages: () => {
        set({ messages: [], isLoading: false })
      },
      
      setCurrentModel: (model: string) => {
        set({ currentModel: model })
      },
      
      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          timestamp: Date.now()
        }
        set((state) => ({
          messages: [...state.messages, newMessage]
        }))
      },
      
      updateMessage: (id: string, content: string) => {
        set((state) => ({
          messages: state.messages.map(msg => 
            msg.id === id ? { ...msg, content } : msg
          )
        }))
      }
    }),
    {
      name: 'breathai-chat',
      partialize: (state) => ({
        messages: state.messages,
        currentModel: state.currentModel
      })
    }
  )
)
