import React from 'react';
import { shallow } from 'enzyme';
import TextAreaComponent from './textarea-component';


describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      name: 'comment_body',
      id: 'HCA_Add_Comment_Salesforce_1__comment_body',
      placeholder: 'Comment',
      dataFieldLabel: 'Comment',
      dataValidation: 'required',
      onKeyUp: jasmine.createSpy(),
    };
    component = shallow(<TextAreaComponent {...props} />);
  });

  describe('Render', () => {
    it('should render textarea element', () => {
      const textAreaEle = component.find('textarea');

      expect(textAreaEle.length).toBe(1);
    });

    it('should render textarea element when no dataValidation', () => {
      component.setProps({
        dataValidation: '',
      });

      const textAreaEle = component.find('textarea');

      expect(textAreaEle.length).toBe(1);
    });

    it('should have onKeyUp handler to be attached to textarea ', () => {
      const event = {
        currentTarget: 'aaa',
      };
      const textAreaEle = component.find('textarea');
      textAreaEle.props().onKeyUp(event);

      expect(props.onKeyUp).toHaveBeenCalledWith(event, event.currentTarget);
    });
  });
});
