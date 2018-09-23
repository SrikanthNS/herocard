import React from 'react';
import PropTypes from 'prop-types';

/**
 * TextArea Component
 */
class TextAreaComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Doc
   */
  render() {
    return (<textarea
      name={this.props.name}
      id={this.props.id}
      placeholder={this.props.placeholder}
      data-field-label={this.props.dataFieldLabel}
      data-validation={this.props.dataValidation ? this.props.dataValidation : undefined}
      onKeyUp={(event) => this.props.onKeyUp(event, event.currentTarget)}
    ></textarea>
    );
  }
}

/**
 * Doc
 */
TextAreaComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  dataFieldLabel: PropTypes.string,
  dataValidation: PropTypes.string,
  onKeyUp: PropTypes.func,
};

/**
 * Doc
 */
TextAreaComponent.defaultProps = {
  name: '',
  id: '',
  placeholder: '',
  dataFieldLabel: '',
  dataValidation: '',
  onKeyUp: function (e) {
    return e;
  },
};

export default TextAreaComponent;