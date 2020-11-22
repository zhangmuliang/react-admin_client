# React后台管理项目  

跟随尚硅谷谷粒后台项目教学视频学习中。
  
## 踩坑记录  

### 09节=>引入antd  

自定义antd主题时，由于less-loader版本不一致，需要在config-overrides.js中addLessLoader配置下添加lessOptions这一级配置。  

### 13节=>收集表单数据
  
form.creat方法在antd V4已经弃用。无需进行此操作。  

### 16节=>表单自定义验证
  
validator自定义校验需要返回一个promise。
