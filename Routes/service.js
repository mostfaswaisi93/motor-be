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

module.exports = router;
