import React from 'react';
import { shallow } from 'enzyme';
import { CardHeaderComponent } from './card-header';
import { cardData } from '../../mocks/mock-data';
import HeroCardUtility from '../../utility/utility';

describe('CardHeaderComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    HeroCardUtility.imgPath = jasmine.createSpy().and.returnValues('salesforce.png');
    const e = {};
    props = {
      isExpanded: false,
      cardIndex: 2,
      content: cardData[0],
      handleClick: jasmine.createSpy(e),
    };
    component = shallow(<CardHeaderComponent {...props} />);
  });

  describe('Render', () => {
    it('should render Header div without class name open', () => {
      const headerDiv = component.find('div.hccf-card-header');

      expect(headerDiv.length).toBe(1);
      expect(headerDiv.props().className).not.toContain('open');
    });

    it('should have header div with class name open', () => {
      component.setProps({
        isExpanded: true,
      });

      const headerDiv = component.find('div.hccf-card-header');

      expect(headerDiv.props().className).toContain('open');
    });    

    it('should have image with src', () => {
      const imgElement = component.find('img');

      expect(imgElement.props().src).toEqual('salesforce.png');
    });

    it('sholud have title', () => {
      const titleDiv = component.find('div.hccf-card-header__meta-title');

      expect(titleDiv.props().children).toBe('Salesforce Opportunity');
    });

    it('should handle title when content title is changed', () => {
      component.setProps({
        content: {
          name: '',
          header: {
            title: 'no-title',
          } },
      });
      const titleDiv = component.find('div.hccf-card-header__meta-title');

      expect(titleDiv.props().children).toBe('no-title');
    });

    it('should have header div with on click handler', () => {
      const e = {};
      const headerDiv = component.find('div.hccf-card-header');
      headerDiv.simulate('click', e, 2);

      expect(headerDiv.length).toBe(1);
      expect(props.handleClick).toHaveBeenCalledWith(e, 2);
    });

    it('should have header meta div with on click handler', () => {
      const e = {};
      const headerMetaDiv = component.find('div.hccf-card-header__meta');
      headerMetaDiv.simulate('click', e, 1);

      expect(headerMetaDiv.length).toBe(1);
      expect(props.handleClick).toHaveBeenCalledWith(e, 2);
    });
  });
});
