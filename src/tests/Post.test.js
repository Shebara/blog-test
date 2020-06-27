import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import Post from '../pages/Post';
import store from '../store';

describe('Post', () => {
    it('should render without errors', () => {
        const component = mount(
            <Provider store={store}>
                <Post />
            </Provider>
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
