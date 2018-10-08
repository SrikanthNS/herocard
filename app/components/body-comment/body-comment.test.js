import React from 'react';
import { shallow } from 'enzyme';
import { commentField } from '../../mocks/mock-data';
import { BodyCommentComponent } from './body-comment';

describe('BodyCommentComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      field: commentField,
    };
    component = shallow(<BodyCommentComponent {...props} />);
  });

  describe('Render', () => {
    it('should render body comment component', () => {
      const bodyCommmentComponent = component.find('p.hccf-card-body__comments-title');

      expect(bodyCommmentComponent.length).toBe(1);
    });
  });
});
