import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ActionChildComponent, DynamicComponent } from './dynamicComponent';

const imageMap = {
  'BOOMI SFDC': require('../images/Boomi@3x.png'),
  SOCIALCAST: require('../images/Socialcast@3x.png'),
  SERVICENOW: require('../images/ServiceNow@3x.png'),
  SALESFORCE: require('../images/Salesforce@3x.png'),
  JIRA: require('../images/Jira@3x.png'),
  CONCUR: require('../images/Concur@3x.png'),
};

export class Section extends Component {
  render() {
    const imageSrc = (this.props.content.name && imageMap[this.props.content.name.toUpperCase()])
      ? imageMap[this.props.content.name.toUpperCase()]
      : require('../images/Generic@3x.png');
    return (
      <div
        className={`hccf-hero-card ${this.props.active ? 'open' : ''}`}
        onClick={this.props.handle}
      >
        <div className="hccf-card-header">
          <div className="hccf-card-header__wrapper col-12 col-sm-12 col-md-12">
            <div className="hccf-card-header__avatar">
              <div>
                <span>{imageSrc[this.props.content.name]}</span>
                <img src={imageSrc} />
              </div>
            </div>
            <div className="hccf-card-header__meta">
              <div className="hccf-card-header__meta-title">
                {this.props.content.header.title}
              </div>

              <div className="hccf-card-header__meta-subtitle">
                {this.props.content.header.subtitle}
              </div>
            </div>
          </div>
        </div>
        <div
          key="content"
          className={`hccf-row hccf-card-body ${this.props.active ? 'open' : ''}`}
        >
          {this.props.active ? <CardHolder prop={this.props.content} /> : null}
        </div>
      </div>
    );
  }
}

export class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: false,
      showMore: true,
      numOfRecToShow: this.props.prop.body.fields ? this.props.prop.body.fields.length : 0,
      minFieldsToShow: 4,
      body: this.props.prop.body,
      totalNumberOfFields: this.props.prop.body.fields ? this.props.prop.body.fields.length : 0,
    };

    this.showToggle = this.showToggle.bind(this);
  }

  showToggle() {
    const { minFieldsToShow, totalNumberOfFields } = this.state;
    const numOfRecToShow = this.state.showMore ? totalNumberOfFields : minFieldsToShow;
    this.setState({ numOfRecToShow, showMore: !this.state.showMore });
  }

  componentWillMount() {
    /* more_details logic*/
    this.moreDetails();
  }

  moreDetails() {
    const visibleCardsCount = HeroCard.ResponseManager.getVisibleCardsCount();
    if (visibleCardsCount > 1) {
      // don't add show/hide if more than one cards present
      this.setState({ showHide: false });
      return;
    }

    let fieldsCount = null;
    const body = this.props.prop.body;
    if (body.fields) {
      fieldsCount = body.fields.length;
    } else {
      this.setState({ showHide: false });
      return;
    }
    if ((fieldsCount > 4)
      || ((fieldsCount == 4) && (body.comments && (body.comments.length > 0)))
      || ((fieldsCount == 3) && (body.comments && (body.comments.length > 0)) && (body.attachments && (body.attachments.length > 0)))) {
      this.setState({ showHide: true, numOfRecToShow: this.state.minFieldsToShow, showMore: true });
    }
  }

  componentDidMount() {
    window.HeroCard.Utility.attachEventHandlers();
  }

  render() {
    const prop = this.props.prop;
    const { minFieldsToShow, totalNumberOfFields } = this.state;
    const fields = Object.assign([], prop.body.fields);
    return (
      <div>
        <div className="col-12 col-sm-12 hccf-card-body__description">
          {prop.body.description}
        </div>
        { prop.body && prop.body.fields ?
		  			_.map(fields.splice(0, this.state.numOfRecToShow), (field, index) => (field.type === 'GENERAL' ? <BodyGeneralComponent key={index} comment={field} /> :
		  				(field.type === 'COMMENT' ? <BodyCommentComponent key={index} comment={field} /> :
		  				(field.type === 'ATTACHMENT' ? <BoydAttachmentComponent key={index} comment={field} /> :
		  					<BodyTripInfoComponent key={index} comment={field} />))))
          : null }
        {this.state.showHide ?
          <div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__view-details">
            <a className="hccf-card-body__view-details--more" id="" onClick={this.showToggle} style={{ display: this.state.showMore ? 'block' : 'none' }}>
                  View more <img width="13" />
            </a>
            <a className="hccf-card-body__view-details--less" id="" onClick={this.showToggle} style={{ display: this.state.showMore ? 'none' : 'block' }}>
                  View less <img width="13" />
            </a>
          </div>
          :
          null
        }
        {prop.creation_date ?
          (<div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__timestamp">
            {HeroCard.Utility.convertTimestamp(prop.creation_date)}
          </div>)
          :
          null
        }
        <ActionComponent action={prop.actions} name={prop.name} id={prop.id} />
      </div>
    );
  }
}

export class BodyGeneralComponent extends Component {
  render() {
    return (
      <div className="col-12 col-sm-12  hccf-card-body__field">
        <div className="hccf-bodyfield-addspace">
          <div className="col-4 col-sm-3 col-md-3 col-lg-3 hccf-card-body__field-title">
            {this.props.comment.title}:
          </div>
          <div className="col-8 col-sm-9 col-md-9 col-lg-9 hccf-card-body__field-description">
            {this.props.comment.description}
          </div>
        </div>
      </div>
    );
  }
}

export class BodyCommentComponent extends Component {
  render() {
    return (
      <div>
        <p className="hccf-card-body__comments-title">{this.props.comment.title}:</p>
        <div className="hccf-card-body__comments-body">
          {this.props.comment.text}
        </div>
      </div>
    );
  }
}

export class BoydAttachmentComponent extends Component {
  render() {
    return (
      <div className="col-12 col-sm-12  hccf-card-body__attachments">
        <p><Link to={{ pathname: '/attachPopOver', state: { comment: this.props.comment } }}>{this.props.comment.content.length} {this.props.comment.title}</Link></p>
      </div>
    );
  }
}

export class BodyAttachmentPopOverComponent extends Component {
  render() {
    return (
      <div className="hccf-card-body__attachments-preview hccf-card-body__attachments-preview--visible">
        <h3><Link to="/" className="hccf-card-body__attachments--close"><img alt="Close" src="../images/icon-back.png" /></Link> {this.props.location.state.comment.content.length} {this.props.location.state.comment.title}</h3>
        {this.props.location.state.comment.content.map((content, index) =>
          (<div className="hccf-card-body__attachments-row" key={index}>
            <div>
              <img src="{content.src}" width="30" alt="" title="" />
            </div>
            <div>
              <h3>{content.title}</h3>
              <p>
                <span>{content.timestamp}</span>
                <span>&middot;</span>
                <span>{content.size}</span>
              </p>
            </div>
          </div>)
        )}
      </div>
    );
  }
}

export class BodyTripInfoComponent extends Component {
  render() {
    return (
      <div className="col-12 col-sm-12  hccf-card-body__field hccf-card-body__tripinfo">
        {this.props.comment.content.map((content, index) =>
          (<div className="hccf-row" key={index}>
            <div className="col-3 col-sm-3 col-md-2 hccf-card-body__field-title" style={{ width: `${55}px` }}>
              {content.image ? <img style={{ width: `${40}px` }} src={require(`../images/${content.image}`)} /> : content.title }
            </div>
            <div className="col-9 col-sm-9 col-md-10 hccf-card-body__field-description">
              {content.text}
            </div>
          </div>)
        )}
        {this.props.comment.trip_details ? <BodyTripInfoPopOverComponent tripInfo={this.props.comment.trip_details} /> : ''}
      </div>
    );
  }
}

export class BodyTripInfoPopOverComponent extends Component {
  render() {
    return (
      <div className="hccf-card-body__tripinfo-preview hccf-animated">
        {this.props.tripInfo.summary &&
        <div className="hccf-card-body__tripinfo-row hccf-card-body__tripinfo-summary">
          <h3>{this.props.tripInfo.summary.event}</h3>
          <p>{this.props.tripInfo.summary.date}</p>
          {this.props.tripInfo.summary.others.map((other, index) =>
            <p key={index}>{other}</p>
					  )}
        </div>
        }

        {this.props.tripInfo.trips.map((trip, index) =>
          (<div key={index} className="hccf-card-body__tripinfo-row hccf-card-body__tripinfo-detail">
            <h3>{trip.date}</h3>
            <div>
              <div>
                <img src={require('../images/tripinfo-departure.png')} title="Departure" alt="Departure" width="30" />
              </div>
              <div>
                <h3>{trip.time}</h3>
              </div>
              <div>
                <h3>{trip.destination}</h3>
                <p>{trip.flight}</p>
                <p>
                  <span>Terminal {trip.terminal ? trip.terminal : '--' }</span>
                  <span>Gate {trip.gate ? trip.gate : '--' }</span>
                </p>
              </div>
            </div>
          </div>)
        )}
      </div>
    );
  }
}

export class ActionComponent extends Component {
  constructor(props) {
    super(props);
    this.areMultipleEntries = this.areMultipleEntries.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.addClasses = this.addClasses.bind(this);
    this.stringifyAction = this.stringifyAction.bind(this);
  }

  areMultipleEntries(userInput) {
    if (userInput.length < 2) {
      return 'hccf-card-actions__add-input-single';
    }
    return 'hccf-card-actions__add-input-multiple';
  }

  addClasses(items, curAction) {
    let numActions = items.length,
      classNames = '';
    classNames += ' hccf-card-actions__item';

    // mark an action as primary
    if (curAction.primary || (numActions == 1)) {
      classNames += ' hccf-card-actions__item--primary';
    }

    return classNames;
  }

  stringifyAction(action) {
    if (!action) { return; }
    return encodeURIComponent(JSON.stringify(action));
  }

  renderHiddenFields(value, key) {
    return <input type="hidden" name={key} id={key} value={value} />;
  }

  renderAction(action, index) {
    return (
      <div key={action.id} className={this.addClasses(this.props.action, action)} id={action.id}>
        <form id={`${this.props.name}${index}`} className="hccf-card-action-form" method={action.type} action={action.url.href} data-action-string={this.stringifyAction(action)}>
          { _.map(action.request, this.renderHiddenFields)}
          {
            action.action_key === 'USER_INPUT' ?
              <div>
                <div key={index} className={`hccf-js-input-add-section ${this.areMultipleEntries(action.user_input)}`} >
                  {_.map(action.user_input, (userInput, index) =>
                    (<DynamicComponent
                      formID={action.id}
                      key={index}
                      fieldOptions={'{"keyup" : "window.HeroCard.Actions.UserInput.checkUserInput(event, this)"}'}
                      userInput={userInput}
                      onChange={(event, userInput) => this.onKeyChange(event, userInput)}
                    />)
                  )}
                  <div>
                    <div className="hccf-card-actions__item">
                      <a
                        className="hccf-card-actions__item-link hccf-js-input-button-cancel"
                        id={`${this.props.id}__${action.id}__cancel`}
                        onClick={event => window.HeroCard.Actions.UserInput.hideInputForm(event, event.target)}
                      >Cancel</a>
                      <div className="hccf-card-actions__item hccf-card-actions__item hccf-card-actions__item--primary">
                        <a
                          className="hccf-card-actions__item-link hccf-card-actions__item-link--disabled hccf-js-input-button-submit"
                          id={`${this.props.id}__${action.id}__submit`}
                          onClick={event => window.HeroCard.Actions.UserInput.submitInput(event, event.target)}
                        >{action.label}</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              :
              null
          }
          <ActionChildComponent action={action} />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="hccf-row hccf-card-actions">
        {_.map(this.props.action, this.renderAction)}
      </div>
    );
  }
}
