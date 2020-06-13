import React from 'react'
import axios from 'axios';
import { passCsrfToken } from '../util/helpers'

export default class Commentboxcomponent extends React.Component {
  constructor(props){
    super(props);
    let currentTopic = JSON.parse(document.getElementById('topic-id').getAttribute('data'));
    let currentCommunity = JSON.parse(document.getElementById('community-id').getAttribute('data'));
    this.state = {
      comment: '',
      topic: currentTopic.id
    }
  }

  componentDidMount() {
    passCsrfToken(document, axios)
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const comment = {
      comment: this.state.comment,
      topic: this.state.topic
    }

    axios.post('/comments', comment)
      .then(response => {
        let currentTopic = JSON.parse(document.getElementById('topic-id').getAttribute('data'));
        let currentCommunity = JSON.parse(document.getElementById('community-id').getAttribute('data'));
        let link = "/community/" +currentCommunity.id + "/topics/" + currentTopic.id;
        window.location.href = link;
      })

  }

  render(){
    return(
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div>
            <textarea id="comment-by-user" onChange={this.handleChange}>
            </textarea>
          </div>
          <div>
            <button id="submit-comment">Submit Comment</button>
          </div>
        </form>
      </div>
    );
  }
}