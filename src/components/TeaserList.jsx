import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { fetchData } from 'app/utilities';

export default class TeaserList extends Component {
    static propTypes = {
        headline: PropTypes.string.isRequired,
    }

    state = {
        teaser: [],
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
                <div>{ this.state.teaser.map(teaser => (
                    <article className="teaser" key={teaser.uuid}>
                        <h2>
                            <span className="teaser__kicker">{teaser.supertitle}</span>
                            <span className="teaser__title">{teaser.teaser_title || teaser.title}</span>
                        </h2>
                        <p>{teaser.teaser_text}</p>
                    </article>
                )) }
                </div>
            </div>
        );
    }

    receiveTeaser(teaser) {
        this.setState({ teaser });
    }
}
