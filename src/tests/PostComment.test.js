import React from 'react';
import { shallow } from 'enzyme';
import PostComment from '../components/Comments';

describe('PostComment', () => {
    it('should render without errors', () => {
        const component = shallow(<PostComment />);

        expect(component.getElements()).toMatchSnapshot();
    });
});
