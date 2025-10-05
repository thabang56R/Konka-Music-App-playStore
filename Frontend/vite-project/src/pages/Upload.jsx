import React, { useState } from "react";
import api from "../services/api";

function Upload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !audio) {
      setMessage("Title, Artist, and Audio are required.");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("artist", artist);
    form.append("audio", audio);
    if (cover) form.append("cover", cover);

    try {
      await api.post("/songs/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Song uploaded successfully!");
      setTitle("");
      setArtist("");
      setAudio(null);
      setCover(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload New Song</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Song Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Artist</label>
          <input
            type="text"
            className="form-control"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            className="form-control"
            onChange={(e) => setAudio(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cover Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Upload;
