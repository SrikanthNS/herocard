import React from 'react';
import { BodyGeneralComponent } from '../body-general';
import { BodyCommentComponent } from '../body-comment';

/**
 * FieldComponent
 * Render various components depending on the field type
 * 
 * @method render  (React LifeCycle method)
 * @method renderField - Return card field components
 */
 export default class FieldComponent extends React.Component {
    /**
     * @constructor
     * @param props - Properties object
     */
    constructor(props) {
        super(props);

        //bind custom methods
        this.renderField = this.renderField.bind(this);
    }

    /**
     * @method render (React LifeCycle method)
     * Return various components depending on the field type
     */
    render() {
        const { index, field } = this.props;

        return (
            <div>
                {this.renderField(index, field)}
            </div>    
        );
    }

    /**
     * @method renderField
     * @param {number} index - Index value
     * @param {object} field - Card field object
     */
    renderField(index, field) {
        switch (field.type) {
            case 'COMMENT':
                return <BodyCommentComponent key={index} field={field} />;
            case 'GENERAL':
                return <BodyGeneralComponent key={index} field={field} />;
            default:
                return null;
        }
    }

 }