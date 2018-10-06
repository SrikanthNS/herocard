import React from 'react';
import { shallow } from 'enzyme';
import { CardTimestampComponent } from './card-timestamp';
import HeroCardUtility from '../../utility/utility';

describe('CardTimestampComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    HeroCardUtility.convertTimestamp = jasmine.createSpy().and.returnValues('249 days ago');

    props = {
      creationDate: '2018-01-30T11:54:39.271+05:30',
    };
    component = shallow(<CardTimestampComponent {...props} />);
  });

  describe('Render', () => {
    it('should render Header div without class name open', () => {
      const bodyTimeStampDiv = component.find('div.hccf-card-body__timestamp');

      expect(bodyTimeStampDiv.length).toBe(1);
      expect(bodyTimeStampDiv.props().children).toBe('249 days ago');
    });
  });
});
