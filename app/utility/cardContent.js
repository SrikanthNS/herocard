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
  App file (starting point)
****************************************************/

(function () {

    window.HeroCard = window.HeroCard || {};

    window.HeroCard.cardContent = {
        toRender: function () {
            var result = HeroCard.cardDataJSON;
            var identityProvider = HeroCard.identityProvider;

            if (identityProvider && !identityProvider.hasAccessToken) {
                result = HeroCard.cardContent.identityProviderAuthCard(identityProvider.id, identityProvider.name);
            }

            return result;
        },

        // Contents of this function will need to be replaced once UI/UX has designed a new card for identity provider auth.
        identityProviderAuthCard: function (id, name) {
            return HeroCard.cardContent.connectorAuthCard(id, name);
        },

        connectorAuthCard: function (id, name) {

            if (!id || !name) {
                throw new Error("Unable to present Auth Card due to id: " + id + " and/or name: " + name)
            }

            var actionId = id;

            var identityCard = {
                results: [
                    {
                        connector_id: id,
                        cards: [
                            {
                                actions: [
                                    {
                                        action_key: "AUTH_LOGIN",
                                        url: {
                                            href: "/connectors"
                                        },
                                        label: "Login",
                                        id: "action_refresh_" + actionId,
                                        remove_card_on_completion: true,
                                        primary: true,
                                        type: "GET",
                                        completed: false,
                                        completed_label: "Completed"
                                    },
                                    {
                                        action_key: "AUTH_DISMISS",
                                        url: {
                                            href: "/connectors"
                                        },
                                        label: "Dismiss",
                                        id: "action_dismiss_" + actionId,
                                        remove_card_on_completion: true,
                                        type: "GET",
                                        completed: false,
                                        completed_label: "Dismissed"
                                    }
                                ],
                                template: {
                                    href: "/connectors"
                                },
                                body: {
                                    description: "Your connector credentials have expired.  Please update to access " + name + " cards."
                                },
                                header: {
                                    title: "Re-configure " + name + " Connector"
                                },
                                id: id,
                                name: name
                            }
                        ]
                    }
                ]
            };

            return identityCard;
        },

    }

})();