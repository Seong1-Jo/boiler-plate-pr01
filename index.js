const express = require('express') //express모듈을 가져온다
const app = express() //함수를 이용해서 새로운 express app을 만든다.
const port = 5000 //포트임, 5000번대 백서버로 둠

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jo:123qwe@boilerplate.t9pqn.mongodb.net/?retryWrites=true&w=majority',{}
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 몽고6.0이상은 기본적으로 적용되어있음
).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('안녕')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) //프린트된다 console.log로
})