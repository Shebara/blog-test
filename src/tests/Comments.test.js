import React from 'react';
import { shallow } from 'enzyme';
import Comments from '../components/Comments';

describe('Comments', () => {
    it('should render without errors', () => {
        const component = shallow(<Comments />);

        expect(component.getElements()).toMatchSnapshot();
    });
});
