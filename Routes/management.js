const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controller = require('../Controller/management') 
const isAuth = require("../Middleware/auth");

router.route('/getGeneralManagement').get(controller.getGeneralManagement)
router.route('/getManagementsForService/:serviceId').get(controller.getManagementsForService)

router.route('/')
.post([
    body('type').isIn(['General', 'Service']).withMessage('type Should Be General or Service'),
    body('serviceId').if(body('type').equals("Service")).not().isEmpty().withMessage('Service Id is Required'),
    body('title_ar').not().isEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').not().isEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').not().isEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').not().isEmpty().isString().withMessage('description_en is Required'),
    body('phoneNumber').isNumeric().withMessage('phoneNumber is Required'),
    body('email').not().isEmpty().isEmail().withMessage('Enter a Valid Email')
],isAuth,controller.addNewManagement)
.put([
    body('managementId').not().isEmpty().withMessage('Management Id is Required'),
    body('title_ar').not().isEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').not().isEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').not().isEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').not().isEmpty().isString().withMessage('description_en is Required'),
    body('phoneNumber').isNumeric().withMessage('phoneNumber is Required'),
    body('email').not().isEmpty().isEmail().withMessage('Enter a Valid Email')
],isAuth,controller.updateManagement)

router.route('/:id')
.delete(isAuth,controller.deleteManagement);

module.exports = router;
