import React from 'react';
import { shallow } from 'enzyme';
import SelectComponent from './select-component';


describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      name: 'comment_body',
      id: '6bf64604-1393-4076-aeab-30B91276e20d__comment_body',
      placeholder: 'Comment',
      dataFieldLabel: 'Comment',
      dataValidation: 'required',
      onKeyUp: jasmine.createSpy(),
      onChange: jasmine.createSpy(),
    };
    component = shallow(<SelectComponent {...props} />);
  });

  describe('Render', () => {
    it('should render textarea element', () => {
      const selectEle = component.find('select');

      expect(selectEle.length).toBe(1);
    });

    it('should render select element when no dataValidation', () => {
      component.setProps({
        dataValidation: '',
      });

      const selectEle = component.find('select');

      expect(selectEle.length).toBe(1);
    });

    it('should have onKeyUp handler to be attached to select element ', () => {
      const event = {
        currentTarget: 'aaa',
      };
      const selectEle = component.find('select');
      selectEle.props().onKeyUp(event);

      expect(props.onKeyUp).toHaveBeenCalledWith(event, event.currentTarget);
    });

    it('should have onChange handler to be attached to select element ', () => {
      const event = {
        currentTarget: 'aaa',
      };
      const selectEle = component.find('select');
      selectEle.props().onChange(event);

      expect(props.onChange).toHaveBeenCalledWith(event, event.currentTarget);
    });

    it('should geenerate options', () => {
      const options = {
        red: 'Red',
        green: 'Green',
        blue: 'Blue',
        orange: 'Orange',
      };
      const optionsList = component.instance().generateSelectOptions(options);

      expect(optionsList.length).toBe(5);
    });
  });
});
