# super_framework

To Do!
======
* Create server
* Create router
* Error handlers
* Write HTML/CSS
* Write tests
* Write gulpfile
* Develop features
  * Response function (?)
  * Parse request
  * Server counter
* Write more tests

function send(data, callback) {
  res.writeHead(...);
  var data = callback(data);
  res.write(data);
  res.end();  // ?
}

res.send('hello world', function() {
  data += "!";    // 'hello world!'
  return data;
})
