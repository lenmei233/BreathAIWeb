import React, { useState, useRef } from 'react'
import { Attach24Regular, Delete24Regular, Eye24Regular, Document24Regular, Image24Regular, Video24Regular, Mic24Regular, DataBarHorizontal24Regular } from '@fluentui/react-icons'

// 支持的文件类型
export const SUPPORTED_FILE_TYPES = {
  // 文档文件
  documents: {
    extensions: ['.txt', '.md', '.markdown', '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'],
    mimeTypes: ['text/plain', 'text/markdown', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    icon: Document24Regular,
    label: '文档'
  },
  // 代码文件
  code: {
    extensions: ['.js', '.ts', '.py', '.java', '.cpp', '.c', '.html', '.css', '.json', '.xml'],
    mimeTypes: ['text/javascript', 'text/typescript', 'text/x-python', 'text/x-java-source', 'text/x-c++src', 'text/x-csrc', 'text/html', 'text/css', 'application/json', 'text/xml'],
    icon: Document24Regular,
    label: '代码'
  },
  // 图像文件
  images: {
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.ico'],
    mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/x-icon'],
    icon: Image24Regular,
    label: '图像'
  },
  // 音频文件
  audio: {
    extensions: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'],
    mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac', 'audio/ogg', 'audio/mp4'],
    icon: Mic24Regular,
    label: '音频'
  },
  // 视频文件
  video: {
    extensions: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'],
    mimeTypes: ['video/mp4', 'video/x-msvideo', 'video/quicktime', 'video/x-ms-wmv', 'video/x-flv', 'video/webm'],
    icon: Video24Regular,
    label: '视频'
  },
  // 数据文件
  data: {
    extensions: ['.csv', '.tsv'],
    mimeTypes: ['text/csv', 'text/tab-separated-values'],
    icon: DataBarHorizontal24Regular,
    label: '数据'
  }
}

// 文件大小限制（50MB）
const MAX_FILE_SIZE = 50 * 1024 * 1024

export interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  category: keyof typeof SUPPORTED_FILE_TYPES
  preview?: string
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
  disabled?: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFilesChange, 
  maxFiles = 5, 
  disabled = false 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 获取文件类别
  const getFileCategory = (file: File): keyof typeof SUPPORTED_FILE_TYPES | null => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    for (const [category, config] of Object.entries(SUPPORTED_FILE_TYPES)) {
      if (config.extensions.includes(extension) || config.mimeTypes.includes(file.type)) {
        return category as keyof typeof SUPPORTED_FILE_TYPES
      }
    }
    
    return null
  }

  // 验证文件
  const validateFile = (file: File): string | null => {
    // 检查文件大小
    if (file.size > MAX_FILE_SIZE) {
      return `文件大小超过限制（最大 50MB）`
    }

    // 检查文件类型
    const category = getFileCategory(file)
    if (!category) {
      return `不支持的文件格式`
    }

    return null
  }

  // 创建文件预览
  const createPreview = async (file: File): Promise<string | undefined> => {
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => resolve(undefined)
        reader.readAsDataURL(file)
      })
    }
    return undefined
  }

  // 处理文件添加
  const handleFiles = async (files: FileList) => {
    const validFiles: UploadedFile[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const error = validateFile(file)
      
      if (error) {
        alert(`文件 "${file.name}" 无法上传：${error}`)
        continue
      }

      const category = getFileCategory(file)!
      const preview = await createPreview(file)
      
      const uploadedFile: UploadedFile = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        category,
        preview
      }
      
      validFiles.push(uploadedFile)
    }

    if (validFiles.length > 0) {
      const newFiles = [...uploadedFiles, ...validFiles].slice(0, maxFiles)
      setUploadedFiles(newFiles)
      onFilesChange(newFiles)
    }
  }

  // 删除文件
  const removeFile = (id: string) => {
    const newFiles = uploadedFiles.filter(f => f.id !== id)
    setUploadedFiles(newFiles)
    onFilesChange(newFiles)
  }

  // 拖拽处理
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

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
    return <IconComponent className="w-4 h-4" />
  }

  return (
    <div className="space-y-3">
      {/* 上传区域 */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-4 text-center transition-colors
          ${dragActive 
            ? 'border-fluent-primary dark:border-fluent-dark-primary bg-fluent-primary/5 dark:bg-fluent-dark-primary/5' 
            : 'border-fluent-border dark:border-fluent-dark-border hover:border-fluent-primary/50 dark:hover:border-fluent-dark-primary/50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
          disabled={disabled}
          accept={Object.values(SUPPORTED_FILE_TYPES).flatMap(c => c.mimeTypes).join(',')}
        />
        
        <Attach24Regular className="w-6 h-6 mx-auto mb-2 text-fluent-text-secondary dark:text-fluent-dark-text-secondary" />
        <p className="text-sm text-fluent-text dark:text-fluent-dark-text mb-1">
          点击或拖拽文件到此处上传
        </p>
        <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
          支持文档、图片、音频、视频等格式，单个文件最大 50MB
        </p>
        {maxFiles > 1 && (
          <p className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary mt-1">
            最多上传 {maxFiles} 个文件
          </p>
        )}
      </div>

      {/* 已上传文件列表 */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-fluent-text dark:text-fluent-dark-text">
            已上传文件 ({uploadedFiles.length}/{maxFiles})
          </h4>
          <div className="space-y-2">
            {uploadedFiles.map((uploadedFile) => (
              <div
                key={uploadedFile.id}
                className="flex items-center space-x-3 p-3 bg-fluent-surface dark:bg-fluent-dark-surface rounded-lg border border-fluent-border dark:border-fluent-dark-border"
              >
                {/* 文件图标 */}
                <div className="flex-shrink-0 text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
                  {getFileIcon(uploadedFile.category)}
                </div>

                {/* 文件信息 */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-fluent-text dark:text-fluent-dark-text truncate">
                    {uploadedFile.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
                    <span>{SUPPORTED_FILE_TYPES[uploadedFile.category].label}</span>
                    <span>•</span>
                    <span>{formatFileSize(uploadedFile.size)}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center space-x-1">
                  {uploadedFile.preview && (
                    <button
                      onClick={() => {
                        // 预览功能
                        window.open(uploadedFile.preview, '_blank')
                      }}
                      className="p-1 rounded hover:bg-fluent-border dark:hover:bg-fluent-dark-border transition-colors"
                      title="预览"
                    >
                      <Eye24Regular className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(uploadedFile.id)}
                    className="p-1 rounded hover:bg-fluent-error/10 text-fluent-error dark:text-fluent-dark-error transition-colors"
                    title="删除"
                  >
                    <Delete24Regular className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 支持的格式提示 */}
      <div className="text-xs text-fluent-text-secondary dark:text-fluent-dark-text-secondary">
        <p className="font-medium mb-1">支持的文件格式：</p>
        <div className="grid grid-cols-2 gap-1">
          {Object.entries(SUPPORTED_FILE_TYPES).map(([key, config]) => (
            <div key={key} className="flex items-center space-x-1">
              <config.icon className="w-3 h-3" />
              <span>{config.label}: {config.extensions.slice(0, 3).join(', ')}{config.extensions.length > 3 ? '...' : ''}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FileUpload
