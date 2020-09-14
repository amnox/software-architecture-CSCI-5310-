# Home Library Web Application

App URL: http://ec2-54-87-158-130.compute-1.amazonaws.com/
 
Git URL: https://github.com/amnox/software-architecture-CSCI-5310-/tree/master/bookapp/library-lookup
 
## Usage Instructions
 
This app lets you search a collection of books by the name of Author or Books. To search the required field first select it from the dropdown menu and type your query in the text box. To save a search, simply click the book from the search results.

## API Endpoints

### /api/books
**Method: GET**
Sample cURL: 
``` 
curl --location --request GET 'http://localhost:3001/api/books?query=ama&column=name' 
```

Response:
```
[
    {
        "name": "Amulet of Samarkand, The",
        "author_last": "Stroud",
        "author_first": "Jonathan",
        "id": 161
    }
]
```

**Method: POST**
Sample cURL:
```
curl --location --request POST 'http://localhost:3001/api/books/' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "Last Mughal, AMan",
        "author_last": "Dalrymple Aman",
        "author_first": "William",
        "id": 2020
}'
```
Response:
```
{"success":"book created"}
```
### /api/book/:id

id is a URL parameter to identify books individually

**Method: PUT**
Sample cURL
```
curl --location --request PUT 'http://localhost:3001/api/book/202' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "Last Mughal, The mode",
        "author_last": "Dalrymple",
        "author_first": "William",
        "id": 2020
}'
```
Response:
```
{
    "success": "book updated"
}
```