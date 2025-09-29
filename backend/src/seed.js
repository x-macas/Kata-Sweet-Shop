
require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Sweet = require('./models/Sweet');

const allSweets = [
  // Indian Sweets
  { name: 'Gulab Jamun', category: 'Indian Sweets', price: 2.50, quantity: 50 },
  { name: 'Jalebi', category: 'Indian Sweets', price: 2.00, quantity: 60 },
  { name: 'Rasgulla', category: 'Indian Sweets', price: 3.00, quantity: 40 },
  { name: 'Kaju Katli', category: 'Indian Sweets', price: 4.50, quantity: 30 },
  { name: 'Ladoo', category: 'Indian Sweets', price: 1.75, quantity: 70 },
  { name: 'Mysore Pak', category: 'Indian Sweets', price: 3.50, quantity: 30 },
  { name: 'Rasmalai', category: 'Indian Sweets', price: 4.00, quantity: 40 },
  { name: 'Soan Papdi', category: 'Indian Sweets', price: 2.75, quantity: 50 },

  // Chocolates
  { name: 'Dairy Milk', category: 'Chocolates', price: 1.75, quantity: 100 },
  { name: 'Kit Kat', category: 'Chocolates', price: 1.50, quantity: 120 },
  { name: '5 Star', category: 'Chocolates', price: 1.25, quantity: 150 },
  { name: 'Ferrero Rocher', category: 'Chocolates', price: 0.75, quantity: 200 },
  { name: 'Snickers', category: 'Chocolates', price: 1.60, quantity: 110 },
  { name: 'Bournville', category: 'Chocolates', price: 2.50, quantity: 80 },
  { name: 'Toblerone', category: 'Chocolates', price: 3.00, quantity: 70 },
  { name: 'Lindt Lindor', category: 'Chocolates', price: 1.00, quantity: 250 },

  // Cakes & Pastries
  { name: 'Pineapple Pastry', category: 'Cakes & Pastries', price: 4.00, quantity: 30 },
  { name: 'Chocolate Mousse', category: 'Cakes & Pastries', price: 5.50, quantity: 25 },
  { name: 'Cheesecake Slice', category: 'Cakes & Pastries', price: 6.50, quantity: 20 },
  { name: 'Tiramisu Slice', category: 'Cakes & Pastries', price: 7.00, quantity: 20 },
  { name: 'Croissant', category: 'Cakes & Pastries', price: 3.50, quantity: 40 },
  { name: 'Muffin', category: 'Cakes & Pastries', price: 2.75, quantity: 50 },
  { name: 'Brownie', category: 'Cakes & Pastries', price: 3.00, quantity: 60 },

  // Cookies
  { name: 'Oatmeal Raisin Cookie', category: 'Cookies', price: 1.50, quantity: 80 },
  { name: 'Peanut Butter Cookie', category: 'Cookies', price: 1.50, quantity: 75 },
  { name: 'Macadamia Nut Cookie', category: 'Cookies', price: 2.00, quantity: 60 },
  { name: 'Shortbread Cookie', category: 'Cookies', price: 1.25, quantity: 100 },
  { name: 'Biscotti', category: 'Cookies', price: 1.75, quantity: 70 },
  { name: 'Ginger Snap Cookie', category: 'Cookies', price: 1.25, quantity: 90 },

  // Savory Snacks
  { name: 'Samosa', category: 'Savory Snacks', price: 2.00, quantity: 80 },
  { name: 'Kachori', category: 'Savory Snacks', price: 2.25, quantity: 80 },
  { name: 'Dhokla', category: 'Savory Snacks', price: 3.00, quantity: 70 },
  { name: 'Vada Pav', category: 'Savory Snacks', price: 2.50, quantity: 100 },
  { name: 'Paneer Tikka Skewer', category: 'Savory Snacks', price: 6.00, quantity: 40 },
  { name: 'Spring Roll', category: 'Savory Snacks', price: 2.00, quantity: 60 },
  { name: 'Momo', category: 'Savory Snacks', price: 1.50, quantity: 90 },

  // Beverages
  { name: 'Masala Chai', category: 'Beverages', price: 3.50, quantity: 150 },
  { name: 'Filter Coffee', category: 'Beverages', price: 3.75, quantity: 120 },
  { name: 'Lassi', category: 'Beverages', price: 4.50, quantity: 100 },
  { name: 'Mango Shake', category: 'Beverages', price: 5.00, quantity: 90 },
  { name: 'Iced Tea', category: 'Beverages', price: 3.00, quantity: 110 },
  { name: 'Jaljeera', category: 'Beverages', price: 2.50, quantity: 130 },
  { name: 'Fresh Lime Soda', category: 'Beverages', price: 3.00, quantity: 140 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected for final seeding...');

    await Sweet.deleteMany({});
    console.log('Cleared existing sweets.');

    const result = await Sweet.insertMany(allSweets, { ordered: false });
    console.log(`Successfully seeded ${result.length} new items with USD prices.`);

  } catch (err) {
    if (err.code === 11000) {
      console.log(`Added ${err.result.nInserted} new items. Some items were duplicates and were skipped.`);
    } else {
      console.error('Database seeding failed:', err);
    }
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

seedDB();
