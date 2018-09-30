import React, { Component } from 'react';
import YoutubeEmbedVideo from "youtube-embed-video";

class Gallery extends Component {
    render() {
        return (
            <div className="col">
               <h5>{this.props.video.title}</h5>
                <YoutubeEmbedVideo videoId={this.props.videoId} suggestions={false} />
                <p>
                    {this.props.video.description}
                </p>
            </div>
        );
    }
}
        
export default Gallery;