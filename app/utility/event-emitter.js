/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/** *************************************************
  Event Emitter
****************************************************/

(function () {
  // Access 'HeroCard' namespace or create one
  window.HeroCard = window.HeroCard || {};

  // Custom event emitter
  HeroCard.initEventEmitter = function () {
    function Emitter() {
      this.events = {};
    }

    Emitter.prototype.on = function (eventType, eventListener) {
      this.events[eventType] = this.events[eventType] || [];
      this.events[eventType].push(eventListener);
    };

    Emitter.prototype.emit = function (eventType, eventInfo) {
      eventInfo = (typeof eventInfo !== undefined) ? eventInfo : {};

      if (this.events[eventType]) {
        this.events[eventType].forEach((eventListener) => {
          eventListener(eventInfo);
        });
      }
    };

    function init() {
      HeroCard.EventEmitter = HeroCard.EventEmitter || new Emitter();
    }

    init();
  };
}());

