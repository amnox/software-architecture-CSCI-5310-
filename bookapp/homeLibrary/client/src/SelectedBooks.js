import React from "react";

export default function SelectedBooks(props) {
  const { books } = props;

  const bookRows = books.map((book, idx) => (
    <tr key={idx} >
      <td>{book.name}</td>
        <td className="right aligned">{book.id}</td>
        <td className="right aligned">{book.author_first}</td>
        <td className="right aligned">{book.author_last}</td>
    </tr>
  ));

  return (
    <table className="ui selectable structured large table">
      <thead>
        <tr>
          <th colSpan="5">
            <h3>Selected books</h3>
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
  );
}

function sum(books, prop) {
  return books
    .reduce((memo, book) => parseInt(book[prop], 10) + memo, 0.0)
    .toFixed(2);
}
