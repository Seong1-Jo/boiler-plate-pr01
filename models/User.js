const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //schema생성
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, //trim은 abc eee@ 이메일 아이디에서 스페이스(공백)를 없애주는 역할을함
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { //관리자나 식별?
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = mongoose.model('User', userSchema);//인자의 1.모델이름, 2.Schema이름

module.exports = { User }