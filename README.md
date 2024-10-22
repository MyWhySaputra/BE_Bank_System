# REST API Bank System

## Features
- **User Registration and Login**: Secure user authentication with JWT.
- **Balance Management**: Check balance, top-up, and transfer money between accounts.
- **Transaction History**: Track all transactions for each user.
- **Profile Management**: Update user profile and profile image.
- **Email Notifications**: Send emails to users for specific actions (e.g., registration or transaction notifications).

## Technologies Used
- **Node.js**: JavaScript runtime used to build the backend.
- **Express.js**: Web framework for Node.js used to create the RESTful API.
- **PostgreSQL**: SQL database for storing user data, balances, and transaction history.
- **Prisma**: ORM used to interact with the PostgreSQL database.
- **Nodemailer**: Service for sending transactional emails (e.g., registration confirmation, password reset).
- **Nodemon**: Development tool that automatically restarts the server when file changes are detected.
- **EJS**: Templating engine for rendering dynamic content in email templates.
- **Multer**: Middleware for handling file uploads.
- **Joi**: Library for input validation (used for validating registration, login, and file uploads).
- **JWT (JSON Web Tokens)**: Used for user authentication and securing API routes.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Imagekit**: Cloud-based image optimization and storage service used for uploading and managing profile images.
- **Morgan**: HTTP request logger middleware used for logging requests to the server for debugging and monitoring.
- **Swagger**: API documentation tool that allows you to describe your RESTful API and provides an interactive UI to test the endpoints.

## Installation

To set up and run the API locally, ensure you have **Node.js** and **PostgreSQL** installed, then follow these steps:

### Clone the Repository:
```bash
git clone https://github.com/MyWhySaputra/BE_Bank_System
cd BE_Bank_System
```

### Install Dependencies:
```bash
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the root directory and add your database credentials and JWT secret:
```bash
PORT=3000
BASE_URL=http://localhost:3000
SALT_ROUND=10
SECRET_KEY=your_jwt_secret_key
EMAIL_SMTP=smtp.your-email-provider.com
PASS_SMTP=your_email_password
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
DATABASE_URL=postgres://user:password@localhost:5432/your_database
```

### Migrate the Database:
Run the following command to create the necessary database tables:
```bash
npm run migrate
```

### Run the Project:
To run the server in development mode:
```bash
npm run dev
```

## API Documentation
The API documentation is available using **Swagger**. Once the server is running, you can access it at `http://localhost:3000/api-docs` to view and test the endpoints.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request if you'd like to improve the project.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, feel free to reach out via email at [wahyusaputra222000@gmail.com].
