import React from 'react';
import './styles.scss';

/**
 * BodyDescriptionComponent
 * Shows card body description
 * 
 * @method render (React LifeCycle method)
 */
 export default class BodyDescriptionComponent extends React.Component {
    /**
     * @method render (React LifeCycle method)
     * Return card body description
     */
    render() {
        return (
            <div className="col-12 col-sm-12 hccf-card-body__description">
                {_.escape(this.props.description)}
            </div>     
        );
    }

 }