import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: []
    }
    const url = '/topics.json'
    axios.get(url).then((response) =>{
      const data = response.data;
      this.setState({ topics: data})
    }).catch((error)=>{
      console.log(error);
    })
  }

  render(){
      /*const communities = this.state.communities.map((filteredCommunity, index)=>{
      let dbIndex = index + 1;
      //let link = "/onepage/" + String(dbIndex);
      //<!-- <a href={link}>Show</a>
      return (<div>
        <p>{filteredCommunity.title}</p>
      </div>);
    });*/
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