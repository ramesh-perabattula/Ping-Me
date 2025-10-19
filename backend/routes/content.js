const {Router}=require('express');
const {addContent ,getContents}= require('../controllers/content');
const authMiddleware = require('../middlewares/auth');


const router=Router();

router.post('/add/content',authMiddleware,addContent);
router.get('/get/content',authMiddleware,getContents);


module.exports=router;