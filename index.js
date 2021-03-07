const fs = require('fs');
const path = require('path');

//to access core module to create server
const http = require('http');
//for host name
const hostname = "localhost";
//giving port number
const port = 4000;

//server creating
const server = http.createServer((req, res) => {

    //this will give all the data from request  sent
    // console.log(req.headers);
    console.log(` request for ${req.url}  by method ${req.method}`);

    if(req.method == 'GET') {
        var fileURL;
        if(req.url == '/'){
            fileURL = "/index.html";
        }else
        {
            fileURL = req.url;
        
            var filePath = path.resolve('./nodeserver'+fileURL);

            const FileExt = path.extname(filePath);

            if(fileExt == '.html')
            { 
                fs.exists(filePath, (exists) => {
                    if(!exists){
                       //when server connect 200 code display
                        res.statusCode = 404;
                        //what type of content will be shown  when connection 
                        res.setHeader('Content-Type','text/html');
                        res.end(`<html><h1>error 404 : ${fileURL} file does not exists </h1></html>`);
                    }
                     //when server connect 200 code display
                     res.statusCode = 200;
                     //what type of content will be shown  when connection 
                     res.setHeader('Content-Type','text/html');
                     //it will convert the data streams of bits and pass it through pipe one by one and provide us response
                     fs.createReadStream(filePath).pipe(res);
                })
            }else{
                //when server connect 200 code display
                res.statusCode = 404;
                //what type of content will be shown  when connection 
                res.setHeader('Content-Type','text/html');
                res.end(`<html><h1>error 404 : ${fileURL} not html file</h1></html>`);
            }

        }
        
    } else {
        //when server connect 200 code display
        res.statusCode = 404;
        //what type of content will be shown  when connection 
        res.setHeader('Content-Type','text/html');
        res.end(`<html><h1>error 404 : ${fileURL} not supported </h1></html>`);
        
    }

    

});

//for calling server or creating server
server.listen(port , hostname, () => {
    console.log(`server running at http://${hostname}:${port}`);
});
