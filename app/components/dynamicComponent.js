import React, { Component } from 'react';

export class DynamicComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const tagMap = {
			text: 'input',
			textarea: 'textarea',
		}

		const Tag = tagMap[this.props.obj.format] || tagMap['text'];
		const input = <Tag id={this.props.obj.id} name={this.props.obj.label} />
		return (
			<Tag id={this.props.obj.id} name={this.props.obj.label} onChange={this.props.onChange} />
		)
	}
}

export class ActionChildComponent extends Component {

	constructor(props) {
		super(props);

		const actionKeyMap = {
			VIEW_TRIP: '',
			APPROVE: '',
			VIEW_OPPORTUNITY: '',
			CREATE_OPPORTUNITY: '',
			USER_INPUT: '',
			AUTH_DISMISS: '',
			AUTH_LOGIN: '',
			DISMISS: '',
			DIRECT: '',
			OPEN_IN: '',
			INSTALL_APP: ''
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		console.log(e.target.value.innerHTML);
	}

	render() {
		let className = 'hccf-card-actions__item-link';
		if (this.props.action.primary) {
			className += ' hccf-card-actions__item-link--primary'
		}
		return (
			<a href="" onClick={this.handleClick} className={className}>{this.props.action.label}</a>
		)
	}
}

