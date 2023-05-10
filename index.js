const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');
const path = require('path');
const cors = require('cors');
const router = require('./src/routes/route');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./src/config/db.config');
const { create, engine } = require('express-handlebars');
const app = express();
const ip = require('ip');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json());

app.use('/public', express.static('src/public'));
app.use('/uploads', express.static('uploads'));

// QRCode.toDataURL(
//   'Lời nhắn từ 1 người dấu tên: Bay zata như cc',
//   function (err, url) {
//     user.qrcode = url;
//   },
// );

const hbs = create({
  /* config */
});
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
app.engine('.hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', '.hbs');
app.set('views', './src/views');

app.use(helmet());
app.use(cors());

const isProduction = process.env.NODE_ENV === 'production';
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(
  isProduction
    ? morgan('combined', { stream: accessLogStream })
    : morgan('dev'),
);
const port = process.env.PORT || 3000;
router(app);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
