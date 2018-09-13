import React, { Component } from 'react';
import _ from 'lodash';
import BodyGeneralComponent from './body-general';
import BodyCommentComponent from './body-comment';
import BodyAttachmentComponent from './body-attachment';
import BodyTripInfoComponent from './body-trip-info';
import ActionComponent from './action-component';

export default class CardHolder extends Component {
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
          {_.escape(prop.body.description)}
        </div>
        {prop.body && prop.body.fields ?
          _.map(fields.splice(0, this.state.numOfRecToShow), (field, index) => (field.type === 'GENERAL' ? <BodyGeneralComponent key={index} comment={field} /> :
            (field.type === 'COMMENT' ? <BodyCommentComponent key={index} comment={field} /> :
              (field.type === 'ATTACHMENT' ? <BodyAttachmentComponent key={index} comment={field} /> :
                <BodyTripInfoComponent key={index} comment={field} />))))
          : null}
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