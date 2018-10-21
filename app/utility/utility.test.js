import HeroCardUtility from './utility';

const UiFramework = (function () {
  function input(name, isAutoFocused) {
    const element = document.createElement('input');
    element.name = name;
    element.autofocus = isAutoFocused;
    return element;
  }

  function div(id, cssClass) {
    const element = document.createElement('div');
    element.id = id;
    element.classList.add(cssClass);
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
      const result = HeroCardUtility.dateDifference(convertedDate, new Date());

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

    it('it should return proper minutes difference', () => {
      const dateStr1 = '2018-10-020T10:00:00Z';
      const convertedDate1 = HeroCardUtility.convertISO8601toDate(dateStr1);
      const dateStr2 = '2018-10-020T10:10:00Z';
      const convertedDate2 = HeroCardUtility.convertISO8601toDate(dateStr2);
      const expectedResult = '10 minutes ago';
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
  });

  describe('hasClass', () => {
    let div = null;

    it('it should return false if class naem is not present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.classList.add('hccf-card-actions__item-link');
      div.classList.add('hccf-card-actions__item-link--primary');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = false;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class naem is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.classList.add('hccf-card-actions__item-link');
      div.classList.add('hccf-card-actions__item-link--complete');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = true;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class naem is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.className = 'hccf-card-actions__item-link--complete';
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = true;

      expect(result).toEqual(expectedResult);
    });

    it('it should return true if class naem is present', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      const result = HeroCardUtility.hasClass(div, className);
      const expectedResult = false;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('addClass', () => {
    let div = null;

    it('it should add class name if div element doesn\'t have classList', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      HeroCardUtility.addClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(true);
    });

    it('it should add class name if div has class list', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.classList.add('hccf-card-actions__item-link');
      HeroCardUtility.addClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(true);
    });
  });

  describe('removeClass', () => {
    let div = null;

    beforeEach(() => {
      div = null;
    })
    ;

    it('it should remove class name if div element doesn\'t have classList', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.className = 'hccf-card-actions__item-link--complete';
      HeroCardUtility.removeClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(false);
    });

    it('it should add class name if div has class list', () => {
      const className = 'hccf-card-actions__item-link--complete';
      div = document.createElement('div');
      div.classList.add('hccf-card-actions__item-link');
      div.classList.add('hccf-card-actions__item-link--complete');
      HeroCardUtility.removeClass(div, className);

      expect(div.classList.contains('hccf-card-actions__item-link--complete')).toEqual(false);
    });
  });
});
