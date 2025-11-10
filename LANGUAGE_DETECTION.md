# VitePress 语言检测方案

## VitePress 的内置能力

VitePress 本身**有客户端语言检测能力**，但需要正确配置：

### 方案 1：VitePress 原生语言检测（推荐）

**工作原理：**
1. 用户访问根路径 `/`
2. VitePress 在浏览器端检测 `navigator.language`
3. 自动重定向到匹配的语言页面
4. 使用 localStorage 记住用户选择

**配置要求：**

```javascript
// docs/.vitepress/config.js
export default defineConfig({
  locales: {
    zh: {  // 不要使用 'root'，使用具体语言代码
      label: '中文',
      lang: 'zh-CN',
      // ...
    },
    en: {
      label: 'English',
      lang: 'en-US',
      // ...
    }
  }
})
```

**目录结构：**
```
docs/
  zh/
    index.md
    guide/
  en/
    index.md
    guide/
```

**VitePress 会自动生成：**
- `/` - 检测页面（自动跳转）
- `/zh/` - 中文内容
- `/en/` - 英文内容

### 方案 2：当前配置（简化版）

**当前状态：**
- 使用 `root` 作为中文（内容在 `/zh/` 下）
- 这导致 VitePress 不生成自动检测页面

**解决方案：**
1. **Nginx 重定向到默认语言**（当前采用）
   ```nginx
   location = / {
       return 302 /zh/;  # 简单直接
   }
   ```

2. **用户通过页面语言切换器选择**
   - VitePress 会记住用户选择（localStorage）
   - 下次访问自动使用上次选择的语言

## 推荐方案

### 短期（当前）：保持现状
- Nginx 重定向到 `/zh/`
- 用户可通过语言切换器选择语言
- VitePress 记住用户偏好

**优点：**
- 无需重构现有内容
- 简单可靠
- 用户偏好可持久化

### 长期：迁移到 VitePress 原生检测

**步骤：**

1. **修改 VitePress 配置**
   ```javascript
   // 将 root 改为 zh
   locales: {
     zh: {
       label: '中文',
       // ...
     },
     en: {
       // ...
     }
   }
   ```

2. **重构内容目录**（如果需要）
   - 如果内容已经在 `/zh/` 和 `/en/` 下，无需改动

3. **重新构建**
   ```bash
   npm run docs:build
   ```

4. **测试**
   - 访问 `/` 应该自动检测并跳转
   - 切换浏览器语言测试

## VitePress 语言切换器

VitePress 的导航栏自动包含语言切换器：

```
┌─────────────────────────────────┐
│  AImyChats    🌐 中文 ▼        │  ← 自动显示
│  ├─ 中文                        │
│  └─ English                     │
└─────────────────────────────────┘
```

**特性：**
- ✅ 自动根据 `locales` 配置生成
- ✅ 用户选择后保存到 localStorage
- ✅ 下次访问自动应用
- ✅ 适配移动端

## 总结

| 方案 | 检测时机 | 记住选择 | 实现难度 |
|------|---------|---------|---------|
| VitePress 原生 | 首次访问自动 | ✅ 是 | 中（需重构） |
| Nginx 重定向 | 每次都重定向 | ❌ 否 | 简单 |
| 页面切换器 | 手动选择 | ✅ 是 | 无需额外工作 |

**当前采用：** Nginx 重定向 + VitePress 切换器
- 首次访问 → 重定向到中文
- 用户可切换 → VitePress 记住选择
- 简单可靠，无需重构

**未来可迁移到：** VitePress 原生检测
- 真正的自动语言检测
- 更好的用户体验
- 需要重构配置

