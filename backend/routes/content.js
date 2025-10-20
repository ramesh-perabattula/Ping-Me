const {Router}=require('express');
const {addContent ,getContents, deleteContents}= require('../controllers/content');
const authMiddleware = require('../middlewares/auth');


const router=Router();

router.post('/add/content',authMiddleware,addContent);
router.get('/get/content',authMiddleware,getContents);
router.post('/delete/:id',deleteContents);

module.exports=router;