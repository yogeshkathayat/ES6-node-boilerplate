const express = require('express');
const validate = require('express-validation');
const articleController = require('../../controllers/article.controller');
const { article } = require('../../validations/article.validation');
const {
    authorize,
} = require('../../middlewares/auth');
const router = express.Router();


router.route('/')
    .post(validate(article), articleController.create)
    .get(articleController.list);

router.route('/update')
    .post(validate(article), articleController.update);
router.route('/delete')
    .post(validate(article), articleController.update);


module.exports = router;