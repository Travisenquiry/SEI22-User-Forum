import React from 'react'
import axios from 'axios';

export default class Commentboxcomponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      comment: '',
    }
  }

  render(){
    return(
      <div>
        <div>
          <textarea id="comment-by-user">
          </textarea>
        </div>
        <div>
        <button id="submit-comment">Submit Comment</button>
        </div>
      </div>
    );
  }
}