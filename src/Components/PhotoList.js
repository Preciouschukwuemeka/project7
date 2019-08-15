import React from 'react';
import Photo from './Photo';
import NoResults from './NoResults';

const PhotoList = (props) => {
  
  //props has images and title.  if no image, then goes to the no results page.  
  //Otherwise, maps the images to Photos with unique keys and sets a title

  const results = props.images;
  let title = "";
  let images;
  if (results.length > 0) {
    images = results.map(image => <Photo url={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id}/>);
    title = props.title
  } else {
    images = <NoResults />;
  }

    return (
        <div className="photo-container">
        <h2>{title}</h2>
        <ul>
          {images}
        </ul>
      </div>
    );
}

export default PhotoList;