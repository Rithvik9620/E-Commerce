const cors = require('cors')
const express = require('express')
require('./db/config')
const user = require('./db/users')
const Product = require('./db/product')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/signup',async (req,res)=>{
    const User = new user(req.body)
    let result = await User.save()
    result = result.toObject()
    delete result.password
    res.send(result)
})

app.post('/login',async (req,res)=>{
    let myUser = await user.findOne(req.body).select("-password")
    if(myUser) res.send(myUser)
    else res.send({result:'Not Found'})
})

app.post('/add-product',async (req,res)=>{
    let product = new Product(req.body)
    let result = await product.save()
    res.send(result)
})

app.get('/products',async (req,res)=>{
   let products = await Product.find()
   if(products.length>0) {
    res.send(products)
   }
   else{
    res.send('No Product found')
   }
})

app.delete('/product/:id',async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/product/:id',async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send('No result found')
    }
})

app.put("/product/:id", async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
})

app.listen(5000)