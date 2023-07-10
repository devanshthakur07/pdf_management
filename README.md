# Web Server Documentation

To play around with this web: https://pdf-management-j78c.onrender.com/

## Table of Contents
1. Introduction
2. Project Setup
   - Tools and Technology
   - Project Structure
3. User Registration
   - Registration API
   - Database Schema
   - Frontend Integration
4. User Login
   - Login API
   - Session Management
   - Frontend Integration
5. PDF Upload
   - File Upload API
   - File Storage
   - Frontend Integration
6. PDF Preview
   - Preview API
   - Frontend Integration
7. Sharing PDF
   - Sharing API
   - Frontend Integration
8. Comment on PDF
   - Comment API
   - Frontend Integration
9. Logout
   - Logout API
   - Frontend Integration
10. Deployment
   - Hosting on Render.com
11. Source Control
   - GitHub Integration
12. Conclusion

## 1. Introduction
This documentation provides a comprehensive guide for developing a web server with the following functionalities: user registration, user login, PDF upload for each user, PDF preview, sharing PDF with existing users, commenting on PDF, and logout. The server is built using Node.js and MongoDB for the database, with additional tools and technologies such as HBS templating engine, Passport for authentication, Multer for file upload, Render.com for deployment, and GitHub for source control.

## 2. Project Setup

### Tools and Technology

1. **HBS Templating Engine**: HBS (Handlebars) is a templating engine that allows for dynamic content generation on the server-side. It provides a simple syntax for embedding variables and logic into HTML templates, making it easier to generate dynamic web pages.

2. **Passport**: Passport is an authentication middleware for Node.js that simplifies the process of implementing user authentication and session management. It provides a flexible and modular approach to authentication, supporting various authentication strategies such as username/password, social login (OAuth), and more.

3. **Node.js**: Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code on the server-side, enabling the development of scalable and high-performance web applications. Node.js has a rich ecosystem of libraries and frameworks that facilitate web development.

4. **MongoDB**: MongoDB is a popular NoSQL database that provides a flexible and scalable data storage solution. It stores data in a JSON-like format called BSON (Binary JSON) and supports rich querying capabilities. MongoDB is well-suited for handling unstructured data and provides excellent scalability and performance.

5. **Multer**: Multer is a middleware for handling file uploads in Node.js. It simplifies the process of receiving and storing files uploaded by users. Multer supports various storage options and provides flexibility in configuring file upload behavior, such as file size limits, file type validation, and more.

6. **Render.com**: Render.com is a hosting platform that simplifies the deployment and management of web applications. It supports various programming languages and frameworks, including Node.js. Render.com offers an intuitive interface for configuring deployment settings, managing infrastructure, and scaling applications.

7. **GitHub**: GitHub is a widely-used version control platform that allows for collaborative software development. It provides features for source code hosting, version control, issue tracking, and pull requests. GitHub also offers integrations with various CI/CD tools and workflows, making it easier to automate testing and deployment processes.

These tools and technologies work together to build a robust and scalable web server with the desired functionality. Node.js provides the runtime environment, MongoDB handles data storage, HBS and Passport simplify server-side rendering and authentication, Multer handles file uploads, Render.com facilitates deployment, and GitHub enables version control and collaboration.


### Project Structure
The project structure is organized as follows:

```
-src
   -controllers
   -models
      -Comment.js
      -File.js
      -User.js
   -public\uploads
   -routes
      -routes.js
   -views
   -middleware.js
   -seever.js
```

## 3. User Registration

### Registration API
- Endpoint: `POST /register`
- Request Payload:
  - `username` (string): User's desired username.
  - `email` (string): Unique email of the user.
  - `password` (string): User's desired password.
- Response:
  - Success: `200 OK` with a success message.
  - Error: `400 Bad Request` with an error message.

### Database Schema
The `User` model in MongoDB consists of the following fields:
- `username` (string): User's username.
- `email` (string): Unique email of the user.
- `password` (string): User's hashed password.

### Frontend Integration
1. Create a registration form with fields for username and password.
2. Submit the form to the registration API endpoint.
3. Display success or error messages based on the response.

## 4. User Login

### Login API
- Endpoint: `POST /login`
- Request Payload:
  - `username` (string): User's username.
  - `password` (string): User's password.
- Response:
  - Success: `200 OK` with a success message.
  - Error: `401 Unauthorized` with an error message.

### Session Management
Use the Passport middleware to handle user authentication and session management. Upon successful login, a session is created, and the user's session data is stored in a cookie.

### Frontend Integration
1. Create a login form with fields for username and password.
2. Submit the form to the login API endpoint.
3. Store the user's session data in the frontend (e.g., in local storage) for subsequent requests.
4. Redirect the user to the desired page upon successful login.

## 5. PDF Upload

### File Upload API
- Endpoint: `POST /upload`
- Request Payload:
  - `pdf` (file): PDF file to upload.
- Response:
  - Success: `200 OK` with a success message.
  - Error: `400 Bad Request` with an error message.

### File Storage
Use Multer middleware to handle file uploads. The uploaded PDF files are stored in the `/public/uploads/` directory on the server.

### Frontend Integration
1. Create an upload form with a file input for selecting a PDF file.
2. Submit the form to the file upload API endpoint.
3. Display success or error messages based on the response.


### Frontend Integration
1. Fetch the PDF preview data from the preview API endpoint.
2. Render the PDF preview on the frontend using a suitable PDF rendering library (e.g., PDF.js).

## 7. Sharing PDF

### Sharing API
- Endpoint: `POST /share`
- Request Payload:
  - `email` (string): email of the user to share the PDF with.
- Response:
  - Success: `200 OK` with a success message.
  - Error: `400 Bad Request` with an error message.

### Frontend Integration
1. Create a form for sharing a PDF with a specific user.
2. Submit the form to the sharing API endpoint.
3. Display success or error messages based on the response.

## 8. Comment on PDF

### Comment API
- Endpoint: `POST /comments`
- Request Payload:
  - `comment` (string): The comment text.
- Response:
  - Success: `200 OK` with a success message.
  - Error: `400 Bad Request` with an error message.

### Frontend Integration
1. Create a form for adding comments to a PDF.
2. Submit the form to the comment API endpoint.
3. Display success or error messages based on the response.

## 9. Logout

### Logout API
- Endpoint: `GET /logout`
- Response:
  - Success: `200 OK` with a success message.

### Frontend Integration
1. Add a logout button or link to the user interface.
2. Send a request to the logout API endpoint when the user clicks on the logout button.
3. Clear the user's session data in the frontend and redirect to the login page.

## 10. Deployment

### Hosting on Render.com
1. Create an account on Render.com.
2. Create a new web service and configure it with the necessary settings, such as selecting Node.js as the runtime and specifying the deployment branch from the GitHub repository.
3. Connect the Render.com service to your GitHub repository.
4. Configure the necessary environment variables, such as database connection details.
5. Deploy the web server to Render.com using the provided deployment configuration.



### GitHub Integration
1. Create a new repository on GitHub.
2. Initialize the local project directory as a Git repository.
3. Add the remote GitHub repository as a remote origin.
4. Commit and push the project files to the GitHub repository.
5. Enable the necessary GitHub Actions or CI/CD workflows for automated testing and deployment.
