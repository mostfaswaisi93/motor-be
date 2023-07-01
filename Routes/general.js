const express = require('express');
const { body, query, param } = require('express-validator');
const router = express.Router();
const controller = require('../Controller/general') 
const isAuth = require("../Middleware/auth");

router.route('/header')
.get(controller.getHeader)
.put([
    body('title_ar').notEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').notEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').notEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').notEmpty().isString().withMessage('description_en is Required'),
    body('question_en').notEmpty().isString().withMessage('question_en is Required'),
    body('question_ar').notEmpty().isString().withMessage('question_ar is Required'),
],isAuth,controller.updateHeader)

router.route('/socialMedia')
.get(controller.getSocialMedia)
.put(isAuth,controller.updateSocialMedia)

router.route('/contactUs')
.get(controller.getContactUs)
.put([
    body('city_ar').notEmpty().isString().withMessage('city_ar is Required'),
    body('city_en').notEmpty().isString().withMessage('city_en is Required'),
    body('country_ar').notEmpty().isString().withMessage('country_ar is Required'),
    body('country_en').notEmpty().isString().withMessage('country_en is Required'),
    body('address_en').notEmpty().isString().withMessage('address_en is Required'),
    body('address_ar').notEmpty().isString().withMessage('address_ar is Required'),
    body('primaryEmail').isEmail().withMessage('Enter a valid primary Email'),
    body('primaryPhoneNumber').isNumeric().withMessage('primary Phone Number is Required'),
],isAuth,controller.updateContactUs)

router.route('/whoWeAre')
.get(controller.getWhoWeAre)
.put([
    body('title_ar').notEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').notEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').notEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').notEmpty().isString().withMessage('description_en is Required'),
],isAuth,controller.updateWhoWeAre)

router.route('/whatDoWeApply')
.get(controller.getWhatDoWeApply)
.put([
    body('title_ar').notEmpty().isString().withMessage('title_ar is Required'),
    body('title_en').notEmpty().isString().withMessage('title_en is Required'),
    body('description_ar').notEmpty().isString().withMessage('description_ar is Required'),
    body('description_en').notEmpty().isString().withMessage('description_en is Required'),
],isAuth,controller.updateWhatDoWeApply)

module.exports = router;
