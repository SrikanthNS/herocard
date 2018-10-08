import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Accordion from './accordion';
import { CardComponent } from '../card';
import { cardData } from '../../mocks/mock-data';

configure({ adapter: new Adapter() });

describe('Accordion', () => {
  let props;
  let state;
  let component;
  beforeEach(() => {
    props = {
      contents: cardData,
      setExpandedCardIndex: jasmine.createSpy(),
    };
    state = {
      expandedCardIndex: -1,
    };
    component = shallow(<Accordion {...props} {...state} />);
  });

  describe('Component Render', () => {
    it('should contain div with text', () => {
      const div = component.find('div');

      expect(div.length).toBe(1);
    });

    it('should render Card Component', () => {
      const cardComponent = component.find(CardComponent);

      expect(cardComponent.length).toBe(6);
    });
  });

  describe('Component instance method setExpandedCardIndex', () => {
    it('should set component state expandedCardIndex from index -1 to index 2', () => {
      component.instance().setExpandedCardIndex(2);

      expect(component.state().expandedCardIndex).toBe(2);
    });

    it('should set component state expandedCardIndex from index 2 to index -1', () => {
      component.setState({
        expandedCardIndex: 2,
      });
      component.instance().setExpandedCardIndex(2);

      expect(component.state().expandedCardIndex).toBe(-1);
    });
  });
});
