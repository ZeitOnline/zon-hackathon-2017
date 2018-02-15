import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play } from 'app/actions/player';
import { TEASER } from 'app/shapes';
import { distanceToNow } from 'app/utilities';

class Teaser extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
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
                <h2>
                    <button className="teaser__heading" onClick={this.playTeaser}>
                        <div className={`teaser__state ${this.state.currentlyPlaying ? 'teaser__state--playing' : ''}`}>▶</div>
                        <span className="teaser__kicker">{this.props.teaser.supertitle}</span>
                        <span className="teaser__title">{this.props.teaser.teaser_title || this.props.teaser.title}</span>
                    </button>
                </h2>
                <div className="teaser__date">
                    {distanceToNow(this.props.teaser.release_date)}
                </div>
                <p className="teaser__intro">{this.props.teaser.teaser_text}</p>
                <a className="teaser__link" href={this.props.teaser.href}>Auf ZEIT ONLINE lesen</a>
            </article>
        );
    }

    playTeaser = () => {
        if (!this.state.currentlyPlaying) {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Teaser);
