//It was build for verufying the user is online or not

const users = {};
const checkuser = io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('login', function(data){

    //database function can be performed here 
    console.log('a user ' + data.userId + ' connected');
    // saving userId to object with socket ID
    users[socket.id] = data.userId;
  });

  socket.on('disconnect', function(){
    
    //database function can be performed here 
    console.log('user ' + users[socket.id] + ' disconnected');
    // remove saved socket from users object
    delete users[socket.id];
  });
});

module.exports = checkuser;