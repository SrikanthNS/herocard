import React from 'react';
import { shallow } from 'enzyme';
import CardComponent from './card-component';
import { cardData } from '../../mocks/mock-data';
import { CardHeaderComponent } from '../card-header';
import CardHolder from '../card-holder';

describe('CardComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      expandedCardIndex: -1,
      cardIndex: 2,
      content: cardData[0],
      setExpandedCardIndex: jasmine.createSpy(),
      handleClick: jasmine.createSpy(),
    };
    component = shallow(<CardComponent {...props} />);
  });

  describe('Render', () => {
    it('should contain div with text', () => {
      const div = component.find('div');

      expect(div.length).toBe(1);
    });

    it('should render Card Header Component', () => {
      const cardHeaderComponent = component.find(CardHeaderComponent);

      expect(cardHeaderComponent.length).toBe(1);
    });

    it('should not render CardHolder component when props cardIndex and expandedCardIndex are not same ', () => {
      const cardHolder = component.find(CardHolder);

      expect(cardHolder.length).toBe(0);
    });

    it('should render CardHolder component when props cardIndex and expandedCardIndex are same ', () => {
      component.setProps({
        expandedCardIndex: 2,
      });
      const cardHolder = component.find(CardHolder);

      expect(cardHolder.length).toBe(1);
    });
  });

  describe('component instance method handleClick', () => {
    it('should call component props method setExpandedCardIndex with card index', () => {
      const event = {};
      component.instance().handleClick(event, 1);

      expect(component.instance().props.setExpandedCardIndex).toHaveBeenCalledWith(1);
    });
  });
});
