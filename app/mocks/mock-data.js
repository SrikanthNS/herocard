const cardData = [
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
      fields: [{
        type: 'GENERAL',
        title: 'Owner',
        description: 'Martin Thomson',
      }, {
        type: 'GENERAL',
        title: 'Email',
        description: 'm.thompson@salesco.com',
      }, {
        type: 'GENERAL',
        title: 'Revenue',
        description: '$250K',
      }, {
        type: 'GENERAL',
        title: 'Last contact',
        description: 'December 9 2016',
      }, {
        type: 'ATTACHMENT',
        title: 'Attachments',
        content: [{
          type: 'TEXT',
          title: 'Opportunity Detail',
          src: 'icon-text.png',
          timestamp: '06/02/2016',
          size: '2.13 MB',
        }, {
          type: 'WORD',
          title: 'Revenue Detail',
          src: 'icon-word.png',
          timestamp: '05/28/2016',
          size: '93.11 MB',
        }],
      }],
    },
    actions: [{
      id: 'HCA_Add_Comment_Salesforce_1',
      action_key: 'USER_INPUT',
      label: 'Add Comment',
      url: {
        href: 'https://hero.card.server/connector/salesforce/comments',
      },
      type: 'POST',
      completed: false,
      user_input: [{
        id: 'comment_body',
        label: 'Comment',
        format: 'textarea',
        validation: ['required'],
      }],
    }, {
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
    }],
  }, {
    id: 'GSERBER634563456HGDFGA',
    name: 'Salesforce',
    template: {
      href: 'https://hero.card.server/connectors/salesforce/templates/generic.hbs',
    },
    is_actionable: true,
    header: {
      title: 'Marthin Thomson',
      subtitle: ['Labcorp'],
    },
    body: {
      timestamp: '2017-03-20T17:33:17.656Z',
      fields: [{
        type: 'GENERAL',
        title: 'Purpose',
        description: 'Customer Meeting',
      }, {
        type: 'GENERAL',
        title: 'Total',
        description: '$803.40',
      }, {
        type: 'GENERAL',
        title: 'Field 3',
        description: 'Some text.',
      }, {
        type: 'GENERAL',
        title: 'Field 4',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      }, {
        type: 'GENERAL',
        title: 'Field 5',
        description: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      }, {
        type: 'GENERAL',
        title: 'Field 6',
        description: 'Text 1234',
      }, {
        type: 'GENERAL',
        title: 'Field 7',
        description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
      }, {
        type: 'GENERAL',
        title: 'Field 8',
        description: 'Text 1234',
      }, {
        type: 'GENERAL',
        title: 'Field 9',
        description: 'Text 1234',
      }, {
        type: 'GENERAL',
        title: 'Field 10',
        description: 'Text 1234',
      }, {
        type: 'COMMENT',
        title: 'Comments',
        content: [{
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ligula a tincidunt cursus. Pellentesque urna massa, tincidunt et pulvinar quis, maximus vel dolor. Nunc lobortis nulla enim, a porta.',
        }, {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sollicitudin ligula a tincidunt cursus. Pellentesque urna massa, tincidunt et pulvinar quis, maximus vel dolor. Nunc lobortis nulla enim, a porta.',
        }],
      }, {
        type: 'ATTACHMENT',
        title: 'Attachments',
        content: [{
          type: 'PDF',
          title: 'Report analysis',
          src: 'icon-pdf.png',
          timestamp: '06/07/2016',
          size: '453.65 MB',
        }, {
          type: 'PPT',
          title: 'Sales Presentations',
          src: 'icon-ppt.png',
          timestamp: '06/03/2016',
          size: '14.65 MB',
        }, {
          type: 'TEXT',
          title: 'Test Flight Procedures',
          src: 'icon-text.png',
          timestamp: '06/02/2016',
          size: '2.13 MB',
        }, {
          type: 'PDF',
          title: 'Safety Regulations',
          src: 'icon-pdf.png',
          timestamp: '05/29/2016',
          size: '29.31 MB',
        }, {
          type: 'WORD',
          title: 'Landing Procedure',
          src: 'icon-word.png',
          timestamp: '05/28/2016',
          size: '93.11 MB',
        }],
      }],
    },
    actions: [{
      id: 'HCA_Create_Opportunity_Salesforce_4',
      action_key: 'CREATE_OPPORTUNITY',
      label: 'Create Opportunity',
      url: {
        href: 'https://hero.card.server/connector/salesforce/createOpportunity',
      },
      completed: false,
      type: 'WEB',
      request: {
        name: 'John Smith',
        email: 'john.smith@bigdeal.com',
      },
    }],
  }, {
    id: 'GSERBER634563456HGDFGQ',
    name: 'Concur',
    template: {
      href: 'https://hero.card.server/connectors/salesforce/templates/generic.hbs',
    },
    is_actionable: true,
    header: {
      title: 'Your upcoming trip to Atlanta',
      subtitle: ['Mon, Oct 03 - Thu, Oct 06', 'AUSTIN to ATLANTA'],
    },
    body: {
      fields: [{
        type: 'TRIPINFO',
        title: 'Trip to Atlanta',
        content: [{
          title: 'Departure',
          image: 'tripinfo-departure.png',
          text: '10:06 AM CST - AUSTIN',
        }, {
          title: 'Arrival',
          image: 'tripinfo-arrival.png',
          text: '09:10 AM EST - ATLANTA',
        }],
        trip_details: {
          summary: {
            event: 'AW Connect',
            date: 'Mon, Oct 03 - Thu, Oct 06',
            others: ['Agency Record Locator: MR0DGN'],
          },
          trips: [{
            date: 'Mon Oct 03',
            time: '10:06 AM',
            destination: 'Austin to Atlanta',
            flight: 'Delta 1401',
            terminal: '2',
            gate: '9',
          }, {
            date: 'Thu Oct 06',
            time: '04:45 PM',
            destination: 'Atlanta to Austin',
            flight: 'Delta 2611',
            terminal: '1',
            gate: '--',
          }],
        },
      }],
    },
    actions: [{
      id: 'HCA_View_Trip_Concur_0',
      primary: true,
      label: 'View Trip',
      action_key: 'VIEW_TRIP',
      url: {
        href: 'https://hero.card.server/connector/salesforce/view',
      },
      completed: false,
      type: 'WEB',
    }],
  }, {
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
      fields: [{
        type: 'GENERAL',
        title: 'Project',
        description: 'SDK - iOS',
      }, {
        type: 'GENERAL',
        title: 'Summary',
        description: 'iPhone X is flagging all AW apps as compromised',
      }, {
        type: 'GENERAL',
        title: 'Status',
        description: 'Active',
      }, {
        type: 'GENERAL',
        title: 'Assignee',
        description: 'Kishore Sajja',
      }, {
        type: 'GENERAL',
        title: 'Reporter',
        description: 'David Shaw',
      }, {
        type: 'GENERAL',
        title: 'Components',
        description: 'Client Implementation,Server Implementation',
      }, {
        type: 'GENERAL',
        title: 'Labels',
        description: 'abc,def',
      }, {
        type: 'GENERAL',
        title: 'Description',
        description: 'When using the iPhone app, it was flagging all AW apps as compromised.',
      }, {
        type: 'COMMENT',
        title: 'Comments',
        content: [{
          text: 'This is the last (most recent) comment',
        }, {
          text: 'This is the 2nd last comment',
        }],
      }],
    },
    actions: [{
      id: 'Old_Action_Labels_Jira_Comment',
      action_key: 'USER_INPUT',
      label: 'Add Comment',
      completed_label: 'Added comment successfully',
      url: {
        href: 'https://hero.card.server/connectors/jira/comment',
      },
      type: 'POST',
      user_input: [{
        id: 'body',
        label: 'Comment',
        format: 'textarea',
      }],
      request: {},
    }, {
      id: 'Old_Action_Labels_Jira_Open',
      action_key: 'OPEN_IN',
      label: 'Open in Browser',
      url: {
        href: 'https://jira-euc.eng.vmware.com/jira/browse/APF-40',
      },
      type: 'GET',
      user_input: [],
      request: {},
    }, {
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
    }],
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
];

export default cardData;
