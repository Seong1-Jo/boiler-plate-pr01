const express = require('express') //express모듈을 가져온다
const app = express() //함수를 이용해서 새로운 express app을 만든다.
const port = 5000 //포트임, 5000번대 백서버로 둠
const  bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true})); //application/x-www-form-urlencoded를 분석해서 가져올수있게 해준다

app.use(bodyParser.json()); //application/json 된것을 가져올수있게

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI ,{}
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 몽고6.0이상은 기본적으로 적용되어있음
).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('안녕 반가워요')
})

app.post('/register', (req, res) => {
  //회원가입 할때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다

  const user = new User(req.body) //회원정보들

  user.save((err, userInfo) => { //회원정보들이 user에 들어간다
    if(err) return res.json({ success: false, err})
    return res.status(200).json({  //status200은 성공했다는 표시
      success: true
    }) 
  }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //프린트된다 console.log로
})