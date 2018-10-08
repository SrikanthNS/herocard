

import React from 'react';
import { shallow } from 'enzyme';
import { ToggleComponent } from './toggle';
import HeroCardUtility from '../../utility/utility';

describe('ToggleComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    HeroCardUtility.imgPath = jasmine.createSpy().and.returnValues('expand-show-more.png');
    props = {
      onClick: jasmine.createSpy(),
      showMore: true,
    };
    component = shallow(<ToggleComponent {...props} />);
  });

  describe('Render', () => {
    it('should render Toggle component', () => {
      const toggleComponent = component.find('div.hccf-card-body__view-details');

      expect(toggleComponent.length).toBe(1);
    });

    it('should render Toggle component when showMore is false', () => {
      component.setProps({
        showMore: false,
      });
      const toggleComponent = component.find('div.hccf-card-body__view-details');

      expect(toggleComponent.length).toBe(1);
    });
  });
});
