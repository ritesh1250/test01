import React from 'react';
import OtherVideoListItem from './OtherVideoListItem';

const OtherVideoList = (props) => {
  // console.log( props.videos)
  const videoItems = props.videos.map((video) => {
    return (
      <OtherVideoListItem
        onVideoSelect={props.onVideoSelect}
        key={video.id}
        video={video} />
    );
  });
  return (

    <ul className="col-md-12" >

      {videoItems}

    </ul>

  );
};

export default OtherVideoList;