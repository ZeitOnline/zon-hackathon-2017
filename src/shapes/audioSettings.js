import PropTypes from 'prop-types';

export default {
    voiceList: PropTypes.arrayOf(PropTypes.object),
    voice: PropTypes.string,
    rate: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
};
