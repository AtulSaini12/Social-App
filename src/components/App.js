import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar } from '.';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    console.log('post ::: ', posts);

    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={posts} /> */}
          {/* <link to="/">Home</link> */}
          {/* <Route path="/" Component={Home} /> */}

          <Switch>
            <Route
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps)(App);
