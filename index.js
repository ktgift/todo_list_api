//ใช้ไฟล์นี้ในการเรียน
// const bcrypt = require('bcryptjs');

// const message = '123456';

// const run = async () => {
//     const hashed = await bcrypt.hash(message, 10);
//     console.log(hashed);
// }

// //ใช้ .compare ในการถอด เพื่อเช็คว่าข้อมูลที่รับมามันตรงกับ hash ไหม ถ้าตรง = true 
// const test = async () => {
//     const isMatch = await bcrypt.compare(message, '$2a$10$154f73nyux3yt.KeR3.TGurB3JSj4JwBl31Z9ycNbmm6LiaG90Yay');
//     console.log(isMatch)
// }

// // run();
// test();


//token
//import token
const jwt = require('jsonwebtoken');

//การ generate token
//การใช้ fn sign
//สร้าง payload สำหรับเก็บข้อความที่เราจะส่ง และสร้าง secretKey
const payload = {
    message: "Hello my friend"
}

const secretKey = 'codecamp'

const token = jwt.sign(payload, secretKey, {
    //ใส่ option ในนี้
    expiresIn: 60 //ระยะเวลาหมดอายุ
});
console.log(token);


//การ verify
const tokenToVerify = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiSGVsbG8gbXkgZnJpZW5kIiwiaWF0IjoxNjYxNTkyNTQ4LCJleHAiOjE2NjE1OTI2MDh9.qwhGoP_x4BScZofCL8TWWirJb9SINczd3YaJgyCO-Fo';
try {
    const decoded = jwt.verify(tokenToVerify, 'codecamp');
    console.log(decoded);
} catch(err) {
    console.log(err)
}
