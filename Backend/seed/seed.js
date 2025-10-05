const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('../models/song');

dotenv.config();

async function main(){
  await mongoose.connect(process.env.MONGO_URI);
  await Song.deleteMany({});
  const songs = [
    { title: 'Sample Track 1', artist: 'Artist A', album: 'Album 1', audioUrl: '/uploads/sample1.mp3', coverUrl: '/uploads/cover1.jpg' },
    { title: 'Sample Track 2', artist: 'Artist B', album: 'Album 2', audioUrl: '/uploads/sample2.mp3', coverUrl: '/uploads/cover2.jpg' }
  ];
  await Song.insertMany(songs);
  console.log('seeded');
  process.exit();
}
main();
