import React, { Component } from 'react';
import axios from 'axios';
import PostComment from './PostComment';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            loading: true
        }

        this._isMounted = false;
        this.cancelToken = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    async getResponse() {
        const vm = this;
        const url = 'http://localhost:5000/comments/' + this.props.id + '/?nocache=' + new Date().getTime();
        const response = await axios.get(url, {
            cancelToken: new axios.CancelToken(function executor(cancel) {
                vm.cancelToken = cancel;
            })
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request `' + url + '` interrupted.');
            }
        });

        if (! this._isMounted || ! response) {
            return;
        }

        const data = response.data;

        if (! data || ! data.message) {
            this.setState({
                comments: data,
                loading: false
            });
        }
    }

    renderItems() {
        const data = this.state.comments;

        return (
            <ul>
                {data.map((item) => {
                    const date = new Date(item.createdAt);
                    return (
                        <li key={item.id}>
                            <div className="box" title={item.title}>
                                <h5>{item.name}</h5>
                                <p>{item.text}</p>
                                <div className="created-at">{date.toUTCString()}</div>
                            </div>
                        </li>
                    );
                })}
                <PostComment id={this.props.id} />
            </ul>
        )
    }

    render() {
        if (this.state.comments.length === 0) {
            this.getResponse();
        }

        if (this.state.loading) {
            return (
                <div className="Comments">
                    <h2>Loading comments...</h2>
                </div>
            );
        }

        return (
            <div className="Comments">
                <h2>{this.state.comments.length} Comments</h2>
                {this.renderItems()}
            </div>
        );
    }

    componentWillUnmount() {
        if (this.cancelToken) {
            this.cancelToken();
        }

        this._isMounted = false;
    }
}


export default Comments;
