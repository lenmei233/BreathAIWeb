import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider } from '@fluentui/react-components'
import { createDarkTheme, createLightTheme } from '@fluentui/react-components'
import App from './App.tsx'
import './index.css'
import './globals.css'

// 创建主题
const lightTheme = createLightTheme({
  10: '#e3f2fd',
  20: '#bbdefb',
  30: '#90caf9',
  40: '#64b5f6',
  50: '#42a5f5',
  60: '#2196f3',
  70: '#1e88e5',
  80: '#1976d2',
  90: '#1565c0',
  100: '#0d47a1',
  110: '#0a3d91',
  120: '#083783',
  130: '#063175',
  140: '#052b68',
  150: '#04265c',
  160: '#032151'
})
const darkTheme = createDarkTheme({
  10: '#e3f2fd',
  20: '#bbdefb',
  30: '#90caf9',
  40: '#64b5f6',
  50: '#42a5f5',
  60: '#2196f3',
  70: '#1e88e5',
  80: '#1976d2',
  90: '#1565c0',
  100: '#0d47a1',
  110: '#0a3d91',
  120: '#083783',
  130: '#063175',
  140: '#052b68',
  150: '#04265c',
  160: '#032151'
})

// 获取系统主题偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
const theme = prefersDark ? darkTheme : lightTheme

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FluentProvider theme={theme}>
      <App />
    </FluentProvider>
  </React.StrictMode>,
)
