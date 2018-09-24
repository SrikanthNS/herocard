/** ***************************************
  JSON Data To Create Cards From
*****************************************/

(function () {
  // access 'HeroCard' namespace or create one
  const HeroCard = window.HeroCard || {};


  HeroCard.cardDataJSON = {
    results: [
      {
        // This connector should NOT show an auth card in the test UI because we will not be adding it to our connector info list in index.html.
        // Connector info list describes the list of connectors currently configured client side.  A connector not in the connector info list
        // would represent a connector that was maybe removed from discovery for example. An old stale connector that does not need re-auth.
        connector_id: 'SHOULD_NOT_SHOW_REMOVED',
        connector_status: {
          status: 400,
          backend_status: 401,
        },
      },
      {
        connector_id: '401_Connector',
        connector_status: {
          status: 400,
          backend_status: 401,
        },
      },
      {
        // 500 status should not give us an auth card.  Only 401 backend_status will show auth card.
        connector_id: 'SHOULD_NOT_SHOW_500',
        connector_status: {
          status: 400,
          backend_status: 500,
        },
      },
      {
        // We will indicate in connector info that this connector currently has credentials.  Therefore, we will NOT render an auth card here.
        connector_id: 'Authenticated_Connector',
        connector_status: {
          status: 400,
          backend_status: 401,
        },
      },
      {
        connector_id: 'salesforce',
        cards: [
          {
            id: '4947dff0-45c7-4c16-8582-2298b817e4e2',
            expiration_date: '2019-01-20T17:33:17.656Z',
            name: 'Boomi SFDC',
            expand: false,
            template: {
              href: '/connectors/salesforce/templates/generic.hbs',
            },
            header: {
              title: 'Expired Test Card',
            },
            body: {
              description: '(should not see, b/c it is expired) Card to test form fields...',
            },
            actions: [
              {
                id: '6bf64604-1393-4076-aeab-30B91276e20d',
                label: 'Click Me',
                url: {
                  href: '/connectors/salesforce/accounts/00141000007PyDFAA0/contacts',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                  contact_email: 'MEM4@mem13.ssdevrd.com',
                },
                completed: false,
                remove_card_on_completion: true,
                completed_label: 'Contact Added',
                user_input: [
                  {
                    id: 'number',
                    label: 'Quantity',
                    format: 'number',
                    range: [1, 5], /* range property is optional*/
                    validation: ['required', 'numeric'],
                  },
                  {
                    id: 'email',
                    label: 'E-mail',
                    format: 'email',
                    validation: ['required', 'email'],
                  },
                  {
                    id: 'telephone',
                    label: 'Telephone',
                    format: 'tel',
                    validation: ['required', 'phone'],
                  },
                  {
                    id: 'date',
                    label: 'Birthday',
                    format: 'date',
                    validation: ['required', 'date'],
                  },
                  {
                    id: 'range',
                    label: 'Points',
                    format: 'range',
                    range: [0, 10], /* range property is optional; if not provided default will be 0-100 */
                  },
                  {
                    id: 'first_name',
                    label: 'First name',
                    format: 'text',
                    validation: ['required'],
                  },
                  {
                    id: 'last_name',
                    label: 'Last name',
                    format: 'text',
                    validation: ['required'],
                  },
                  {
                    id: 'comment_body',
                    label: 'Comment',
                    format: 'textarea',
                    validation: ['required'],
                  },
                  {
                    id: 'favorite_color',
                    label: 'Favorite Color',
                    format: 'select',
                    options: { red: 'Red', green: 'Green', blue: 'Blue', orange: 'Orange' },
                    selected: 'orange',
                    validation: ['required'],
                  },
                  {
                    id: 'favorite_ice_cream',
                    label: 'Favorite Ice Cream',
                    format: 'radio',
                    options: { vanilla: 'French Vanilla', chocolate: 'Triple Chocolate', other: 'Something else' },
                    selected: 'other',
                    validation: ['required'],
                  },
                  {
                    id: 'radio_switch',
                    label: 'Switch',
                    format: 'radio',
                    options: { true: 'On', false: 'Off' },
                  },
                  {
                    id: 'my_vehicles',
                    label: 'My Vehicles',
                    format: 'checkbox',
                    options: { Bike: 'I have a bike', Car: 'I have a car' },
                    selected: 'Bike',
                    validation: ['required'],
                  },
                ],
              },
            ],
          },
          {
            id: '4947dff0-45c7-4c16-8582-2297e4e28b81',
            name: 'Salesforce',
            expand: true,
            template: {
              href: '/connectors/salesforce/templates/generic.hbs',
            },
            header: {
              title: 'Add a contact in Salesforce?',
            },
            body: {
              description: '',
            },
            actions: [
              {
                id: '6bf64604-1393-4076-aeab-30a91276e20d',
                label: 'Add contact',
                url: {
                  href: '/connectors/salesforce/accounts/00141000007PyDFAA0/contacts',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                  contact_email: 'MEM4@mem13.ssdevrd.com',
                },
                completed: false,
                remove_card_on_completion: true,
                completed_label: 'Contact Added',
                user_input: [
                  {
                    id: 'first_name',
                    label: 'First name',
                    format: 'text',
                    validation: ['required'],
                  },
                  {
                    id: 'last_name',
                    label: 'Last name',
                    format: 'text',
                    validation: ['required'],
                  },
                ],
              },
            ],
          },
          {
            id: 'GSERBER634563456HGDFGL',
            name: 'Salesforce',
            template: {
              href: 'https://hero.card.server/connectors/salesforce/templates/generic.hbs',
            },
            is_actionable: true,
            header: {
              title: 'Salesforce Opportunity',
              subtitle: ['Labcorp'],
            },
            body: {
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Owner',
                  description: 'Martin Thomson',
                },
                {
                  type: 'GENERAL',
                  title: 'Email',
                  description: 'm.thompson@salesco.com',
                },
                {
                  type: 'GENERAL',
                  title: 'Revenue',
                  description: '$250K',
                },
                {
                  type: 'GENERAL',
                  title: 'Last contact',
                  description: 'December 9 2016',
                },
                {
                  type: 'ATTACHMENT',
                  title: 'Attachments',
                  content: [
                    {
                      type: 'TEXT',
                      title: 'Opportunity Detail',
                      src: 'icon-text.png',
                      timestamp: '06/02/2016',
                      size: '2.13 MB',
                    },
                    {
                      type: 'WORD',
                      title: 'Revenue Detail',
                      src: 'icon-word.png',
                      timestamp: '05/28/2016',
                      size: '93.11 MB',
                    },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'HCA_Add_Comment_Salesforce_1',
                action_key: 'USER_INPUT',
                label: 'Add Comment',
                url: { href: 'https://hero.card.server/connector/salesforce/comments' },
                type: 'POST',
                completed: false,
                user_input: [
                  {
                    id: 'comment_body',
                    label: 'Comment',
                    format: 'textarea',
                    validation: ['required'],
                  },
                ],
              },
              {
                id: 'HCA_View_Opportunity_Salesforce_2',
                primary: true,
                label: 'View',
                action_key: 'VIEW_OPPORTUNITY',
                url: {
                  href: 'https://hero.card.server/connector/salesforce/view',
                },
                type: 'WEB',
                completed: false,
                request: {
                  name: 'John Smith',
                  email: 'john.smith@bigdeal.com',
                },
              },
            ],
          },
          {
            id: 'GSERBER634563456HGDFGA',
            name: 'Salesforce',
            template: { href: 'https://hero.card.server/connectors/salesforce/templates/generic.hbs' },
            is_actionable: true,
            header: {
              title: 'Marthin Thomson',
              subtitle: ['Labcorp'],
            },
            body: {
              timestamp: '2017-03-20T17:33:17.656Z',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Purpose',
                  description: 'Customer Meeting',
                },
                {
                  type: 'GENERAL',
                  title: 'Total',
                  description: '$803.40',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 3',
                  description: 'Some text.',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 4',
                  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 5',
                  description: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 6',
                  description: 'Text 1234',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 7',
                  description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 8',
                  description: 'Text 1234',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 9',
                  description: 'Text 1234',
                },
                {
                  type: 'GENERAL',
                  title: 'Field 10',
                  description: 'Text 1234',
                },
                {
                  type: 'COMMENT',
                  title: 'Comments',
                  content: [
                    {
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ligula a tincidunt cursus. Pellentesque urna massa, tincidunt et pulvinar quis, maximus vel dolor. Nunc lobortis nulla enim, a porta.',
                    },
                    {
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ligula a tincidunt cursus. Pellentesque urna massa, tincidunt et pulvinar quis, maximus vel dolor. Nunc lobortis nulla enim, a porta.',
                    },
                  ],
                },
                {
                  type: 'ATTACHMENT',
                  title: 'Attachments',
                  content: [
                    {
                      type: 'PDF',
                      title: 'Report analysis',
                      src: 'icon-pdf.png',
                      timestamp: '06/07/2016',
                      size: '453.65 MB',
                    },
                    {
                      type: 'PPT',
                      title: 'Sales Presentations',
                      src: 'icon-ppt.png',
                      timestamp: '06/03/2016',
                      size: '14.65 MB',
                    },
                    {
                      type: 'TEXT',
                      title: 'Test Flight Procedures',
                      src: 'icon-text.png',
                      timestamp: '06/02/2016',
                      size: '2.13 MB',
                    },
                    {
                      type: 'PDF',
                      title: 'Safety Regulations',
                      src: 'icon-pdf.png',
                      timestamp: '05/29/2016',
                      size: '29.31 MB',
                    },
                    {
                      type: 'WORD',
                      title: 'Landing Procedure',
                      src: 'icon-word.png',
                      timestamp: '05/28/2016',
                      size: '93.11 MB',
                    },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'HCA_Create_Opportunity_Salesforce_4',
                action_key: 'CREATE_OPPORTUNITY',
                label: 'Create Opportunity',
                url: { href: 'https://hero.card.server/connector/salesforce/createOpportunity' },
                completed: false,
                type: 'WEB',
                request: {
                  name: 'John Smith',
                  email: 'john.smith@bigdeal.com',
                },
              },
            ],
          },
        ],
      },
      {
        connector_id: 'concur',
        cards: [
          {
            id: 'GSERBER634563456HGDFGQ',
            name: 'Concur',
            template: {
              href: 'https://hero.card.server/connectors/salesforce/templates/generic.hbs',
            },
            is_actionable: true,
            header: {
              title: 'Your upcoming trip to Atlanta',
              subtitle: [
                'Mon, Oct 03 - Thu, Oct 06',
                'AUSTIN to ATLANTA',
              ],
            },
            body: {
              fields: [
                {
                  type: 'TRIPINFO',
                  title: 'Trip to Atlanta',
                  content: [
                    {
                      title: 'Departure',
                      image: 'tripinfo-departure.png',
                      text: '10:06 AM CST - AUSTIN',
                    },
                    {
                      title: 'Arrival',
                      image: 'tripinfo-arrival.png',
                      text: '09:10 AM EST - ATLANTA',
                    },
                  ],
                  trip_details: {
                    summary: {
                      event: 'AW Connect',
                      date: 'Mon, Oct 03 - Thu, Oct 06',
                      others: [
                        'Agency Record Locator: MR0DGN',
                      ],
                    },
                    trips: [
                      {
                        date: 'Mon Oct 03',
                        time: '10:06 AM',
                        destination: 'Austin to Atlanta',
                        flight: 'Delta 1401',
                        terminal: '2',
                        gate: '9',
                      },
                      {
                        date: 'Thu Oct 06',
                        time: '04:45 PM',
                        destination: 'Atlanta to Austin',
                        flight: 'Delta 2611',
                        terminal: '1',
                        gate: '--',
                      },
                    ],
                  },
                },
              ],
            },
            actions: [
              {
                id: 'HCA_View_Trip_Concur_0',
                primary: true,
                label: 'View Trip',
                action_key: 'VIEW_TRIP',
                url: {
                  href: 'https://hero.card.server/connector/salesforce/view',
                },
                completed: false,
                type: 'WEB',
              },
            ],
          },
        ],
      },
      {
        connector_id: 'jira',
        cards: [
          {
            id: 'Old_Action_Labels_Jira',
            name: 'Jira',
            template: {
              href: 'https://hero.card.server/connector/jira/templates/generic.hbs',
            },
            is_actionable: true,
            header: {
              title: 'Add a comment to ISDK-170184?',
            },
            body: {
              description: 'Add a comment to Jira issue: iPhone X is flagging all AW apps as compromised (Old action labels)',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Project',
                  description: 'SDK - iOS',
                },
                {
                  type: 'GENERAL',
                  title: 'Summary',
                  description: 'iPhone X is flagging all AW apps as compromised',
                },
                {
                  type: 'GENERAL',
                  title: 'Status',
                  description: 'Active',
                },
                {
                  type: 'GENERAL',
                  title: 'Assignee',
                  description: 'Kishore Sajja',
                },
                {
                  type: 'GENERAL',
                  title: 'Reporter',
                  description: 'David Shaw',
                },
                {
                  type: 'GENERAL',
                  title: 'Components',
                  description: 'Client Implementation,Server Implementation',
                },
                {
                  type: 'GENERAL',
                  title: 'Labels',
                  description: 'abc,def',
                },
                {
                  type: 'GENERAL',
                  title: 'Description',
                  description: 'When using the iPhone app, it was flagging all AW apps as compromised.  This fake ticket is to test the old verbose button labels.',
                },
                {
                  type: 'COMMENT',
                  title: 'Comments',
                  content: [
                    { text: 'This is the last (most recent) comment' },
                    { text: 'This is the 2nd last comment' },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'Old_Action_Labels_Jira_Comment',
                action_key: 'USER_INPUT',
                label: 'Add Comment',
                completed_label: 'Added comment successfully',
                url: {
                  href: 'https://hero.card.server/connectors/jira/comment',
                },
                type: 'POST',
                user_input: [
                  {
                    id: 'body',
                    label: 'Comment',
                    format: 'textarea',
                  },
                ],
                request: {},
              },
              {
                id: 'Old_Action_Labels_Jira_Open',
                action_key: 'OPEN_IN',
                label: 'Open in Browser',
                url: {
                  href: 'https://jira-euc.eng.vmware.com/jira/browse/APF-40',
                },
                type: 'GET',
                user_input: [],
                request: {},
              },
              {
                id: 'Old_Action_Labels_Jira_Watcher',
                action_key: 'DIRECT',
                label: 'Add Watcher',
                completed_label: 'Added watcher successfully',
                url: {
                  href: 'https://hero.card.server/connectors/jira/watcher',
                },
                type: 'POST',
                user_input: [],
                request: {},
              },
            ],
          },
          {
            id: 'New_Action_Labels_Jira',
            name: 'Jira',
            template: {
              href: 'https://hero.card.server/connector/jira/templates/generic.hbs',
            },
            is_actionable: true,
            header: {
              title: 'Add a comment to ISDK-170184?',
            },
            body: {
              description: 'Add a comment to Jira issue: iPhone X is flagging all AW apps as compromised (New action labels)',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Project',
                  description: 'SDK - iOS',
                },
                {
                  type: 'GENERAL',
                  title: 'Summary',
                  description: 'iPhone X is flagging all AW apps as compromised',
                },
                {
                  type: 'GENERAL',
                  title: 'Status',
                  description: 'Active',
                },
                {
                  type: 'GENERAL',
                  title: 'Assignee',
                  description: 'Kishore Sajja',
                },
                {
                  type: 'GENERAL',
                  title: 'Reporter',
                  description: 'David Shaw',
                },
                {
                  type: 'GENERAL',
                  title: 'Components',
                  description: 'Client Implementation,Server Implementation',
                },
                {
                  type: 'GENERAL',
                  title: 'Labels',
                  description: 'abc,def',
                },
                {
                  type: 'GENERAL',
                  title: 'Description',
                  description: 'When using the iPhone app, it was flagging all AW apps as compromised.  This fake ticket is to test the new terse button labels.',
                },
                {
                  type: 'COMMENT',
                  title: 'Comments',
                  content: [
                    { text: 'This is the last (most recent) comment' },
                    { text: 'This is the 2nd last comment' },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'New_Action_Labels_Jira_Comment',
                action_key: 'USER_INPUT',
                label: 'Comment',
                completed_label: 'Commented',
                url: {
                  href: 'https://hero.card.server/connectors/jira/comment',
                },
                type: 'POST',
                user_input: [
                  {
                    id: 'body',
                    label: 'Comment',
                    format: 'textarea',
                  },
                ],
                request: {},
              },
              {
                id: 'New_Action_Labels_Jira_Open',
                action_key: 'OPEN_IN',
                label: 'Open',
                url: {
                  href: 'https://jira-euc.eng.vmware.com/jira/browse/APF-40',
                },
                type: 'GET',
                user_input: [],
                request: {},
              },
              {
                id: 'New_Action_Labels_Jira_Watcher',
                action_key: 'DIRECT',
                label: 'Watch',
                completed_label: 'Watching',
                url: {
                  href: 'https://hero.card.server/connectors/jira/watcher',
                },
                type: 'POST',
                user_input: [],
                request: {},
              },
            ],
          },
          {
            id: 'GSERBER634563456HGDFGK',
            name: 'Jira',
            template: 'https://hero.card.server/connector/jira/template/jira-comment',
            is_actionable: true,
            header: {
              title: 'Add a comment to the Jira ticket?',
            },
            body: {
              description: 'Would you like to add a comment to the Jira ticket?',
            },
            actions: [
              {
                id: 'HCA_Approve_Jira_0',
                primary: true,
                action_key: 'APPROVE',
                remove_card_on_completion: true,
                label: 'Approve',
                url: {
                  href: 'https://hero.card.server/connectors/jira/approve',
                },
                completed: false,
                type: 'POST',
                completed_label: 'APPROVED',
                request: {
                  name: 'John Smith',
                  email: 'john.smith@bigdeal.com',
                },
              },
              {
                id: 'HCA_Add_Comment_Jira_1',
                action_key: 'USER_INPUT',
                label: 'Add Comment',
                url: {
                  href: 'https://hero.card.server/connector/jira/comments',
                },
                completed: false,
                type: 'POST',
                user_input: [
                  {
                    id: 'commentBody',
                    label: 'Comment',
                    format: 'textarea',
                    validation: ['required'],
                  },
                ],
              },
            ],
          },
          {
            id: 'GSERBER634563456HGDFGK',
            name: 'Jira',
            template: 'https://hero.card.server/connector/jira/template/jira-comment',
            is_actionable: true,
            header: {
              title: 'Add a comment to the Jira ticket?',
            },
            body: {
              description: 'Would you like to add a comment to the Jira ticket?',
            },
            actions: [
              {
                id: 'HCA_Approve_Jira_0',
                primary: true,
                action_key: 'APPROVE',
                remove_card_on_completion: true,
                label: 'Approve',
                url: {
                  href: 'https://hero.card.server/connectors/jira/approve',
                },
                completed: false,
                type: 'POST',
                completed_label: 'APPROVED',
                request: {
                  name: 'John Smith',
                  email: 'john.smith@bigdeal.com',
                },
              },
              {
                id: 'HCA_Add_Comment_Jira_1',
                action_key: 'USER_INPUT',
                label: 'Add Comment',
                url: {
                  href: 'https://hero.card.server/connector/jira/comments',
                },
                completed: false,
                type: 'POST',
                user_input: [
                  {
                    id: 'commentBody',
                    label: 'Comment',
                    format: 'textarea',
                    validation: ['required'],
                  },
                ],
              },
            ],
          },
          {
            id: 'GSERBER634563456HGDFGKYU',
            name: 'Jira',
            template: 'https://hero.card.server/connector/jira/template/jira-comment',
            is_actionable: true,
            header: {
              title: 'Display Jira ticket?',
            },
            body: {
              description: 'You have been mentioned in APF-192',
            },
            actions: [
              {
                id: 'HCA_Show_Jira_0',
                primary: true,
                action_key: 'OPEN_IN',
                label: 'Show',
                url: { href: 'https://jira-euc.eng.vmware.com/jira/browse/APF-192' },
                completed: false,
                type: 'GET',
              },
            ],
          },
        ],
      },
      {
        connector_id: 'servicenow',
        cards: [
          {
            id: 'a29581ba-8671-4ffd-a921-1b0b5fb58a09',
            name: 'ServiceNow',
            template: {
              href: '/connectors/servicenow/templates/generic.hbs',
            },
            header: {
              title: 'Service Now',
              subtitle: ['Ticket'],
            },
            body: {
              description: 'Approve ServiceNow Request',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Ticket ID',
                  description: 'REQ0010002',
                },
                {
                  type: 'GENERAL',
                  title: 'Request Date',
                  description: '2017-08-18 15:53:05',
                },
                {
                  type: 'GENERAL',
                  title: 'Priority',
                  description: '4',
                },
              ],
            },
            actions: [
              {
                id: 'HCA_Approve_ServiceNow_0',
                primary: true,
                completed: false,
                mutually_exclusive_set_id: 'servicenow-approval-flow',
                completed_label: 'APPROVED',
                remove_card_on_completion: false,
                allow_repeated: false,
                label: 'Approve',
                url: {
                  href: '/ws/rest/connectors/servicenow/snowRequest/approve',
                },
                type: 'POST',
                action_key: 'DIRECT',
                request: {
                  email_id: 'eric.schroeder@example.com',
                  approval_item: 'REQ0010002',
                  approval_sys_id: '612bcfd74f20030023d801f18110c7ba',
                },
              },
              {
                id: 'HCA_Reject_ServiceNow_1',
                completed: false,
                remove_card_on_completion: false,
                allow_repeated: false,
                label: 'Reject',
                completed_label: 'REJECTED',
                mutually_exclusive_set_id: 'servicenow-approval-flow',
                url: {
                  href: '/ws/rest/connectors/servicenow/snowRequest/reject',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                  email_id: 'eric.schroeder@example.com',
                  approval_item: 'REQ0010002',
                  approval_sys_id: '612bcfd74f20030023d801f18110c7ba',
                },
                user_input: [
                  {
                    id: 'reason',
                    label: 'Reason for Rejection',
                    format: 'textarea',
                    min_length: 1,
                  },
                ],
              },
            ],
          },
          {
            id: 'bd9c81ba-9944-1ffd-a921-1b0b5fb58a09',
            name: 'ServiceNow',
            template: {
              href: '/connectors/servicenow/templates/generic.hbs',
            },
            header: {
              title: 'Completed Service Now',
              subtitle: ['Ticket'],
            },
            body: {
              description: '(should not see, b/c it is completed) Approve ServiceNow Request',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Ticket ID',
                  description: 'REQ0022002',
                },
                {
                  type: 'GENERAL',
                  title: 'Request Date',
                  description: '2017-08-18 15:53:05',
                },
                {
                  type: 'GENERAL',
                  title: 'Priority',
                  description: '4',
                },
              ],
            },
            actions: [
              {
                id: 'HCA_Approve_ServiceNow_0',
                primary: true,
                completed: true,
                completed_label: 'APPROVED',
                remove_card_on_completion: true,
                allow_repeated: false,
                label: 'Approve',
                url: {
                  href: '/ws/rest/connectors/servicenow/snowRequest/approve',
                },
                type: 'POST',
                action_key: 'DIRECT',
                request: {
                  email_id: 'eric.schroeder@example.com',
                  approval_item: 'REQ0010002',
                  approval_sys_id: '612bcfd74f20030023d801f18110c7ba',
                },
              },
              {
                id: 'HCA_Reject_ServiceNow_1',
                completed: false,
                remove_card_on_completion: true,
                allow_repeated: false,
                label: 'Reject',
                completed_label: 'REJECTED',
                url: {
                  href: '/ws/rest/connectors/servicenow/snowRequest/reject',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                  email_id: 'eric.schroeder@example.com',
                  approval_item: 'REQ0010002',
                  approval_sys_id: '612bcfd74f20030023d801f18110c7ba',
                },
                user_input: [
                  {
                    id: 'reason',
                    label: 'Reason for Rejection',
                    format: 'textarea',
                    min_length: 1,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        connector_id: 'concur',
        cards: [
          {
            id: 'CONCUR01-0000-0000-0000-34563456HGDF',
            name: 'Concur',
            creation_date: '1970-01-01T00:00:00Z',
            template: {
              href: 'https://hero/connectors/concur/templates/generic.hbs',
            },
            header: {
              title: 'Expense Report Pending Your Approval',
            },
            body: {
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Report To',
                  description: 'Anshul Sharma',
                },
                {
                  type: 'GENERAL',
                  title: 'Report From',
                  description: 'Sudharsan Sathiamoorthy',
                },
                {
                  type: 'GENERAL',
                  title: 'Report Purpose',
                  description: 'Starbucks',
                },
                {
                  type: 'GENERAL',
                  title: 'Report Amount',
                  description: '1500',
                },
              ],
            },
            actions: [
              {
                id: 'CONCUR01-0000-0000-0000-APPROVE',
                label: 'Approve',
                mutually_exclusive_set_id: 'concur-approval-flow',
                url: {
                  href: 'https://hero/connectors/concur/api/expense/approve/79D89435DAE94F53BF60',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                },
                user_input: [
                  {
                    id: 'reason',
                    label: 'Reason for approval',
                    min_length: 1,
                  },
                ],
              },
              {
                id: 'CONCUR01-0000-0000-0000-REJECT',
                label: 'Reject',
                mutually_exclusive_set_id: 'concur-approval-flow',
                url: {
                  href: 'https://hero/connectors/concur/api/expense/reject/79D89435DAE94F53BF60',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {
                },
                user_input: [
                  {
                    id: 'reason',
                    label: 'Reason for rejection',
                    min_length: 1,
                  },
                ],
              },
              {
                id: 'CONCUR01-0000-0000-0000-OPEN',
                label: 'Open',
                url: {
                  href: 'https://concursolutions.com',
                },
                type: 'GET',
                action_key: 'OPEN_IN',
                request: {
                },
                user_input: [
                ],
              },
            ],
          },
        ],
      },

      {
        connector_id: 'airwatch',
        cards: [
          {
            id: 'AIRWATCH01-0000-0000-0000-000000000000',
            name: 'AirWatch',
            creation_date: '1970-01-01T00:00:00Z',
            template: {
              href: 'https://hero/connectors/airwatch/templates/generic.hbs',
            },
            header: {
              title: 'Boxer',
            },
            body: {
              description: 'Please install this application for better interaction with the resource.',
            },
            actions: [
              {
                id: 'AIRWATCH01-0000-0000-0000-INSTALL',
                label: 'Install',
                url: {
                  href: 'awjade://notify?action=INSTALL_APP&appId=com.android.boxer',
                },
                type: 'GET',
                action_key: 'INSTALL_APP',
                request: {},
                user_input: [],
              },
            ],
          },
        ],
      },

      {
        connector_id: 'bitbucket',
        cards: [
          {
            id: 'BITBUCKET01-639e-42a8-a9b6-a66aa62d8a9a',
            creation_date: '2018-01-30T11:54:39.271+05:30',
            header: {
              title: 'BitBucket Server PR - Feature/APF-651 add image and test auth test/Sudharsan Sathiamoorthy',
              subtitle: 'Description * APF-651-Added integration test for getImage and getAuthKey\r\n* APF-651-Added integration test for test auth for connectors',
            },
            body: {
              description: '* APF-651-Added integration test for getImage and getAuthKey\r\n* APF-651-Added integration test for test auth for connectors',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Repository',
                  description: 'app-platform-server',
                },
                {
                  type: 'GENERAL',
                  title: 'Author',
                  description: 'Sudharsan Sathiamoorthy',
                },
                {
                  type: 'GENERAL',
                  title: 'Title',
                  description: 'Feature/APF-651 add image and test auth test',
                },
                {
                  type: 'GENERAL',
                  title: 'State',
                  description: 'MERGED',
                },
                {
                  type: 'GENERAL',
                  title: 'Open',
                  description: 'false',
                },
                {
                  type: 'COMMENT',
                  title: 'Comment',
                  content: [
                    {
                      text: 'Test commit for pr 236.',
                    },
                    {
                      text: 'Test commit 1.',
                    },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'BITBUCKET01-639e-42a8-a9b6-COMMENT',
                label: 'Comment',
                url: {
                  href: 'https://hero/connectors/stash/api/v1/UFO/app-platform-server/236/comments',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'Comment',
                    label: 'Comment',
                    min_length: 1,
                  },
                ],
                completed_label: 'Comment',
              },
            ],
          },
          {
            id: 'BITBUCKET02-639e-42a8-a9b6-a66aa62d8a9a',
            creation_date: '1970-01-01T00:00:00Z',
            header: {
              title: 'BitBucket Server PR - APF-27-Test commit for stash connector./Sudharsan Sathiamoorthy',
              subtitle: 'Description Please do not merge this branch.',
            },
            body: {
              description: 'Please do not merge this branch.',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Repository',
                  description: 'app-platform-server',
                },
                {
                  type: 'GENERAL',
                  title: 'Author',
                  description: 'Sudharsan Sathiamoorthy',
                },
                {
                  type: 'GENERAL',
                  title: 'Title',
                  description: 'APF-27-Test commit for stash connector.',
                },
                {
                  type: 'GENERAL',
                  title: 'State',
                  description: 'OPEN',
                },
                {
                  type: 'GENERAL',
                  title: 'Open',
                  description: 'false',
                },
                {
                  type: 'COMMENT',
                  title: 'Comment',
                  content: [
                    {
                      text: 'Test commit for pr 246.',
                    },
                    {
                      text: 'Test commit 1.',
                    },
                  ],
                },
              ],
            },
            actions: [
              {
                id: 'BITBUCKET02-639e-42a8-a9b6-COMMENT',
                label: 'Comment',
                url: {
                  href: 'https://hero/connectors/stash/api/v1/UFO/app-platform-server/246/comments',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'Comment',
                    label: 'Comment',
                    min_length: 1,
                  },
                ],
                completed_label: 'Comment',
              },
              {
                id: 'BITBUCKET02-639e-42a8-a9b6-APPROVE',
                mutually_exclusive_set_id: 'bitbucket-approval-flow',
                action_key: 'DIRECT',
                label: 'Approve',
                type: 'POST',
                url: {
                  href: 'https://hero/connectors/stash/api/v1/UFO/app-platform-server/246/approve',
                },
                request: {},
                user_input: [],
                completed_label: 'Approve',
              },
              {
                id: 'BITBUCKET02-639e-42a8-a9b6-DECLINE',
                mutually_exclusive_set_id: 'bitbucket-approval-flow',
                label: 'Decline',
                action_key: 'DIRECT',
                type: 'POST',
                url: {
                  href: 'https://hero/connectors/stash/api/v1/UFO/app-platform-server/246/decline',
                },
                request: {},
                user_input: [],
                completed_label: 'Decline',
              },
              {
                id: 'BITBUCKET02-639e-42a8-a9b6-MERGE',
                label: 'Merge',
                type: 'POST',
                action_key: 'https://hero/connectors/stash/api/v1/UFO/app-platform-server/246/merge',
                request: {},
                user_input: [],
                completed_label: 'Merge',
              },
            ],
          },
        ],
      },

      {
        connector_id: 'github',
        cards: [
          {
            id: 'GITHUB01-0000-0000-0000-000000000000',
            name: 'GithubPr',
            creation_date: '1970-01-01T00:00:00Z',
            template: {
              href: 'https://hero/connectors/github-pr/templates/generic.hbs',
            },
            header: {
              title: 'Github PR - vmware/test-repo/1',
              subtitle: 'Github Pull Request #1 for vmware/test-repo',
            },
            body: {
              description: 'Small merged PR example body',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Repository',
                  description: 'vmware/test-repo',
                },
                {
                  type: 'GENERAL',
                  title: 'Requested By',
                  description: 'TestUser1',
                },
                {
                  type: 'GENERAL',
                  title: 'Title',
                  description: 'Small merged PR example title',
                },
                {
                  type: 'GENERAL',
                  title: 'State',
                  description: 'closed',
                },
                {
                  type: 'GENERAL',
                  title: 'Merged',
                  description: 'true',
                },
                {
                  type: 'GENERAL',
                  title: 'Mergeable',
                  description: 'null',
                },
                {
                  type: 'GENERAL',
                  title: 'Created On',
                  description: '2017-12-20T23:00:00Z',
                },
                {
                  type: 'GENERAL',
                  title: '# Comments',
                  description: '3',
                },
                {
                  type: 'GENERAL',
                  title: '# Review Comments',
                  description: '3',
                },
                {
                  type: 'GENERAL',
                  title: 'Merged On',
                  description: '2017-12-20T23:30:30Z by TestUser2',
                },
                {
                  type: 'GENERAL',
                  title: '# Commits',
                  description: '1',
                },
                {
                  type: 'GENERAL',
                  title: 'Changes',
                  description: '+ 7 / - 0',
                },
                {
                  type: 'GENERAL',
                  title: '# Files Changed',
                  description: '2',
                },
              ],
            },
            actions: [
              {
                id: 'GITHUB01-0000-0000-0000-COMMENT',
                label: 'Comment',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/1/comment',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'message',
                    label: 'Comment',
                    min_length: 1,
                  },
                ],
                completed_label: 'Commented',
              },
            ],
          },
          {
            id: 'GITHUB02-0000-0000-0000-000000000000',
            name: 'GithubPr',
            creation_date: '1970-01-01T00:00:00Z',
            template: {
              href: 'https://hero/connectors/github-pr/templates/generic.hbs',
            },
            header: {
              title: 'Github PR - vmware/test-repo/2',
              subtitle: 'Github Pull Request #2 for vmware/test-repo',
            },
            body: {
              description: 'Small unmerged PR example body',
              fields: [
                {
                  type: 'GENERAL',
                  title: 'Repository',
                  description: 'vmware/test-repo',
                },
                {
                  type: 'GENERAL',
                  title: 'Requested By',
                  description: 'TestUser1',
                },
                {
                  type: 'GENERAL',
                  title: 'Title',
                  description: 'Small unmerged PR example title',
                },
                {
                  type: 'GENERAL',
                  title: 'State',
                  description: 'open',
                },
                {
                  type: 'GENERAL',
                  title: 'Merged',
                  description: 'false',
                },
                {
                  type: 'GENERAL',
                  title: 'Mergeable',
                  description: 'true',
                },
                {
                  type: 'GENERAL',
                  title: 'Created On',
                  description: '2017-12-20T23:00:00Z',
                },
                {
                  type: 'GENERAL',
                  title: '# Comments',
                  description: '0',
                },
                {
                  type: 'GENERAL',
                  title: '# Review Comments',
                  description: '0',
                },
                {
                  type: 'GENERAL',
                  title: '# Commits',
                  description: '2',
                },
                {
                  type: 'GENERAL',
                  title: 'Changes',
                  description: '+ 9 / - 1',
                },
                {
                  type: 'GENERAL',
                  title: '# Files Changed',
                  description: '2',
                },
              ],
            },
            actions: [
              {
                id: 'GITHUB02-0000-0000-0000-REJECT',
                label: 'Reject',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/2/close',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'reason',
                    label: 'Reason',
                  },
                ],
                completed_label: 'Rejected',
              },
              {
                id: 'GITHUB02-0000-0000-0000-MERGE',
                label: 'Merge',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/2/merge',
                },
                type: 'POST',
                action_key: 'DIRECT',
                request: {
                  sha: 'cf1586350f0e6730fc3d1b3b386f824c2051b32d',
                },
                user_input: [],
                completed_label: 'Merged',
              },
              {
                id: 'GITHUB02-0000-0000-0000-APPROVE',
                label: 'Approve',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/2/approve',
                },
                type: 'POST',
                action_key: 'DIRECT',
                request: {},
                user_input: [],
                completed_label: 'Approved',
              },
              {
                id: 'GITHUB02-0000-0000-0000-COMMENT',
                label: 'Comment',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/2/comment',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'message',
                    label: 'Comment',
                    min_length: 1,
                  },
                ],
                completed_label: 'Commented',
              },
              {
                id: 'GITHUB02-0000-0000-0000-REQUESTCHANGE',
                label: 'Request Changes',
                url: {
                  href: 'https://hero/connectors/github-pr/api/v1/vmware/test-repo/2/request-changes',
                },
                type: 'POST',
                action_key: 'USER_INPUT',
                request: {},
                user_input: [
                  {
                    id: 'request',
                    label: 'Request',
                    min_length: 1,
                  },
                ],
                completed_label: 'Changes Requested',
              },
            ],
          },
        ],
      },

    ],
  };

  // adding back the 'HeroCard' to global namespace
  window.HeroCard = HeroCard;
}());
