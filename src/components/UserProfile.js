import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/fetchUserFriends';
import { fetchUserProfile } from '../actions/profile';
import { APIUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriends = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user)._id.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriend = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfully!',
      });
      this.props.dispatch(addFriend(data.data.frienship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriend = () => {
    const { match } = this.props;
    const url = APIUrls.removeFriend(match.params.userId);

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, extra);
    const data = await response.json();

    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend Removed Successfully',
      });
      this.props.dispatch(removeFriend(match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading ...</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriends();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">
            Atul Saini
            {/* {user.name} */}
          </div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">
            my@yours.com
            {/* {user.email} */}
          </div>
        </div>

        <div className="btn-grp">
          {isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriend}
            >
              REMOVE FRIEND
            </button>
          ) : (
            <button className="button save-btn" onClick={this.handleSave}>
              ADD FRIEND
            </button>
          )}

          {success && (
            <div className="alert success-dailog">{success.message}</div>
          )}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile: profile,
    friends,
  };
}

export default connect(mapStateToProps)(UserProfile);
