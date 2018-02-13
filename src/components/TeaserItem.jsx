import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TEASER } from 'app/shapes';
import { distanceToNow } from 'app/utilities';

// const mapDispatchToProps = dispatch => ({
//     playTeaser: article => dispatch(addArticle(article)),
// });

class TeaserItem extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
    };

    constructor(props) {
        super(props);

        const { teaser } = this.props;
        this.text = `${teaser.supertitle}:
        ${teaser.title || teaser.teaser_title}.
        ${teaser.body || teaser.teaser_text}`;
    }

    render() {
        return (
            <article className="teaser">
                <a href={this.props.teaser.href} tabIndex="-1">
                    <h2>
                        <span className="teaser__kicker">{this.props.teaser.supertitle}</span>
                        <span className="teaser__title">{this.props.teaser.teaser_title || this.props.teaser.title}</span>
                    </h2>
                </a>
                <div className="teaser__date">
                    {distanceToNow(this.props.teaser.release_date)}
                </div>
                <p className="teaser__intro">{this.props.teaser.teaser_text}</p>
                <div className="teaser__player">
                    <button className="teaser__playbutton" onClick={this.handlePlayPause}>
                        {'▶'}
                    </button>
                </div>
            </article>
        );
    }

    handlePlayPause = () => {
        console.log('play');
    }
}

const mapStateToProps = state => ({
    isPlaying: state.isPlaying,
});

connect(mapStateToProps)(TeaserItem);

export default TeaserItem;
