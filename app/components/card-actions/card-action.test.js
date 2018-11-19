import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import CardActionComponent from './card-action';
import ActionButtonComponent from '../action-button/action-button';
import HiddenField from '../form-fields/hidden-field';
import UserInputSection from '../user-input-section/user-input-section';

describe('CardActionComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      index: 0,
      action: cardData[0].actions[1],
      numActions: 2,
      cardID: 'GSERBER634563456HGDFGL',
      cardName: 'Salesforce',
    };
    component = shallow(<CardActionComponent {...props} />);
    component.instance().stringifyAction = jasmine.createSpy();
  });

  describe('Render', () => {
    it('should render a div', () => {
      const divElement = component.find('div.hccf-card-actions__item');

      expect(divElement.length).toBe(1);
    });

    it('should render a div with class name primary', () => {
      component.setProps({ action: cardData[0].actions[1] });
      const divElement = component.find('div.hccf-card-actions__item.hccf-card-actions__item--primary');

      expect(divElement.length).toBe(1);
    });

    it('should render a div with class name primary when number of action is one', () => {
      component.setProps({ numActions: 1, action: cardData[0].actions[0] });
      const divElement = component.find('div.hccf-card-actions__item--primary');

      expect(divElement.length).toBe(1);

      component.setProps({ numActions: 1, action: {} });
      const form = component.find('form');

      expect(form.length).toBe(1);
      expect(form['data-action-string']).toEqual(undefined);

      expect(component.instance().stringifyAction).toHaveBeenCalledWith({});
    });

    it('should render a div with class name primary when prop action is null', () => {
      component.setProps({ numActions: 1, action: '' });
      const res = component.instance().stringifyAction(props.action);

      expect(res).toEqual(undefined);
    });

    it('should render a UserInputSection Component', () => {
      const userInputSection = component.find(UserInputSection);

      expect(userInputSection.length).toBe(1);
    });

    it('should render a ActionButtonComponent Component', () => {
      const actionButtonComponent = component.find(ActionButtonComponent);

      expect(actionButtonComponent.length).toBe(1);
    });

    it('should render a HiddenField Component', () => {
      const hiddenField = component.find(HiddenField);

      expect(hiddenField.length).toBe(2);
    });
  });
});
