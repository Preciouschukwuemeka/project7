import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import apiKey from './config';




// Importing Components.

import Header from './Components/Header';
import PhotoList from './Components/PhotoList';
import NotFound from './Components/NotFound';






//creating the main App Component

class App extends Component {
  state = {
    imgs: [],
    query: "",
    statues: [],
    animals: [],
    watches: [],
    loading: true
  }





  // Retrieving images for the 3 default categories using axios.

  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=statues&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          statues: response.data.photos.photo,
          loading: false
        }));
             })
             .catch(error => {
              console.log('Error fetching and parsing data', error);
            });




      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=animals&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          animals: response.data.photos.photo,
          loading: false
        }));
        })
        .catch(error => {
          console.log('Error fetching and parsing data', error);
        });




      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=watches&per_page=25&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState( prevState => ({
          ...prevState,
          watches: response.data.photos.photo,
          loading: false
        }));
             })
             .catch(error => {
              console.log('Error fetching and parsing data', error);
            });
  }
  




 // Search Field

  performSearch = (query) => {
    this.setState( prevState => ({
      ...prevState,
      loading: true
    }));

    
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState( prevState => ({
        ...prevState,
        query: query,
        imgs: response.data.photos.photo,
        loading: false
      }));
           })
           .catch(error => {
            console.log('Error fetching and parsing data', error);
          });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header 
            statues={this.state.statues}
            animals={this.state.animals}
            watches={this.state.watches}
            onSearch={this.performSearch}
          />
           { this.state.loading ? <h1>Loading...</h1> : 
          <Switch>           
            <Route exact path="/" render={ () => <Redirect to='/statues' />} />
            <Route path="/statues" render={ () => <PhotoList images={this.state.statues} title={'Statues'} />} />
            <Route path="/animals" render={ () => <PhotoList images={this.state.animals} title={'Animals'} />} />
            <Route path="/watches" render={ () => <PhotoList images={this.state.watches} title={'Watches'} />} />
            <Route path="/search" render={ () => <PhotoList images={this.state.imgs} title={this.state.query} />} />

            {/* if the route is not one of the above routes, go to the 404 page */}

            <Route component={NotFound} />
           </Switch> }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;











