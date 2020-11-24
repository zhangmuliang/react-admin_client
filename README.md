# React后台管理项目  

跟随尚硅谷谷粒后台项目教学视频学习中。
  
## 踩坑记录  

### 09节=>引入antd  

自定义antd主题时，由于less-loader版本不一致，需要在config-overrides.js中addLessLoader配置下添加lessOptions这一级配置。  

### 13节=>收集表单数据
  
form.creat方法在antd V4已经弃用。无需进行此操作。  

### 16节=>表单自定义验证
  
validator自定义校验需要返回一个promise。

### 32节=>动态显示菜单列表

Icon已在antdv4中弃用，三种解决方式：  
1.import { Icon } from '@ant-design/compatible';兼容旧版本。  
2.修改图标名为新版，用React.createElement来返回图标。  
3.可以在配置文件中直接引入对应的新版标签，直接传出。

### 38节=>jsonp请求获取天气
  
用高德天气查询来代替教程中的百度天气API

### 49节=>异步显示二级分类列表
  
在axios过程中封装ajax，参数params写成param，导致出现无法正确获取接口数据bug。

### 53节=>更新分类  

由于antdV4中不含有creat方法，且在类组件中应该使用formRef = React.createRef()来传递表单数据。  
在函数组件中则应使用useForm。  

