import React from 'react';
import { shallow } from 'enzyme';
import HeroCardActions from '../../utility/actions';
import SubmitAction from './submit-action';


describe('SubmitAction', () => {
  let component;
  let props;

  beforeEach(() => {
    HeroCardActions.UserInput.submitInput = jasmine.createSpy();
    props = {
      cardID: '4947dff0-45c7-4c16-8582-2297e4e28b81',
      action: {
        id: '6bf64604-1393-4076-aeab-30a91276e20d',
        label: 'Add contact',
      },
    };

    component = shallow(<SubmitAction {...props} />);
  });

  describe('Render', () => {
    it('should render div elements with class name', () => {
      const inputEle = component.find('div.hccf-card-actions__item');

      expect(inputEle.length).toBe(1);
    });

    it('should render hyper text elements with class name', () => {
      const anchoreEle = component.find('a.hccf-card-actions__item-link--disabled');

      expect(anchoreEle.length).toBe(1);
    });

    it('should have onClick handler to be attached to achore tag ', () => {
      const event = {
        target: 'aaa',
      };
      const anchoreEle = component.find('a.hccf-card-actions__item-link--disabled');
      anchoreEle.props().onClick(event);

      expect(HeroCardActions.UserInput.submitInput).toHaveBeenCalledWith(event, event.target);
    });
  });
});
