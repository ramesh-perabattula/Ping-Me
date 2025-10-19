const {Router}=require('express');
const addContent = require('../controllers/content');
const authMiddleware = require('../middlewares/auth');


const router=Router();

router.post('/add/content',authMiddleware,addContent);

module.exports=router;