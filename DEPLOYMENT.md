# 🚀 部署指南

## GitHub Pages 自动部署

### 方法一：使用 GitHub Actions（推荐）

#### 1. 启用 GitHub Pages
1. 进入您的 GitHub 仓库
2. 点击 **Settings** 选项卡
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

#### 2. 配置工作流
项目已包含预配置的 GitHub Actions 工作流文件：
- `.github/workflows/deploy.yml`

#### 3. 推送代码触发部署
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

部署完成后，您的网站将在以下地址可用：
```
https://[your-username].github.io/BreathAIWeb/
```

### 方法二：手动部署

#### 1. 安装 gh-pages
```bash
npm install --save-dev gh-pages
# 或
pnpm add -D gh-pages
```

#### 2. 构建项目
```bash
npm run build
# 或
pnpm build
```

#### 3. 部署到 GitHub Pages
```bash
npm run deploy
# 或
pnpm deploy
```

## 环境变量配置

### 生产环境变量
在 GitHub 仓库中设置环境变量：

1. 进入 **Settings** > **Secrets and variables** > **Actions**
2. 添加以下 Repository secrets：

```env
VITE_API_ENDPOINT=https://chat.breathai.top/api
VITE_DEFAULT_MODEL=gpt-oss-120b
```

### 本地开发环境
创建 `.env.local` 文件：
```env
VITE_API_ENDPOINT=https://chat.breathai.top/api
VITE_DEFAULT_MODEL=gpt-oss-120b
```

## 自定义域名

### 方法一：通过 GitHub Settings
1. 进入 **Settings** > **Pages**
2. 在 **Custom domain** 中输入您的域名
3. 点击 **Save**

### 方法二：通过 CNAME 文件
在 `public` 目录下创建 `CNAME` 文件：
```
your-domain.com
```

然后推送更新：
```bash
git add public/CNAME
git commit -m "Add custom domain"
git push origin main
```

## 构建优化

### 代码分割
Vite 配置已启用代码分割：
- React 核心库单独打包
- UI 组件库单独打包
- Markdown 相关库单独打包

### 资源优化
- 图片自动压缩
- CSS 自动压缩
- JavaScript 自动压缩和混淆

### 缓存策略
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@fluentui/react-components'],
          markdown: ['react-markdown', 'remark-gfm'],
        },
      },
    },
  },
})
```

## 故障排除

### 常见问题

#### 1. 部署后页面空白
**原因**：通常是路径配置问题
**解决**：检查 `vite.config.ts` 中的 `base` 配置

#### 2. 路由不工作
**原因**：GitHub Pages 不支持客户端路由
**解决**：添加 404 重定向页面

#### 3. API 调用失败
**原因**：CORS 策略或环境变量配置
**解决**：检查 API 端点配置和 CORS 设置

#### 4. 文件上传功能异常
**原因**：GitHub Pages 静态托管限制
**解决**：确保 API 端点支持文件上传

### 调试技巧

#### 1. 查看构建日志
```bash
# 本地构建测试
npm run build

# 预览构建结果
npm run preview
```

#### 2. 检查网络请求
在浏览器开发者工具中：
- 查看 Network 标签页
- 检查 API 请求状态
- 查看控制台错误信息

#### 3. 验证环境变量
```javascript
// 在控制台中检查
console.log(import.meta.env.VITE_API_ENDPOINT)
```

## 其他部署平台

### Netlify
1. 连接 GitHub 仓库
2. 设置构建命令：`npm run build`
3. 设置发布目录：`dist`
4. 添加环境变量

### Vercel
1. 安装 Vercel CLI：`npm i -g vercel`
2. 运行：`vercel`
3. 按提示配置项目

### Surge
```bash
npm install --global surge
npm run build
surge dist your-domain.surge.sh
```

## 性能监控

### Google PageSpeed Insights
定期检查网站性能：
```
https://pagespeed.web.dev/
```

### GitHub Analytics
在 GitHub Pages 设置中启用 Google Analytics

### 自定义监控
```javascript
// 添加性能监控
if (import.meta.env.PROD) {
  // 监控页面加载时间
  window.addEventListener('load', () => {
    const loadTime = performance.now()
    console.log(`Page loaded in ${loadTime}ms`)
  })
}
```

## 安全考虑

### API 密钥保护
- 不要在前端代码中硬编码 API 密钥
- 使用环境变量存储敏感信息
- 考虑使用代理服务器

### HTTPS 强制
GitHub Pages 自动提供 HTTPS，确保所有资源使用 HTTPS 协议

### 内容安全策略
考虑添加 CSP 头部以增强安全性：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

---

## 📞 部署支持

如果遇到部署问题：
1. 检查 GitHub Actions 工作流日志
2. 验证构建配置
3. 查看浏览器控制台错误
4. 提交 Issue 寻求帮助
