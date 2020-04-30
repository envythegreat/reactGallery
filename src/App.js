import React, {Component} from 'react';
import axios from 'axios';
import SearchForm from './component/SearchForm';
import Nav from './component/Nav';
import ListImg from './component/ListImg';
import apiKey from './component/config'
import NotFound from './component/NotFound'
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
class App extends Component {

  constructor() {
    super();
    this.state = {
      Images:[],
      dogs:[],
      cats:[],
      dawn:[],
      loading : true
    }
  }
  componentDidMount() {
    this.performSearch('dawn');
    this.performSearch('dogs');
    this.performSearch('cats');
  }

  
  performSearch = (query) =>{
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
      .then(response => {
       const { photo } = response.data.photos;
       if(['cats','dogs','dawn'].indexOf(query.toLowerCase()) > -1){
         this.setState({
           [query]:photo,
           loading:false
          })
       } else {
         this.setState({
           Images:photo,
           loading:false
         })
       }
       console.log(photo)
      })
      .catch(error => {console.log('Something Went Wrong : ', error)});
  }

  render() {
    return(
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Nav/>
          {/* <ListImg  Images={this.state.Images}/> */}
          <Switch>
            <Route exact path="/" render={() => <ListImg  Images={this.state.dawn} loading={this.state.loading} />}/>
            <Route path="/dogs" render={() => <ListImg  Images={this.state.dogs} loading={this.state.loading} />}/>
            <Route path="/cats" render={() => <ListImg  Images={this.state.cats} loading={this.state.loading} />}/>
            <Route path="/dawn" render={() => <ListImg  Images={this.state.dawn} loading={this.state.loading} />}/>
            <Route path="/search/:query" render={() => <ListImg  Images={this.state.Images} loading={this.state.loading} />}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
