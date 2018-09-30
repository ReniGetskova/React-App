import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class SearchBox extends Component {
    //state = {};

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <form className="form-inline" style={{ marginTop: '20px' }}>
                <div className="form-group mx-sm-3 mb-2">
                    <input type="text" id={"searchinput-" + this.props.tabId}
                        onChange={this.handleChange} value={this.state.value}
                        className="form-control" placeholder="Search">
                    </input>
                </div>
                <button type="button" className="btn btn-dark mb-2"
                    onClick={() => this.props.onClickSearch(this.props.tabId, this.state.value)}> Search
                </button>
            </form>
        );
    }
}

export default SearchBox;