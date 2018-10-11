import React from 'react';
import { shallow } from 'enzyme';
import { userInput } from '../../mocks/mock-data';
import { InputComponent, TextAreaComponent, SelectComponent } from '../form-controls';
import FieldElementComponent from './form-element';

describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      userInput: userInput[0],
      formID: 'Old_Action_Labels_Jira_Comment',
    };
    component = shallow(<FieldElementComponent {...props} />);
  });

  describe('Render', () => {
    it('should render a FieldElementComponent Component', () => {
      const inputComponent = component.find(InputComponent);

      expect(inputComponent.length).toBe(1);
    });

    it('should render a FieldElementComponent Component', () => {
      component.setProps({
        userInput: userInput[1],
      });
      const textAreaComponent = component.find(TextAreaComponent);

      expect(textAreaComponent.length).toBe(1);
    });

    it('should render a FieldElementComponent Component', () => {
      component.setProps({
        userInput: userInput[2],
      });
      const selectComponent = component.find(SelectComponent);

      expect(selectComponent.length).toBe(1);
    });
  });
});
