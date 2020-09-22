import requests, json

def getBooks(url, query, column):
    url = url+"/api/books?query="+query+"&column="+column

    payload = {}
    headers= {}

    response = requests.request("GET", url, headers=headers, data = payload)

    return response.text.encode('utf8')

def newBook(url, book):
    url = url+"/api/books/"
    name = book['name']
    author_last = book['author_last']
    author_first = book['author_first']
    book_id = book['book_id']
    payload = {"name":name, "author_last": author_last, "author_first":author_first, "id":book_id}
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data = json.dumps(payload))

    return response.text.encode('utf8')

def updateBook(url,book):
    name = book['name']
    author_last = book['author_last']
    author_first = book['author_first']
    book_id = book['book_id']
    url = url+"/api/book/"+str(book_id)
    payload = {"name":name, "author_last": author_last, "author_first":author_first, "id":book_id}
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data = json.dumps(payload))

    return response.text.encode('utf8')

url = "http://ec2-34-203-33-157.compute-1.amazonaws.com"


print(getBooks(url, "ama","name"))

book = {
    "book_id":223,
    "name":"Last Prisoner",
    "author_first":"ex",
    "author_last":"convict"
}
print(newBook(url,book))

print(updateBook(url,book))
