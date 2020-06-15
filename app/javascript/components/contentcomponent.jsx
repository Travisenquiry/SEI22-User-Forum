import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);

  }


  render(){
    let topicGrab = document.getElementById("topic-id");
    let topicData = JSON.parse(topicGrab.getAttribute('data'));
    let userGrab = document.getElementById("user-name");
    let postedUser = JSON.parse(userGrab.getAttribute('data'));
    return(
      <div>
        <div id="topic-title">
          <h5>{topicData.title}</h5>
        </div>
        <div id="topic-content">
          <h6>By: {postedUser[0].username}</h6>
          <div style={{ width: "500px" }}>
            <img src={topicData.image_url} alt="" className="responsive-img" style={{ maxHeight: "50%"}}></img>
          </div>
          <p>{topicData.content}</p>
        </div>
      </div>
    );
  }
}