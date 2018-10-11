import React from 'react';
import { shallow } from 'enzyme';
import InputComponent from './input-component';


describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      type: 'text',
      name: 'first_name',
      id: '6bf64604-1393-4076-aeab-30B91276e20d__first_name',
      dataFieldLabel: 'First name',
      dataValidation: 'required',
      placeholder: '',
      onKeyUp: jasmine.createSpy(),
      onBlur: jasmine.createSpy(),
    };

    component = shallow(<InputComponent {...props} />);
  });

  describe('Render', () => {
    it('should render textarea element', () => {
      const inputEle = component.find('input');

      expect(inputEle.length).toBe(1);
    });

    it('should render textarea element when no dataValidation', () => {
      component.setProps({
        dataValidation: '',
      });

      const inputEle = component.find('input');

      expect(inputEle.length).toBe(1);
    });

    it('should have onKeyUp handler to be attached to input ', () => {
      const event = {
        currentTarget: 'aaa',
      };
      const inputEle = component.find('input');
      inputEle.props().onKeyUp(event);

      expect(props.onKeyUp).toHaveBeenCalledWith(event, event.currentTarget);
    });

    it('should have onBlur handler to be attached to input ', () => {
      const event = {
        currentTarget: 'aaa',
      };
      const inputEle = component.find('input');
      inputEle.props().onBlur(event);

      expect(props.onBlur).toHaveBeenCalledWith(event, event.currentTarget);
    });
  });
});
