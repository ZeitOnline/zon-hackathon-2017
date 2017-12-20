import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'app/utilities';

export default class Timer extends PureComponent {
    static propTypes = {
        running: PropTypes.bool.isRequired,
        reset: PropTypes.bool.isRequired,
    };

    componentWillUpdate({ running, reset }) {
        if (running !== this.props.running) {
            if (running) {
                this.setInterval();
            } else {
                this.clearInterval();
            }
        }

        if (reset) {
            this.elapsedTime = 0;
        }
    }

    componentWillUnmount() {
        this.clearInterval();
    }

    render() {
        return (
            <time>{formatDate(this.elapsedTime, 'mm:ss')}</time>
        );
    }

    elapsedTime = 0;
    interval = 200;

    tick = () => {
        const seconds = this.getSeconds();
        this.elapsedTime += this.interval;

        if (seconds !== this.getSeconds()) {
            this.forceUpdate();
        }
    };

    setInterval() {
        this.timerID = setInterval(this.tick, this.interval);
    }

    clearInterval() {
        clearInterval(this.timerID);
    }

    getSeconds() {
        return Math.floor(this.elapsedTime / 1000);
    }
}
