# NodeAPIProject-Shop

## Project Overview

NodeAPIProject-Shop is a comprehensive backend system designed for managing an online dress shop. This project includes user management, product inventory management, order processing, and robust analytics for sales tracking. The system supports various user roles, such as guests, registered users, and admins, each with specific permissions and capabilities.

## Features

### User Management

- **User roles**: Guest, Registered User, Admin.
- **JWT-based authentication**.
- **Secure password storage** with bcrypt.
- **User profiles and cart management**.

### Product Management

- **Product catalog** with detailed attributes: title, subtitle, description, price, size (S, M, L), and images.
- **Stock management** with options to update quantities.
- **Integration with order processing** to adjust stock levels dynamically.

### Order Processing

- **Create, cancel, and retrieve orders**.
- **Automatic stock adjustment** based on order status.
- **Detailed order information** including product details and total amount.

### Analytics

- **Sales tracking** by date, product, and status.
- **Top-selling products** with revenue details.
- **Admin dashboard** for comprehensive sales and inventory insights.

## Technologies and Libraries Used

- **Node.js**: Runtime environment for executing JavaScript code server-side.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB.
- **bcrypt**: Hashing user passwords for secure storage.
- **jsonwebtoken**: Generating and verifying JSON Web Tokens (JWT) for authentication.
- **Joi**: Validating user input.
- **morgan**: HTTP request logger.
- **dotenv**: Loading environment variables.
- **underscore**: Utility library for JavaScript.
- **TypeScript**: Typed superset of JavaScript.
- **tsx**: Running TypeScript in Node.js.

## API Documentation

For detailed API documentation, including all endpoints, request methods, and parameters, please refer to the following Postman Documentation links:

1. [Analyze](https://documenter.getpostman.com/view/34977997/2sA3dvkYZF)
2. [Orders](https://documenter.getpostman.com/view/21331452/2sA3dvksRv)
3. [Products](https://documenter.getpostman.com/view/21331452/2sA3dxCB1i)
4. [Users](https://documenter.getpostman.com/view/21331452/2sA3dvmDXE)

## Future Enhancements

- Further development of the analytics system for more comprehensive sales tracking.
- Adding more user roles and permissions.
- Enhancing the product and order management features.
