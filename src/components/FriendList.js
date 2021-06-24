import React from 'react';
import { connect } from 'react-redux';

function FriendList(props) {
  const { friends } = this.props;
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {friends && friends.length === 0 && (
        <div className="no-friends">No Friends Found!!!</div>
      )}

      {friends &&
        friends.map((friend) => {
          <FriendListItem friend={friend.to_user} key={friend._id} />;
        })}
    </div>
  );
}

export default FriendList;
