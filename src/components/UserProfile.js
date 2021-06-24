import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';

class UserProfile extends Component {
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;
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
          <div className="field-value">Atul Saini</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">my@yours.com</div>
        </div>

        <div className="btn-grp">
          <button className="button save-btn" onClick={this.handleSave}>
            ADD FRIEND
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(UserProfile);
