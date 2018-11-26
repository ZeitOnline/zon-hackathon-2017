import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'app/utilities';

export default class Timer extends PureComponent {
    static propTypes = {
        running: PropTypes.bool.isRequired,
        reset: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.elapsedTime = 0;
        this.interval = 200;

        if (this.props.running) {
            this.setInterval();
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.running !== this.props.running) {
            if (nextProps.running) {
                this.setInterval();
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
            <span className="timer">{formatDate(this.elapsedTime, 'mm:ss')}</span>
        );
    }

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

    clearInterval() {
        clearInterval(this.timerID);
    }

    getSeconds() {
        return Math.floor(this.elapsedTime / 1000);
    }
}
