var http = require('http');
var hostname = '127.0.0.1'; 
var port = '8080';

const server=http.createServer(function(req,res){
    const path=req.url;
    const method=req.method;

    if(path==='/products'){
        if(method==="GET"){  //가져오는거
            res.writeHead(200,{"Content-Type":"application/json"});
            const products=JSON.stringify([
                {
                    name:"시계",
                    price:89000
                }
            ]);
            res.end(products);
        }else if(method==="POST"){  //입력하는거
            res.end("생성되었습니다")
        }
    }
    res.end("bye")
})

server.listen(port,hostname);
console.log('server on')