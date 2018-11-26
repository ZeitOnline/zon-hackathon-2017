import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { play, pause } from 'app/actions/player';
import { updateTeaser } from 'app/actions/teasers';
import { TEASER } from 'app/shapes';
import { distanceToNow, countWords } from 'app/utilities';
import { TimeEstimate } from 'app/components';
import PlayButton from './PlayButton';

class Teaser extends PureComponent {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
        isPlaying: PropTypes.bool.isRequired,
        isActive: PropTypes.bool.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
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

    render() {
        return (
            <article className="teaser">
                <div className={`teaser__state ${this.props.isActive ?
                    'teaser__state--active' : ''}`}
                >
                    {this.renderState()}
                </div>
                <div className="teaser__content">
                    <h2 className="teaser__heading">
                        <span className="teaser__kicker">{this.props.teaser.supertitle}</span>
                        <span className="teaser__title">{this.props.teaser.title}</span>
                    </h2>
                    <p className="teaser__intro">{this.props.teaser.teaser_text}</p>
                    <div className="teaser__info">
                        <span className="teaser__date">
                            {distanceToNow(this.props.teaser.release_date)}
                        </span>
                        {this.props.teaser.wordCount && (
                            <span>
                                ca. <TimeEstimate
                                    wordCount={this.props.teaser.wordCount}
                                /> Min.
                            </span>
                        )}
                        <a className="teaser__link" href={this.props.teaser.href}>Auf ZEIT ONLINE lesen</a>
                    </div>
                </div>
            </article>
        );
    }

    renderState() {
        return (
            <PlayButton
                isPlaying={this.props.isPlaying}
                onClick={this.handlePlayPause}
            />
        );
    }

    playTeaser = () => {
        if (!this.props.isPlaying) {
            this.props.play(this.props.teaser.uuid);
        }
    }

    handlePlayPause = () => {
        if (this.props.isPlaying) {
            this.props.pause();
        } else {
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


const mapStateToProps = ({ player }, { teaser }) => ({
    isPlaying: player.isPlaying && player.currentUUID === teaser.uuid,
    isActive: player.currentUUID === teaser.uuid,
});

const mapDispatchToProps = {
    play,
    pause,
    updateTeaser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teaser);
