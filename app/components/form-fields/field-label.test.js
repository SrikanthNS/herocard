import React from 'react';
import { shallow } from 'enzyme';
import FieldLabel from './field-label';

describe('FieldLabel', () => {
  let component;
  const props = {
    labelText: 'Label Text',
  };

  beforeEach(() => {
    component = shallow(<FieldLabel {...props} />);
  });

  describe('Render', () => {
    it('should render HiddenField Component', () => {
      const fieldLable = component.find('label');

      expect(fieldLable.length).toBe(1);
    });
  });
});
