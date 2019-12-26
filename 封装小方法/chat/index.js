/*  
 *  http.createServer()  
 该函数用来创建一个HTTP服务器，并将 requestListener 作为 request 事件的监听函数。 
 //https://www.jb51.net/article/58476.htm
 *  var app = express();
    打开node_modules目录找到依赖的源码文件:./express/lib/express.js.该文件导出函数createApplication.
    express()即调用了createApplication()函数,app变量是createApplication函数的返回值。
 */
// Setup basic express server
var express = require('express');
var app = express();//网址：https://zhidao.baidu.com/question/1575292179638897220.html
var path = require('path');//node  里的 路径模块
var server = require('http').createServer(app);//简单服务配置   网址：https://www.cnblogs.com/yamboo/p/10658309.html      
var io = require('socket.io')(server);//服务器端   网址：https://socket.io/docs/client-api/
var port = process.env.PORT || 3000;// (node.js里设置端口号)

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
// Routing
app.use(express.static(path.join(__dirname, 'public')));
// Chatroom
var numUsers = 0;
io.on('connection', function (socket) {
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  // 当客户端发出“新消息”时，它将侦听并执行
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  // when the client emits 'add user', this listens and executes
  // 当客户端发出“add user”时，它将侦听并执行
  socket.on('add user', function (username) {
    if (addedUser) return;
    // we store the username in the socket session for this client
    // 我们将用户名存储在此客户端的套接字会话中
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    // 全局回显（所有客户端）某人已连接的
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });
  // when the client emits 'typing', we broadcast it to others
  // 当客户发出“打字”时，我们会将其广播给其他人
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });
  // when the client emits 'stop typing', we broadcast it to others
  //当客户发出“停止键入”时，我们会将其广播给其他人
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
  // when the user disconnects.. perform this
  //当用户断开连接时。。执行此操作
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

//在全局范围内回显此客户端已离开