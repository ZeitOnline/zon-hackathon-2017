import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Teaser } from 'app/components';
import { TEASER } from 'app/shapes';

export default class TeaserItem extends Component {
    static propTypes = {
        teaser: PropTypes.shape(TEASER).isRequired,
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
