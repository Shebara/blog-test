import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import ListPosts from '../components/ListPosts';
import store from '../store'

describe('ListPosts', () => {
    it('should render without errors', () => {
        const component = shallow(
            <Provider store={store}>
                <ListPosts />
            </Provider>
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
