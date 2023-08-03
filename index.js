const express = require('express');
const cors = require('cors');
const app = express(); 
const port = '8080';

app.use(express.json());
app.use(cors());  //브라우저의 cors 이슈를 막기위해 사용하는 코드

app.get('/products',(req,res)=>{
    const query=req.query;
    console.log('queryString',query)
    res.send({
        products:[
            {id:"0", name : "시계", price:79000, seller : "haru", imageUrl:"goodsShop/img/products/product01.jpg"},
            {id:"1", name : "사이드 테이블", price:91000, seller : "gooreum", imageUrl:"goodsShop/img/products/product02.jpg"},
            {id:"2", name : "침구", price:55000, seller : "nacho", imageUrl:"goodsShop/img/products/product03.jpg"}
        ]
    })
})



app.post('/products',(req,res)=>{
    const body=req.body;
    res.send({
        body,
    })
})

app.get("/products/:id", (req, res)=>{
    const params=req.params;
    const {id} = params;
    res.send(`id는 ${id} 입니다`);
})

app.listen(port, ()=>{
    console.log('server on')
});

