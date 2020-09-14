import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class BookSearch extends React.Component {
  state = {
    books: [],
    column:'name',
    showRemoveIcon: false,
    searchValue: ""
  };

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        books: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      Client.search(value, this.state.column, books => {
        this.setState({
          books: books.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };
  handleColumnChange = (event) => {
    this.setState({column: event.target.value});
  }
  handleSearchCancel = () => {
    this.setState({
      books: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, books } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const bookRows = books.map((book, idx) => (
      <tr key={idx} onClick={() => this.props.onBookClick(book)}>
        <td>{book.name}</td>
        <td className="right aligned">{book.id}</td>
        <td className="right aligned">{book.author_first}</td>
        <td className="right aligned">{book.author_last}</td>
      </tr>
    ));

    return (
      <div id="book-search">
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Search books..."
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className="search icon" />
                  </div>
                  <i
                    className="remove icon"
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
                Pick your Filter:
                <select value={this.state.column} onChange={this.handleColumnChange}>
                  <option value="name">name</option>
                  <option value="author_first">Author First</option>
                  <option value="author_last">Author Last</option>
                  <option value="id">ID</option>
                </select>
              </th>
            </tr>
            <tr>
              <th className="eight wide">Book Name</th>
              <th>Book ID</th>
              <th>Author</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {bookRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookSearch;
