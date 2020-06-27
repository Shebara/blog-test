import React, { Component } from 'react';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { postComment } from '../store/actions';

function mapDispatchToProps(dispatch) {
    return {
        postComment: comment => dispatch(postComment(comment))
    };
}

class PostComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            comment: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }

    handleChange({target}) {
        const newState = this.state;
        newState[target.name] = target.value;

        this.setState(newState);
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (! this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();

            return;
        } else {
            console.log('valid');
        }

        const comment = {
            id: this.props.newId,
            postId: this.props.id,
            name: this.state.name,
            text: this.state.comment,
            createdAt: Date.now()
        };

        const url = 'http://localhost:5000/comment/new';
        const response = await axios.post(url, comment);

        if (response) {
            console.log(response.data);
        }

        this.props.postComment(comment);
        this.setState({
            name: '',
            comment: ''
        });
    }

    render() {
        return (
            <li className="NewComment">
                <form onSubmit={this.handleSubmit}>
                    <h3>New comment:</h3>
                    <div>
                        <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Your Name" />
                        {this.validator.message('name', this.state.name, 'required|alpha')}
                    </div>
                    <div>
                        <textarea name="comment" value={this.state.comment} onChange={this.handleChange} placeholder="Your Comment" />
                        {this.validator.message('comment', this.state.comment, 'required|alpha')}
                    </div>
                    <div><button type="submit">Post</button></div>
                </form>
            </li>
        );
    }
}

export default connect(null, mapDispatchToProps)(PostComment);
