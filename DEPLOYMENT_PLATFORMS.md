# 🌐 多平台部署配置指南

## 📋 支持的部署平台

### ✅ Vercel（推荐）
- **Base路径**: `/`（根路径）
- **自动部署**: 推送到main分支自动部署
- **域名**: `https://breath-ai-web.vercel.app`

### ✅ GitHub Pages
- **Base路径**: `/BreathAIWeb/`
- **手动部署**: 通过GitHub Actions
- **域名**: `https://lenmei233.github.io/BreathAIWeb/`

### ✅ Netlify
- **Base路径**: `/`（根路径）
- **自动部署**: 推送到main分支自动部署
- **域名**: `https://breath-ai-web.netlify.app`

## 🔧 Vite配置说明

### 动态Base路径配置
```typescript
// vite.config.ts
const getBasePath = () => {
  // GitHub Pages 需要仓库名前缀
  if (process.env.GITHUB_PAGES) {
    return '/BreathAIWeb/'
  }
  // Vercel, Netlify 等平台使用根路径
  return '/'
}

export default defineConfig({
  base: getBasePath(),
  // ...其他配置
})
```

### 环境变量说明
- `GITHUB_PAGES=true`: 启用GitHub Pages路径前缀
- 无环境变量: 使用根路径（Vercel、Netlify等）

## 🚀 平台特定配置

### Vercel配置
创建 `vercel.json`:
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

### GitHub Actions配置
```yaml
# .github/workflows/deploy.yml
- name: Build
  run: GITHUB_PAGES=true pnpm run build
```

### Netlify配置
创建 `netlify.toml`:
```toml
[build]
  command = "pnpm build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

## 📦 构建命令

### 通用构建
```bash
pnpm build
```

### GitHub Pages构建
```bash
GITHUB_PAGES=true pnpm build
```

### Vercel/Netlify构建
```bash
pnpm build
```

## 🔍 路径问题排查

### 问题1: 资源加载404
**症状**: JS/CSS文件返回404 HTML页面
**原因**: Base路径配置错误
**解决**: 检查部署平台对应的base路径设置

### 问题2: 路由不工作
**症状**: 刷新页面404
**原因**: SPA路由配置问题
**解决**: 确保服务器配置支持SPA路由

### 问题3: API调用失败
**症状**: 网络请求错误
**原因**: 跨域或路径问题
**解决**: 检查API端点配置

## 🌍 自定义域名配置

### Vercel自定义域名
1. 进入Vercel项目设置
2. 添加自定义域名
3. 配置DNS记录

### GitHub Pages自定义域名
1. 创建 `public/CNAME` 文件
2. 添加域名内容
3. 推送到仓库

### Netlify自定义域名
1. 进入Netlify站点设置
2. 添加自定义域名
3. 配置DNS记录

## 📊 性能优化

### Vercel优化
- 自动启用Edge Functions
- 全球CDN加速
- 自动图片优化

### GitHub Pages优化
- 依赖GitHub全球CDN
- 支持自定义缓存策略
- 免费SSL证书

### Netlify优化
- 自动代码分割
- 表单处理
- 边缘函数支持

## 🔐 安全配置

### HTTPS
所有平台都自动提供HTTPS支持

### 环境变量
```bash
# Vercel
VITE_API_ENDPOINT=https://api.example.com

# GitHub Pages
VITE_API_ENDPOINT=https://api.example.com

# Netlify
VITE_API_ENDPOINT=https://api.example.com
```

### CSP策略
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📈 监控和分析

### Vercel Analytics
- 内置性能监控
- 用户访问统计
- 错误追踪

### GitHub Pages
- 使用Google Analytics
- GitHub Insights统计
- 自定义监控脚本

### Netlify Analytics
- 内置分析工具
- 性能监控
- 用户行为分析

## 🔄 部署流程

### 自动部署流程
1. 推送代码到main分支
2. 平台自动触发构建
3. 构建成功后自动部署
4. 更新生产环境

### 手动部署流程
1. 本地构建项目
2. 上传构建文件
3. 配置平台设置
4. 启用生产环境

## 📞 技术支持

### Vercel支持
- [Vercel文档](https://vercel.com/docs)
- [Vercel社区](https://vercel.com/community)

### GitHub Pages支持
- [GitHub Pages文档](https://docs.github.com/en/pages)
- [GitHub社区](https://github.community)

### Netlify支持
- [Netlify文档](https://docs.netlify.com)
- [Netlify社区](https://community.netlify.com)

---

## 🎉 选择推荐平台

### 🏆 推荐使用 Vercel
- ✅ 部署最简单
- ✅ 性能最佳
- ✅ 自动优化
- ✅ 免费额度充足

### 🥈 备选 GitHub Pages
- ✅ 完全免费
- ✅ 与GitHub集成
- ✅ 开源项目友好
- ❌ 配置相对复杂

### 🥉 备选 Netlify
- ✅ 功能丰富
- ✅ 表单处理
- ✅ 边缘函数
- ❌ 构建速度较慢
