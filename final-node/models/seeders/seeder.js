const { Book } = require('./../book');
const { Country } = require('./../country');

const bookArray = require('./books.json');
const countryArray = require('./countries.json');

const seedMongoDb = async () => {
    if (!(await Book.count({})))
        Book.insertMany(bookArray);
        
    if (!(await Country.count({})))
        Country.insertMany(countryArray);
}

module.exports={seedMongoDb};