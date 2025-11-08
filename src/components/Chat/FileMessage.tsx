import React from 'react'
import { Eye24Regular, ArrowDownload24Regular } from '@fluentui/react-icons'
import { UploadedFile, SUPPORTED_FILE_TYPES } from './FileUpload'

interface FileMessageProps {
  files: UploadedFile[]
  theme: 'light' | 'dark'
}

const FileMessage: React.FC<FileMessageProps> = ({ files, theme }) => {
  // 格式化文件大小
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // 获取文件图标
  const getFileIcon = (category: keyof typeof SUPPORTED_FILE_TYPES) => {
    const IconComponent = SUPPORTED_FILE_TYPES[category].icon
    return <IconComponent className="w-5 h-5" />
  }

  // 创建文件预览URL
  const createFileUrl = (file: File): string => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return ''
  }

  // 下载文件
  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (files.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-sm font-medium text-fluent-text dark:text-fluent-dark-text">
        <span>📎 已上传 {files.length} 个文件</span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {files.map((uploadedFile) => {
          const fileUrl = createFileUrl(uploadedFile.file)
          const isImage = uploadedFile.file.type.startsWith('image/')
          
          return (
            <div
              key={uploadedFile.id}
              className={`
                flex items-start space-x-3 p-3 rounded-lg border
                ${theme === 'dark' 
                  ? 'bg-fluent-dark-surface border-fluent-dark-border' 
                  : 'bg-fluent-surface border-fluent-border'
                }
              `}
            >
              {/* 文件图标或预览图 */}
              <div className="flex-shrink-0">
                {isImage && fileUrl ? (
                  <img
                    src={fileUrl}
                    alt={uploadedFile.name}
                    className="w-12 h-12 rounded object-cover border border-fluent-border dark:border-fluent-dark-border"
                  />
                ) : (
                  <div className="w-12 h-12 rounded flex items-center justify-center bg-fluent-surface dark:bg-fluent-dark-surface border border-fluent-border dark:border-fluent-dark-border">
                    <div className="text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
                      {getFileIcon(uploadedFile.category)}
                    </div>
                  </div>
                )}
              </div>

              {/* 文件信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-fluent-text dark:text-fluent-dark-text truncate">
                  {uploadedFile.name}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
                  <span>{SUPPORTED_FILE_TYPES[uploadedFile.category].label}</span>
                  <span>•</span>
                  <span>{formatFileSize(uploadedFile.size)}</span>
                </div>
                
                {/* 文件描述 */}
                <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-2">
                  {uploadedFile.category === 'images' && '图像文件，可以进行视觉分析'}
                  {uploadedFile.category === 'documents' && '文档文件，支持内容提取和分析'}
                  {uploadedFile.category === 'code' && '代码文件，支持语法分析和解释'}
                  {uploadedFile.category === 'audio' && '音频文件，支持语音识别和分析'}
                  {uploadedFile.category === 'video' && '视频文件，支持视觉内容分析'}
                  {uploadedFile.category === 'data' && '数据文件，支持数据分析和可视化'}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex items-center space-x-1">
                {(isImage || uploadedFile.category === 'documents') && (
                  <button
                    onClick={() => {
                      if (isImage && fileUrl) {
                        window.open(fileUrl, '_blank')
                      } else {
                        // 对于文档，创建下载链接
                        downloadFile(uploadedFile.file)
                      }
                    }}
                    className={`
                      p-2 rounded transition-colors
                      ${theme === 'dark'
                        ? 'hover:bg-fluent-dark-border text-fluent-dark-text-secondary'
                        : 'hover:bg-fluent-border text-fluent-text-secondary'
                      }
                    `}
                    title={isImage ? "预览" : "下载"}
                  >
                    {isImage ? <Eye24Regular className="w-4 h-4" /> : <ArrowDownload24Regular className="w-4 h-4" />}
                  </button>
                )}
                
                <button
                  onClick={() => downloadFile(uploadedFile.file)}
                  className={`
                    p-2 rounded transition-colors
                    ${theme === 'dark'
                      ? 'hover:bg-fluent-dark-border text-fluent-dark-text-secondary'
                      : 'hover:bg-fluent-border text-fluent-text-secondary'
                    }
                  `}
                  title="下载"
                >
                  <ArrowDownload24Regular className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* 提示信息 */}
      <div className={`
        text-xs p-3 rounded-lg
        ${theme === 'dark'
          ? 'bg-fluent-dark-primary/10 text-fluent-dark-primary border border-fluent-dark-primary/20'
          : 'bg-fluent-primary/10 text-fluent-primary border border-fluent-primary/20'
        }
      `}>
        <p className="font-medium mb-1">💡 文件处理提示</p>
        <ul className="space-y-1 text-xs">
          <li>• 图像文件会被视觉模型分析内容</li>
          <li>• 文档文件会提取文本内容进行分析</li>
          <li>• 代码文件支持语法高亮和解释</li>
          <li>• 音视频文件需要多模态模型支持</li>
        </ul>
      </div>
    </div>
  )
}

export default FileMessage
