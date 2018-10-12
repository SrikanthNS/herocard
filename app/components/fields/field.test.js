import React from 'react';
import { shallow } from 'enzyme';
import { cardData } from '../../mocks/mock-data';
import { BodyGeneralComponent } from '../body-general';
import { BodyCommentComponent } from '../body-comment';
import FieldComponent from './field';


describe('FieldComponent', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      field: cardData[0].body.fields[0],
    };
    component = shallow(<FieldComponent {...props} />);
  });

  describe('Render', () => {
    it('should render body general component', () => {
      const bodyGeneralComp = component.find(BodyGeneralComponent);

      expect(bodyGeneralComp.length).toBe(1);
    });

    it('should render body comment component', () => {
      component.setProps({
        field: cardData[1].body.fields[10],
      });
      const bodyCommentComp = component.find(BodyCommentComponent);

      expect(bodyCommentComp.length).toBe(1);
    });

    it('should not render body general component', () => {
      component.setProps({
        field: cardData[2].body.fields[0],
      });
      const bodyGeneralComp = component.find(BodyGeneralComponent);

      expect(bodyGeneralComp.length).toBe(0);
    });

    it('should not render body comment component', () => {
      component.setProps({
        field: cardData[2].body.fields[0],
      });
      const bodyCommentComp = component.find(BodyCommentComponent);

      expect(bodyCommentComp.length).toBe(0);
    });
  });
});
