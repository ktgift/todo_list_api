const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res, next) => {
    try{
        const { username, email, password, confirmPassword } = req.body;

        //validate
        //check password
        if (password !== confirmPassword) return res.status(400).json({ message: 'password is not match' });

        const existUsername = await User.findOne({ where: { username } });
        //ถ้ามันมีค่าใน existUsername แสดงว่ามันมีอยู่แล้ว ถ้ามันหาไม่เจอมันจะเป็น null
        if (existUsername) return res.status(400).json({ message: 'user is already is use' });

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) return res.status(400).json({ message: 'email is already in use' });

        //bcypt password
        const hashed = await bcrypt.hash(password, 12);

        //ให้มัน insert to DB
        await User.create({ username, email, password: hashed });

        res.json({ message: 'user created', username, email })
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        // const user = await User.findOne({ where: { username }, attribute: ['password', 'id', 'username', 'email'] });
        const user = await User.findOne({ where: { username }});

        if (!user) return res.status(400).json({ message: 'username or password is incorrect' });

        //เช็ค password ว่า match กันไหม
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ message: 'username or password is incorrect' });

        const payload = {
            id : user.id,
            email: user.email,
            username: user.username
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d'
        })

        res.json({ message: 'login success', token });

    }catch (err) {
        next(err);
    }
};


//authorization
exports.authenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer'))
            return res.status(401).json({ message: 'you are unautenticated' })

        const token = authorization.split(' ')[1];
         //เช็คว่า token มีค่าไหม
         if (!token)
            return res.status(401).json({ message: 'you are unautenticated' });
 
         const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

         //(ปกติควรจะมีการทำระบบเปรียบเทียบเวลาในการสร้าง password ใน db กับ เวลาในการสร้าง token มันตรงกันไหม)
         //เช็คว่า มี user ที่มี id ตรงกับใน payload ไหม 
         const user = await User.findOne({ where: { id: payload.id } });

         if(!user) return res.status(401).json({ message: 'you are unautenticated' });

         //ส่ง user ที่ตรวจสอบ token แล้วไปให้ตัวอื่นใช้
         req.user = user;
         next(); //ให้มันวิ่งไปทำ middleware ตัวถัดไป

    } catch(err) {
        next(err);
    }
}