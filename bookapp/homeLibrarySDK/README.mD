# Home Library Web SDK

This is a SDK written in python to communicate with the Library server created in Homework 1 and 2. HTTP calls are made using python's request 
 
## Usage Instructions
 
To use this module, simply paste it in the python project directory and import it. This module has 3 methods to search, create and edit books. 

### LibrarySDK.getBooks

Search books by author name, book name or ID

***Params***

url: URL where the server is hosted

query: The search query

column: Name of the column being serched. Possible vaues - name, author_last, author_first, id

### LibrarySDK.newBook

Use this method to create a new book in database. This method accepts a python dictionay object which has the new book's details.

***Params***

url: URL where the server is hosted

book: The 'dict' object containing following keys - name, author_last, author_first, id


### LibrarySDK.updateBook

Use this method to update an existing book in the database. 

***Params***

url: URL where the server is hosted

book: The 'dict' object containing following keys - name, author_last, author_first, id


***Note***: The SDK has tested in python ```3.6.5``` the only dependency is [requests](https://requests.readthedocs.io/en/master/) library which can be installed as follows


```pip install requests```

#### Example

```
print(getBooks(url, "ama","name"))

book = {
    "book_id":223,
    "name":"Last Prisoner",
    "author_first":"ex",
    "author_last":"convict"
}
print(newBook(url,book))

print(updateBook(url,book))
```
#### Response

```
b'[{"name":"Amulet of Samarkand, The","author_last":"Stroud","author_first":"Jonathan","id":161},{"name":"Aman\'s Book","author_last":"Khalid","author_first":"Aman","id":2020}]'
b'{"success":"book created"}'
b'{"success":"book updated"}'
```
