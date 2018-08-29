/*
 * Copyright (c) 2018 VMware, Inc. All rights reserved.
 *
 * This product is protected by copyright and intellectual property laws in
 * the United States and other countries as well as by international treaties.
 *
 * VMware products may be covered by one or more patents listed at
 * http://www.vmware.com/go/patents.
 */

/***************************************************
  Functionality for user initiated actions
****************************************************/

(function () {

	// access 'HeroCard' namespace or create one
	var HeroCard = window.HeroCard || {};

	HeroCard.Actions = {
		Auth: {
			// No need to call back into the Framework layer for this action.  Simply dismiss.
			dismiss: function (e, dismissButton) {
				var cardHtml = HeroCard.Utility.getClosest(dismissButton, '.hccf-hero-card');
				if (cardHtml) {
					HeroCard.Actions.Common.disableActionButton(dismissButton, "Dismissed");
					HeroCard.Utility.removeCard(cardHtml);
				}
			},

			login: function (elem) {
				var form = HeroCard.Utility.getClosest(elem, '.hccf-card-action-form'),
					card = HeroCard.Utility.getClosest(elem, '.hccf-hero-card'),
					formData = HeroCard.Actions.Common.getFormData(form),
					callback = 'window.HeroCard.Actions.Auth.loginCallback';

				HeroCard.Actions.Common.disableActionButton(elem, "In progress...");
				HeroCard.Actions.Common.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

				return true;
			},

			loginCallback: function (urlStr, result) {
				var info = HeroCard.Actions.Common.decodeRoswellActionURL(urlStr, '.hccf-card-actions__item');

				var actionButton = info.actionButton,
					actionObject = info.actionObject;

				var defaultLabel = HeroCard.Actions.ActionCompletion.getActionPropertyValue(actionObject, "label");

				if (result) {
					var cardHtml = HeroCard.Utility.getClosest(actionButton, '.hccf-hero-card');
					if (cardHtml) {
						HeroCard.Utility.removeCard(cardHtml);
					}
				} else {
					HeroCard.Actions.Common.enableActionButton(actionButton, defaultLabel, '', '');
				}

				return JSON.stringify(HeroCard.cardDataJSON);
			}
		},
		UserInput: {
			showInputForm: function (e, addInputButton) {
				var formSectionClass = '.hccf-js-input-add-section',
					actionKey = addInputButton.getAttribute('data-actionkey');
				return HeroCard.Actions.Common.showActionForm(addInputButton, formSectionClass, actionKey);
			},

			hideInputForm: function (e, cancelButton) {
				var formSectionClass = '.hccf-js-input-add-section';
				HeroCard.Actions.Common.hideActionForm(cancelButton, formSectionClass);
			},

			checkUserInput: function (e, text) {
				var form = HeroCard.Utility.getClosest(text, '.hccf-card-action-form'),
					submitButton = form.querySelector('.hccf-js-input-button-submit');

				return HeroCard.Actions.Common.validateFormFields(form, submitButton);
			},

			submitInput: function (e, button) {
				var form = HeroCard.Utility.getClosest(button, '.hccf-card-action-form'),
					card = HeroCard.Utility.getClosest(button, '.hccf-hero-card'),
					isValid = HeroCard.Actions.Common.validateFormFields(form, button);

				if (!isValid) {
					return false;
				}

				var formData = HeroCard.Actions.Common.getFormData(form),
					callback = 'window.HeroCard.Actions.UserInput.addInputCallback';

				HeroCard.Actions.Common.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

				// Disable submit button and change label to "In progress..."
				HeroCard.Actions.Common.disableActionButton(button, "In progress...");

				return true;
			},

			addInputCallback: function (urlStr, result) {
				var info = HeroCard.Actions.Common.decodeRoswellActionURL(urlStr, '.hccf-js-input-add-section');

				var actionButton = info.actionButton,
					submitButton = info.submitButton,
					cancelButton = info.cancelButton,
					actionObject = info.actionObject,
					cardHTML = info.cardHTML,
					cardID = info.cardID;

				var defaultLabel = HeroCard.Actions.ActionCompletion.getActionPropertyValue(actionObject, "label");

				if (result) {
					var removeCard = HeroCard.Actions.ActionCompletion.getActionPropertyValue(actionObject, "remove_card_on_completion");
					if (removeCard !== true) {
						HeroCard.Actions.UserInput.hideInputForm('', cancelButton);
						// enable submit button
						HeroCard.Actions.Common.enableActionButton(submitButton, defaultLabel, '', '');
					}

					HeroCard.Actions.ActionCompletion.setActionCompleted(actionObject.id);
					HeroCard.Actions.ActionCompletion.renderUIForCompletedAction(actionObject.id)
				} else {
					// enable submit button
					HeroCard.Actions.Common.enableActionButton(submitButton, defaultLabel, '', '');
				}

				return JSON.stringify(HeroCard.cardDataJSON);
			}
		},

		Direct: {
			openUrlLocation: function (elem) {
				// return if action button marked as complete/disabled
				if (HeroCard.Utility.hasClass(elem, 'hccf-card-actions__item-link--complete')
					|| HeroCard.Utility.hasClass(elem, 'hccf-card-actions__item-link--disabled')) {
					return false;
				}

				var form = HeroCard.Utility.getClosest(elem, '.hccf-card-action-form'),
					card = HeroCard.Utility.getClosest(elem, '.hccf-hero-card'),
					formData = HeroCard.Actions.Common.getFormData(form),
					callback = 'window.HeroCard.Actions.Direct.openUrlCallback';

				HeroCard.Actions.Common.encodeRoswellActionURLAndNavigate(card, form, formData, callback);

				// Disable action button and change label to "In progress..."
				HeroCard.Actions.Common.disableActionButton(elem, "In progress...");

				return true;
			},

			openUrlCallback: function (urlStr, result) {
				var info = HeroCard.Actions.Common.decodeRoswellActionURL(urlStr, '.hccf-card-actions__item');

				var actionButton = info.actionButton,
					cancelButton = info.cancelButton,
					actionObject = info.actionObject,
					cardHTML = info.cardHTML;

				var defaultLabel = HeroCard.Actions.ActionCompletion.getActionPropertyValue(actionObject, "label");

				if (result) {
					HeroCard.Actions.ActionCompletion.setActionCompleted(actionObject.id);
					HeroCard.Actions.ActionCompletion.renderUIForCompletedAction(actionObject.id)
				} else {
					// enable submit button
					HeroCard.Actions.Common.enableActionButton(actionButton, defaultLabel, '', '');
				}

				return JSON.stringify(HeroCard.cardDataJSON);
			}
		},

		TripInfo: {
			showConcurTripDetails: function (e, elem) {
				HeroCard.Actions.TripInfo.toggleTripDetails(e, elem, 'SHOW');
			},

			closeTripDetails: function (e, elem) {
				HeroCard.Actions.TripInfo.toggleTripDetails(e, elem, 'HIDE');
			},

			toggleTripDetails: function (e, elem, visibility) {
				var toggleClass = 'hccf-card-tripinfo--visible',
					popoverClass = 'hccf-card-body__tripinfo-preview',
					popoverVisibleClass = 'hccf-card-body__tripinfo-preview--visible';

				HeroCard.Actions.Common.toggleCardPopover(elem, visibility, toggleClass, popoverClass, popoverVisibleClass);
			}
		},

		ToggleCardView: {
			viewCardDetails: function (e, elem) {
				HeroCard.Actions.ToggleCardView.toggleView(elem, 'SHOW');
			},

			// collapse card details
			viewCardLess: function (e, elem) {
				HeroCard.Actions.ToggleCardView.toggleView(elem, 'HIDE');
			},

			// show/hide card view
			toggleView: function (elem, visibility) {
				var cardBody = HeroCard.Utility.getClosest(elem, '.hccf-card-body'),
					cardBodyFields = cardBody.getElementsByClassName('hccf-card-body__field--hidden');

				Array.prototype.forEach.call(cardBodyFields, function (field, i) {
					if (visibility == 'SHOW') {
						field.classList.add('hccf-card-body__field--visible');

						// add ellipsis to field description
						var description = field.getElementsByClassName('hccf-card-body__field-description');
						if (description.length) {
							HeroCard.Utility.addEllipsis(description[0], 26, 'hccf-card-body__field-description--truncated');
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
				HeroCard.EventEmitter.emit('CARDRESIZED');
			}
		},

		ActionCompletion: {

			/**
			 * Function to get card object
			 * @param {string} actionId - id of the action
			 * @return {object} - card object
			 */
			getCardByActionId: function (actionId) {
				var action = HeroCard.Actions.ActionCompletion.getAction(actionId, true);
				return action['card'];
			},

			/**
			 * Function to get the action object
			 * @param {string} actionId - id of the action
			 * @param {boolean} includeCard - optional flag to include parent card
			 * @return {object} - action object / object containing action and parent card
			 */
			getAction: function (actionId, includeCard) {
				includeCard = (typeof includeCard !== undefined) ? includeCard : false;
				var retVal;

				if (actionId === undefined) {
					return retVal;
				}

				var connectors = HeroCard.cardDataJSON.results;
				if (connectors === undefined) {
					return retVal;
				}

				for (var i = 0; i < connectors.length; i++) {
					var cards = connectors[i].cards;

					if (cards === undefined) {
						continue;
					}

					for (var j = 0; j < cards.length; j++) {
						var card = cards[j];

						if (card === undefined || card.actions === undefined) {
							continue;
						}

						var actions = card.actions;
						for (var k = 0; k < actions.length; k++) {
							if (actions[k].id === actionId) {
								// if includeCard set to true, include both action & card to the returning object
								// else return only action object
								if (includeCard === true) {
									retVal = {
										action: actions[k],
										card: card
									};
								} else {
									retVal = actions[k];
								}
								break;
							}
						}

						if (retVal !== undefined) {
							break;
						}
					}

					if (retVal !== undefined) {
						break;
					}
				}

				return retVal;
			},

			/**
			 * Function to get an action property value
			 * @param {object} action - action object
			 * @param {string} property - property to get value
			 * @return {any} - property value
			 */
			getActionPropertyValue: function (action, property) {
				var propertyValue;

				if (action === undefined || property === undefined) {
					return propertyValue;
				}

				propertyValue = action[property];
				return propertyValue;
			},

			/**
			 * Function to update an action property
			 * @param {object} action - action object
			 * @param {string} property - property to update
			 * @param {string} value - value to update
			 * @return {boolean} - update status
			 */
			setActionPropertyValue: function (action, property, value) {
				var isset = false;

				if (action === undefined || property === undefined) {
					return isset;
				}

				action[property] = value;
				isset = true;

				return isset;
			},

			/**
			 * Function to mark an action as complete 
			 * 1. Mark action as completed in JSON
			 * 2. Emit JSONMODIFIED event
			 * @param {string} actionId - id of the action
			 */
			setActionCompleted: function (actionId) {
				var cardAction = HeroCard.Actions.ActionCompletion.getAction(actionId, true);
				if (cardAction === undefined) {
					return;
				}

				var action = cardAction.action,
					card = cardAction.card;

				if (action === undefined) {
					return;
				}

				var updatedProperties = [];

				var completed = HeroCard.Actions.ActionCompletion.setActionPropertyValue(action, "completed", true);
				if (!completed) {
					return;
				}

				updatedProperties.push("completed");

				// Emit an event for JSON modification
				HeroCard.EventEmitter.emit('JSONMODIFIED', {
					updatedJson: HeroCard.cardDataJSON,
					updateInfo: {
						objectType: 'actions',
						updatedObject: action,
						updatedProperties: updatedProperties
					}
				});
			},

			/**
			 * Function to mark an action as complete
			 * 1. change label if it permits
			 * 2. disable it if its not repeatable
			 * 3. remove card if remove_card_on_completion is available
			 * @param {string} actionId - id of the action
			 */
			renderUIForCompletedAction: function (actionId) {
				var cardAction = HeroCard.Actions.ActionCompletion.getAction(actionId, true);
				if (cardAction === undefined) {
					return;
				}

				var action = cardAction.action,
					card = cardAction.card;

				if (action === undefined) {
					return;
				}

				var elementId = actionId + "__" + "hccf-card-actions__item-link",
					actionButton = document.getElementById(elementId),
					defaultLabel = HeroCard.Actions.ActionCompletion.getActionPropertyValue(action, "label"),
					completedLabel = HeroCard.Actions.ActionCompletion.getActionPropertyValue(action, "completed_label"),
					mutexGroupId = HeroCard.Actions.ActionCompletion.getActionPropertyValue(action, "mutually_exclusive_set_id");

				// disable action if 'non-repeatable' is  preset and its 'false'
				var allowRepeated = HeroCard.Actions.ActionCompletion.getActionPropertyValue(action, "allow_repeated");
				if (actionButton !== undefined) {
					// update ui
					if (allowRepeated === true) {
						var eventObj = HeroCard.Utility.getEventHandlerByElementId(elementId)
						// enable action button
						HeroCard.Actions.Common.enableActionButton(actionButton, defaultLabel, eventObj.eventName, eventObj.handlerName);
					} else {
						// change action label if 'completed_label' is present
						if (completedLabel !== undefined) {
							// update json
							var labelChanged = HeroCard.Actions.ActionCompletion.setActionPropertyValue(action, "label", completedLabel);
							if (labelChanged === true) {
								// update ui
								actionButton.innerHTML = completedLabel;
							}
						}
						HeroCard.Actions.Common.disableActionButton(actionButton, '');
						// check for mutex group action(s)
						if (mutexGroupId !== undefined) {
							var mutexGroupActions = HeroCard.Actions.ActionCompletion.getMutexActionIds(actionId, mutexGroupId);
							if (mutexGroupActions.length > 0) {
								HeroCard.Actions.Common.handleMutexActionCompletion(actionButton, mutexGroupActions);
							}
						}
					}
				}

				// remove card if 'remove_card_on_completion' is present and its 'true'
				var removeOnCompletion = HeroCard.Actions.ActionCompletion.getActionPropertyValue(action, "remove_card_on_completion");
				if (removeOnCompletion === true) {
					if (card) {
						var cardHtml = document.getElementById(card["id"] + "__" + card["id"] + "__card");
						HeroCard.Utility.removeCard(cardHtml);
					}
				}
			},

			/**
			 * Function to get mutually exclusive actons ids
			 * @param {string} actionId - id of the action
			 * @param {string} mutexGroupId - id of the mutex group
			 * @return {array} - arry of mutex action ids
			 */
			getMutexActionIds: function (actionId, mutexGroupId) {
				var mutexActionIds = [];
				var card = HeroCard.Actions.ActionCompletion.getCardByActionId(actionId);
				var actions = card.actions;

				for (var i = 0; i < actions.length; i++) {
					var actionMutexGroupId = HeroCard.Actions.ActionCompletion.getActionPropertyValue(actions[i], "mutually_exclusive_set_id");

					if ((actionMutexGroupId === mutexGroupId) && (actions[i].id !== actionId)) {
						mutexActionIds.push(actions[i].id);
					}
				}

				return mutexActionIds;
			}
		},

		ViewAttachment: {
			showCardAttachments: function (e, elem) {
				HeroCard.Actions.ViewAttachment.toggleCardAttachments(e, elem, 'SHOW');
			},

			closeCardAttachments: function (e, elem) {
				HeroCard.Actions.ViewAttachment.toggleCardAttachments(e, elem, 'HIDE');
			},

			toggleCardAttachments: function (e, elem, visibility) {
				var toggleClass = 'hccf-card-attachments--visible',
					popoverClass = 'hccf-card-body__attachments-preview',
					popoverVisibleClass = 'hccf-card-body__attachments-preview--visible';

				HeroCard.Actions.Common.toggleCardPopover(elem, visibility, toggleClass, popoverClass, popoverVisibleClass);
			}
		},

		Common: {

			/**
			 * Function to handle mutually exclusive action completion 
			 * @param {element} actionButton - action button element
			 * @param {array} mutexGroupActions - array of mutually exclusive action ids
			 */
			handleMutexActionCompletion: function (actionButton, mutexGroupActions) {
				HeroCard.Utility.addClass(actionButton, 'hccf-card-actions__item-link__mutex-action-complete');

				var actionItem = HeroCard.Utility.getClosest(actionButton, '.hccf-card-actions__item');

				//make action item full-width
				HeroCard.Utility.addClass(actionItem, 'hccf-card-actions__item--fullwidth');

				for (var i = 0; i < mutexGroupActions.length; i++) {
					var mutexButton = document.getElementById(mutexGroupActions[i] + "__" + "hccf-card-actions__item-link");
					var mutexItem = HeroCard.Utility.getClosest(mutexButton, '.hccf-card-actions__item');

					// hide mutex item
					HeroCard.Utility.addClass(mutexItem, 'hccf-card-actions__item--hidden');

				}

			},

			disableActionButton: function (actionButton, disableLabel) {
				actionButton.removeEventListener('click', void (0));
				HeroCard.Utility.addClass(actionButton, 'hccf-card-actions__item-link--complete');
				HeroCard.Utility.addClass(actionButton, 'hccf-card-actions__item-link--disabled');

				if (disableLabel) {
					actionButton.innerHTML = disableLabel;
				}
			},

			/**
			 * Function to enable action button
			 * @param {element} actionButton - action button element
			 * @param {string} label - button label to set
			 * @param {string} eventName - event type to attach
			 * @param {string}  handlerFunction - event handler function
			 */
			enableActionButton: function (actionButton, label, eventName, handlerFunction) {
				HeroCard.Utility.removeClass(actionButton, 'hccf-card-actions__item-link--complete');
				HeroCard.Utility.removeClass(actionButton, 'hccf-card-actions__item-link--disabled');

				if (label) {
					actionButton.innerHTML = label;
				}

				if (eventName && handlerFunction) {
					actionButton.addEventListener(eventName, function () {
						handlerFunction(actionButton);
					});
				}
			},

			showActionForm: function (actionButton, sectionClass, actionKey) {

				// return if action button marked as complete/disabled
				if (HeroCard.Utility.hasClass(actionButton, 'hccf-card-actions__item-link--complete')
					|| HeroCard.Utility.hasClass(actionButton, 'hccf-card-actions__item-link--disabled')) {
					return false;
				}

				var actionItem = HeroCard.Utility.getClosest(actionButton, '.hccf-card-actions__item'),
					actionItemSiblings = actionItem.parentNode.children,
					formSection = actionButton.parentNode.querySelector(sectionClass);

				// hide other buttons
				for (var i = 0; i < actionItemSiblings.length; i++) {
					if (!actionItemSiblings[i].isEqualNode(actionItem)) {
						HeroCard.Utility.addClass(actionItemSiblings[i], 'hccf-card-actions__item--hidden');
					}
				}

				// hide the action button
				HeroCard.Utility.addClass(actionButton, 'hccf-card-actions__item-link--hidden');

				//make the container full-width
				HeroCard.Utility.addClass(actionItem, 'hccf-card-actions__item--fullwidth');

				formSection.style.display = 'block';

				// Emit card rezized event
				HeroCard.EventEmitter.emit('CARDRESIZED');

				return true;
			},

			/**
			 * Function to hide the user input form upon clicking Cancel button
			 * @param {element} - the cancel button
			 * @param {string} - the user input section class
			 */
			hideActionForm: function (cancelButton, sectionClass) {

				var formSection = HeroCard.Utility.getClosest(cancelButton, sectionClass),
					form = HeroCard.Utility.getClosest(cancelButton, 'form'),
					actionButton = formSection.nextElementSibling,
					actionItem = HeroCard.Utility.getClosest(actionButton, '.hccf-card-actions__item'),
					actionItemSiblings = actionItem.parentNode.children;

				// clear the form
				HeroCard.Actions.Common.clearActionForm(form);


				// hide siblings
				for (var i = 0; i < actionItemSiblings.length; i++) {
					if (!actionItemSiblings[i].isEqualNode(actionItem)) {
						HeroCard.Utility.removeClass(actionItemSiblings[i], 'hccf-card-actions__item--hidden');
					}
				}

				// show main action button
				HeroCard.Utility.removeClass(actionButton, 'hccf-card-actions__item-link--hidden');

				//make the container normal width
				HeroCard.Utility.removeClass(actionItem, 'hccf-card-actions__item--fullwidth');

				formSection.style.display = 'none';

				// Emit card rezized event
				HeroCard.EventEmitter.emit('CARDRESIZED');
			},

			validateFormFields: function (form, submitButton) {

				var isValid = true,
					elements = form.elements,
					l = elements.length,
					i = 0,
					valuesObj = {};

				// create name/validation pair objects for form fields
				for (; i < l; i++) {
					if ((elements[i].type != 'hidden') && (elements[i].getAttribute('data-validation') !== undefined)) {
						valuesObj[elements[i].getAttribute('name')] = HeroCard.Actions.Common.validateFieldRules(null, elements[i], true);
					}
				}

				for (x in valuesObj) {
					if (!valuesObj[x]) {
						isValid = false;
					}
				}

				if (isValid) {
					// enable submit button
					HeroCard.Utility.removeClass(submitButton, 'hccf-card-actions__item-link--disabled');
				} else {
					// disable submit button
					HeroCard.Utility.addClass(submitButton, 'hccf-card-actions__item-link--disabled');
				}

				return isValid;

			},

			/**
			 * Function to reset and clear the from
			 * It also removes validation error styles/messages if any
			 * @param {element} - form element
			 */
			clearActionForm: function (form) {
				// reset form
				form.reset();

				// clear validation errors
				var formFields = form.getElementsByClassName('hccf-form-field');
				var len = formFields.length;

				for (var i = 0; i < len; i++) {
					var field = formFields[i],
						dotElem = field.getElementsByClassName('hccf-form-field__validation-error-dot'),
						errorElem = field.getElementsByClassName('hccf-form-field__validation-error'),
						messageElem = field.getElementsByClassName('hccf-form-field__validation-message');

					// remove the red dot
					if (dotElem[0] !== undefined) {
						HeroCard.Utility.removeClass(dotElem[0], 'hccf-form-field__validation-error-dot');
					}

					// remove the red border
					if (errorElem[0] !== undefined) {
						HeroCard.Utility.removeClass(errorElem[0], 'hccf-form-field__validation-error');
					}

					// hide error message
					if (messageElem[0] !== undefined) {
						messageElem[0].style.display = 'none';
					}
				}
			},

			getFormData: function (form) {

				var formData = '',
					elements = form.elements,
					l = elements.length,
					i = 0,
					valuesObj = {};

				// create name/value pair objects for form fields
				for (; i < l; i++) {
					if (elements[i].type != 'hidden') {
						if (elements[i].type == 'radio') {
							if (valuesObj[elements[i].getAttribute('name')] == undefined || valuesObj[elements[i].getAttribute('name')] == '') {
								valuesObj[elements[i].getAttribute('name')] = elements[i].checked ? elements[i].value.trim() : '';
							}
						}
						else if (elements[i].type == 'checkbox') {
							if (valuesObj[elements[i].getAttribute('name')] == undefined) {
								valuesObj[elements[i].getAttribute('name')] = elements[i].checked ? elements[i].value.trim() : '';
							} else {
								if (elements[i].checked && !valuesObj[elements[i].getAttribute('name')]) {
									valuesObj[elements[i].getAttribute('name')] = elements[i].value.trim();
								}
								else if (elements[i].checked && valuesObj[elements[i].getAttribute('name')]) {
									valuesObj[elements[i].getAttribute('name')] += ',' + elements[i].value.trim();
								}
							}
						}
						else {
							valuesObj[elements[i].getAttribute('name')] = elements[i].value.trim();
						}
					}
				}

				for (x in valuesObj) {
					if (formData) {
						formData += "&";
					} else {
						formData = "";
					}
					formData += x + '=' + encodeURIComponent(valuesObj[x]);
				}

				return formData;
			},

			encodeRoswellActionURLAndNavigate: function (card, form, userData, callback) {
				// info to construct the URL to RoswellFramework
				var cardId = card.getAttribute('data-card-id'),
					cardConnector = card.getAttribute('data-card-connector'),
					queryParams = [];

				if (userData) { queryParams.push(userData); }
				if (form) { queryParams.push("action=" + form.getAttribute('data-action-string')); }
				queryParams.push("callback=" + callback);

				var urlStr = 'roswellframework://' +
					(cardConnector ? cardConnector + "/" : "") +
					(cardId ? cardId : "") +
					"?" +
					queryParams.join("&");

				window.location = urlStr;
			},

			decodeRoswellActionURL: function (urlStr, sectionClass) {
				var url = HeroCard.Utility.parseURL(urlStr),
					cardID = url.cardid,
					actionObject = url.searchObject.actionObject,
					actionID = actionObject.id,
					actionKey = actionObject.action_key;

				if (actionKey === 'USER_INPUT') {
					var submitButton = document.getElementById(cardID + "__" + actionID + "__submit"),
						cancelButton = document.getElementById(cardID + "__" + actionID + "__cancel"),
						formSection = HeroCard.Utility.getClosest(submitButton, sectionClass),
						actionButton = formSection.nextElementSibling,
						cardHTML = HeroCard.Utility.getClosest(submitButton, '.hccf-hero-card');
				} else {
					var submitButton = '',
						cancelButton = '',
						actionButton = document.getElementById(actionID + '__' + 'hccf-card-actions__item-link'),
						cardHTML = document.getElementById(cardID + "__" + cardID + "__card");
				}

				return {
					cardID: cardID,
					actionButton: actionButton,
					submitButton: submitButton,
					cancelButton: cancelButton,
					actionObject: actionObject,
					cardHTML: cardHTML
				};

			},

			toggleCardPopover: function (elem, visibility, toggleClass, popoverClass, popoverVisibleClass) {
				var cardHolder = document.getElementById(window.HeroCardElement),
					cards = cardHolder.getElementsByClassName('hccf-hero-card'),
					popOverID = elem.getAttribute("popOverDivID");

				Array.prototype.forEach.call(cards, function (card, i) {
					if (visibility == 'SHOW') {
						card.classList.add(toggleClass);
					} else {
						card.classList.remove(toggleClass);
					}
				});

				var popover = document.getElementById(popOverID);

				if (popover == null) {
					var parentCard = HeroCard.Utility.getClosest(elem, '.hccf-hero-card');
					popover = parentCard.getElementsByClassName(popoverClass)[0];
				}

				if (popover == null) {
					popover = cardHolder.getElementsByClassName(popoverClass)[0];
				}

				if (visibility == 'SHOW') {
					popover.classList.add(popoverVisibleClass);
					cardHolder.appendChild(popover);
				} else {
					popover.classList.remove(popoverVisibleClass);
				}
			},

			validateFieldRules: function (e, field, showError) {
				if (!field.getAttribute('data-validation')) {
					return true;
				}

				var rules = field.getAttribute('data-validation').split(','),
					showError = (showError === false) ? false : true,
					value = '',
					isValid = true,
					errorMessage = '';

				var fieldBlock = HeroCard.Utility.getClosest(field, '.hccf-form-field'),
					messageBlock = fieldBlock.querySelectorAll('.hccf-form-field__validation-message')[0],
					messageContainer = messageBlock.querySelectorAll('span')[0];

				if ((field.type == 'radio') || (field.type == 'checkbox')) {
					var radioField = field.name,
						form = HeroCard.Utility.getClosest(field, '.hccf-card-action-form');
					value = HeroCard.Utility.checkRadioCheckboxValue(form.elements[radioField]);
				}
				else {
					value = field.value.trim();
				}

				for (x in rules) {
					switch (rules[x]) {
						case 'numeric':
							var isNumeric = HeroCard.Utility.checkForNumericValue(value);
							if (!isNumeric) {
								isValid = false;
								errorMessage = field.getAttribute('data-field-label') + ' must have numeric value only';
							}

							var min = field.getAttribute('min'),
								max = field.getAttribute('max');
							if ((min && max) && (parseInt(value) < parseInt(min) || parseInt(value) > parseInt(max))) {
								isValid = false;
								errorMessage = field.getAttribute('data-field-label') + ' should be between ' + min + ' and ' + max;
							}
							break;

						case 'phone':
							var isPhoneNumber = HeroCard.Utility.checkForPhoneNumber(value);
							if (!isPhoneNumber) {
								isValid = false;
								errorMessage = field.getAttribute('data-field-label') + ' should be 10 digits only';
							}
							break;

						case 'email':
							var isEmail = HeroCard.Utility.checkForEmail(value);
							if (!isEmail) {
								isValid = false;
								errorMessage = 'Please enter a valid e-mail address';
							}
							break;

						case 'date':
							var isDate = HeroCard.Utility.checkForDate(value);
							if (!isDate) {
								isValid = false;
								errorMessage = field.getAttribute('data-field-label') + ' must be a valid date';
							}
							break;

						default:
							if (!value) {
								isValid = false;
								errorMessage = field.getAttribute('data-field-label') + ' is required';
							}
							break;
					}

					if (!isValid) {
						break;
					}
				}


				if (isValid) {
					messageContainer.parentNode.previousSibling.children[0].classList.remove("hccf-form-field__validation-error");
					messageContainer.parentNode.previousSibling.classList.remove("hccf-form-field__validation-error-dot");
					messageContainer.textContent = '';
					messageBlock.style.display = 'none';

				} else {
					if (showError) {
						messageContainer.parentNode.previousSibling.children[0].classList.add("hccf-form-field__validation-error");
						messageContainer.parentNode.previousSibling.classList.add("hccf-form-field__validation-error-dot");
						messageContainer.textContent = errorMessage;
						messageBlock.style.display = 'block';
					}
				}

				// Emit card rezized event
				HeroCard.EventEmitter.emit('CARDRESIZED');

				return isValid;
			}
		}

	};

	// adding back the 'HeroCard' to global namespace
	window.HeroCard = HeroCard;

})();