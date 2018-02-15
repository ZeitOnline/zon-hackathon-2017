import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'app/utilities';

export default class Timer extends PureComponent {
    static propTypes = {
        running: PropTypes.bool.isRequired,
        reset: PropTypes.bool.isRequired,
        wordCount: PropTypes.number.isRequired,
        speechRate: PropTypes.number.isRequired,
        readWords: PropTypes.number.isRequired,
    };

    state = {
        estimatedTime: 0,
    }

    componentWillReceiveProps({ readWords }) {
        if (readWords !== this.props.readWords) {
            this.estimatedTime = this.getEstimatedTime(readWords);
            this.setState({
                estimatedTime: this.estimatedTime,
            });
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.running !== this.props.running) {
            if (nextProps.running) {
                this.setInterval();
                this.setStartTime();
            } else {
                this.clearInterval();
            }
        }

        if (nextProps.reset) {
            this.elapsedTime = 0;
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    render() {
        return (
            <div className="timer">
                <time className="timer__elapsed">{formatDate(this.elapsedTime, 'mm:ss')}</time>
                <span>~</span><time className="timer__estimated">{formatDate(this.state.estimatedTime, 'mm:ss')}</time>
            </div>
        );
    }

    elapsedTime = 0;
    interval = 200;
    startTime = 0;

    getEstimatedTime(readWords) {
        const updateEvery = Math.floor(this.props.wordCount / 10);
        if (readWords < updateEvery) {
            return this.getStaticEstimatedTime();
        } else if (readWords % updateEvery === 0) {
            return this.getDynamicEstimatedTime(readWords);
        }
        return this.estimatedTime;
    }

    getStaticEstimatedTime() {
        // Avg. words per minute when reading aloud ≈ 150
        // See https://de.wikipedia.org/wiki/Lesegeschwindigkeit#Lesen_von_Texten
        // 145 words/ms appeared to be a good estimate.
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

    tick = () => {
        const seconds = this.getSeconds();
        this.elapsedTime += this.interval;

        // NOTE: Even though the timer should only be updated every 1 second,
        // the interval delay is set to 200ms. This enables us to prevent
        // the interval getting out of sync, as setInterval is not guaranteed
        // to execute every [delay] ms. Thus we check every 200ms if 1 second
        // has passed (see getSeconds).
        if (seconds !== this.getSeconds()) {
            this.forceUpdate();
        }
    };

    setInterval() {
        this.timerID = setInterval(this.tick, this.interval);
    }

    setStartTime() {
        this.startTime = Date.now();
    }

    clearInterval() {
        clearInterval(this.timerID);
    }

    getSeconds() {
        return Math.floor(this.elapsedTime / 1000);
    }
}
