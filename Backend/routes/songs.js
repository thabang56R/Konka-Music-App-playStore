import express from "express";
import multer from "multer";
import path from "path";
import Song from "../models/Song.js";

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure 'uploads' exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Upload new song
router.post(
  "/upload",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, artist } = req.body;
      if (!req.files || !req.files.audio) {
        return res.status(400).json({ msg: "Audio file required" });
      }

      const song = {
        title,
        artist,
        audioUrl: `/uploads/${req.files.audio[0].filename}`,
        coverUrl: req.files.cover
          ? `/uploads/${req.files.cover[0].filename}`
          : null,
      };

      const newSong = await Song.create(song);
      res.json(newSong);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Upload failed" });
    }
  }
);

// Update song cover image
router.patch(
  "/:id/cover",
  upload.single("cover"),
  async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) return res.status(404).json({ msg: "Song not found" });

      if (!req.file) return res.status(400).json({ msg: "No image uploaded" });

      song.coverUrl = `/uploads/${req.file.filename}`;
      await song.save();

      res.json(song);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to update cover" });
    }
  }
);

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch songs" });
  }
});

export default router;
