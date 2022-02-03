import React from 'react';
import "../style.css"
import { Scrollbars } from 'rc-scrollbars';
import notthumbnail from "../../../assets/icons/notthumbnail.png"
const OtherVideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = "https://images.unsplash.com/photo-1435224654926-ecc9f7fa028c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80";
  var mydate = new Date(video.created_date)
  const date = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(mydate);
  const time = new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(mydate);


  return (
    // <Scrollbars>
    <li onClick={() => onVideoSelect(video)} className="list-group-item list-item-custom ">

      <div className="video-list media">
        <div className="media-right">
          <img className="media-object" style={{ marginRight: 5 }} width="120px" height="80px" src={notthumbnail} alt="list" />
        </div>
        <div className="media-body" style={{ marginLeft: 10 }} >
          <div className="" style={{ fontWeight: "bold", width: 5 }}>
            {Buffer.from(video.post_description, 'utf8').toString().substring(0,20)}
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
    // </Scrollbars>
  );
};

export default OtherVideoListItem;