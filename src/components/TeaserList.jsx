import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TeaserList extends Component {
    static propTypes = {
        headline: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <h1>{this.props.headline}</h1>
                <div>Hallo</div>
            </div>
        );
    }

    dummy() {
        return this.props.children;
    }
}
