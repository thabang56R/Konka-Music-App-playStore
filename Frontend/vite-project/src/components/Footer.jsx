import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <h5>Get the App</h5>
          <div className="d-flex gap-2">
            <a href="#"><img src="/google.png" alt="Google Play" style={{height:'40px'}} /></a>
            <a href="#"><img src="/apple.png" alt="App Store" style={{height:'40px'}} /></a>
          </div>
        </div>
        <div>
          <h5 className="mb-2">Follow Us</h5>
          <div className="d-flex gap-3">
            <a href="#" className="text-light"><i className="fab fa-facebook fa-lg"></i></a>
            <a href="#" className="text-light"><i className="fab fa-twitter fa-lg"></i></a>
            <a href="#" className="text-light"><i className="fab fa-instagram fa-lg"></i></a>
            <a href="#" className="text-light"><i className="fab fa-youtube fa-lg"></i></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-3 small text-muted">
        © 2025 Konka MusicAppStore. All rights reserved.
      </div>
    </footer>
  );
}
