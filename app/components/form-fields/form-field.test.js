import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import FieldComponent from './form-field';
import FieldElementComponent from './form-element';
import FieldLabel from './field-label';
import FieldValidation from './field-validation';

describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      userInput: cardData[0].actions[0].user_input[0],
      formID: 'Old_Action_Labels_Jira_Comment',
    };
    component = shallow(<FieldComponent {...props} />);
  });

  describe('Render', () => {
    it('should render a FieldComponent div Component', () => {
      const divElement = component.find(`div.hccf-form-field--${props.userInput.format}`);

      expect(divElement.length).toBe(1);
    });

    it('should render a FieldElementComponent Component', () => {
      const fieldElementComponent = component.find(FieldElementComponent);

      expect(fieldElementComponent.length).toBe(1);
    });

    it('should render a FieldElementComponent Component', () => {
      const fieldLabel = component.find(FieldLabel);

      expect(fieldLabel.length).toBe(1);
    });

    it('should render a FieldValidation Component', () => {
      const fieldValidation = component.find(FieldValidation);

      expect(fieldValidation.length).toBe(1);
    });
  });
});
