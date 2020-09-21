const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const multer = require('multer');
const uniqid = require('uniqid');

const prodRoutes = require('./routes/prod');
const authRoutes = require('./routes/auth');
const ProdData = require('./models/product');
const User = require('./models/user');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/images/avatars');
    },
    filename: (req, file, cb) => {
        cb(null, uniqid() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// bodyParser: Extracting json data from the incoming request body
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('file'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/assets',
    express.static(path.join(__dirname, 'assets')));



app.use('/auth', authRoutes);
app.use('/prod', prodRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

ProdData.belongsTo(User);

// sequelize.sync().then(result => {
//     app.listen(8080);
// }).catch(err => {
//     console.log(err);
// });
app.listen(8080);

