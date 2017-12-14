import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchData } from 'app/utilities';

export default class TeaserList extends Component {
    static propTypes = {
        headline: PropTypes.string.isRequired,
    }

    async componentDidMount() {
        const result = await fetchData();
        console.log(result);
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
