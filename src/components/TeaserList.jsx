import React, { Component } from 'react';

import { fetchData } from 'app/utilities';
import { TeaserItem } from 'app/components';

export default class TeaserList extends Component {
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
            <TeaserItem
                key={teaser.uuid}
                {...this.props}
                teaser={teaser}
                active={this.state.active === teaser.uuid}
            />
        ));
    }

    receiveTeaser(teaser) {
        this.setState({ teaser, loading: false });
    }
}
