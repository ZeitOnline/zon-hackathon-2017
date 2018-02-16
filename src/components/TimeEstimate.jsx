import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'app/utilities';

export default class TimeEstimate extends Component {
    static propTypes = {
        running: PropTypes.bool.isRequired,
        wordCount: PropTypes.number.isRequired,
        speechRate: PropTypes.number.isRequired,
        readWords: PropTypes.number,
    };

    static defaultProps = {
        readWords: undefined,
    }

    constructor(props) {
        super(props);

        this.startTime = Date.now();
        this.pausedAt = 0;
        this.state = {
            estimatedTime: this.getStaticEstimatedTime(),
        };
    }

    componentWillReceiveProps({ readWords, running }) {
        if (this.props.running !== running) {
            if (running) {
                this.startTime += (Date.now() - this.pausedAt);
            } else {
                this.pausedAt = Date.now();
            }
            console.log('running: ', running);
            console.log(this.pausedAt, this.startTime);
        }
        if (readWords !== this.props.readWords) {
            this.estimatedTime = this.getEstimatedTime(readWords);
            this.setState({
                estimatedTime: this.estimatedTime,
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    render() {
        return (
            <span className="time-estimate">{formatDate(this.state.estimatedTime, 'mm:ss')}</span>
        );
    }

    getEstimatedTime(readWords) {
        const updateEvery = Math.floor(this.props.wordCount / 10);
        if (readWords === undefined || readWords < updateEvery) {
            return this.getStaticEstimatedTime();
        } else if (readWords % updateEvery === 0) {
            return this.getDynamicEstimatedTime(readWords);
        }
        return this.estimatedTime;
    }

    getStaticEstimatedTime() {
        // Avg. words per minute when reading aloud ≈ 150 words/min
        // See https://de.wikipedia.org/wiki/Lesegeschwindigkeit#Lesen_von_Texten
        // 145 words/min appeared to be a good estimate.
        const avgWordsPerMs = 145 / 60 / 1000;
        return Math.ceil(this.props.wordCount /
            (avgWordsPerMs * this.props.speechRate));
    }

    getDynamicEstimatedTime(readWords) {
        const passedTime = Date.now() - this.startTime;
        const wordsPerMsEstimate = readWords / passedTime;
        return Math.ceil(this.props.wordCount / (wordsPerMsEstimate));
    }

    getIntAverage = (a, b) => Math.round((a + b) / 2)
}
