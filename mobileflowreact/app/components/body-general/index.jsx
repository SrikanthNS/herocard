import React from 'react';
import _ from 'lodash';
import './styles.scss';

/**
 * BodyGeneralComponent 
 * @param {object} field
 * @returns {JSX} with card title and description
 */
export default function BodyGeneralComponent({ field }) {
  return (
    <div className="col-12 col-sm-12  hccf-card-body__field">
      <div className="hccf-bodyfield-addspace">
        <div className="col-4 col-sm-3 col-md-3 col-lg-3 hccf-card-body__field-title">
          {field.title}:
        </div>
        <div className="col-8 col-sm-9 col-md-9 col-lg-9 hccf-card-body__field-description">
          {_.escape(field.description)}
        </div>
      </div>
    </div>
  );
}