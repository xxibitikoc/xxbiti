import React from 'react';
import '../assets/poza277.css';

function DynamicImage({ imageUrl }) {
  return (
    <div className="center-container">
      <div id="imageId" className="centered-content">
        <img id="dynamicImage" src={imageUrl} alt="no image" />
      </div>
      <br /><br />
      <p class="dodo">Your browser will prompt you to complete verification using your Passkey. Please follow the instructions to complete verification.</p>
    </div>
  );
}

export default DynamicImage;
