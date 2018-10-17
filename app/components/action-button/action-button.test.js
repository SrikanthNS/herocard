import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonComponent from './action-button';
import HeroCardActions from '../../utility/actions';


describe('Action Button', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      cardID: '4947dff0-45c7-4c16-8582-2297e4e28b81',
      action: {
        id: '6bf64604-1393-4076-aeab-30a91276e20d',
        label: 'Add contact',
        primary: true,
        completed: false,
        action_key: 'APPROVE',
      },
      onClick: jasmine.createSpy(),
    };

    HeroCardActions.Direct.openUrlLocation = jasmine.createSpy();
    HeroCardActions.UserInput.showInputForm = jasmine.createSpy();
    HeroCardActions.Auth.dismiss = jasmine.createSpy();
    HeroCardActions.Auth.login = jasmine.createSpy();

    component = shallow(<ActionButtonComponent {...props} />);
  });

  describe('Render', () => {
    it('should render anchore element with class names', () => {
      const event = {
        target: 'aaa',
      };
      const anchoreEle = component.find('a.hccf-card-actions__item-link');

      expect(anchoreEle.length).toBe(1);

      anchoreEle.props().onClick(event);

      expect(HeroCardActions.Direct.openUrlLocation).toHaveBeenCalledWith(event, event.target);
    });

    it('instance method getButtonClasses', () => {
      let classNames = component.instance().getButtonClasses(props.action);

      expect(classNames).toEqual('hccf-card-actions__item-link hccf-card-actions__item-link--primary');

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
        },
      });

      classNames = component.instance().getButtonClasses(component.instance().props.action);

      expect(classNames)
        .toContain('hccf-card-actions__item-link--complete hccf-card-actions__item-link--disabled');

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
          allow_repeated: false,
          completed_label: 'Contact Added',
        },
      });

      classNames = component.instance().getButtonClasses(component.instance().props.action);

      expect(classNames)
        .toContain('hccf-card-actions__item-link--complete hccf-card-actions__item-link--disabled');
    });

    it('instance method getActionHandler', () => {
      let actionHandler = component.instance().getActionHandler(props.action.action_key);

      expect(actionHandler).toEqual(HeroCardActions.Direct.openUrlLocation);

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
          action_key: 'USER_INPUT',
        },
      });

      actionHandler = component.instance().getActionHandler(component.instance().props.action.action_key);

      expect(actionHandler).toEqual(HeroCardActions.UserInput.showInputForm);

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
          action_key: 'AUTH_DISMISS',
        },
      });

      actionHandler = component.instance().getActionHandler(component.instance().props.action.action_key);

      expect(actionHandler).toEqual(HeroCardActions.Auth.dismiss);

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
          action_key: 'AUTH_LOGIN',
        },
      });

      actionHandler = component.instance().getActionHandler(component.instance().props.action.action_key);

      expect(actionHandler).toEqual(HeroCardActions.Auth.login);

      component.setProps({
        action: {
          id: '6bf64604-1393-4076-aeab-30a91276e20d',
          label: 'Add contact',
          primary: true,
          completed: true,
          action_key: 'DISMISS',
        },
      });

      actionHandler = component.instance().getActionHandler(component.instance().props.action.action_key);

      expect(actionHandler).toEqual(HeroCardActions.Direct.openUrlLocation);
    });
  });
});
