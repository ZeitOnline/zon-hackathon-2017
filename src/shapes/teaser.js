import PropTypes from 'prop-types';

export default {
    author: PropTypes.arrayOf(PropTypes.string),
    body: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    supertitle: PropTypes.string.isRequired,
    teaser_text: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
};
