// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Communitycomponent from '../components/communitycomponent'
import Topiccomponent from '../components/topiccomponent'

const Topic = props => (
  <div className="container">
    <div className="row">
      hello
    </div>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Topic />,
    document.body.appendChild(document.createElement('div')),
  )
})