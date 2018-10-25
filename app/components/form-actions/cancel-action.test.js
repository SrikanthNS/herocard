import React from 'react';
import { shallow } from 'enzyme';
import HeroCardActions from '../../utility/actions';
import CancelAction from './cancel-action';


describe('SubmitAction', () => {
  let component;
  let props;

  beforeEach(() => {
    spyOn(HeroCardActions.UserInput, 'hideInputForm');
    props = {
      cardID: '4947dff0-45c7-4c16-8582-2297e4e28b81',
      action: {
        id: '6bf64604-1393-4076-aeab-30a91276e20d',
      },
    };

    component = shallow(<CancelAction {...props} />);
  });

  describe('Render', () => {
    it('should render hyper text elements with class name', () => {
      const anchoreEle = component.find('a.hccf-js-input-button-cancel');

      expect(anchoreEle.length).toBe(1);
    });

    it('should have onClick handler to be attached to achore tag ', () => {
      const event = {
        target: 'aaa',
      };
      const anchoreEle = component.find('a.hccf-js-input-button-cancel');
      anchoreEle.props().onClick(event);

      expect(HeroCardActions.UserInput.hideInputForm).toHaveBeenCalledWith(event, event.target);
    });
  });
});
