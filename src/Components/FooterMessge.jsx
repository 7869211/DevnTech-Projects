// Footer.js
import React from 'react';
import '../Styles/FooterMessage.css';

function FooterMessage({ message }) {
  return (
    <div className="footer-message">
      <p>{message}</p>
    </div>
  );
}

export default FooterMessage;
