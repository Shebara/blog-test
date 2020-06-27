import React from 'react';
import { shallow } from 'enzyme';
import Error from '../components/Error';

describe('Error', () => {
    it('should render without errors', () => {
        const component = shallow(<Error />);

        expect(component.getElements()).toMatchSnapshot();
    });
});
