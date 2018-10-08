import React from 'react';
import { shallow } from 'enzyme';
import { commentField } from '../../mocks/mock-data';
import { BodyGeneralComponent } from './body-general';

describe('BodyGeneralComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      field: commentField,
    };
    component = shallow(<BodyGeneralComponent {...props} />);
  });

  describe('Render', () => {
    it('should render body comment component', () => {
      const bodyGeneralComponent = component.find('div.hccf-card-body__field');

      expect(bodyGeneralComponent.length).toBe(1);
    });
  });
});
