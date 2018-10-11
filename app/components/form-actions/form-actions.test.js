import React from 'react';
import { shallow } from 'enzyme';
import CancelAction from './cancel-action';
import SubmitAction from './submit-action';
import FormActions from './form-actions';


describe('FormActions', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      cardID: '4947dff0-45c7-4c16-8582-2297e4e28b81',
      action: {
        id: '6bf64604-1393-4076-aeab-30a91276e20d',
        label: 'Add contact',
      },
    };

    component = shallow(<FormActions {...props} />);
  });

  describe('Render', () => {
    it('should render div elements with class names', () => {
      const divEle = component.find('div.hccf-card-actions__item');

      expect(divEle.length).toBe(1);
    });

    it('should render submitComp', () => {
      const submitComp = component.find(SubmitAction);

      expect(submitComp.length).toBe(1);
    });

    it('should render cancelActionComp', () => {
      const cancelActionComp = component.find(CancelAction);

      expect(cancelActionComp.length).toBe(1);
    });
  });
});
