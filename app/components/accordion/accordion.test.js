import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Accordion from './accordion';
import { CardComponent } from '../card';
import cardData from '../../mocks/mock-data';

configure({ adapter: new Adapter() });

describe('Accordion component', () => {
  const props = {
    contents: cardData,
    setExpandedCardIndex: jasmine.createSpy(),
  };
  const state = {
    expandedCardIndex: -1,
  };
  const component = shallow(<Accordion {...props} {...state} />);

  describe('render', () => {
    it('should contain div with text', () => {
      const div = component.find('div');

      expect(div.length).toBe(1);
    });

    it('should render Card Component', () => {
      const cardComponent = component.find(CardComponent);

      expect(cardComponent.length).toBe(4);
    });
  });

  describe('component instance method setExpandedCardIndex', () => {
    it('should set component state expandedCardIndex to some number', () => {
      component.instance().setExpandedCardIndex(2);

      expect(component.state().expandedCardIndex).toBe(2);
    });

    it('should set component state expandedCardIndex to some number', () => {
      component.setState({
        expandedCardIndex: 2,
      });
      component.instance().setExpandedCardIndex(2);

      expect(component.state().expandedCardIndex).toBe(-1);
    });
  });
});
