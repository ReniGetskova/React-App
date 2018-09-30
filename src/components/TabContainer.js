import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import TabLink from './TabLink';
import TabPanel from './TabPanel';

class TabContainer extends Component {
    state = {
        tabs: [
            {
                id: 1,
                title: 'Tab 1',
                content: []
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            tabs: this.state.tabs,
            activeTab: this.state.tabs[0].id
        };

        this.onClickTabItem = this.onClickTabItem.bind(this);
        this.onClickAddTab = this.onClickAddTab.bind(this);
        this.onClickRemoveTab = this.onClickRemoveTab.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    onClickSearch(tabId, word) {
        //console.log(word);
        //console.log(tabId);
        let selectedTabContent = this.state.tabs.filter(t => t.id === tabId)[0].content;
        //console.log(selectedTabContent);
        axios.get('https://www.googleapis.com/youtube/v3/search?q=' + word + '&type=video&maxResults=12&part=snippet&key=AIzaSyAN2MGshE2284JpXi19ZZJPZLS3AqUd9Do')
            .then((response) => {
                //console.log(response.data.items);
                selectedTabContent = response.data.items;
                let updatedTabs = this.state.tabs.map(t => t.id === tabId ?
                    { ...t, content: selectedTabContent } : t
                )
                //console.log(updatedTabs);
                this.setState({ tabs: updatedTabs });
                //console.log(this.state.tabs);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickTabItem(tabId) {
        this.setState({ activeTab: tabId });
    }

    onClickAddTab() {
        let tabs = this.state.tabs;
        let tabsLength = tabs.length;
        let tabForAdding = {};
        // prevent adding more than 10 tabs
        if (tabsLength < 10) {
            tabForAdding.id = tabs[tabsLength - 1].id + 1;
            tabForAdding.title = tabs[tabsLength - 1].title.split(' ')[0] + ' ' + tabForAdding.id;
            tabForAdding.content = [];
            //console.log(tabForAdding);
            tabs.push(tabForAdding);
            this.setState({
                tabs: tabs,
                activeTab: tabForAdding.id
            });
        }
    }

    onClickRemoveTab() {
        let tabs = this.state.tabs;
        let removedTab = {};
        // at least one tab should be visible
        if (tabs.length > 1) {
            removedTab = tabs.pop();
            this.setState({
                tabs: tabs,
                activeTab: removedTab.id - 1
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    {this.state.tabs.map(tab =>
                        <TabLink
                            key={tab.id}
                            tab={tab}
                            onClickTab={this.onClickTabItem}
                            activeTab={this.state.activeTab}
                        />
                    )}
                    <button type="button" className="btn btn-success" style={{ marginLeft: '10px' }}
                        onClick={this.onClickAddTab}> Add
                    </button>
                    <button type="button" className="btn btn-danger" style={{ marginLeft: '10px' }}
                        onClick={this.onClickRemoveTab}> Remove
                    </button>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {this.state.tabs.map(tab =>
                        <TabPanel
                            key={tab.id}
                            tab={tab}
                            activeTab={this.state.activeTab}
                            onClickSearch={this.onClickSearch}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default TabContainer;