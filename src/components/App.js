import React from 'react';
import { connect } from 'react-redux';
import * as jwtDecode from 'jwt-decode';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Login, Signup, Settings, UserProfile } from '.';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/fetchUserFriends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: 'login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());

    //const token = localStorage.getItem('token');
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwtDecode(token);

      console.log('user :: ', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );

      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts } = this.props;
    const { auth } = this.props;
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
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedIn={auth.isLoggedIn}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLoggedIn}
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
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
