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
