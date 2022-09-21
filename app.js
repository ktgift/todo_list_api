// const { sequelize } = require('./models');

// sequelize.sync();

require('dotenv').config(); //เรียกใช้ .env 
const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const todoRoute = require('./routes/todoRoute');
// console.log(process.env.JWT_SECRET_KEY)
const app = express();

//cors เป็นตัวที่ทำให้สามารถรับ req จากทุก domain ได้
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//config path
app.use('/auth', authRoute);
app.use('/todos', todoRoute);

app.use((req, res) => {
    res.status(404).json({ message: 'resource not found on this server' });
});

app.use((err, req, res, next) => {
    console.log(err);
    let code = 500;
    if (err.name === 'JsonWebTokenError') code = 401;
    if (err.name === 'TokenExpiredError') code = 401;

    if (process.env.NODE_ENV === 'development'){
        res.status(code).json({ message: err.message });
    } else {
        res.status(code).json({ message: 'something wrong' })
    }
});

const port = process.env.PORT || 8000 //หรือ 8000 เป็นค่า dafult port กรณีที่เค้าลืมใส่ค่ามา มันจะได้ไม่ error
app.listen(port, () => console.log(`server running on port ${port}`))