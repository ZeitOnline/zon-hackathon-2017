import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchData } from 'app/utilities';
import { TeaserItem } from 'app/components';

export default class TeaserList extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        rate: PropTypes.string.isRequired,
        pitch: PropTypes.string.isRequired,
        volume: PropTypes.string.isRequired,
    }

    state = {
        teaser: [],
        loading: true,
        active: '',
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
            <TeaserItem
                key={teaser.uuid}
                {...this.props}
                teaser={teaser}
                active={this.state.active === teaser.uuid}
                setActive={this.setActive}
            />
        ));
    }

    receiveTeaser(teaser) {
        this.setState({ teaser, loading: false });
    }

    setActive = (active) => {
        this.setState({ active });
    };
}
