import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, estimatedReadingTime } from 'app/utilities';

class TimeEstimateDynamic extends Component {
    static propTypes = {
        isPlaying: PropTypes.bool.isRequired,
        wordCount: PropTypes.number.isRequired,
        speechRate: PropTypes.number.isRequired,
        readWords: PropTypes.number,
    };

    static defaultProps = {
        readWords: 0,
    };

    constructor(props) {
        super(props);

        this.startTime = Date.now();
        this.pausedAt = 0;

        this.state = {
            estimatedTime: estimatedReadingTime(
                props.wordCount,
                props.speechRate,
            ),
        };
    }

    componentWillReceiveProps(nextProps) {
        const { readWords, isPlaying, speechRate } = nextProps;

        if (this.props.isPlaying !== isPlaying) {
            if (isPlaying) {
                this.startTime += (Date.now() - this.pausedAt);
            } else {
                this.pausedAt = Date.now();
            }
        }

        if (speechRate !== this.props.speechRate) {
            // TODO When the speechRate was changed, we should
            // use the time that has passed since starting the track
            // as the minimum basis for the following calculation.
            // This would assure that the estimated time is never lower
            // than the actual time that has passed.

            this.startTime = Date.now();
        }

        if (readWords !== this.props.readWords) {
            this.estimatedTime = this.getEstimatedTime(readWords);
            this.setState({
                estimatedTime: this.estimatedTime,
            });
        }
    }

    render() {
        return (
            <span className="time-estimate">{formatDate(this.state.estimatedTime, 'mm:ss')}</span>
        );
    }

    getEstimatedTime(readWords) {
        const updateInterval = Math.floor(this.props.wordCount / 5); // 20%

        if (this.props.wordCount < 20 || readWords < updateInterval) {
            // Show static estimation until >= 20% of the text has been read
            return estimatedReadingTime(
                this.props.wordCount,
                this.props.speechRate,
            );
        } else if (readWords % updateInterval === 0) {
            return this.getDynamicEstimatedTime(readWords);
        }
        return this.estimatedTime;
    }

    getDynamicEstimatedTime(readWords) {
        const passedTime = Date.now() - this.startTime;
        const wordsPerMsEstimate = readWords / passedTime;
        return Math.ceil(this.props.wordCount / wordsPerMsEstimate);
    }
}

const mapStateToProps = ({ audioSettings, player }) => ({
    isPlaying: player.isPlaying,
    speechRate: audioSettings.rate,
});

export default connect(mapStateToProps)(TimeEstimateDynamic);
