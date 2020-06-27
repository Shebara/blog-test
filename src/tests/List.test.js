import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import List from '../pages/List';
import store from '../store';

describe('List', () => {
    it('should render without errors', () => {
        const component = mount(
            <Provider store={store}>
                <List />
            </Provider>
        );

        expect(component.getElements()).toMatchSnapshot();
    });
});
