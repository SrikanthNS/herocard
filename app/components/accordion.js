import React, { Component } from 'react';
import _ from 'lodash';
import { ActionComponent, BodyTripInfoComponent, BoydAttachmentComponent, BodyCommentComponent, BodyGeneralComponent, Section  } from './sectionComponent';


const componentMap = {
	GENERAL: <BodyGeneralComponent />,
	COMMENT: <BodyCommentComponent />,
	ATTACHMENT: <BoydAttachmentComponent />,
	TRIPINFO: <BodyTripInfoComponent />,
};

export default class Accordion extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: -1
		};

		this.makeVisible = ((event, current) => {
        if(_.includes(event.target.className, 'hccf-card-header__meta')) {
          const stateNum = this.state.active === current ? -1 : current;
          this.setState(() => ({ active: stateNum }));
        }
		    return;
		});				
		
		const cardHolder = (prop) => {		 				  
		  const inner =
		  	<div>	
					<div className="col-12 col-sm-12 hccf-card-body__description">	  
		  		{prop.body.description}
				</div>
		  		{ prop.body && prop.body.fields ? 
		  			prop.body.fields.splice(0, 4).map((field, index) => {
		  			return field.type === 'GENERAL' ? <BodyGeneralComponent key={index} comment={field}/> : 
		  				(field.type === 'COMMENT' ? <BodyCommentComponent key={index}  comment={field} /> : 
		  				(field.type === 'ATTACHMENT' ? <BoydAttachmentComponent key={index} comment={field}/> : 
		  					<BodyTripInfoComponent key={index} comment={field}/>)) ;							  			
				})			
		  		: null }
		  		<ActionComponent action={prop.actions} name={prop.name} />
		  	</div>;		  
		  
		  return {prop, inner};
		};

		this.holderList = this.props.contents.map((prop) => {
			return cardHolder(prop);
		});		
	}	

	render() {
		return (
			<div>
	        {this.holderList.map((content, index) => {
	          return (
	            <Section
	              key={index}
	              content={content}
	              handle={(e) => this.makeVisible(e, index)}
	              active={index === this.state.active}
	            />
	          );
	        })}
	      </div>		
		)
	}
}

