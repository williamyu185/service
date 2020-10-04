# 使用node搭建服务器端service层的设计与实现
&nbsp;
# 一、前期准备
### 1.本机安装mysql、redis，及相关指令使用。
### 2.需要学习和运用的相关技术与框架
* koa洋葱模型
* koa-router路由控制
* session存储与static静态资源管理
* cors跨域控制
* request body数据提交格式与参数获取
* sequelize操作数据库
* redis操作内存数据
* VSCode编辑器下的debug断点调试工具使用
* uuid唯一性生成
* validator数据校检
* 基于RSA算法的非对称公私钥对加密解密
* md5内容一致性的防篡改算法
* bable、pm2、nodemon等其他，略
#### 以上，原理、API和安装方法可自行百度
&nbsp;
# 二、架构层的基本组成与说明
### 1.整体架构层技术栈：node+koa(及相关插件)+koa-router+redis+sequelize+mysql
### 2.接口调试工具Postman
### 3.数据库可视化工具MYSQL WorkBench
### 4.如果存取数据涉及到redis与mysql分布式集群开发，请在config文件夹下配置集群服务器的相关信息。
### 5.如果服务层本身是集群式开发，可使用nginx反向代理此项目。
### 6.为了更好的使用es6中的async、await语法，对redis基础API做了Promise封装。
&nbsp;
# 三、项目结构目录与说明
### 1.整体项目结构基本遵从MVC模式划分目录，根据我自己的理解，对结构目录做了适度的改动，方便更好的语义化理解。由于前后端分离，没有view层。
### 2.控制器(Controller)层较简单，主要在tableBusinessOperateLogic目录下进行业务逻辑控制。
### 3.我对模型(Model)层做了更多的细分，主要在tableCRUD和tableStructure目录下，其中tableStructure下的文件，是使用了sequelize做了对mysql下bbs库下各表属性字段的一一映射，用以初始化数据表并进行CRUD操作。
### 3.接口路由层放在routes目录下(默认所有接口使用POST方式提交数据)。
### 4.pem目录下的private.pem和public.pem，是node-rsa模块根据私钥签名生成token与公钥验签解密token生成明文的公私钥对，会在项目启动时自动生成，需要注意的是，如果手动删除该目录下的文件，重启服务器后pem会自动重新生成相关文件，新生成的公私钥对，无法正常解密以前的token，造成用户需要重新登录，重新根据当前公私钥对生成token。需要注意的是：RSA算法有一定的计算量，而Node并不适合做计算密集型的操作，此外公私钥对的读取涉及IO流读取文件，当登录与注册接口被频繁调用势必造成主线程较长时间阻塞，影响其他接口的使用，并发能力下降。建议访问量较大的站点，将登录与身份认证等功能单独迁出，做专门的单点登录服务器，配以redis缓存命中处理。
### 4.utils目录是常用工具类，对常用方法进行封装。
### 5.config目录是redis、mysql配置文件。
### 6.creatRedis和creatMysql创建redis、mysql的连接。
### 7.asset目录常用资源文件。
### 8.其他目录文件，略。
&nbsp;
# 四、用户表操作示例(账号注册接口)
### 1.Postman调试
* 接口准备：http://localhost:3000/bbs/userRegistry/login
* formData数据：
{
    email:123@qq.com,
    password: 123456
}
### 2.npm run dev启动本地服务。
### 3.routes/userRegistry.js依据path与提交方式进行业务层分流。
### 4.tableBusinessOperateLogic/userRegistry.js具体业务逻辑。
### 5.tableCRUD/userRegistry.js模型层CRUD实现。
### 6.tableStructure/userRegistry.js与数据层映射。
### 7.关于用户登录凭证的token认证：除登录和创建账号接口，其他接口均需进行认证(无需token验证白名单可在asset/noCheckTokenWhiteList.js里配置)。
### 8.其他接口示例，略。
&nbsp;
# 五、不足、适用性与局限性说明
### 1.本人对服务器端开发与技术框架只是初步了解、经验不足，文中难免有错误与不严谨的地方，敬请谅解。错误更正与修改还请多多指教，联系邮箱:1241637062@qq.com。
### 2.考虑到开发效率问题，未将TypeScript强类型检测加入到项目中，所以此项目并不适合复杂业务场景下的企业级服务开发。
### 3.node服务器在海量数据请求下的高并发、虚拟机稳定性与第三方技术支持，社区生态成熟度等方面，还无法与java相比。此项目不适合追求高可靠性与高并发的服务器端项目开发。
### 4.此项目源码暂不对外开源，需要源码的可单独找下我，我把你的github账号加入到此项目的管理权限。
### 5.文档会在项目持续维护的过程中，陆续做出修改与更正。