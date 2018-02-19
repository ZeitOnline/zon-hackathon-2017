import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, estimatedReadingTime } from 'app/utilities';

class TimeEstimateDynamic extends Component {
    static propTypes = {
        isPlaying: PropTypes.bool.isRequired,
        currentUUID: PropTypes.string,
        wordCount: PropTypes.number.isRequired,
        speechRate: PropTypes.number.isRequired,
        readWords: PropTypes.number,
    };

    static defaultProps = {
        currentUUID: null,
        readWords: 0,
    }

    constructor(props) {
        super(props);

        this.startTime = Date.now();
        this.pausedAt = 0;
        this.initialSpeechRate = props.speechRate;
        this.state = {
            estimatedTime: estimatedReadingTime(
                props.wordCount,
                props.speechRate,
            ),
        };
    }

    componentWillReceiveProps(nextProps) {
        const { readWords, speechRate, isPlaying, currentUUID } = nextProps;

        if (currentUUID !== this.props.currentUUID) {
            // new track, thus speechRate may be changed
            this.initialSpeechRate = speechRate;
        }

        if (this.props.isPlaying !== isPlaying) {
            if (isPlaying) {
                this.startTime += (Date.now() - this.pausedAt);
            } else {
                this.pausedAt = Date.now();
            }
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
        const updateInterval = Math.floor(this.props.wordCount / 10);

        if (this.props.wordCount < 20 || readWords < updateInterval) {
            // Show static estimation until >= 10% of the text has been read
            return estimatedReadingTime(
                this.props.wordCount,
                this.initialSpeechRate,
            );
        } else if (readWords % updateInterval === 0) {
            return this.getDynamicEstimatedTime(readWords);
        }
        return this.estimatedTime;
    }

    getDynamicEstimatedTime(readWords) {
        const passedTime = Date.now() - this.startTime;
        const wordsPerMsEstimate = readWords / passedTime;
        return Math.ceil(this.props.wordCount / (wordsPerMsEstimate));
    }
}

const mapStateToProps = ({ audioSettings, player }) => ({
    isPlaying: player.isPlaying,
    currentUUID: player.currentUUID,
    speechRate: audioSettings.rate,
});

export default connect(mapStateToProps)(TimeEstimateDynamic);
