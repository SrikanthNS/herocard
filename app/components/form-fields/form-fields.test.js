import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import FormFieldsComponent from './form-fields';
import FieldComponent from './form-field';

describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      fields: cardData[3].actions[0].user_input,
      formID: 'Old_Action_Labels_Jira_Comment',
    };
    component = shallow(<FormFieldsComponent {...props} />);
  });

  describe('Render', () => {
    it('should render a div Component', () => {
      const divElement = component.find('div');

      expect(divElement.length).toBe(1);
    });

    it('should render a FieldComponent Component', () => {
      const fieldComponent = component.find(FieldComponent);

      expect(fieldComponent.length).toBe(1);
    });
  });
});
