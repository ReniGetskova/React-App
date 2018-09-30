import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchBox from './SearchBox';
import Gallery from './Gallery';

class TabPanel extends Component {
    render() { 
        //console.log(this.props.activeTab);
        let className = "";
        if(this.props.activeTab === this.props.tab.id) {
            className = "tab-pane fade show active";
        } else {
            className = "tab-pane fade show";
        }

        let gallery = '';
        if(this.props.tab.content.length > 0) {
            //console.log(this.props.tab.content.map(item => item.id.videoId));
            gallery = (
                <div className="row">
                    {this.props.tab.content.map(item => 
                        <Gallery 
                            key={item.id.videoId} 
                            videoId={item.id.videoId}
                            video={item.snippet}
                        />
                    )}
                </div>
            )
        }
        return ( 
            <div className={className} id={"tabpanel-" + this.props.tab.id}>
                <SearchBox 
                    tabId={this.props.tab.id}
                    onClickSearch={this.props.onClickSearch} 
                />
                <div>
                    {gallery}
                </div>
            </div>
         );
    }
}
 
export default TabPanel;