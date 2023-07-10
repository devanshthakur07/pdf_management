const express = require('express');
const User = require('../models/User');
const File = require('../models/File');
const {isLoggedIn, isNotLoggedIn}= require('../middleware');
const passport = require('passport');
const multer = require('multer');
const router = express.Router();
const Comment = require('../models/Comment');
const mongoose = require('mongoose');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, "src/public/uploads");
    },
    filename: (req, file, cb) => {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
});
// Multer file filter to accept only PDF files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Only PDF files are allowed.'), false);
  }
};
const upload = multer({storage, fileFilter});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/register', isNotLoggedIn, (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res)=> {
    try{
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        res.redirect('/login');
    }
    catch(e){
        console.error(e);
    }
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/dashboard');
});


router.get('/upload', isLoggedIn, (req, res) => {
    res.render('upload');
});



router.post('/uploadFiles', upload.single("pdf"), async (req, res) => {
  const file = new File({
    name: req.file.filename,
    userId: req.user._id,
    path: req.file.path
  }); 
  const savedFile = await file.save();
  
  res.redirect('/dashboard');
});

router.get('/dashboard', isLoggedIn, async(req, res) => {
    let arr = {}
  arr = await File.find({userId: req.user._id});
  const sharedFiles = await File.find({ sharedTo: req.user._id });

  res.render('dashboard', {arr, sharedFiles});
})


router.put('/share', async (req, res) => {
  const { filename, email } = req.body;

  try {
    const receivingUser = await User.findOne({ email });
    if (!receivingUser) {
      return res.status(404).json({ error: 'User with the provided email not found' });
    }
    const file = await File.findOne({ name: filename });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    if (file.sharedTo.includes(receivingUser._id)) {

      return res.status(400).json({ error: 'File is already shared with the user' });
    }
    file.sharedTo.push(receivingUser._id);
    await file.save();

    res.status(200).json({ message: 'File shared successfully' });
  } catch (error) {
    console.error('An error occurred while sharing the file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/comments', isLoggedIn, async (req, res) => {
  try {
    const { filename, commentText } = req.body;
    const file = await File.findOne({name: filename});
    const comment = new Comment({
      fileId: file._id,
      userId: req.user._id,
      text: commentText,
    });

    await comment.save();
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a file
router.get('/comments/:filename', isLoggedIn, async (req, res) => {
  try {
    const { filename } = req.params;
    const file = await File.findOne({name: filename});
    const comments = await Comment.find({ fileId: file._id });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

router.get('/logout', isLoggedIn, (req, res)=> {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;




//bLk6sO7Mv8JaK0Yc