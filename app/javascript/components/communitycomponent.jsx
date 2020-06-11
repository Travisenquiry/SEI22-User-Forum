import React from 'react'
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Communitycomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      communities: []
    }
    const url = '/communities.json'
    axios.get(url).then((response) =>{
      const data = response.data;
      this.setState({ communities: data})
    }).catch((error)=>{
      console.log(error);
    })
  }

  getCommunities(){
  const url = '/communities.json';
  axios.get(url)
    .then((response) => {
      const data = response.data
      let search = document.getElementById("name-input").value;
      let filteredData = data.filter(filtered => {
        return filtered.title.toLowerCase().includes(search.toLowerCase());
      });
      this.setState({ communities: filteredData })
    }).catch((error)=>{
      console.log(error);
    })
  }

  render(){
    let communities = this.state.communities.map((community, index) => {
      let link = "/community/" + String(community.id);
      return(
        <div key={index}>
          <a href={link}>{community.title}</a>
        </div>
      );
    });
    return(
      <div>
        <div><h5>Community List</h5></div>
        <div><input id="name-input" onKeyDown={()=>{ this.getCommunities() }} placeholder="Search"></input></div>
        <InfiniteScroll
          dataLength={this.state.communities.length}
        >
          {communities}
        </InfiniteScroll>
      </div>
    );
  }
}