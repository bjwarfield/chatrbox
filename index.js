let http = require('http');
let fs = require('fs');
let extract = require('./extract');
let wss = require('./websockets-server');

let handleError = function (err, res) {
    res.writeHead(404);
    // res.setHeader('Content-Type', 'text/html');
    // res.end('Error! Page Does Not Exist \n' + err);

    try{
        const data = fs.readFileSync('app/error.html', 'utf8');
        res.end(data);
    }catch(error)
    {
        console.log(error)
        res.end('Error! Page Does Not Exist \n' + err);
    }

};

let server = http.createServer((req, res) => {
    console.log('Responding to a request.');
    let filePath = extract(req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // console.log("fileReadError");
            handleError(err, res);
            res.end();
            return;
        } else {
            // console.log("Serving File");
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    });
});
server.listen(3000);