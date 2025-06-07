# 📚 Book Review API

 **Install dependencies:**
   
   npm install
  
**Set up environment variables:**
   .env: 
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bookreview
   JWT_SECRET=your_jwt_secret
   ```
**Run the server:**
  
   npm run dev: The server will run at `http://localhost:5000`

## 🔧 How to Run Locally

- Make sure MongoDB Atlas cluster is running and connection URI is correct.
- Use Postman or cURL to test API endpoints. 

## 📫 API Endpoints & Sample Requests

### Auth
```http
POST /api/signup
Body: { "username": "user1", "email": "test@example.com", "password": "123456" }
```
```http
POST /api/login
Body: { "email": "test@example.com", "password": "123456" }
Response: { "token": "..." }
```

### Books (Authenticated)
```http
POST /api/books
Headers: Authorization: Bearer <token>
Body: { "title": "Book Title", "author": "Author", "genre": "Genre" }
```
```http
GET /api/books?page=1&limit=5&author=George&genre=Fiction
```
```http
GET /api/books/:id
Returns book info, reviews, and average rating.
```
```http
GET /api/books/search?q=harry(partial or case-sensitive)
```

### Reviews (Authenticated)
```http
POST /api/books/:id/reviews
Headers: Authorization: Bearer <token>
Body: { "rating": 5, "comment": "Excellent read!" }
```
```http
PUT /api/reviews/:id
Headers: Authorization: Bearer <token>
Body: { "rating": 4, "comment": "Updated comment." }
```
```http
DELETE /api/reviews/:id
Headers: Authorization: Bearer <token>
```

## 💡 Design Decisions & Assumptions

- JWT is used for stateless authentication.
- Each user can submit only one review per book.
- Book details include populated reviews and average rating.
- MongoDB Atlas is used.

## ✅ Postman Testing

1. Import all API routes into Postman.
2. Set `Authorization` header as `Bearer <token>` for protected routes.
3. Use sample data or bulk JSON to test `POST /books`.
4. Validate data in MongoDB Atlas collections (`books`, `users`, `reviews`).


## 📂 Folder Structure

project-root/
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── config/
    ├── .env
    ├── server.js
    └── package.json
