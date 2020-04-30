import React from 'react';
import Image from './Image';
import NotFound from './NotFound';
const ListImg = props => { 
    const images = props.Images.map( image=>
        <Image photo={image} key={image.id} />
    )
    return(
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {
                    (props.loading)
                    ? <h2>Loading ....</h2>
                    : props.Images.length > 0 
                        ? images
                        : <NotFound />
                }
            </ul>
        </div>
    );
}

export default ListImg;