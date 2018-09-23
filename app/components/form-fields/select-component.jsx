import React from 'react';
import PropTypes from 'prop-types';

/**
 * Select Component
 */
class SelectComponent extends React.Component {
  constructor(props) {
    super(props);
    this.generateSelectOptions = this.generateSelectOptions.bind(this);
  }

  generateSelectOptions(selectOptions) {
    const optionsList = [];
    optionsList.push(<option key="select" value="">Select</option>)
    if (selectOptions) {
      for (let optionValue in selectOptions) {
        optionsList.push(<option key={optionValue} value={optionValue}>
          {selectOptions[optionValue]}
        </option>)
      }
    }
    return optionsList;
  }

  /**
   * Doc
   */
  render() {
    return (<select
      name={this.props.name}
      id={this.props.id}
      data-field-label={this.props.dataFieldLabel}
      data-validation={this.props.dataValidation ? this.props.dataValidation : undefined}
      onKeyUp={(event) => this.props.onKeyUp(event, event.currentTarget)}
      defaultValue={this.props.selected}
    >
      {this.generateSelectOptions(this.props.options)}
    </select>
    );
  }
}

/**
 * Doc
 */
SelectComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  dataFieldLabel: PropTypes.string,
  dataValidation: PropTypes.string,
  onKeyUp: PropTypes.func,
  selected: PropTypes.string,
};

/**
 * Doc
 */
SelectComponent.defaultProps = {
  name: '',
  id: '',
  placeholder: '',
  dataFieldLabel: '',
  dataValidation: '',
  onKeyUp: function (e) {
    return e;
  },
  selected: '',
};

export default SelectComponent;