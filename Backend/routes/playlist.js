const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const playlist = require('../routes/playlist');


// create playlist
router.post('/', auth, async (req, res) => {
const { name } = req.body;
const playlist = new Playlist({ name, owner: req.user._id, songs: [] });
await playlist.save();
res.json(playlist);
});


// add song
router.post('/:id/add', auth, async (req, res) => {
const playlist = await Playlist.findById(req.params.id);
if(!playlist) return res.status(404).json({ message: 'Not found' });
if(!playlist.owner.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
playlist.songs.push(req.body.songId);
await playlist.save();
res.json(playlist);
});


// list user's playlists
router.get('/', auth, async (req, res) => {
const lists = await playlist.find({ owner: req.user._id }).populate('songs');
res.json(lists);
});


module.exports = router;