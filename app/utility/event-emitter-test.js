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


import { spy as _spy, assert } from 'sinon';
import { expect as _expect } from 'chai';
import _ from 'lodash';
import './event-emitter';

global.window = global;
const expect = _expect;
const HeroCard = window.HeroCard || {};

describe('Event Emitter', () => {
  beforeEach(() => {
    HeroCard.initEventEmitter();
  });

  // Maybe just put this code in this describe w/o the beforeEach if you don't want it to init before every test
  it('should register an event in Event Emitter', () => {
    HeroCard.EventEmitter.on('CARD_RESIZED', () => {});

    expect(_.keys(HeroCard.EventEmitter.events).length).to.be.eql(2);
  });

  it('should fire a registered event from Event Emitter', () => {
    const spy = _spy();
    HeroCard.EventEmitter.on('CARDRENDERED', spy);
    HeroCard.EventEmitter.emit('CARDRENDERED', 'Hello');
    HeroCard.EventEmitter.emit('CARDRENDERED', 'Tell');
    assert.calledTwice(spy);
  });
});
