# 🤖 BreathAI Web - 智能对话助手

<div align="center">

![BreathAI Logo](https://via.placeholder.com/200x80/2196f3/ffffff?text=BreathAI)

**一个现代化的AI对话助手Web应用，支持多模型对话、文件上传、实时流式响应**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [使用指南](#-使用指南) • [API文档](#-api文档) • [贡献指南](#-贡献指南)

</div>

## ✨ 功能特性

### 🎯 核心功能
- **多模型支持** - 集成GPT、Claude、Gemini、DeepSeek等主流AI模型
- **实时流式响应** - 支持SSE流式输出，实时显示AI回复
- **智能对话管理** - 完整的对话历史记录和上下文管理
- **文件上传分析** - 支持文档、图片、音视频等多种文件格式
- **视觉模型支持** - 图像识别、OCR、多模态对话

### 🎨 用户体验
- **现代化UI** - 基于Fluent UI设计系统，支持深色/浅色主题
- **响应式设计** - 完美适配桌面端和移动端
- **快捷键支持** - Ctrl+Enter快速发送，提升输入效率
- **代码高亮** - 支持多种编程语言的语法高亮
- **Markdown渲染** - 完整支持Markdown格式和数学公式

### 🔧 技术特性
- **TypeScript** - 完整的类型安全支持
- **状态管理** - 基于Zustand的轻量级状态管理
- **组件化架构** - 高度模块化的React组件设计
- **主题系统** - 灵活的主题切换和自定义
- **错误处理** - 完善的错误提示和异常处理

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0 或 pnpm >= 7.0.0

### 安装依赖
```bash
# 克隆项目
git clone https://github.com/your-username/BreathAIWeb.git
cd BreathAIWeb

# 安装依赖
npm install
# 或
pnpm install
```

### 配置环境变量
创建 `.env.local` 文件：
```env
VITE_API_ENDPOINT=https://chat.breathai.top/api
VITE_DEFAULT_MODEL=gpt-oss-120b
```

### 启动开发服务器
```bash
npm run dev
# 或
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本
```bash
npm run build
# 或
pnpm build
```

## 📖 使用指南

### 基础对话
1. 在设置页面配置API密钥
2. 选择合适的AI模型
3. 在输入框中输入您的问题
4. 按Enter或点击发送按钮

### 文件上传
支持多种文件格式的上传和分析：

#### 📄 文档文件
- `.txt`, `.md`, `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`
- 支持文本提取、内容分析、文档理解

#### 🖼️ 图像文件  
- `.jpg`, `.png`, `.gif`, `.webp`, `.svg`
- 支持图像描述、OCR识别、视觉分析

#### 💻 代码文件
- `.js`, `.ts`, `.py`, `.java`, `.cpp`, `.html`, `.css`
- 支持语法分析、代码解释、优化建议

#### 🎵 音视频文件
- `.mp3`, `.wav`, `.mp4`, `.avi`, `.mov`
- 需要使用多模态模型进行处理

### 快捷键
- `Ctrl + Enter` / `Cmd + Enter` - 发送消息
- `Shift + Enter` - 换行
- `Ctrl + K` - 清空对话
- `Ctrl + /` - 显示快捷键帮助

## 🔌 API文档

### 基础配置
```typescript
interface ChatConfig {
  apiKey: string
  apiEndpoint: string
  model: string
  files?: UploadedFile[]
}
```

### 发送消息
```typescript
const response = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-oss-120b',
    messages: [
      { role: 'user', content: '你好' }
    ],
    stream: true
  })
})
```

### 文件上传
```typescript
const formData = new FormData()
formData.append('file', file)
formData.append('model', 'qwen3-vl-32b')
formData.append('messages', JSON.stringify(messages))

const response = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`
  },
  body: formData
})
```

## 🎨 自定义配置

### 主题配置
```typescript
const lightTheme = createLightTheme({
  // 自定义主题色彩
  10: '#e3f2fd',
  60: '#2196f3',
  100: '#0d47a1'
})
```

### 模型配置
```typescript
export const CUSTOM_MODELS = [
  {
    id: 'custom-model',
    name: 'Custom Model',
    provider: 'Custom',
    description: '自定义模型描述'
  }
]
```

## 🏗️ 项目结构

```
src/
├── components/          # React组件
│   ├── Chat/           # 聊天相关组件
│   │   ├── MessageInput.tsx
│   │   ├── MessageList.tsx
│   │   ├── FileUpload.tsx
│   │   └── ModelSelector.tsx
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
│   ├── ChatPage.tsx
│   ├── SettingsPage.tsx
│   └── TermsPage.tsx
├── stores/             # 状态管理
│   ├── chatStore.ts
│   ├── settingsStore.ts
│   └── themeStore.ts
├── contexts/           # React Context
│   └── ThemeContext.tsx
└── utils/              # 工具函数
```

## 🔧 开发指南

### 添加新的AI模型
1. 在 `src/stores/chatStore.ts` 中添加模型配置
2. 更新模型选择器组件
3. 测试模型兼容性

### 扩展文件格式支持
1. 在 `src/components/Chat/FileUpload.tsx` 中添加新的文件类型
2. 更新文件验证逻辑
3. 添加对应的文件处理逻辑

### 自定义主题
1. 修改 `src/contexts/ThemeContext.tsx`
2. 更新CSS变量定义
3. 测试主题切换功能

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交Issue
- 使用清晰的标题和描述
- 提供复现步骤
- 包含错误信息和截图

### 提交PR
1. Fork项目到您的GitHub账户
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建Pull Request

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier配置
- 编写清晰的注释和文档
- 确保所有测试通过

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 构建工具
- [Fluent UI](https://fluentui.microsoft.com/) - UI组件库
- [Zustand](https://github.com/pmndrs/zustand) - 状态管理
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown渲染

## 📞 联系我们

- 项目主页：[https://github.com/lenmei233/BreathAIWeb](https://github.com/lenmei233/BreathAIWeb)
- 问题反馈：[Issues](https://github.com/lenmei233/BreathAIWeb/issues)
- 功能建议：[Discussions](https://github.com/lenmei233/BreathAIWeb/discussions)

---

<div align="center">

**如果这个项目对您有帮助，请给我们一个⭐️！**

Made with ❤️ by BreathAI Team

</div>
