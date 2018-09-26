import React from 'react';
import './styles.scss';

/**
 * CardTimestampComponent
 * Shows card generation time
 * 
 * @method render (React LifeCycle method)
 */
 export default class CardTimestampComponent extends React.Component {
    /**
     * @method render (React LifeCycle method)
     * Return card creation time
     */
    render() {
        return (
            <div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__timestamp">
                {HeroCard.Utility.convertTimestamp(this.props.creationDate)}
            </div>       
        );
    }

 }