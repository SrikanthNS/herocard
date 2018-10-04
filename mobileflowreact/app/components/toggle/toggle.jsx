import React from 'react';
import HeroCardUtility from '../../utility/utility';
import './styles.scss';

/**
 * ToggleComponent
 * Renders 'View more'/'View less' links
 * 
 * @method render (React LifeCycle method)
 */
 export default class ToggleComponent extends React.Component {
    /**
     * @method render (React LifeCycle method)
     */
    render() {
        const { onClick, showMore } = this.props;

        return(
            <div className="hccf-col-xs-12 hccf-col-sm-12 hccf-card-body__view-details">
                <a
                    className="hccf-card-body__view-details--more"
                    onClick={onClick}
                    style={{ display: showMore ? 'block' : 'none' }}
                >
                    View more <img src={HeroCardUtility.imgPath('expand-show-more.png')} alt="view-more" width="13" />
                </a>
                <a
                    className="hccf-card-body__view-details--less"
                    onClick={onClick}
                    style={{ display: showMore ? 'none' : 'block' }}
                >
                    View less <img src={HeroCardUtility.imgPath('expand-show-less.png')} alt="view-less" width="13" />
                </a>
          </div>
        );
    }

 }