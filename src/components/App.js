import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/posts';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return <div>Social App</div>;
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect()(App);
