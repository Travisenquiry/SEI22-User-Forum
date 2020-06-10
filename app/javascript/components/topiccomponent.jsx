import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: []
    }
    if(document.getElementById('community-id').data == null){
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
        let search = document.getElementById("community-id").id;
        console.log(search);
        let filteredData = data.filter(filtered => {
          return filtered.id === search;
        });
        this.setState({ topics: filteredData})
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  render(){
    let topics = this.state.topics;
    return(
      <div>
        <div><h5>Topics</h5></div>
        <InfiniteScroll
          dataLength={this.state.topics.length}
        >
          {this.state.topics.map((topic, index) => (
            <div key={index}>
              {topic.title}
              {topic.image_url}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}