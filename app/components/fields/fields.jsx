import React from 'react';
import { FieldComponent } from './index';

/**
 * FieldsComponent
 * Loops through `fields` and render `FieldComponent` with passed-in `field` data
 * 
 * @method render (React LifeCycle method)
 */
 export default class FieldsComponent extends React.Component {
    /**
     * @method render (React LifeCycle method)
     * Return `FieldComponent`s depending of the `numOfFieldsToShow`
     */
    render() {
        const { numOfFieldsToShow, fields } = this.props;
        const fieldsToShow = fields.slice(0, numOfFieldsToShow);
        
        return (
            fieldsToShow.map((field, index) => <FieldComponent key={index} field={field} />)
        );
    }

 }