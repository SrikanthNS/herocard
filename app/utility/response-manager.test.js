import HeroCardResponseManager from './response-manager';

describe('Response Manager', () => {
  describe('getCardsCount', () => {
    it('should return 0 when the results are undefined', () => {
      HeroCard.cardDataJSON = {};
      const result = HeroCardResponseManager.getCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 0 when the results are empty', () => {
      HeroCard.cardDataJSON = {
        results: [],
      };
      const result = HeroCardResponseManager.getCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 2 when the results are 1 connector with 2 cards', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [
              { id: 'card-id-1' },
              { id: 'card-id-2' },
            ],
          },
        ],
      };
      const result = HeroCardResponseManager.getCardsCount();

      expect(result).toEqual(2);
    });

    it('should return 4 when the results are 2 connectors with 2 cards each', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [
              { id: 'card-id-1' },
              { id: 'card-id-2' },
            ],
          },
          {
            connector_id: 'connector-id-2',
            cards: [
              { id: 'card-id-3' },
              { id: 'card-id-4' },
            ],
          },
        ],
      };
      const result = HeroCardResponseManager.getCardsCount();

      expect(result).toEqual(4);
    });
  });

  describe('getVisibleCardsCount', () => {
    it('should return 0 when the results are undefined', () => {
      HeroCard.cardDataJSON = {};
      const result = HeroCardResponseManager.getVisibleCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 0 when the results are empty', () => {
      HeroCard.cardDataJSON = {
        results: [],
      };
      const result = HeroCardResponseManager.getVisibleCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 0 when the results are 1 connector, but its cards are undefined', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
          },
        ],
      };
      const result = HeroCardResponseManager.getVisibleCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 0 when the results are 1 connector, but its cards is empty', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [],
          },
        ],
      };
      const result = HeroCardResponseManager.getVisibleCardsCount();

      expect(result).toEqual(0);
    });

    it('should return 4 when the results are 2 connectors with 2 cards each',
      () => {
        HeroCard.cardDataJSON = {
          results: [
            {
              connector_id: 'connector-id-1',
              cards: [
                {
                  id: 'card-id-1',
                  actions: [
                    { id: 'action-1', completed: false, remove_card_on_completion: true },
                  ],
                },
                {
                  id: 'card-id-2',
                  actions: [
                    { id: 'action-2', completed: false, remove_card_on_completion: true },
                  ],
                },
              ],
            },
            {
              connector_id: 'connector-id-2',
              cards: [
                {
                  id: 'card-id-3',
                  actions: [
                    { id: 'action-3', completed: false, remove_card_on_completion: true },
                  ],
                },
                {
                  id: 'card-id-4',
                  actions: [
                    { id: 'action-4', completed: false, remove_card_on_completion: true },
                  ],
                },
              ],
            },
          ],
        };
        const result = HeroCardResponseManager.getVisibleCardsCount();

        expect(result).toEqual(4);
      });

    it('should return 3 when the results are 2 connectors with 2 cards each and one of them is completed-to-be-removed',
      () => {
        HeroCard.cardDataJSON = {
          results: [
            {
              connector_id: 'connector-id-1',
              cards: [
                {
                  id: 'card-id-1',
                  actions: [
                    { id: 'action-1', completed: true, remove_card_on_completion: true },
                  ],
                },
                {
                  id: 'card-id-2',
                  actions: [
                    { id: 'action-2', completed: false, remove_card_on_completion: true },
                  ],
                },
              ],
            },
            {
              connector_id: 'connector-id-2',
              cards: [
                {
                  id: 'card-id-3',
                  actions: [
                    { id: 'action-3', completed: false, remove_card_on_completion: true },
                  ],
                },
                {
                  id: 'card-id-4',
                  actions: [
                    { id: 'action-4', completed: false, remove_card_on_completion: true },
                  ],
                },
              ],
            },
          ],
        };
        const result = HeroCardResponseManager.getVisibleCardsCount();

        expect(result).toEqual(3);
      });
  });

  describe('checkForExpiredCard', () => {
    it('should return false when the results are undefined', () => {
      HeroCard.cardDataJSON = {};
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(false);
    });

    it('should return false when the results are empty', () => {
      HeroCard.cardDataJSON = {
        results: [],
      };
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(false);
    });

    it('should return false when the results are 1 connector, but its cards are undefined', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
          },
        ],
      };
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(false);
    });

    it('should return false when the results are 1 connector, but its cards are empty', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [],
          },
        ],
      };
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(false);
    });

    it('should return false when the results are 1 connector with 2 unexpired cards', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [
              { id: 'card-id-1' },
              { id: 'card-id-2', expiration_date: new Date(Date.now() + 30000).toISOString() },
            ],
          },
        ],
      };
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(false);
    });

    it('should return true when the results are 1 connector with 1 expired card', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            cards: [
              { id: 'card-id-1' },
              { id: 'card-id-2', expiration_date: new Date(1).toISOString() },
            ],
          },
        ],
      };
      const result = HeroCardResponseManager.checkForExpiredCard();

      expect(result).toEqual(true);
    });
  });

  describe('getAuthFailedConnectorIds', () => {
    it('should return [] when the results are undefined', () => {
      HeroCard.cardDataJSON = {};
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual([]);
    });

    it('should return [] when the results are empty', () => {
      HeroCard.cardDataJSON = {
        results: [],
      };
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual([]);
    });

    it('should return [] when the results are 1 connector, but its connector_status is undefined', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
          },
        ],
      };
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual([]);
    });

    it('should return [] when the results are 1 connector, but its backend_status is undefined', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            connector_status: {},
          },
        ],
      };
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual([]);
    });

    it('should return [] when the results are 1 connector, but its backend_status is not 401', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            connector_status: {
              backend_status: 500,
            },
          },
        ],
      };
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual([]);
    });

    it('should return ["connector-id-1"] when the results are 1 connector and its backend_status is 401', () => {
      HeroCard.cardDataJSON = {
        results: [
          {
            connector_id: 'connector-id-1',
            connector_status: {
              backend_status: 401,
            },
          },
        ],
      };
      const result = HeroCardResponseManager.getAuthFailedConnectorIds();

      expect(result).toEqual(['connector-id-1']);
    });
  });
});
