import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchData } from 'app/utilities';
import { Teaser } from 'app/components';

export default class TeaserList extends Component {
    static propTypes = {
        headline: PropTypes.string.isRequired,
    }

    state = {
        teaser: [],
        loading: true,
    }

    async componentDidMount() {
        const result = await fetchData();
        console.log(result);
        this.receiveTeaser(result.matches);
    }

    render() {
        return (
            <div>
                <h1>{this.props.headline}</h1>
                {this.state.loading && (<p>Laden ...</p>)}
                <div>{ this.state.teaser.map(teaser => (
                    <Teaser key={teaser.uuid} teaser={teaser} />
                )) }
                </div>
            </div>
        );
    }

    receiveTeaser(teaser) {
        this.setState({ teaser, loading: false });
    }
}
