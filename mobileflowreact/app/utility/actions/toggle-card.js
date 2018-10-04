/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/**
 * Imports
 */
import HeroCardUtility from '../utility';
import HeroCardEventEmitter from '../event-emitter';

HeroCardEventEmitter().initEventEmitter();
const EventEmitter = HeroCardEventEmitter().EventEmitter();

/**
 * Toggle card View Actions
 * @method viewCardDetails
 * @method viewCardLess
 * @method toggleView
 */
const ToggleCardViewActions = {
    viewCardDetails: function(e, elem) {
        const _self = this;
        _self.toggleView(elem, 'SHOW');
    },

    // collapse card details
    viewCardLess: function(e, elem) {
        const _self = this;
       _self.toggleView(elem, 'HIDE');
    },

    // show/hide card view
    toggleView: function(elem, visibility) {
        let cardBody = HeroCardUtility.getClosest(elem, '.hccf-card-body'),
        cardBodyFields = cardBody.getElementsByClassName('hccf-card-body__field--hidden');

        Array.prototype.forEach.call(cardBodyFields, (field, i) => {
        if (visibility == 'SHOW') {
            field.classList.add('hccf-card-body__field--visible');

            // add ellipsis to field description
            const description = field.getElementsByClassName('hccf-card-body__field-description');
            if (description.length) {
                HeroCardUtility.addEllipsis(description[0], 26, 'hccf-card-body__field-description--truncated');
            }
        } else {
            field.classList.remove('hccf-card-body__field--visible');
        }
        });

        elem.style.display = 'none';

        if (visibility == 'SHOW') {
        elem.nextElementSibling.style.display = 'block';
        } else {
        elem.previousElementSibling.style.display = 'block';
        }

        // Emit card rezized event
        EventEmitter.emit('CARDRESIZED');
    },
};

// Add 'ToggleCardViewActions' to 'HeroCard' namespace for native layer to callback
const HeroCard = window.HeroCard || {};
HeroCard.ToggleCardViewActions = ToggleCardViewActions;
window.HeroCard = HeroCard;

/**
 * Exports
 */
export default ToggleCardViewActions;