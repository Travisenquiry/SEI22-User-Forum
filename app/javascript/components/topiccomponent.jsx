import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: []
    }
    let communityId = JSON.parse(document.getElementById('community-id').getAttribute('data'));
    if(communityId === null){
      const url = '/topics.json'
      axios.get(url).then((response) =>{
        const data = response.data;
        this.setState({ topics: data})
      }).catch((error)=>{
        console.log(error);
      })
    }else {
      const url = '/topics.json'
      axios.get(url).then((response) =>{
        const data = response.data;
        let search = document.getElementById("community-id");
        let communityData = JSON.parse(search.getAttribute('data'));
        console.log(data);
        let filteredData = data.filter(filtered => {
          console.log(filtered);
          return filtered.community.id === communityData.id;
        });
        this.setState({ topics: filteredData})
      }).catch((error)=>{
        console.log(error);
      })
    }
  }


  render(){
    let topics = this.state.topics;
    let search = document.getElementById("community-id");
    let communityData = JSON.parse(search.getAttribute('data'));
    let title;
    if(communityData === null){
      title = "Index";
    }else {
      title = communityData.title;
    }
    let topicList = this.state.topics.map((topic, index) => {
      let topicLink = "/community/" + communityData.id + "/topics/" + topic.id;
      return (
        <div key={index}>
          <a href={topicLink}>{topic.title}</a>
        </div>
      )
    });
    return(
      <div>
        <div><h5>{title}</h5></div>
        <InfiniteScroll
          dataLength={this.state.topics.length}
        >
          {topicList}
        </InfiniteScroll>
      </div>
    );
  }
}