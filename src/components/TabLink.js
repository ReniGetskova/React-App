import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class TabLink extends Component {
    render() {
        //console.log(this.props.activeTab);
        let className = "";
        if(this.props.activeTab === this.props.tab.id) {
            className = "btn btn-secondary";
        } else {
            className = "btn btn-primary";
        }
        return (
            <li className="nav-item">
                <button type="button" className={className} id={"tab-" + this.props.tab.id} style={{ marginLeft: '10px' }}
                    onClick={() => this.props.onClickTab(this.props.tab.id)}
                    role="tab">{this.props.tab.title}
                </button>
            </li>
        );
    }
}

export default TabLink;