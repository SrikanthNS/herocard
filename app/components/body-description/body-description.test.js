import React from 'react';
import { shallow } from 'enzyme';
import { BodyDescriptionComponent } from './body-description';

describe('BodyDescriptionComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      description: 'Some Description',
    };
    component = shallow(<BodyDescriptionComponent {...props} />);
  });

  describe('Render', () => {
    it('should render body description component', () => {
      const bodyCommmentComponent = component.find('div.hccf-card-body__description');

      expect(bodyCommmentComponent.length).toBe(1);
    });
  });
});
