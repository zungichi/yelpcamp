const express = require('express');
const router = express.Router({ mergeParams: true });
const {isLogin, isReviewAuthor, reviewValidation} = require('../middleware.js')
const reviewController = require('../controllers/review')
const catchAsync = require('../utils/catchAsync');

router.route('/')
    .post(reviewValidation, isLogin, catchAsync(reviewController.addReview))

router.route('/:reviewID')
    .delete(isLogin, isReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router;