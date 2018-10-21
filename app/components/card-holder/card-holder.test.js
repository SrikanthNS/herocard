import React from 'react';
import { shallow } from 'enzyme';
import { CardHolder } from './card-holder';
import { cardData } from '../../mocks/mock-data';
import HeroCardUtility from '../../utility/utility';
import HeroCardResponseManager from '../../utility/response-manager';
import { FieldsComponent } from '../fields';
import { ToggleComponent } from '../toggle';
import { CardTimestampComponent } from '../card-timestamp';
import { BodyDescriptionComponent } from '../body-description';


describe('CardHolderComponent', () => {
  let component;
  let props;
  let state;
  const localGetVisibleCardsCount = HeroCardResponseManager.getVisibleCardsCount;

  beforeEach(() => {
    HeroCardUtility.attachEventHandlers = jasmine.createSpy();
    props = {
      cardContent: cardData[3],
      showToggle: jasmine.createSpy(),
      moreDetails: jasmine.createSpy(),
    };
    state = {
      isViewMoreRequired: false,
      showMore: true,
      numOfFieldsToShow: 0,
      totalNumberOfFields: 0,
    };
    HeroCardResponseManager.getVisibleCardsCount = jasmine.createSpy().and.returnValues(2);
    component = shallow(<CardHolder {...props} {...state} />);
  });

  afterAll(() => {
    HeroCardResponseManager.getVisibleCardsCount = localGetVisibleCardsCount;
  });

  describe('Render', () => {
    it('should render div with class name hccf-card-body', () => {
      const cardHolderDiv = component.find('div.hccf-card-body');

      expect(cardHolderDiv.length).toBe(1);
    });

    it('should render body description component', () => {
      const bodyDescComp = component.find(BodyDescriptionComponent);

      expect(bodyDescComp.length).toBe(1);
    });

    it('should not render body description component if card body does not have description', () => {
      component.setProps({
        cardContent: cardData[0],
      });
      const bodyDescComp = component.find(BodyDescriptionComponent);

      expect(bodyDescComp.length).toBe(0);
    });

    it('should render FieldsComponent', () => {
      const fieldsComponent = component.find(FieldsComponent);

      expect(fieldsComponent.length).toBe(1);
    });

    it('should not render ToggleComponent when component state isViewMoreRequired is false', () => {
      const toggleComponent = component.find(ToggleComponent);

      expect(toggleComponent.length).toBe(0);
    });

    it('should render ToggleComponent when component state isViewMoreRequired is true', () => {
      component.setState({
        isViewMoreRequired: true,
      });
      const toggleComponent = component.find(ToggleComponent);

      expect(toggleComponent.length).toBe(1);
    });

    it('should not render CardTimestampComponent when card content does not have create date', () => {
      const cardTimestampComponent = component.find(CardTimestampComponent);

      expect(cardTimestampComponent.length).toBe(0);
    });

    it('should render CardTimestampComponent when card content have create date', () => {
      component.setProps({
        cardContent: cardData[4],
      });
      const cardTimestampComponent = component.find(CardTimestampComponent);

      expect(cardTimestampComponent.length).toBe(1);
    });
  });
});

describe('component state properties', () => {
  let component;
  let props;
  let state;
  const localGetVisibleCardsCount = HeroCardResponseManager.getVisibleCardsCount;

  afterAll(() => {
    HeroCardResponseManager.getVisibleCardsCount = localGetVisibleCardsCount;
  });

  it('check isViewMoreRequired is set to true if fields count is greater than 4', () => {
    props = {
      cardContent: cardData[5],
      showToggle: jasmine.createSpy(),
      moreDetails: jasmine.createSpy(),
    };
    state = {
      isViewMoreRequired: false,
      showMore: true,
      numOfFieldsToShow: 0,
      totalNumberOfFields: 0,
    };

    HeroCardUtility.attachEventHandlers = jasmine.createSpy();

    HeroCardResponseManager.getVisibleCardsCount = jasmine.createSpy().and.returnValues(1);
    component = shallow(<CardHolder {...props} {...state} />);

    expect(component.instance().state.isViewMoreRequired).toBe(true);
  });

  it('check isViewMoreRequired is set to false if fields count is less than 4', () => {
    props = {
      cardContent: cardData[2],
      showToggle: jasmine.createSpy(),
      moreDetails: jasmine.createSpy(),
    };
    state = {
      isViewMoreRequired: false,
      showMore: true,
      numOfFieldsToShow: 0,
      totalNumberOfFields: 0,
    };
    HeroCardUtility.attachEventHandlers = jasmine.createSpy();

    HeroCardResponseManager.getVisibleCardsCount = jasmine.createSpy().and.returnValues(1);
    component = shallow(<CardHolder {...props} {...state} />);

    expect(component.instance().state.isViewMoreRequired).toBe(false);
  });
});
