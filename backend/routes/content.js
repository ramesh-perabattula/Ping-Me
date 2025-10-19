const {Router}=require('express');
const addContent = require('../controllers/content');

const router=Router();

router.post('/add/content',addContent);

module.exports=router;