import React from 'react';
import { shallow } from 'enzyme';
import { FormFieldsComponent } from '../form-fields';
import FormActions from '../form-actions/form-actions';
import UserInputSection from './user-input-section';


describe('SubmitAction', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      cardID: '4947dff0-45c7-4c16-8582-2297e4e28b81',
      className: 'Srikanth',
      action: {
        id: '6bf64604-1393-4076-aeab-30a91276e20d',
        user_input: [],
      },
    };

    component = shallow(<UserInputSection {...props} />);
  });

  describe('Render', () => {

    it('should render hyper text elements with class name', () => {
      const ele = component.find('div.Srikanth');

      expect(ele.length).toBe(1);
    });

    it('should render FormFieldsComponent component', () => {
      const formFieldsComponent = component.find(FormFieldsComponent);

      expect(formFieldsComponent.length).toBe(1);
    });

    it('should render FormActions component', () => {
      const formActionsComponent = component.find(FormActions);

      expect(formActionsComponent.length).toBe(1);
    });

  });
});
