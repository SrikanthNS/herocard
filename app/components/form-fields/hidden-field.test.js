import React from 'react';
import { shallow } from 'enzyme';
import HiddenField from './hidden-field';

describe('HiddenField', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      name: 'name',
      value: 'value',
    };
    component = shallow(<HiddenField {...props} />);
  });

  describe('Render', () => {
    it('should render HiddenField Component', () => {
      const hiddenField = component.find('input');

      expect(hiddenField.length).toBe(1);
    });
  });
});
