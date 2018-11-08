/* eslint-disable no-console */
/* eslint-disable func-names */
import _ from 'lodash';
import HeroCardUtility from './utility';


const UiFramework = (function () {
  function input(name, isAutoFocused) {
    const element = document.createElement('input');
    element.name = name;
    element.autofocus = isAutoFocused;
    return element;
  }

  function div(id, cssClass, innerHTMLText) {
    const element = document.createElement('div');
    element.id = id;

    const classes = _.split(cssClass, ' ');
    if (classes.length) {
      _.map(classes, (eachClass) => {
        if (eachClass) {
          element.classList.add(eachClass);
        }
      });
    }
    if (innerHTMLText) {
      element.innerHTML = innerHTMLText;
    }
    // element.style.margin = '100px';
    // element.style.height = '100px';
    document.body.appendChild(element);
    return element;
  }

  return {
    input,
    div,
  };
}());

describe('Utility functions', () => {
  describe('convertISO8601toDate', () => {
    it('should return date object', () => {
      const result = HeroCardUtility.convertISO8601toDate('2018 01 20 17 33 17 656');
      const expectedResult = new Date('Sat Jan 20 2018 23:03:17 GMT+0530 (India Standard Time)');

      expect(result).toEqual(expectedResult);
    });

    it('should return text as Invalid date for invalid date', () => {
      const result = HeroCardUtility.convertISO8601toDate('2018 01');
      const expectedResult = 'Invalid Date';

      expect(result).toEqual(expectedResult);
    });

    it('should return date object even date string has only date', () => {
      const result = HeroCardUtility.convertISO8601toDate('2018 01 20');
      const expectedResult = new Date('Sat Jan 20 2018 05:30:00 GMT+0530 (India Standard Time)');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('dateDifference', () => {
    it('it should return number of days between two dates', () => {
      const dateStr = '1970-01-01T00:00:00Z';
      const convertedDate = HeroCardUtility.convertISO8601toDate(dateStr);
      const expectedResult = '17825 days ago';
      const result = HeroCardUtility.dateDifference(convertedDate, new Date('2018-10-21'));

      expect(result).toEqual(expectedResult);
    });

    it('it should return null in case of two dates are same', () => {
      const dateStr = '1970-01-01T00:00:00Z';
      const convertedDate = HeroCardUtility.convertISO8601toDate(dateStr);
      const expectedResult = '';
      const result = HeroCardUtility.dateDifference(convertedDate, convertedDate);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper date difference if one day diff', () => {
      const dateStr1 = '2018-10-020T00:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-021T00:00:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '1 day ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper hours difference', () => {
      const dateStr1 = '2018-10-020T00:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:00:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '10 hours ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper hour difference', () => {
      const dateStr1 = '2018-10-020T00:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T01:10:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '1 hour ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper minutes difference', () => {
      const dateStr1 = '2018-10-020T10:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:10:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '10 minutes ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper minute difference', () => {
      const dateStr1 = '2018-10-020T10:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:1:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '1 minute ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper seconds difference', () => {
      const dateStr1 = '2018-10-020T10:10:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:10:59Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '59 seconds ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return proper seconds difference', () => {
      const dateStr1 = '2018-10-020T10:10:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:10:01Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '1 second ago';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });

    it('it should return just now text if no difference in two given dates', () => {
      const dateStr1 = '2018-10-020 00:00:00Z';
      const convertedDate1 = new Date(dateStr1);
      const dateStr2 = '2018-10-020 00:00:00:11Z';
      const convertedDate2 = new Date(dateStr2);
      const expectedResult = 'just now';
      const result = HeroCardUtility.dateDifference(convertedDate1, convertedDate2);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('hasClass', () => {
    let div = null;

    it('it should return false if class name is not present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link hccf-card-actions__item-link--primary');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = false;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class name is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link hccf-card-actions__item-link--complete');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = true;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class name is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link--complete');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = true;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class name is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = false;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('addClass', () => {
    let div = null;

    it('it should add class name if div element doesn\'t have classList', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1');
      HeroCardUtility.addClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(true);
    });

    it('it should add class name if div has class list', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1');
      div.classList.add('hccf-card-actions__item-link');
      HeroCardUtility.addClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(true);
    });
  });

  describe('removeClass', () => {
    let div = null;

    beforeEach(() => {
      div = null;
    });

    it('it should remove class name if div element doesn\'t have classList', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link--complete');
      HeroCardUtility.removeClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(false);
    });

    it('it should add class name if div has class list', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link hccf-card-actions__item-link--complete');
      HeroCardUtility.removeClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(false);
    });
  });

  describe('getClosest', () => {
    let div = null;
    let form = null;
    it('Return null if closest element not present', () => {
      const selector = '.hccf-card-action-form';
      div = UiFramework.div('div1', 'hccf-card-actions__item-link hccf-card-actions__item-link--complete');
      const returnedEle = HeroCardUtility.getClosest(div, selector);

      expect(returnedEle).toEqual(null);
    });

    it('Return null if closest element not present', () => {
      const selector = '.hccf-card-action-form';
      form = document.createElement('form');
      form.classList.add('hccf-card-action-form');
      div = UiFramework.div('div1', 'hccf-card-actions__item-link');
      form.appendChild(div);
      const returnedEle = HeroCardUtility.getClosest(div, selector);

      expect(returnedEle).toEqual(form);
    });
  });

  describe('addEllipsis', () => {
    it('it should add ellipsis to the element innerText with truncate class added', () => {
      const ele = UiFramework.div(
        'div1',
        'someclass',
        'This is a bigger innerText for the dive element, So trim it and add ellipsis');
      HeroCardUtility.addEllipsis(ele, 10, 'hccf-card-body__field-description--truncated');

      expect(ele.classList.contains('hccf-card-body__field-description--truncated')).toEqual(true);
    });
  });

  describe('parseURL', () => {
    const urlStr = 'roswellframework://servicenow/a29581ba-8671-4ffd-a921-1b0b5fb58a09?action=%7B%22id%22%3A%22HCA_Approve_ServiceNow_0%22%2C%22primary%22%3Atrue%2C%22completed%22%3Afalse%2C%22mutually_exclusive_set_id%22%3A%22servicenow-approval-flow%22%2C%22completed_label%22%3A%22APPROVED%22%2C%22remove_card_on_completion%22%3Afalse%2C%22allow_repeated%22%3Afalse%2C%22label%22%3A%22Approve%22%2C%22url%22%3A%7B%22href%22%3A%22%2Fws%2Frest%2Fconnectors%2Fservicenow%2FsnowRequest%2Fapprove%22%7D%2C%22type%22%3A%22POST%22%2C%22action_key%22%3A%22DIRECT%22%2C%22request%22%3A%7B%22email_id%22%3A%22eric.schroeder%40example.com%22%2C%22approval_item%22%3A%22REQ0010002%22%2C%22approval_sys_id%22%3A%22612bcfd74f20030023d801f18110c7ba%22%7D%7D&callback=HeroCard.DirectActions.openUrlCallback';
    const dummyURL = 'http://www.example.com';
    it('it should call parseURL function and return an object', () => {
      const retObj = HeroCardUtility.parseURL(urlStr);
      console.log(retObj);

      expect(retObj.protocol).toEqual('roswellframework:');
      expect(retObj.host).toEqual('servicenow');
    });

    it('it should call parseURL function and return false if url is does not match REGEX', () => {
      const retVal = HeroCardUtility.parseURL(dummyURL);
      console.log(retVal);

      expect(retVal).toEqual(false);
    });
  });

  describe('checkActionShouldHideCard', () => {
    it('it should return true completed and remove_card_on_completion  to true', () => {
      const action = {
        completed: true,
        remove_card_on_completion: true,
      };

      const retVal = HeroCardUtility.checkActionShouldHideCard(action);

      expect(retVal).toEqual(true);
    });

    it('it should return false completed and remove_card_on_completion  to false', () => {
      const action = {
        completed: true,
        remove_card_on_completion: true,
      };

      const retVal = HeroCardUtility.checkActionShouldHideCard(action);

      expect(retVal).toEqual(true);
    });
  });

  describe('checkCardHiddenForCompletion', () => {
    it('it should return false if card action is completed', () => {
      const card =
    {
      actions: [{
        completed: false,
        remove_card_on_completion: true,
      }],
    };
      const retVal = HeroCardUtility.checkCardHiddenForCompletion(card);

      expect(retVal).toEqual(false);
    });

    it('it should return true if card action is completed', () => {
      const card =
    {
      actions: [{
        completed: true,
        remove_card_on_completion: true,
      }],
    };
      const retVal = HeroCardUtility.checkCardHiddenForCompletion(card);

      expect(retVal).toEqual(true);
    });

    it('it should return false if carddoes not have action object is completed', () => {
      const card = {};
      const retVal = HeroCardUtility.checkCardHiddenForCompletion(card);

      expect(retVal).toEqual(false);
    });
  });

  describe('checkCardExpiry', () => {
    it('Return true if card is exprired', () => {
      const card = [
        {
          id: '4947dff0-45c7-4c16-8582-2298b817e4e2',
          expiration_date: '2018-01-20T17:33:17.656Z',
        },
      ];

      const retVal = HeroCardUtility.checkCardExpiry(card);

      expect(retVal).toEqual(false);
    });
  });

  describe('removeCard', () => {
    const card = {};
    beforeEach(() => {
      spyOn(HeroCardUtility, 'addClass');
      spyOn(window, 'setTimeout');
    });

    it('it should call addClass ', () => {
      HeroCardUtility.removeCard(card);

      expect(setTimeout).toHaveBeenCalledTimes(1);
      setTimeout(() => {
        expect(HeroCardUtility.addClass).toHaveBeenCalledTimes(1);
      }, 2000);
    });
  });

  describe('removeCardData', () => {
    it('it should set is_actionable to false', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [
              { id: 'card-id-1', is_actionable: true },
              { id: 'card-id-2', is_actionable: true },
            ],
          },
        ],
      };
      const cardID = 'card-id-1';
      HeroCardUtility.removeCardData(cardID);

      expect(HeroCard.cardDataJSON.results[0].cards[0].is_actionable).toEqual(false);
    });
  });

  describe('checkForNumericValue', () => {
    it('it should return true for valid numeric number', () => {
      const phonNo = '1233456789';
      const retVal = HeroCardUtility.checkForNumericValue(phonNo);

      expect(retVal).toEqual(true);
    });

    it('it should return false if no numeric number given', () => {
      const phonNo = '';
      const retVal = HeroCardUtility.checkForNumericValue(phonNo);

      expect(retVal).toEqual(false);
    });

    it('it should return false if not a valid numeric number', () => {
      const phonNo = '12334567@##dsdds';
      const retVal = HeroCardUtility.checkForNumericValue(phonNo);

      expect(retVal).toEqual(false);
    });
  });

  describe('checkForDate', () => {
    it('it should return true for valid date', () => {
      const date = '2018-11-08';
      const retVal = HeroCardUtility.checkForDate(date);

      expect(retVal).toEqual(true);
    });

    it('it should return false if no date is provided', () => {
      const date = '';
      const retVal = HeroCardUtility.checkForDate(date);

      expect(retVal).toEqual(false);
    });

    it('it should return false if invalid date is provided', () => {
      const date = '22-121-2121';
      const retVal = HeroCardUtility.checkForDate(date);

      expect(retVal).toEqual(false);
    });

    it('it should return false even date pattern matched but nvalid date is provided', () => {
      const date = '2018-13-32';
      const retVal = HeroCardUtility.checkForDate(date);

      expect(retVal).toEqual(false);
    });
  });

  describe('checkForPhoneNumber', () => {
    it('it should return true for valid phone number', () => {
      const phonNo = '1233456789';
      const retVal = HeroCardUtility.checkForPhoneNumber(phonNo);

      expect(retVal).toEqual(true);
    });

    it('it should return false if no phone number given', () => {
      const phonNo = '';
      const retVal = HeroCardUtility.checkForPhoneNumber(phonNo);

      expect(retVal).toEqual(false);
    });

    it('it should return false if phone number length is less than 10', () => {
      const phonNo = '12334567';
      const retVal = HeroCardUtility.checkForPhoneNumber(phonNo);

      expect(retVal).toEqual(false);
    });
  });

  describe('checkForEmail', () => {
    it('it should return true for valid email', () => {
      const retVal = HeroCardUtility.checkForEmail('');

      expect(retVal).toEqual(false);
    });

    it('it should return true for valid email', () => {
      const retVal = HeroCardUtility.checkForEmail('somenone@some.com');

      expect(retVal).toEqual(true);
    });

    it('it should return false for invalid email', () => {
      const retVal = HeroCardUtility.checkForEmail('somenone@somecom');

      expect(retVal).toEqual(false);
    });
  });

  describe('hashcode', () => {
    it('', () => {

    });
  });

  describe('createElement', () => {
    it('it should return element', () => {
    });
  });

  describe('callbackClasses', () => {
    it('it should return class names for expanded', () => {
      const card = {
        expand: true,
        actions: [
          {
            completed: true,
            remove_card_on_completion: true,
          },
        ],
      };

      const retVal = HeroCardUtility.callbackClasses(card);

      expect(retVal).toEqual(' hccf-accordian-expanded hccf-hero-card--hidden');
    });

    it('it should return class names for expanded', () => {
      const card = {
        expand: true,
        actions: [
          {
            completed: false,
            remove_card_on_completion: false,
          },
        ],
      };

      const retVal = HeroCardUtility.callbackClasses(card);

      expect(retVal).toEqual(' hccf-accordian-expanded');
    });
  });

  describe('convertTimestamp', () => {
    // it('it should convert isoDate to timeStamp', () => {
    //   const isoDate = '2018-01-30T11:54:39.271+05:30';
    //   const retVal = HeroCardUtility.convertTimestamp(isoDate);
    //   spyOn(HeroCardUtility, 'convertISO8601toDate').and.returnValue('some date');
    //   spyOn(HeroCardUtility, 'dateDifference').and.returnValue('291 days ago');

    //   expect(retVal).toEqual('281 days ago');
    // });

    it('it should return null if no isoDate', () => {
      const retVal = HeroCardUtility.convertTimestamp('');

      expect(retVal).toEqual(undefined);
    });
  });

  // describe('imgPath', () => {
  //   const fileName = 'Srikanth.jpg';    

  //   it('return full image path', () => {
  //     const fileName = 'Srikanth.jpg';
  //     window.hsImgs = 'http://localhost/';
  //     const fullImgPath = HeroCardUtility.imgPath(fileName);

  //     expect(fullImgPath).toEqual('http://localhost/Srikanth.jpg');
  //   });
  // });
});
