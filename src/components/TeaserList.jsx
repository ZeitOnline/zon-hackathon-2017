import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTeasers, fetchTeasersSuccess, fetchTeasersError } from 'app/actions/teasers';
import { fetchData } from 'app/utilities';
import { Teaser } from 'app/components';

class TeaserList extends Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        teaserList: PropTypes.arrayOf(PropTypes.object).isRequired,
        fetchTeasers: PropTypes.func.isRequired,
        fetchTeasersSuccess: PropTypes.func.isRequired,
        fetchTeasersError: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.fetchTeasers();
        fetchData()
            .then((response) => {
                this.props.fetchTeasersSuccess(response.matches);
            })
            .catch(() => {
                // TODO Fix error handling
                this.props.fetchTeasersError('Error');
            });
    }

    render() {
        return (
            <div>
                <h1>Audio Explorer</h1>
                {this.props.loading && (<p>Laden ...</p>)}
                {this.props.error && (<p>Fehler beim Laden.</p>)}
                <div>{this.renderTeaser()}</div>
            </div>
        );
    }

    renderTeaser() {
        return this.props.teaserList.map(teaser => (
            <Teaser
                key={teaser.uuid}
                teaser={teaser}
                // active={this.state.active === teaser.uuid}
            />
        ));
    }
}

const mapStateToProps = ({ teasers }) => ({
    loading: teasers.loading,
    error: teasers.error,
    teaserList: teasers.teaserList,
});

const mapDispatchToProps = {
    fetchTeasers,
    fetchTeasersSuccess,
    fetchTeasersError,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeaserList);
