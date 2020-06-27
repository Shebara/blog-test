import React from 'react';
import { shallow } from 'enzyme';
import ListPosts from '../components/ListPosts';

describe('ListPosts', () => {
    it('should render without errors', () => {
        const component = shallow(<ListPosts />);

        expect(component.getElements()).toMatchSnapshot();
    });
});
