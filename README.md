# EventPro - Event Registration System

A professional event registration system built with Node.js, Express, and MongoDB. The system features a modern UI, QR code generation, and email notifications.

## Features

- 🎯 Modern, responsive user interface
- 📧 Automated email confirmations with QR codes
- 📱 Mobile-friendly design
- 🔐 Secure form handling
- 📊 MongoDB database integration
- 🎨 Beautiful UI with animations
- 📱 QR code generation for event check-in

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for sending emails)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd event-reg-system
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
DB_NAME=your_database_name
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password
```

Note: For Gmail, you need to use an App Password. To generate one:
1. Enable 2-Step Verification in your Google Account
2. Go to Security → App Passwords
3. Generate a new app password for "Mail"

## Running the Application

1. Start the server:
```bash
node app.js
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
event-reg-system/
├── public/
│   ├── index.html      # Main registration form
│   └── success.html    # Success page
├── app.js             # Main application file
├── .env              # Environment variables
└── README.md         # This file
```

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3
  - Bootstrap 5
  - Font Awesome
  - Custom animations

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Nodemailer
  - QRCode

## Email Configuration

The system uses Gmail SMTP with the following settings:
- Host: smtp.gmail.com
- Port: 587
- Security: TLS
- Authentication: Gmail App Password

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Bhikesh Khute**
- Email: bhikeshkhute10.3@gmail.com

## Acknowledgments

- Bootstrap for the responsive design framework
- Font Awesome for the icons
- Nodemailer for email functionality
- QRCode for QR code generation

## Docker Setup

### Building and Running with Docker Compose
The easiest way to run the application is using Docker Compose, which will set up both the application and MongoDB:

```bash
# Build and start the containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the containers
docker-compose down
```

### Manual Docker Setup
If you prefer to run containers individually:

1. Build the application image:
```bash
docker build -t eventpro .
```

2. Run MongoDB:
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  -e MONGO_INITDB_DATABASE=registrations \
  mongo:latest
```

3. Run the application:
```bash
docker run -d \
  -p 3000:3000 \
  -e PORT=3000 \
  -e MONGO_URI=mongodb://mongodb:27017/registrations \
  -e DB_NAME=registrations \
  -e GMAIL_USER=your_email \
  -e GMAIL_PASS=your_app_password \
  --name eventpro \
  --link mongodb \
  eventpro
```

### MongoDB Configuration
- Database Name: `registrations`
- Port: `27017`
- Data Persistence: Docker volume `mongodb_data`
- Connection String: `mongodb://mongodb:27017/registrations`

#### Database Initialization
The database is automatically initialized with:
- Collection schema validation
- Required fields validation
- Email format validation
- Unique indexes on email and registrationId
- Index on registration date for better query performance

The initialization script (`mongo-init.js`) runs automatically when the MongoDB container is created for the first time.

### Data Persistence
The MongoDB data is persisted using a Docker volume named `mongodb_data`. This ensures that your data remains even if the containers are stopped or removed.

To backup the data:
```bash
# Backup
docker exec mongodb mongodump --out /backup

# Restore
docker exec mongodb mongorestore /backup
```

### Security Best Practices

1. **Environment Variables**:
   - Never commit `.env` files to version control
   - Use `.env.example` as a template
   - Store sensitive data in Docker secrets or environment variables
   - Use Docker secrets for production deployments

2. **Docker Security**:
   - Use multi-stage builds for smaller images
   - Run as non-root user
   - Scan images for vulnerabilities
   - Keep base images updated

3. **CI/CD Security**:
   - Use GitHub Secrets for sensitive data
   - Encrypt sensitive data in CI/CD pipelines
   - Use Docker secrets in production
   - Implement proper access controls
