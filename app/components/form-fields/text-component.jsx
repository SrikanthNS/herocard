import React from 'react';
import PropTypes from 'prop-types';

/**
 * Text Component
 */
class TextComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Doc
   */
  render() {
    return (<input
      autoComplete="off"
      type="text"
      name={this.props.name}
      id={this.props.id}
      data-field-label={this.props.dataFieldLabel}
      data-validation={this.props.dataValidation ? this.props.dataValidation : undefined}
      onKeyUp={(event) => this.props.onKeyUp(event, event.currentTarget)}
      onBlur={(event) => this.props.onBlur(event, event.currentTarget)}
    />
    );
  }
}

/**
 * Doc
 */
TextComponent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  dataFieldLabel: PropTypes.string,
  dataValidation: PropTypes.string,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func
};

/**
 * Doc
 */
TextComponent.defaultProps = {
  name: '',
  id: '',
  dataFieldLabel: '',
  dataValidation: '',
  onKeyUp: function (e) {
    return e;
  },
  onBlur: function (e) {
    return e;
  },
};

export default TextComponent;