const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(`Server running ${PORT}`));
  })
  .catch(err => {
    console.error('DB error', err);
  });
