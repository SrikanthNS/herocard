import React from 'react';
import { shallow } from 'enzyme';
import Accordion from '../../accordion/accordion';

describe('AssessmentIssues component', () => {
  const component = shallow(<Accordion />);
  describe('render', () => {
    it('should contain div with text', () => {
      const div = component.find('div');

      expect(div.length).toBe(1);
      expect(div.text()).toBe('AssessmentIssues');
    });
  });
});
