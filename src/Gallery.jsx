import React, { Component } from 'react';
import './App.css';
class Gallery extends Component {

    // Method to play preview audio

    constructor(props){
        super(props);
        this.state = {
            playingurl: '',
            audio: null,
            playing: false
        }
    }

    playAudio(previewurl) {
        let audio = new Audio(previewurl);
        if(!this.state.playing) {
            audio.play();
            this.setState({
                playing: true,
                playingurl: previewurl,
                audio
            });
        } else {
            if (this.state.playingurl === previewurl){
                this.state.audio.pause();
                this.setState({
                    playing: false
                });
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({
                    playing: true,
                    playingurl: previewurl,
                    audio
                })
            }
        }

    }

    render() {
        const { tracks } = this.props;
        return(
            <div>
                {
                    tracks.map((track, k) => {
                        let trackImg = track.album.images[0].url;
                        return(
                            <div key={k} className="track">
                                <img src={trackImg} alt={track.name} className="track-img" onClick={() => this.playAudio(track.preview_url)}/>
                                <p className="track-text">{track.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
export default Gallery;