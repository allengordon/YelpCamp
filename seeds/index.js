const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6398bb527388bf469942a155',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus temporibus iste laboriosam modi est iure delectus, impedit, nihil eaque vitae placeat at. Perferendis autem sequi reprehenderit vel eius corporis offic Fuga exercitationem assumenda sint neque autem, facilis sed quidem, iure fugit repellendus, voluptatum ratione. Impedit soluta, dolorum vel error illo quisquam sed maxime accusantium veritatis delectus corporis quibusdam maiores doloremque',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/wolfgazer/image/upload/v1643324140/YelpCamp/ll8xbbl132invsynpjkp.jpg',
                    filename: 'YelpCamp/ll8xbbl132invsynpjkp'
                },
                {
                    url: 'https://res.cloudinary.com/wolfgazer/image/upload/v1643146872/YelpCamp/d3jjaksed6spouksnbam.jpg',
                    filename: 'YelpCamp/d3jjaksed6spouksnbam'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})