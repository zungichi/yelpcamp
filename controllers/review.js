const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.addReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review._id);
    review.author = req.user._id;
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.reviewID}});
    await Review.findByIdAndDelete(req.params.reviewID);
    req.flash('success', 'Successful delete review');
    res.redirect(`/campgrounds/${req.params.id}`)
}