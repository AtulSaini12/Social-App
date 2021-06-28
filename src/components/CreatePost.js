import React from 'react';

class CreatePost extends react.Component {

    constructor(props){
        super(props);
        this.state = {
            content = '',
        }
    }

    handleOnClick = ()=>{
        //dispatch an action
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

export default CreatePost;