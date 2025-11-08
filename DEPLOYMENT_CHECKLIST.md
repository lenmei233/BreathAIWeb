# 🚀 GitHub Pages 部署检查清单

## 📋 部署前检查

### ✅ 项目配置
- [ ] `vite.config.ts` 中的 `base` 路径配置正确
- [ ] `package.json` 包含构建脚本
- [ ] `.github/workflows/deploy.yml` 工作流文件存在
- [ ] 环境变量配置正确

### ✅ 代码质量
- [ ] TypeScript 编译无错误 (`npm run build` 成功)
- [ ] ESLint 检查通过
- [ ] 所有依赖已安装
- [ ] 无敏感信息硬编码

### ✅ 文件结构
- [ ] `public/404.html` 存在（SPA 路由支持）
- [ ] `.gitignore` 配置正确
- [ ] README.md 完整
- [ ] LICENSE 文件存在

## 🚀 部署步骤

### 1. GitHub 仓库设置
```bash
# 1. 创建 GitHub 仓库
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/BreathAIWeb.git
git push -u origin main
```

### 2. 启用 GitHub Pages
1. 进入仓库 **Settings**
2. 找到 **Pages** 选项
3. **Source** 选择 **GitHub Actions**
4. 保存设置

### 3. 配置环境变量
在 **Settings** > **Secrets and variables** > **Actions** 中添加：
```
VITE_API_ENDPOINT=https://chat.breathai.top/api
VITE_DEFAULT_MODEL=gpt-oss-120b
```

### 4. 触发部署
```bash
# 推送代码触发自动部署
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

## 🔍 部署验证

### ✅ 检查清单
- [ ] GitHub Actions 工作流运行成功
- [ ] 网站可以正常访问：`https://[username].github.io/BreathAIWeb/`
- [ ] 所有页面路由正常工作
- [ ] API 调用功能正常
- [ ] 文件上传功能正常
- [ ] 主题切换功能正常
- [ ] 移动端适配正常

### 🧪 功能测试
1. **基础功能**
   - [ ] 页面加载正常
   - [ ] 路由导航正常
   - [ ] 主题切换正常

2. **AI 对话**
   - [ ] 消息发送正常
   - [ ] 流式响应正常
   - [ ] 历史记录正常

3. **文件上传**
   - [ ] 文件选择正常
   - [ ] 文件预览正常
   - [ ] 文件上传正常

4. **响应式设计**
   - [ ] 桌面端显示正常
   - [ ] 移动端显示正常
   - [ ] 平板端显示正常

## 🐛 常见问题排查

### 问题 1: 部署后页面空白
**症状**: 页面加载后显示空白
**原因**: 通常是路径配置或资源加载问题
**解决**:
```bash
# 检查 vite.config.ts 配置
base: process.env.NODE_ENV === 'production' ? '/BreathAIWeb/' : '/'

# 检查浏览器控制台错误
# 检查网络请求是否正常
```

### 问题 2: 路由不工作
**症状**: 刷新页面显示 404
**原因**: GitHub Pages 不支持客户端路由
**解决**:
- 确保 `public/404.html` 存在
- 检查 React Router 配置
- 使用 HashRouter 或 BrowserRouter 配合 404.html

### 问题 3: API 调用失败
**症状**: 网络请求被阻止或失败
**原因**: CORS 策略或环境变量配置
**解决**:
```bash
# 检查环境变量配置
console.log(import.meta.env.VITE_API_ENDPOINT)

# 检查 API 端点是否支持 HTTPS
# 检查 CORS 配置
```

### 问题 4: 文件上传异常
**症状**: 文件上传功能不工作
**原因**: GitHub Pages 静态托管限制
**解决**:
- 确保使用支持文件上传的 API 端点
- 检查文件大小限制
- 验证文件格式支持

## 📊 性能优化

### 构建优化
- [ ] 代码分割配置正确
- [ ] 资源压缩启用
- [ ] 缓存策略配置

### 加载性能
- [ ] 首屏加载时间 < 3s
- [ ] Lighthouse 性能评分 > 90
- [ ] 图片资源优化

### SEO 优化
- [ ] Meta 标签完整
- [ ] Open Graph 配置
- [ ] 结构化数据

## 🔐 安全检查

### ✅ 安全清单
- [ ] 无 API 密钥硬编码
- [ ] 使用 HTTPS 协议
- [ ] CSP 策略配置
- [ ] 依赖包安全扫描

```bash
# 安全扫描
npm audit
pnpm audit
```

## 📈 监控和维护

### 监控指标
- [ ] 页面访问量
- [ ] 错误率统计
- [ ] 性能指标
- [ ] 用户反馈

### 定期维护
- [ ] 依赖包更新
- [ ] 安全补丁应用
- [ ] 性能优化
- [ ] 功能迭代

## 📞 支持资源

### 文档链接
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [React Router 部署](https://reactrouter.com/en/main/routers/router-provider#deployment)

### 社区支持
- [GitHub Issues](https://github.com/your-username/BreathAIWeb/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)
- [Discord 社区](https://discord.gg/)

---

## 🎉 部署成功！

恭喜！您的 BreathAI Web 应用已成功部署到 GitHub Pages。

🌐 **访问地址**: `https://[your-username].github.io/BreathAIWeb/`

如果遇到问题，请参考上述排查指南或提交 Issue 寻求帮助。
