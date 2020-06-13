import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
      splicedTopics: [],
      topicsHasMore: true
    }
    let communityId = JSON.parse(document.getElementById('community-id').getAttribute('data'));
    if(communityId === null){
      const url = '/topics.json'
      axios.get(url).then((response) =>{
        const data = response.data;
        this.setState({ topics: data.reverse()});
        this.setState({ splicedTopics: this.state.topics.splice(0, 10) });
      }).catch((error)=>{
        console.log(error);
      })
    }else {
      const url = '/topics.json'
      axios.get(url).then((response) =>{
        const data = response.data.reverse();
        let search = document.getElementById("community-id");
        let communityData = JSON.parse(search.getAttribute('data'));
        let filteredData = data.filter(filtered => {
          return filtered.community.id === communityData.id;
        });
        this.setState({ topics: filteredData})
        this.setState({ splicedTopics: this.state.topics.splice(0, 10) });
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    if (this.state.topics.length <= 0) {
      this.setState({ topicsHasMore: false });
      return;
    }

    setTimeout(() => {
      this.setState({
        splicedTopics: this.state.splicedTopics.concat(this.state.topics.splice(0, 2))
      });
    }, 1500);
  };


  render(){
    let search = document.getElementById("community-id");
    let communityData = JSON.parse(search.getAttribute('data'));
    let title;
    let topicList;
    let topicLink;

    if(communityData === null){
      title = "Index";
      topicList = this.state.splicedTopics.map((topic, index) => {
        topicLink = "/community/" + topic.community.id + "/topics/" + topic.id;
        return (
          <div key={index}>
            <a href={topicLink}>{topic.title}</a>
          </div>
        )
      });
    }else {
      title = communityData.title;
      topicList = this.state.splicedTopics.map((topic, index) => {
        topicLink = "/community/" + topic.community.id + "/topics/" + topic.id;
        return (
          <div key={index}>
            <a href={topicLink}>{topic.title}</a>
          </div>
        )
      });
    }
    return(
      <div>
        <div><h5>{title}</h5></div>
        <div id="scrollableDiv" style={{ height: 200, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={this.state.splicedTopics.length}
            next={this.fetchMoreData}
            hasMore={this.state.topicsHasMore}
            loader={<p>You may be loading or there is nothing here, go away!</p>}
            scrollableTarget="scrollableDiv"
            endMessage={
            <p>
              <b>That's all folks!</b>
            </p>
          }
          >
            {topicList}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}