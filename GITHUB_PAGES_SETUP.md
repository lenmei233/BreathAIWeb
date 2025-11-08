# 📄 GitHub Pages 设置指南

## 🔧 手动启用 GitHub Pages

由于GitHub Actions无法自动启用Pages，您需要手动进行以下设置：

### 1. 进入仓库设置
1. 访问您的GitHub仓库：https://github.com/lenmei233/BreathAIWeb
2. 点击 **Settings** 选项卡

### 2. 配置 Pages
1. 在左侧菜单中找到 **Pages**
2. 在 **Source** 部分选择 **GitHub Actions**
3. 点击 **Save**

### 3. 验证权限
确保仓库的 **Actions permissions** 配置正确：
1. 进入 **Settings** > **Actions** > **General**
2. 在 **Workflow permissions** 中选择：
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

## 🚀 推送更新的工作流

```bash
git add .github/workflows/deploy.yml
git commit -m "Add enablement parameter for GitHub Pages"
git push origin main
```

## 📋 部署检查清单

### ✅ 仓库设置
- [ ] GitHub Pages 已启用
- [ ] Source 设置为 "GitHub Actions"
- [ ] Actions permissions 配置正确
- [ ] 环境变量已设置（如果需要）

### ✅ 工作流文件
- [ ] `.github/workflows/deploy.yml` 存在
- [ ] `enablement: true` 参数已添加
- [ ] 权限配置正确

### ✅ 项目文件
- [ ] `vite.config.ts` 中的 `base` 路径正确
- [ ] `public/404.html` 存在
- [ ] 构建脚本正常工作

## 🔍 故障排除

### 问题 1: Pages not enabled
**错误**: `Get Pages site failed. Please verify that the repository has Pages enabled`
**解决**: 按照上述手动步骤启用 GitHub Pages

### 问题 2: Permission denied
**错误**: `HttpError: Not Found`
**解决**: 检查 Actions permissions 设置

### 问题 3: Build failed
**错误**: 构建失败
**解决**: 
```bash
# 本地测试构建
pnpm build
# 检查 dist 目录是否生成
```

## 📊 部署状态监控

### 查看部署状态
1. 进入 **Actions** 选项卡
2. 点击 **Deploy to GitHub Pages** 工作流
3. 查看构建和部署日志

### 部署成功后
- 网站将在：https://lenmei233.github.io/BreathAIWeb/
- 可以在 **Settings** > **Pages** 查看部署状态

## 🌐 自定义域名（可选）

### 方法 1: 通过 GitHub Settings
1. 进入 **Settings** > **Pages**
2. 在 **Custom domain** 中输入域名
3. 点击 **Save**

### 方法 2: 通过 CNAME 文件
创建 `public/CNAME` 文件：
```
your-domain.com
```

推送更新：
```bash
git add public/CNAME
git commit -m "Add custom domain"
git push origin main
```

## 📈 性能优化建议

### 1. 启用 Gzip 压缩
GitHub Pages 自动启用 Gzip 压缩

### 2. 优化图片
- 使用 WebP 格式
- 压缩图片大小

### 3. 代码分割
Vite 已配置代码分割，无需额外设置

### 4. 缓存策略
静态资源会自动缓存，可通过以下方式优化：
```javascript
// 在 index.html 中添加
<meta http-equiv="Cache-Control" content="max-age=31536000">
```

## 🔐 安全考虑

### HTTPS
GitHub Pages 自动提供 HTTPS，无需额外配置

### CSP（内容安全策略）
如需要，可在 `index.html` 中添加：
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📞 获取帮助

如果遇到问题：
1. 检查 [GitHub Pages 官方文档](https://docs.github.com/en/pages)
2. 查看 [Actions 文档](https://docs.github.com/en/actions)
3. 提交 [Issue](https://github.com/lenmei233/BreathAIWeb/issues)

---

## 🎉 完成！

设置完成后，每次推送代码到 `main` 分支都会自动部署到 GitHub Pages。

**访问地址**: https://lenmei233.github.io/BreathAIWeb/
