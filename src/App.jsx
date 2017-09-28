import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Gallery from "./Gallery";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            bgColor: '#000000',
            artist: null,
            tracks: []
        }
    }
    colorGenerator() {
        return ("#"+((1<<24)*Math.random()|0).toString(16));
    }
    search() {
        const BASE_HREF = 'https://api.spotify.com/v1/search';
        const ACCESS_TOKEN = 'BQBQlg8V0OjliRP_QQ4Hlx77Uhjllf8T8C2oiXAz5dYpDmbUY3OfcgxpDH0-mk_3U7QnER2mXeaHAQ-ukQUbyljfpArPoHl0dMVow83pfaAj3A6dbDHdjz7AqJa8aqXCMk0btA';
        let FETCH_URL = `${BASE_HREF}?q=${this.state.query}&type=artist&limit=1&access_token=${ACCESS_TOKEN}`;
        //console.log('FETCH_URL', FETCH_URL);
        fetch( FETCH_URL, {
            method: 'GET'
        }).then( response => response.json() )
            .then( json => {
                const artist = json.artists.items[0];
                this.setState({artist});
                FETCH_URL = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?country=US&access_token=${ACCESS_TOKEN}`;
                fetch(FETCH_URL, {
                    method: 'GET'
                }).then(response => response.json())
                    .then(json => {
                        const { tracks } = json;
                        this.setState({tracks});
                    });
            });
    }
    render(){
        return(
          <div className="App" style={{backgroundColor: this.state.bgColor}}>
              <div className="App-title">{ (this.state.artist !== null) ? this.state.artist.name : 'Music Maaastooor' }</div>
              <FormGroup>
                  <InputGroup>
                      <FormControl
                        type="Text"
                        placeholder="Search for an Artoost"
                        value={ this.state.query }
                        onChange={ event => this.setState( { query: event.target.value } ) }
                        onKeyPress={ event => {
                          if (event.key === 'Enter') {
                              this.search();
                          }
                          this.setState({bgColor: this.colorGenerator()});
                        }}
                      />
                      <InputGroup.Addon onClick={ () => this.search() }>
                          <Glyphicon glyph="search"></Glyphicon>
                      </InputGroup.Addon>
                  </InputGroup>
              </FormGroup>
              <Profile
                artist={this.state.artist}
              />
              <Gallery tracks={this.state.tracks}/>
          </div>
        );
    };
}

export default App;