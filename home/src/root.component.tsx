// src/components/Root.js
import React from "react";
import './Carousel.css';

const imageLink = "https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/site-images/664a9f1cd9cd2.webp";

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 'auto',
  maxHeight: '100vh', // Limits the image height to the viewport height
  objectFit: 'cover',
};

export default function Root(props) {
  return (
    <div>
      <img src={imageLink} alt="Cover" style={imageStyle} />
    </div>
  );
}
