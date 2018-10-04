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
 * EventEmitter
 * Function constructor for attaching and emitting custom events
 * 
 * @member events - Events list
 * @method on - Attach an event
 * @method emit - Handle an emitted event
 */
const HeroCard = window.HeroCard || {};
function EventEmitter() {
    this.events = {};
    
    this.on = function (eventType, eventListener) {
      this.events[eventType] = this.events[eventType] || [];
      this.events[eventType].push(eventListener);
    };

    this.emit = function (eventType, eventInfo) {
      eventInfo = (typeof eventInfo !== undefined) ? eventInfo : {};

      if (this.events[eventType]) {
        this.events[eventType].forEach((eventListener) => {
          eventListener(eventInfo);
        });
      }
    };
}
  
/**
 * HeroCardEventEmitter
 * Initialize and/or return EventEmitter
 */
function HeroCardEventEmitter() {
    function init() {
        HeroCard.EventEmitter = HeroCard.EventEmitter || new EventEmitter();
    }
  
    return {
        initEventEmitter: init,
        EventEmitter: function() {
            if (HeroCard.EventEmitter) {
                return HeroCard.EventEmitter;
            } else {
                console.error('EventEmitter is not initialized!');
            }
        }
    };
}

/**
 * Exports
 */
export default HeroCardEventEmitter;
  