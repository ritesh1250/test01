import React from 'react';
import "../style.css"

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.thumbnail;
  var mydate = new Date(video.createdAt)
  const date = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(mydate);
  const time = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(mydate);

  return (
    <li onClick={() => onVideoSelect(video)} className="list-group-item list-item-custom ">

      <div className="video-list media">
        <div className="media-right">
          <img  className="media-object" style={{objectFit:"contain" ,marginRight: 5 }} width="120px" height="80px" src={imageUrl} alt="list" />
        </div>
        <div className="media-body" style={{ marginLeft: 10 }} >
          <div className="" style={{ fontWeight: "bold" }}>
            {video.caption ? decodeURI(decodeURIComponent(video.caption)).replace(/%23/g, "#").replace(/\+/g, ' ').substring(0, 20):"No Caption"}
          </div>
          <div className="media-heading-channel-title" style={{ fontSize: "auto" }}>
            {date}
          </div>
          <div className="media-heading-channel-date" style={{ fontSize: "auto" }} >
            {time}
          </div>
        </div>

      </div>
    </li>
  );
};

export default VideoListItem;