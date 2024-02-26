# uni-app开发小程序：项目架构以及经验分享

> 基于`vue2`搭建的`uni-app`开发模版，封装了常用方法已经请求，已在大量项目中实践，使用`cli`方式创建&&运行项目，更加灵活。更多项目细节可查阅 [项目详解]([111](https://juejin.cn/post/7259589417736847416))。如果项目对你有帮助，记得点个star🌟。

## 整体项目架构

```tree
    ├──dist 编译后的文件路径
    ├──package.json 配置项
	├──src 核心内容
        ├──api 项目接口
        ├──components 全局公共组件
        ├──config 项目配置文件
        ├──pages 主包
        ├──static 全局静态资源
        ├──store vuex
        ├──mixins 全局混入
        ├──utils 公共方法
        ├──App.vue 应用配置，配置App全局样式以及监听
        ├──main.js Vue初始化入口文件
        ├──manifest.json 配置应用名称、appid等打包信息
        ├──pages.json 配置页面路由、导航条、选项卡等页面类信息
        └──uni.scss 全局样式
```

## 关于我

个人博客：[lonjin blogs](https://lonjinup.github.io/)  
掘金：[陇锦
](https://juejin.cn/user/553809590359118/posts)

