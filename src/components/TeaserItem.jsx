import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';

export default class TeaserItem extends Component {
    static propTypes = {
        teaser: PropTypes.shape({
            title: PropTypes.string,
            supertitle: PropTypes.string,
            teaser_title: PropTypes.string,
            teaser_text: PropTypes.string,
        }).isRequired,
    };

    render() {
        return (
            <Teaser
                teaser={this.props.teaser}
                toggleSpeech={this.toggleTeaserText}
            />
        );
    }

    toggleTeaserText = () => {
        console.log(this.props.teaser.teaser_title);
    };
}
