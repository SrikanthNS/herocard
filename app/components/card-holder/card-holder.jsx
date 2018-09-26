import React, { Component } from 'react';
import _ from 'lodash';
import './styles.scss';
import { FieldsComponent } from '../fields';
import { ToggleComponent } from '../toggle';
import { CardTimestampComponent } from '../card-timestamp';
import { BodyDescriptionComponent } from '../body-description';
import { ActionComponent } from '../action';

const MIN_FIELDS_TO_SHOW = 4;

/**
 *carHoder component
 *method: componentWillMount (React LifeCycle method)
 *method: componentDidMount (React LifeCycle method)
 *method: showToggle
 *method: moreDetails
 *method: render (React LifeCycle method)
 * @return {JSX} each card details will be returned
 */
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
   * in less mode: numOfFieldsToShow is set to  MIN_FIELDS_TO_SHOW
   * in more mode: numOfFieldsToShow is set to totalNumberOfFields
   */
  showToggle() {
    const { totalNumberOfFields } = this.state;
    const numOfFieldsToShow = this.state.showMore ? totalNumberOfFields : MIN_FIELDS_TO_SHOW;
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

    if (fieldsCount > MIN_FIELDS_TO_SHOW) {
      this.setState({ isViewMoreRequired: true, numOfFieldsToShow: MIN_FIELDS_TO_SHOW, showMore: true });
    } else {
      this.setState({ isViewMoreRequired: false });
    }
  }

  /**
   * render cond content with body as input component or textarea component for comments
   * along with view more option if isViewMoreRequired is true
   */

  render() {
    const { cardContent, isExpanded } = this.props;
    const { numOfFieldsToShow } = this.state;
    const fields = _.assign([], cardContent.body.fields);
    return (
      <div
        className={`hccf-row hccf-card-body ${isExpanded ? 'open' : ''}`}
      >
        {/* Shows card description */}
        {cardContent.body.description
          ? <BodyDescriptionComponent description={cardContent.body.description} />
          : null
        }

        {/* Shows body fields */}
        <FieldsComponent fields={fields} numOfFieldsToShow={numOfFieldsToShow} />

        {/* Shows View more/less links */}
        {this.state.isViewMoreRequired
          ? <ToggleComponent onClick={this.showToggle} showMore={this.state.showMore} />
          : null
        }

        {/* Shows card creation time */}
        {cardContent.creation_date
          ? <CardTimestampComponent creationDate={cardContent.creation_date} />
          : null
        }
        <ActionComponent key={`actions_${cardContent.id}`} actions={cardContent.actions} name={cardContent.name} id={cardContent.id} />
      </div>
    );
  }
}
