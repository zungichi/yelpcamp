const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfury9szs/image/upload/v1694261191/YelpCamp/nu9xznsbwbnlhomhd9op.jpg',
                    filename: 'YelpCamp/nu9xznsbwbnlhomhd9op'
                },
                {
                    url: 'https://res.cloudinary.com/dfury9szs/image/upload/v1694261192/YelpCamp/xiua6neuklwh2oxhup0r.jpg',
                    filename: 'YelpCamp/xiua6neuklwh2oxhup0r'
                }
            ],
            description: 'This is Description',
            price: price,
            author: '64eb09a6c69d275cb910e8f4'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})