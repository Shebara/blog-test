import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setData } from '../store/actions';

function mapDispatchToProps(dispatch) {
    return {
        setData: data => dispatch(setData(data))
    };
}

class ListPosts extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;
        this.cancelToken = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    async appendCommentCount(data) {
        const vm = this;
        const url = 'http://localhost:5000/comments/' + data.id;
        const response = await axios.get(url, {
            cancelToken: new axios.CancelToken(function executor(cancel) {
                vm.cancelToken = cancel;
            })
        }).catch(function (thrown) {
            if (axios.isCancel(thrown)) {
              console.log('Request `' + url + '` interrupted.');
            }
        });

        data.commentCount = response.data && response.data.length > 0 ? response.data.length : 0;

        return data;
    }

    async getResponse() {
        const vm = this;
        const url = 'http://localhost:5000/post';
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

        let data = response.data;

        if (data && ! data.message) {
            data = await Promise.all(data.map(item => this.appendCommentCount(item)))

            this.props.setData({ data });
            localStorage.setItem('data', JSON.stringify(data));
        }
    }

    renderItems() {
        const data = this.props.data;

        return (
            <ul>
                {data.map((item) => {
                    const link = '/post/' + item.id;
                    return (
                        <li key={item.id}>
                            <Link to={link}>
                                <div className="box" title={item.title}>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <div className="created-at">{item.createdAt}</div>
                                    <div className="comments">{item.commentCount} comments</div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        )
    }

    render() {
        if (this.props.data.length === 0) {
            this.getResponse();

            return (
                <div>
                    <h3>Loading posts...</h3>
                </div>
            );
        }

        return (
            <div className="ListPosts">
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


export default connect(null, mapDispatchToProps)(ListPosts);
