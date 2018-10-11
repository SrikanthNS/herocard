import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import CardActionComponent from './card-action';
import CardActionsComponent from './card-actions';

describe('CardActionsComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      actions: cardData[0].actions,
      name: cardData[0].name,
      id: cardData[0].id,
    };
    component = shallow(<CardActionsComponent {...props} />);
  });

  describe('Render', () => {
    it('should render a div Component', () => {
      const divElement = component.find('div.hccf-row.hccf-card-actions');

      expect(divElement.length).toBe(1);
    });

    it('should render a cardActionComponent Component', () => {
      const cardActionComponent = component.find(CardActionComponent);

      expect(cardActionComponent.length).toBe(2);
    });
  });
});
