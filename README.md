# 使用node搭建service服务层的设计与实现
# 一、前期准备
### 1.本机安装mysql、redis，及对应指令使用。
### 2.需要学习和运用的相关技术与框架
* koa洋葱模型
* koa-router路由控制相关
* session存储与static静态资源管理
* cors跨域控制
* body数据提交格式与参数获取
* sequelize操作数据库
* redis操作内存缓存
* VSCode编辑器下的debug断点调试工具使用
* uuid的唯一性生成
* validator校检
* 基于rsa算法的非对称公钥私钥加密
* md5内容一致性的防篡改算法
* bable、pm2、nodemon等其他
#### 以上，原理、API和安装方法请自行百度
## 
# 二、适用与局限性说明
### 1.考虑到开发效率问题，未将TypeScript强类型检测加入到项目中，所以此项目并不适合复杂业务场景下的企业级服务开发。
### 2.node服务器在海量数据请求下的高并发、虚拟机稳定性与第三方技术支持，社区生态成熟度等方面，无法与java相比。此项目不适用于追求高可靠性与高并发的服务器端开发。
# 三、架构层的基本组成与说明
### 1.整体架构层技术栈：node+koa(及相关插件)+koa-router+redis+sequelize+mysql
### 2.接口调试工具Postman
### 3.数据库可视化工具MYSQL WorkBench
### 4.如果存取数据涉及到redis与mysql分布式集群开发，请在config文件夹下配置集群服务器的相关信息。
### 5.如果服务层本身是集群式开发，可使用nginx反向代理到此项目。