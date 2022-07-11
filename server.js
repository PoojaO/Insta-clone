import mongoose from 'mongoose'
import cors from "cors"
import Pusher from "pusher";
import express from "express";
import dbmodel from './dbmodel.js'

//app config
const app=express();
const port = process.env.port || 3005;
const pusher = new Pusher({
  appId: "1434494",
  key: "b8b8d84d3efe6a3f0e90",
  secret: "3538493bca2f7b58ee3f",
  cluster: "us2",
  useTLS: true
});

//middle
app.use(express.json())
app.use(cors())


//db config
const connection_url= "mongodb+srv://pojha:oEX2PV7Jw4Ed4iMF@cluster0.shrpakz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
        useNewUrlParser: true,
              useUnifiedTopology: true,
});


mongoose.connection.once('open', ()=>{
              console.log('DB Connected ');

const changeStream = mongoose.connection.collection('post').watch() 
changeStream.on('change',(change)=> {
              console.log('Change Triggered on pusher...')
              console.log(change)
              console.log('End of Change')

              if(change.operationType==='insert'){
                            console.log('Triggering Pusher ***IMG UPLOAD***')

                            const postDetails = change.fullDocument;
                            pusher.trigger('posts','inserted', {
                                          user:postDetails.user,
                                          caption: postDetails.caption,
                                          image: postDetails.image
                            })
              }else{
                            console.log('Unknown trigger from Pusher')
              }
})
})

//api routes
app.get('/' , (req,res) => res.status(200).send('hello world '))

app.post('/upload',(req,res)=>{
           const body = req.body;

           dbmodel.create(body,(err,data)=>{
                         if(err){
                             res.status(500).send(err);
                           } else{
                             res.status(201).send(data);
                            }
                   });
           })
//*used to syc database 
app.get('/sync', (req,res)=>{
              dbmodel.find((err,data)=>{
                             if(err){
                             res.status(500).send(err);
                           }else{
                             res.status(200).send(data);
                            }
              });
}   )
//listener
app.listen(port, ( )=>console.log('listening on localhost:${port}'))

