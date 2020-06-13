import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Commentscomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comments: []
    }
    const url = '/comments.json'
    axios.get(url).then((response) =>{
      const data = response.data;
      let search = document.getElementById("topic-id");
      let topicData = JSON.parse(search.getAttribute('data'));
      console.log(data);
      let filteredData = data.filter(filtered => {
        return filtered.topic_id === topicData.id;
      });
      this.setState({ comments: filteredData})
    }).catch((error)=>{
      console.log(error);
    })
  }


  render(){
    let comments = this.state.comments;
    let commentList = this.state.comments.map((comment, index) => {
      return (
        <div key={index}>
          <div>
            {comment.content}
          </div>
        </div>
      )
    });
    return(
      <div>
        <h4>Comments</h4>
        <InfiniteScroll
          dataLength={this.state.comments.length}
        >
          {commentList}
        </InfiniteScroll>
      </div>
    );
  }
}