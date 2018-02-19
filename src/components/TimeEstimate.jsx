import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, estimatedReadingTime } from 'app/utilities';

class TimeEstimate extends Component {
    static propTypes = {
        wordCount: PropTypes.number.isRequired,
        speechRate: PropTypes.number.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            estimatedTime: estimatedReadingTime(
                props.wordCount,
                props.speechRate,
            ),
        };
    }

    componentWillReceiveProps({ wordCount, speechRate }) {
        this.estimatedTime = estimatedReadingTime(wordCount, speechRate);
        this.setState({
            estimatedTime: this.estimatedTime,
        });
    }

    render() {
        return (
            <span className="time-estimate">{formatDate(this.state.estimatedTime, 'mm:ss')}</span>
        );
    }
}

const mapStateToProps = ({ audioSettings }) => ({
    speechRate: audioSettings.rate,
});

export default connect(mapStateToProps)(TimeEstimate);
