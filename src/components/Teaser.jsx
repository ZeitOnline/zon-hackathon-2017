import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play } from 'app/actions/player';
import { updateTeaser } from 'app/actions/teasers';
import { TEASER } from 'app/shapes';
import { distanceToNow, countWords } from 'app/utilities';

class Teaser extends PureComponent {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string.isRequired,
        play: PropTypes.func.isRequired,
        updateTeaser: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const playerText = this.getPlayerText();
        const wordCount = countWords(playerText);

        props.updateTeaser({
            ...props.teaser,
            playerText,
            wordCount,
        });
    }

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
                        <span className="teaser__title">{this.props.teaser.title}</span>
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

    getPlayerText() {
        const {
            supertitle,
            title,
            body,
            teaser_text: teaserText,
        } = this.props.teaser;
        return `${supertitle}: ${title}. ${body || teaserText}`;
    }
}


const mapStateToProps = ({ player }) => ({
    isPlaying: player.isPlaying,
    currentUUID: player.currentUUID,
});

const mapDispatchToProps = {
    play,
    updateTeaser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teaser);
