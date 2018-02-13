import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause } from 'app/actions/player';
import { TEASER } from 'app/shapes';
import { distanceToNow } from 'app/utilities';

// const mapDispatchToProps = dispatch => ({
//     playTeaser: article => dispatch(addArticle(article)),
// });

class Teaser extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
    };

    state = {
        currentlyPlaying: false,
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentlyPlaying: nextProps.isPlaying &&
            (nextProps.teaser.uuid === nextProps.currentUUID),
        });
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
                        {this.state.currentlyPlaying ? <span className="teaser__pause" /> : '▶'}
                    </button>
                </div>
            </article>
        );
    }

    handlePlayPause = () => {
        console.log('Play/Pause');
        if (this.state.currentlyPlaying) {
            this.props.pause();
        } else {
            this.props.play(this.props.teaser.uuid);
        }
    }
}

const mapStateToProps = ({ player }) => ({
    isPlaying: player.isPlaying,
    currentUUID: player.currentUUID,
});

const mapDispatchToProps = {
    play,
    pause,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teaser);
