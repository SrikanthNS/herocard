import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Accordion from './accordion';

configure({ adapter: new Adapter() });

describe('Accordion component', () => {
  const component = shallow(<Accordion />);
  describe('render', () => {
    it('should contain div with text', () => {
      const div = component.find('div');

      expect(div.length).toBe(1);
    });
  });
});