var io = new Socket( 'localhost:8080', { autoReconnect: true });

//io.send('save', data);
io.on('open', function (e ) {

  console.log('[open]');



  io.on('message', function (msg, e ) {

    console.log('[message]');
    console.log(msg);
  });


  io.on('reconnect', function (msg, e ) {

    console.log('reconnected');
  });


  io.on('close', function (e ) {

    console.log('[close]');
  });


  io.on('error', function (e ) {

    console.log('[error]');
  });

});



