import React, { Component } from 'react';
import _ from 'lodash';
import BodyGeneralComponent from '../body-general';
import BodyCommentComponent from '../body-comment';
import ActionComponent from '../action';
import './styles.scss';

/**
 *carHoder component
 *method: componentWillMount (React LifeCycle method)
 *method: componentDidMount (React LifeCycle method)
 *method: showToggle
 *method: moreDetails
 *method: render (React LifeCycle method)
 * @return {JSX} each card details will be returned
 */
const minFieldsToShow = 4;
export default class CardHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isViewMoreRequired: false,
      showMore: true,
      numOfFieldsToShow: this.props.cardContent.body.fields ? this.props.cardContent.body.fields.length : 0,
      body: this.props.cardContent.body,
      totalNumberOfFields: this.props.cardContent.body.fields ? this.props.cardContent.body.fields.length : 0,
    };

    this.showToggle = this.showToggle.bind(this);
  }

  /**
   * componentWillMount
   * call more_details logic before render
   */
  componentWillMount() {
    this.moreDetails();
  }

  /**
   * componentDidMount
   * attach even handlers after rendering all cards
   */
  componentDidMount() {
    HeroCard.Utility.attachEventHandlers();
  }

  /**
   * showToggle
   * toggles view more/less
   * in less mode: numOfFieldsToShow is set to  minFieldsToShow
   * in more mode: numOfFieldsToShow is set to totalNumberOfFields
   */
  showToggle() {
    const { totalNumberOfFields } = this.state;
    const numOfFieldsToShow = this.state.showMore ? totalNumberOfFields : minFieldsToShow;
    this.setState({ numOfFieldsToShow, showMore: !this.state.showMore });
  }

  /**
   * moreDetails Function
   * logic to determine whether viewMore option is required or not
   */
  moreDetails() {
    const visibleCardsCount = HeroCard.ResponseManager.getVisibleCardsCount();
    if (visibleCardsCount > 1) {
      // don't add show/hide if more than one cards present
      this.setState({ isViewMoreRequired: false });
      return;
    }

    const body = this.props.cardContent.body;
    let fieldsCount = 0;
    fieldsCount += (body.fields || []).length;
    fieldsCount += (body.comments || []).length;

    if (fieldsCount > minFieldsToShow) {
      this.setState({ isViewMoreRequired: true, numOfFieldsToShow: minFieldsToShow, showMore: true });
    } else {
      this.setState({ isViewMoreRequired: false });
    }
  }

  /**
   * render cond content with body as input component or textarea component for comments
   * along with view more option if isViewMoreRequired is true
   */

  render() {
    const cardContent = this.props.cardContent;
    const { numOfFieldsToShow } = this.state;
    const fields = _.assign([], cardContent.body.fields);
    return (
      <div>
        <div className="col-12 col-sm-12 hccf-card-body__description">
          {_.escape(cardContent.body.description)}
        </div>
        {cardContent.body && cardContent.body.fields ?
          _.map(fields.splice(0, numOfFieldsToShow), (field, index) => (
            field.type === 'GENERAL' ?
              <BodyGeneralComponent key={index} comment={field} />
              :
              <BodyCommentComponent key={index} comment={field} />))
          : null}
        {this.state.isViewMoreRequired ?
          <div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__view-details">
            <a
              className="hccf-card-body__view-details--more"
              id=""
              onClick={this.showToggle}
              style={{ display: this.state.showMore ? 'block' : 'none' }}
            >
              View more <img src={HeroCard.Utility.imgPath('expand-show-more.png')} alt="view-more" width="13" />
            </a>
            <a
              className="hccf-card-body__view-details--less"
              id=""
              onClick={this.showToggle}
              style={{ display: this.state.showMore ? 'none' : 'block' }}
            >
              View less <img src={HeroCard.Utility.imgPath('expand-show-less.png')} alt="view-less" width="13" />
            </a>
          </div>
          :
          null
        }
        {cardContent.creation_date ?
          (<div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__timestamp">
            {HeroCard.Utility.convertTimestamp(cardContent.creation_date)}
          </div>)
          :
          null
        }
        <ActionComponent actions={cardContent.actions} name={cardContent.name} id={cardContent.id} />
      </div>
    );
  }
}
