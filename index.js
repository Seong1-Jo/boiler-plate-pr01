const express = require('express') //express모듈을 가져온다
const app = express() //함수를 이용해서 새로운 express app을 만든다.
const port = 5000 //포트임, 5000번대 백서버로 둠
const cookieParser = require('cookie-parser');
const  bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true})); //application/x-www-form-urlencoded를 분석해서 가져올수있게 해준다

app.use(bodyParser.json()); //application/json 된것을 가져올수있게
app.use(cookieParser());

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

  const user = new User(req.body) //회원정보들, 모든정보들이 모델에들어간다.

  

  user.save((err, userInfo) => { //회원정보들이 user에 들어간다 , save를 하기전에 암호화를 해야한다,
    if(err) return res.json({ success: false, err})
    return res.status(200).json({  //status200은 성공했다는 표시
      success: true
    }) 
  }) 
})

app.post('/api/users/login', (req, res) =>{

  //로그인 라우터에서 하는일!
  //1.요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) =>{//findOne()는 몽고db에서 제공하는 메서드
    if(!user) { //해당하는 유저가 없으면
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //2.요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password , (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      //3.비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 저장한다. 어디에?  쿠키, 로컬등등
        //이곳은 쿠키로!!
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })


      })
    })
  }) 



  


})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //프린트된다 console.log로
})