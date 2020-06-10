import React from 'react'
import axios from 'axios';

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
      const communities = this.state.communities.map((filteredCommunity, index)=>{
      let dbIndex = index + 1;
      //let link = "/onepage/" + String(dbIndex);
      //<!-- <a href={link}>Show</a>
      return (<div>
        <p>{filteredCommunity.title}</p>
      </div>);
    });
    return(
      <div>
        <div><input id="name-input" onKeyDown={()=>{ this.getCommunities() }}></input></div>
        {communities}
      </div>
    );
  }
}