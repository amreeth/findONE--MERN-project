import React from "react";
import "./MoreDetails.css";

const MoreDetails = ({ images }) => {
  console.log(images);
  let image1;
  let image2;
  let image3;

  if (images.length > 0) {
    image1 = images[0].url;
    image2 = images[1].url;
    image3 = images[2].url;
  }

  return (
    <>
      {images.length > 0 ? (
        <div>
          <input type="radio" name="slider" id="item-1" checked />
          <input type="radio" name="slider" id="item-2" />
          <input type="radio" name="slider" id="item-3" />
          <div class="cards">
            <label class="card-match" for="item-1" id="song-1">
              <img className="match-card-img" src={image1} />
            </label>
            <label class="card-match" for="item-2" id="song-2">
              <img className="match-card-img" src={image2} />
            </label>
            <label class="card-match" for="item-3" id="song-3">
              <img className="match-card-img" src={image3} />
            </label>
          </div>
        </div>
      ) : (
        <div>
          <h2>User not added images</h2>
        </div>
      )}
    </>
  );
};

export default MoreDetails;
