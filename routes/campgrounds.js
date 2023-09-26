const express = require('express');
const router = express.Router();
const {isLogin, isAuthor, campgroundValidation} = require('../middleware.js');
const campgroundController = require('../controllers/campground');
const catchAsync = require('../utils/catchAsync');
const {cloudinary, storage} = require('../cloudinary');
const multer = require('multer');
const upload = multer({storage});

router.route('/')
    .get(campgroundController.renderIndex)
    .post(isLogin, upload.array('image'), campgroundValidation, catchAsync(campgroundController.addCampground))

router.route('/new')
    .get(isLogin, campgroundController.renderNew)

router.route('/:id')
    .get(catchAsync(campgroundController.renderShow))
    .put(isLogin, isAuthor, upload.array('image'), campgroundValidation, catchAsync(campgroundController.updateCampground))
    .delete(isLogin, isAuthor, catchAsync(campgroundController.deleteCampground))

router.route('/:id/edit')
    .get(isLogin, isAuthor, catchAsync(campgroundController.editCampground))

module.exports = router;