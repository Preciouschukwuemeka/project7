import React, { Component } from 'react';
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import apiKey from './config';



//Component Imports
import Header from './Components/Header';
import GalleryForm from './Components/GalleryForm';
import NotFound from './Components/NotFound';

//creates the main App component
class App extends Component {
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  state = {
    imgs: [],
    query: "",
    statues: [],
    animals: [],
    watches: [],
    loading: true
  }

  //when the component is first mounted, axios retrieves images for the 3 default categories.
  componentDidMount() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=statues&per_page=24&page=1&format=json&nojsoncallback=1`)
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
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=animals&per_page=24&page=1&format=json&nojsoncallback=1`)
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
      axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=watches&per_page=25&page=1&format=json&nojsoncallback=1`)
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
  
//First, changes loading to true, then
//uses the query passed up from the search form and retrieves images for that and changes loading back to false.
  performSearch = (query) => {
    this.setState( prevState => ({
      ...prevState,
      loading: true
    }));
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&page=1&format=json&nojsoncallback=1`)
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
            cars={this.state.statues}
            footwears={this.state.animals}
            watches={this.state.watches}
            onSearch={this.performSearch}
          />
           { this.state.loading ? <p><h1>Loading...</h1></p> : 
          <Switch>           
            <Route exact path="/" render={ () => <Redirect to='/statues' />} />
            <Route path="/statues" render={ () => <GalleryForm images={this.state.statues} title={'Statues'} />} />
            <Route path="/animals" render={ () => <GalleryForm images={this.state.animals} title={'Animals'} />} />
            <Route path="/watches" render={ () => <GalleryForm images={this.state.watches} title={'Watches'} />} />
            <Route path="/search" render={ () => <GalleryForm images={this.state.imgs} title={this.state.query} />} />
            {/* if the route is not one of the above routes, go to the 404 page */}
            <Route component={NotFound} />
           </Switch> }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;











