# Motor Backend API

A Node.js backend API built with Express.js and TypeScript, providing comprehensive motor services management.

## Features

- **User Authentication & Authorization**: JWT-based authentication with role-based access control
- **Multi-language Support**: Arabic and English content management
- **File Upload**: Image and media file handling with Multer
- **RESTful API**: Clean and organized API endpoints
- **TypeScript**: Full TypeScript implementation with type safety
- **MongoDB**: Mongoose ODM for database operations

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Development**: ts-node-dev for hot reloading

## Project Structure

```
src/
├── Controllers/          # Business logic controllers
├── Middleware/          # Custom middleware (auth, validation)
├── Models/              # Mongoose data models
├── Routes/              # API route definitions
├── app.ts              # Express app configuration
└── index.ts            # Application entry point
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mostfaswaisi93/motor-be.git
cd motor-be
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure your environment variables in `.env`:
```env
DB_URL=mongodb://localhost:27017/motor-be
PORT=3000
SECRET_KEY=your-secret-key-here
```

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Running Production Build
```bash
npm start
```

### Clean Build Directory
```bash
npm run clean
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/changePassword` - Change user password

### Users
- `GET /user/profile/:id` - Get user by ID
- `POST /user/profile` - Create new user
- `PUT /user/profile` - Update user profile
- `DELETE /user/profile/:id` - Delete user

### General Content
- `GET /general/header` - Get header content
- `PUT /general/header` - Update header content
- `GET /general/socialMedia` - Get social media links
- `PUT /general/socialMedia` - Update social media links
- `GET /general/contactUs` - Get contact information
- `PUT /general/contactUs` - Update contact information
- `GET /general/whoWeAre` - Get company information
- `PUT /general/whoWeAre` - Update company information
- `GET /general/whatDoWeApply` - Get services description
- `PUT /general/whatDoWeApply` - Update services description
- `GET /general/ourGoals` - Get company goals
- `PUT /general/ourGoals` - Update company goals
- `GET /general/ourCommitments` - Get company commitments
- `PUT /general/ourCommitments` - Update company commitments

### Services
- `GET /service` - Get all services
- `POST /service` - Create new service
- `PUT /service` - Update service
- `GET /service/:id` - Get service by ID
- `DELETE /service/:id` - Delete service
- `POST /service/question` - Add question to service
- `PUT /service/question` - Update service question
- `DELETE /service/question/:serviceId/:questionId` - Delete service question
- `GET /service/getServiceQuestions/:serviceId` - Get service questions

### Management
- `GET /management/getGeneralManagement` - Get general management
- `GET /management/getManagementsForService/:serviceId` - Get service management
- `POST /management` - Create new management
- `PUT /management` - Update management
- `DELETE /management/:id` - Delete management

## Database Models

### User
- Email, password, first name, last name
- Username and admin role support
- Timestamps for creation and updates

### Service
- Multi-language title and description
- Logo and media files
- WhatsApp link
- Questions and answers
- Management references

### Management
- General and service-specific types
- Multi-language title and description
- Contact information (phone, email)
- Image support
- Service association

### General
- Header content (logo, title, description, question, media)
- Social media links
- Contact information
- Company information (who we are, what we do, goals, commitments)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC License

## Author

[Your Name]

## Support

For support and questions, please open an issue on GitHub.
