/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/** ***************************************
  Common Utility Functions tests
*****************************************/

import _ from 'lodash';
import HeroCardEventEmitter from './event-emitter';

let EventEmitter = null;
const eventListener = jasmine.createSpy();

describe('Event Emitter', () => {
  // Maybe just put this code in this describe w/o the beforeEach if you don't want it to init before every test

  it('should fire a registered event from Event Emitter', () => {
    HeroCardEventEmitter().initEventEmitter();
    EventEmitter = HeroCardEventEmitter().EventEmitter();
    EventEmitter.on('CARDRENDERED', eventListener);
    EventEmitter.emit('CARDRENDERED', 'Hello');
    EventEmitter.emit('CARDRENDERED', 'Tell');

    expect(eventListener).toHaveBeenCalledWith('Tell');
    expect(eventListener).toHaveBeenCalledTimes(2);

    EventEmitter.emit('CARDRENDERED');

    expect(eventListener).toHaveBeenCalledWith({});
  });
});
