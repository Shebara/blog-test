import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ListPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        this._isMounted = false;
        this.cancelToken = false;
    }

    componentDidMount() {
        this._isMounted = true;
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

        if (! this._isMounted) {
            return;
        }

        const data = response.data;

        if (! data || ! data.message) {
            this.setState({data: data});
            localStorage.setItem('data', JSON.stringify(data));
        }
    }

    renderItems() {

        const data = this.state.data;

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
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        )
    }

    render() {

        this.getResponse();

        return (
            <div className="NewsList">
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


export default ListPosts;
