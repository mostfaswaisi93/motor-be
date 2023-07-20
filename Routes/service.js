const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controller = require('../Controller/service') 
const isAuth = require("../Middleware/auth");

router.route('/')
.get(controller.getAllServices)
.post([
    body('title_ar').not().isEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').not().isEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').not().isEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').not().isEmpty().isString().withMessage('description_en is Required'),
],isAuth,controller.addNewService)
.put([
    body('serviceId').not().isEmpty().withMessage('serviceId is Required'),
    body('title_ar').not().isEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').not().isEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').not().isEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').not().isEmpty().isString().withMessage('description_en is Required'),
],isAuth,controller.updateService)

router.route('/:id')
.get(controller.getServiceById)
.delete(isAuth,controller.deleteService);

router.route('/question')
    .post([
        body('serviceId').not().isEmpty().withMessage('Service ID is Required'),
        body('question_ar').not().isEmpty().isString().withMessage('question_ar is Required'),
        body('question_en').not().isEmpty().isString().withMessage('question_en is Required'),
        body('answer_ar').not().isEmpty().isString().withMessage('answer_ar is Required'),
        body('answer_en').not().isEmpty().isString().withMessage('answer_en is Required'),
    ],isAuth,controller.addQuestion)
    .put([
        body('serviceId').not().isEmpty().withMessage('Service ID is Required'),
        body('questionId').not().isEmpty().withMessage('Question ID is Required'),
        body('question_ar').not().isEmpty().isString().withMessage('question_ar is Required'),
        body('question_en').not().isEmpty().isString().withMessage('question_en is Required'),
        body('answer_ar').not().isEmpty().isString().withMessage('answer_ar is Required'),
        body('answer_en').not().isEmpty().isString().withMessage('answer_en is Required'),
    ],isAuth,controller.updateQuestion)

router.route('/question/:serviceId/:questionId').delete(isAuth,controller.deleteQuestion)

module.exports = router;
