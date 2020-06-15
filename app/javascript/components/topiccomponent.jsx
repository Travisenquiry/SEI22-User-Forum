import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Topiccomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
      splicedTopics: [],
      topicsHasMore: true,
      communityPage: false
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
    let newTopicLink;
    let description;
    let topicList;
    let topicLink;

    if(communityData === null){
      title = "All topics";
    }else {
      title = communityData.title;
      description = communityData.description;
      this.state.communityPage = true;
      newTopicLink = "/community/" + communityData.id + "/topics/new";
    }
    topicList = this.state.splicedTopics.map((topic, index) => {
      topicLink = "/community/" + topic.community.id + "/topics/" + topic.id;
      return (
        <a href={topicLink} className="collection-item" key={index}>{topic.title}</a>
      )
    });
    return(
      <div>
        <div><h5>{title}</h5></div>
        <div><h6>{description}</h6></div>
        <NewTopic warn={this.state.communityPage} link={newTopicLink}/>
        <div id="button-location"></div>
        <div id="scrollableDiv" style={{ height: 400, overflow: "auto" }}>
          <InfiniteScroll
            dataLength={this.state.splicedTopics.length}
            next={this.fetchMoreData}
            hasMore={this.state.topicsHasMore}
            scrollableTarget="scrollableDiv"
            endMessage={
            <p>
              <b>That's all folks!</b>
            </p>
          }
          >
            <div className="collection">
              {topicList}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

function NewTopic(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <a className="waves-effect waves-light btn-small" href={props.link}>New Topic</a>
  );
}