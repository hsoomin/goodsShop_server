const express = require('express');
const cors = require('cors');
const app = express(); 
const port = '8080';
const models=require('./models');
const multer=require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
        cb(null, file.originalname);
        },
    }),
});



app.use(express.json());
app.use(cors());  //브라우저의 cors 이슈를 막기위해 사용하는 코드
app.use('/uploads',express.static('uploads')); //이미지 경로 수정

app.get('/products',(req,res)=>{
    
    models.Product.findAll(

        {
            /* limit:1 */
            order:[['createdAt', 'DESC']], //order: 순서: 오름차순: ASC , 내림차순: DESC  
            attributes:[
                "id", 
                "name", 
                "price", 
                "seller", 
                "imageUrl", 
                "createdAt",
                "soldout"
            ],
        }
    )
    .then((result)=>{
        console.log("PRODUCT:",result);
        res.send({
            product:result,  //res.send({ result });
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).send('에러 발생')
    })
})





app.post('/products', (req, res) => {
    const body=req.body;
    const {name, description, seller, price, imageUrl} = body;
    
    if(!name || !price || !seller || !imageUrl || !description){
        res.send("모든 필드를 입력해주세요")
    }
    
    models.Product.create({
        name,
        description,
        seller,
        price,
        imageUrl
    }).then((result) => {
        console.log('상품생성 결과:', result);
        res.send({result, })
    }).catch((error) =>{
        console.error(error);
        res.status(400).send('문제 발생')
    })
})




app.get("/products/:id", (req, res)=>{
    const params=req.params;
    const {id} = params;
    models.Product.findOne({
        where:{
            id:id,

        }
    }).then((result)=>{
        console.log("product:",result)
        res.send({
            product:result
        })
    }).catch((error)=>{
        console.error(error);
        res.status(400).send('상품 조회 에러가 발생함')
    })
})


app.post("/purchase/:id", (req, res)=>{
    const {id} = req.params;
    models.Product.update(
        {
            soldout:1
        },
        {
            where:{
                id,
            }
        }
    )
    .then((result)=>{
        res.send({
            result:true,
        })
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).send('에러 발생')
    })
})


app.post('/image',upload.single('image'),(req,res)=>{
    const file=req.file;
    res.send({
        imageUrl:file.path
    })
})


app.listen(port, ()=>{
    models.sequelize.sync()
    .then(()=>{
        console.log('db연결 성공')
    })
    .catch(err=>{
        console.error(err)
        console.log('db연결 에러')
        process.exit()
    })
});

