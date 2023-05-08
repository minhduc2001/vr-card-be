const router = require('express').Router();
const handleHtml = require('../services/handleHtml');
const userController = require('../controllers/user.controller');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// // Create multer object for handling uploads
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 10 },
});
// var upload = multer({ dest: 'upload/' });

router.post(
  '/register',
  upload.fields([
    { name: 'dataImg', maxCount: 1 },
    { name: 'dataVideo', maxCount: 1 },
  ]),
  userController.register,
);
router.post('/login', userController.login);
router.get('/', userController.getAll);

router.get('/test/:id', async (req, res) => {
  const user = await userController.get(req.params.id);
  const html = await handleHtml.putData(user);
  return res.send(html);
});
router.get('/:id', userController.getUser);
router.delete(':/id', userController.deleteUser);

module.exports = router;
