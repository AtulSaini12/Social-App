import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';

class CreatePost extends react.Component {

    constructor(props){
        super(props);
        this.state = {
            content = '',
        }
    }

    handleOnClick = ()=>{
        //dispatch an action
        this.dispatch(createPost(this.state.content));
    }

    handleChange = (e)=>{
        this.setState({
            content = e.target.value,
        });
    }

    render() {
        return (
            <div className="create-post">
                <textarea className="add-post" value={this.state.content} onChange={this.handleChange} />
                <div><button id="add-post-btn" onClick={this.handleOnClick}>
                    ADD POST
                    </button></div>
            </div>
        );
    }
}


export default connect()(CreatePost);