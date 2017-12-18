import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchData } from 'app/utilities';
import { TeaserItem } from 'app/components';

export default class TeaserList extends Component {
    static propTypes = {
        lang: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        pitch: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired,
    }

    state = {
        teaser: [],
        loading: true,
    }

    async componentDidMount() {
        const result = await fetchData();
        this.receiveTeaser(result.matches);
    }

    render() {
        return (
            <div>
                <h1>Audio Explorer</h1>
                {this.state.loading && (<p>Laden ...</p>)}
                <div>{this.renderTeaser()}</div>
            </div>
        );
    }

    renderTeaser() {
        return this.state.teaser.map(teaser => (
            <TeaserItem key={teaser.uuid} {...this.props} teaser={teaser} />
        ));
    }

    receiveTeaser(teaser) {
        this.setState({ teaser, loading: false });
    }
}
