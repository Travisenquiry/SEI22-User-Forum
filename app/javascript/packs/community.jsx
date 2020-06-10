// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Communitycomponent from '../components/communitycomponent'
import Topiccomponent from '../components/topiccomponent'

const Community = props => (
  <div className="container">
    <div className="row">
      <div className="col s8">
        <Topiccomponent />
      </div>
      <div className="col s3 offset-s6" style={{position: "fixed"}}>
        <Communitycomponent />
      </div>
    </div>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Community />,
    document.body.appendChild(document.createElement('div')),
  )
})