const {Router}=require('express');
const VerifyOtp = require('../controllers/auth');
const {newUSer,loginUser }= require('../controllers/auth');

const router=Router();

// router.post('/send/otp',VerifyOtp);

router.post('/signup',newUSer);
router.post('/signin',loginUser);


module.exports=router;