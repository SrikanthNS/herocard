import React from 'react';
import { shallow } from 'enzyme';
import FieldValidation from './field-validation';

describe('FieldValidation', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FieldValidation />);
  });

  describe('Render', () => {
    it('should render HiddenField Component', () => {
      const fieldValidationDiv = component.find('div.hccf-form-field__validation-message');

      expect(fieldValidationDiv.length).toBe(1);
    });
  });
});
