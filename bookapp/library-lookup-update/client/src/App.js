import React, { Component } from "react";
import SelectedBooks from "./SelectedBooks";
import BookSearch from "./BookSearch";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Home extends Component {
  state = {
    selectedBooks: []
  };

  removeBookItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addBook = book => {
    const newBooks = this.state.selectedBooks.concat(book);
    this.setState({ selectedBooks: newBooks });
  };

  render() {
    const { selectedBooks } = this.state;

    return (
      <div className="App">
        <div className="ui text container">
          <SelectedBooks
            books={selectedBooks}
            onBookClick={this.removeBookItem}
          />
          <BookSearch onBookClick={this.addBook} />
          
        </div>
      </div>
    );
  }
}

class App extends Component{
  render(){
    return(
<Router>
      <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          
        </Switch>
    </Router>
    )
    
  }
}

export default App;
