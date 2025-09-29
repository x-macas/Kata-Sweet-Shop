
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Sweet = require('./models/Sweet');

const removeCategory = async (categoryName) => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`MongoDB connected to remove items from category: ${categoryName}...`);

    const deleteResult = await Sweet.deleteMany({ category: categoryName });
    console.log(`Successfully removed ${deleteResult.deletedCount} items from the '${categoryName}' category.`);

  } catch (err) {
    console.error('Database operation failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

// Specify the category to remove
const categoryToRemove = 'Savory Snacks';
removeCategory(categoryToRemove);
