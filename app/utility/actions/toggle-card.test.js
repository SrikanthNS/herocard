import _ from 'lodash';
import HeroCardUtility from '../utility';
import HeroCardEventEmitter from '../event-emitter';
import ToggleCardViewActions from './toggle-card';


const UiFramework = (function () {
    
    function div(id, cssClass, innerHTMLText, attr) {
      const element = document.createElement('div');
      element.id = id;
      if(attr) {
          element.setAttribute([attr], 'dfdfsg');
      }
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
      div,
    };
  }());


describe('ToggleCardViewActions', () => {
    describe('viewCardDetails', () => {

        beforeEach(() => {
            spyOn(ToggleCardViewActions, 'toggleView');
        })

        it('should call toggleView function with visibility SHOW', () => {
            const e = null;
            const elem = {};
            ToggleCardViewActions.viewCardDetails(e, elem);

            expect(ToggleCardViewActions.toggleView).toHaveBeenCalledWith(elem, 'SHOW');
        });
    });

    describe('viewCardLess', () => {

        beforeEach(() => {
            spyOn(ToggleCardViewActions, 'toggleView');
        })

        it('should call toggleView function  with visibility HIDE', () => {
            const e = null;
            const elem = {};
            ToggleCardViewActions.viewCardLess(e, elem);

            expect(ToggleCardViewActions.toggleView).toHaveBeenCalledWith(elem, 'HIDE');
        })
    });

    describe('toggleView', () => {

        // beforeEach(() => {
           
        // })

        it('should hide the fields', () => {
            const divCardBody = UiFramework.div('card-body', 'hccf-card-body');
            const elem1 = UiFramework.div('elem1', 'hccf-card-body__field--visible');
            const elem2 = UiFramework.div('elem2', 'hccf-card-body__field--visible');
            const elem3 = UiFramework.div('elem3', 'hccf-card-body__field--hidden');
            const elem4 = UiFramework.div('elem4', 'hccf-card-body__field--visible');
            const elem5 = UiFramework.div('elem5', 'hccf-card-body__field--visible');
            const innerEle1 = UiFramework.div('inner-elem1', 'hccf-card-body__field-description');
            const innerEle2 = UiFramework.div('inner-elem2', 'hccf-card-body__field-description');
            const innerEle3 = UiFramework.div('inner-elem3', 'hccf-card-body__field-description');
            elem5.appendChild(innerEle1);
            elem5.appendChild(innerEle2);
            elem5.appendChild(innerEle3);
            divCardBody.appendChild(elem1);
            divCardBody.appendChild(elem2);
            divCardBody.appendChild(elem3);
            divCardBody.appendChild(elem4);
            divCardBody.appendChild(elem5);
            document.body.appendChild(divCardBody);

            ToggleCardViewActions.toggleView(elem3, 'HIDE');

            expect(elem3.className).toContain('hccf-card-body__field--hidden');
        });

        it('should show hidden fields', () => {
            const divCardBody = UiFramework.div('card-body', 'hccf-card-body');
            const elem1 = UiFramework.div('elem1', 'hccf-card-body__field--hidden');
            const elem2 = UiFramework.div('elem2', 'hccf-card-body__field--hidden');
            const elem3 = UiFramework.div('elem3', 'hccf-card-body__field--hidden');
            const elem4 = UiFramework.div('elem4', 'hccf-card-body__field--hidden');
            const elem5 = UiFramework.div('elem5', 'hccf-card-body__field--hidden');
            const innerEle1 = UiFramework.div('inner-elem1', 'hccf-card-body__field-description');
            const innerEle2 = UiFramework.div('inner-elem2', 'hccf-card-body__field-description');
            const innerEle3 = UiFramework.div('inner-elem3', 'hccf-card-body__field-description');
            elem5.appendChild(innerEle1);
            elem5.appendChild(innerEle2);
            elem5.appendChild(innerEle3);
            divCardBody.appendChild(elem1);
            divCardBody.appendChild(elem2);
            divCardBody.appendChild(elem3);
            divCardBody.appendChild(elem4);
            divCardBody.appendChild(elem5);
            document.body.appendChild(divCardBody);

            ToggleCardViewActions.toggleView(elem3, 'SHOW');

            expect(elem3.className).toContain('hccf-card-body__field--visible');
        });
    })
});
