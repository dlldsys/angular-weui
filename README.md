# Angular WeUI

Angular WeUI 是基于微信官方 WeUI 设计语言开发的 Angular 组件库，为移动端 Web 应用提供一致的微信风格用户体验。

## ⚠️ 开发状态警告

**当前版本：0.1.0-alpha.1**

> **重要提醒：此库仍在开发中，请谨慎使用！**
> 
> - API 可能会发生变化
> - 部分功能可能不稳定
> - 建议仅用于测试和评估
> - 生产环境使用请等待正式版发布

## 特性

- 基于 WeUI 设计规范
- 移动端优化
- Angular 21+ 支持
- TypeScript 支持
- 组件化开发
- 完整的文档和示例

## 安装

```bash
npm install angular-weui
```

## 使用

```typescript
import { ComponentModule } from 'angular-weui';

@NgModule({
  imports: [
    ComponentModule
  ]
})
export class AppModule { }
```

## 组件

- Button (按钮)
- Cell (单元格)
- Toast (提示)
- Dialog (对话框)
- Progress (进度条)
- Actionsheet (操作列表)
- Picker (选择器)
- DatetimePicker (日期选择器)
- Tabbar (标签栏)
- Navbar (导航栏)
- List (列表)
- Card (卡片)
- Form (表单)
- SearchBar (搜索栏)
- Slider (滑块)
- Uploader (上传)

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建
npm run build

# 运行测试
npm test

# 启动 Storybook
npm run storybook
```

## 文档

完整文档请访问：https://dlldsys.github.io/angular-weui/

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 更新日志

### v0.1.0-alpha.1
- 初始版本发布
- 基础组件实现
- Storybook 文档
- GitHub Pages 部署

---

**注意：** 这是一个预览版本，API 可能会发生变化。请关注更新日志获取最新信息.
