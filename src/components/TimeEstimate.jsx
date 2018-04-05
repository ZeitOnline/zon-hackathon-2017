import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { formatDate, estimatedReadingTime } from 'app/utilities';

const TimeEstimate = ({ estimatedTime }) => (
    <span className="time-estimate">{formatDate(estimatedTime, 'mm:ss')}</span>
);

TimeEstimate.propTypes = {
    estimatedTime: PropTypes.number.isRequired,
};

const mapStateToProps = ({ audioSettings }, { wordCount }) => ({
    estimatedTime: estimatedReadingTime(wordCount, audioSettings.rate),
});

export default connect(mapStateToProps)(TimeEstimate);
