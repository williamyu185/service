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
* bable、pm2、nodemon等其他，略
#### 以上，原理、API和安装方法请自行百度

# 二、适用与局限性说明
### 1.考虑到开发效率问题，未将TypeScript强类型检测加入到项目中，所以此项目并不适合复杂业务场景下的企业级服务开发。
### 2.node服务器在海量数据请求下的高并发、虚拟机稳定性与第三方技术支持，社区生态成熟度等方面，无法与java相比。此项目不适用于追求高可靠性与高并发的服务器端开发。

# 三、架构层的基本组成与说明
### 1.整体架构层技术栈：node+koa(及相关插件)+koa-router+redis+sequelize+mysql
### 2.接口调试工具Postman
### 3.数据库可视化工具MYSQL WorkBench
### 4.如果存取数据涉及到redis与mysql分布式集群开发，请在config文件夹下配置集群服务器的相关信息。
### 5.如果服务层本身是集群式开发，可使用nginx反向代理此项目。
### 6.为了使用es6语法的async，await语法，对redis基础api做了Promise封装。常用工具类在utis文件夹下。

# 四、项目结构目录与说明
### 1.整体结构基本遵从MVC模式划分目录，根据我自己的理解，对结构目录做了适度的改动，方便更好的语义化理解。由于前后端分离，没有view层。
### 2.控制器层较简单，主要在tableBusinessOperateLogic目录下进行业务逻辑控制。
### 2.控制器(Controller)层较简单，主要在tableBusinessOperateLogic目录下进行业务逻辑控制。
### 2.我对模型(Model)层了更多的细分，主要在tableCRUD和tableStructure目录下，其中tableStructure下的文件是使用sequelize做了对mysql下bbs库下各表的一一映射。