# super_framework

A simple HTTP server framework, including basic router, response methods, a directory
reader, and a request counter.

Table of Contents
=================

* respond(res, data)
* sendFile(filename, res)
* writeDirectory(router, filepath, method)
* Request Counter

# respond(res, data)

  Sends a simple 'OK' HTTP response. User provides response object and data to write.

  Example:

  `respond(res, 'hello world!');    // writes 'hello world!' to response object.`

# sendFile(filename, res)

  The send file function is used for sending back a file, the header, and the response.

  How to use it:

  1. Require fs(filesystem) and save it in the var fs.

  2. Create a function sendfile, that takes in two parameters, filename and res
  eg : `function sendFile(filename, res) {}`
  This file will be called from the writeDirectory.js

  3. In the function you write/send the following to the response(res) object-

  header data -
  eg. `res.writeHead(200, {'Content-Type': 'text/html'});`

  contents of the file, after reading it -
  eg. `res.write(fs.readFileSync(filename));`

  and finally ending the response -
  eg. `res.end();`

  4. Finally export the file by adding the function to module.exports -
  eg. `module.exports = exports = function sendFile() {}`


# writeDirectory(router, filepath, method)

  Reads all files in a directory and assigns a response to them.

  The writeDirectory function takes three arguments: the router to which it will be
  writing, the filepath of the directory to read, and the REST method to call on it.
  writeDirectory will register all files as properties of the appropriate method,
  and assign the appropriate response function. At this time writeDirectory only
  assigns responses to GET requests.

  Example:

  `writeDirectory(router, '/public', 'GET');    // returns all files in directory on request`

# Request Counter

  Counters for requests are designed for tracking user's activity.
  Counter is a number. It shows how many times particular url has been requested.
  How to use it:

  1. Creating new instance of Route object:

    `var route = new Route();`

  2. Creating routes:

    ```router.get('/first', function(req, res){
      respond(res, "It's the first route")
    });
    router.get('/second', function(req, res){
     respond(res, "It's the second route")
    });```

  3. Creating the route which is responsible for counters:

    ```router.get('/count', function(req, res) {
    router.stat(req, res);
   })```

  'stat' is built-in method of Router object. It needs to be used in order to
  receive statistic information. In this example 'count' request will give
  statistics for user's requests.
