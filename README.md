
### Models
- Author Model
```
  userName: { type: String, required: 'user name is required', trim: true },
    password: {
        type: String, required: 'password is required'
    }

```
- Books Model
```
  bookName: { type: String, required: 'bookName is required', trim: true },
    authorId: {
        type: ObjectId, required: true, ref: 'myAuthor'
    },
    authorName: {
        type: String, required: false,
    },
    price: { type: Number, required: true },


### Author APIs /authors
- Create an author - 
- Create a author document from request body.
  login author with the help of username and password

- Add authentication and authroisation feature


### Authentication
- Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code

-we  Use a middleware for authentication purpose.

### Authorisation
-only the owner of the book is able to edit or delete .

### POST /books
- Create a book document from request body. 
- the authorId is a valid authorId by checking the author exist in the authors collection.
- Return HTTP status 201 on a succesful book creation. Also return the book document. The response should be a JSON object 


- Return HTTP status 400 for an invalid request with a response body

### GET /books
- We Returns all books in the collection that aren't deleted and are published
- Return the HTTP status 200 if any documents are found.
- If no documents are found then return an HTTP status 404 with a response 
router.get("/getBook", BookController.fetchBooks)//  endpoint


### PUT /books/:bookid

- Updates a book by changing the its price, bookname.

-We Return an HTTP status 200 if updated successfully with a body 
router.put("/books/:bookId", Midd.middleWare, BookController.updateBook) //endpoint 


### DELETE /books/:bookId
- first we Check if the book exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 .
- If the book document doesn't exist then return an HTTP status of 404
router.delete("/books/:bookId", Midd.middleWare, BookController.deleteById) // endpoint


