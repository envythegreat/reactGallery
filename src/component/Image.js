import React from 'react';

const Image = props => (
    <li>
    <img src={`https://farm${props.photo.farm}.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`} alt="" />
  </li>
);

export default Image;