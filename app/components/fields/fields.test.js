import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import FieldComponent from './field';
import FieldsComponent from './fields';

describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      fields: cardData[0].body.fields,
      numOfFieldsToShow: 5,
    };
    component = shallow(<FieldsComponent {...props} />);
  });

  describe('Render', () => {
    it('should render field components', () => {
      const fieldComponent = component.find(FieldComponent);

      expect(fieldComponent.length).toBe(5);
    });
  });
});
