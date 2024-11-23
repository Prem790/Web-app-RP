# PDF Protector & File Converter

A powerful web application that combines PDF protection and file conversion capabilities. Built with a microservices architecture using Flask, Node.js, and React, this application provides a seamless experience for managing and converting documents.

## Features

### PDF Password Protection
- Encrypt PDF files with custom passwords
- Secure document sharing
- Download protected PDFs instantly

### File Format Conversion
- Convert between multiple file formats
- Support for DOCX to PDF conversion
- Maintain document formatting

### Modern UI/UX
- Responsive design with TailwindCSS
- Intuitive user interface
- Real-time conversion progress
- Drag-and-drop file upload

## Tech Stack

### Frontend
- React.js 18.x
- TailwindCSS 3.x
- Axios for API calls

### Backend
- Flask (Python 3.x)
- Node.js 16+
- PyPDF2 for PDF operations
- Multer for file handling

### DevOps
- Docker & Docker Compose
- Multi-container architecture
- Nginx (optional for production)

## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- Python 3.x
- pip package manager
- Docker and Docker Compose (for containerized setup)
- Git

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/pdf-protector-converter.git
cd pdf-protector-converter
```

### 2. Flask Backend Setup (PDF Protection Service)
```bash
# Navigate to Flask backend directory
cd pdf-protector

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```
The Flask server will run at `http://localhost:5001`

### 3. Node.js Backend Setup (File Conversion Service)
```bash
# Navigate to Node.js backend directory
cd backend

# Install dependencies
npm install

# Start Node.js server
npm start
```
The Node.js server will run at `http://localhost:5002`

### 4. React Frontend Setup
```bash
# Navigate to React client directory
cd ui-testing/client

# Install dependencies
npm install

# Start development server
npm start
```
The React application will be available at `http://localhost:3000`

## Docker Setup

### Using Docker Compose (Recommended)
1. Make sure Docker and Docker Compose are installed
2. Run all services:
```bash
docker-compose up --build
```

### Manual Docker Setup
```bash
# Build images
docker build -f Dockerfile-flask -t web-app-rp-flask-app ./pdf-protector
docker build -f Dockerfile-node -t web-app-rp-node-backend ./backend
docker build -f Dockerfile -t web-app-rp-react-client ./ui-testing/client

# Run containers
docker run -d -p 5001:5001 web-app-rp-flask-app
docker run -d -p 5002:5002 web-app-rp-node-backend
docker run -d -p 3000:3000 web-app-rp-react-client
```

## API Endpoints

### PDF Protection Service (Flask)
```bash
POST /upload
Content-Type: multipart/form-data

Parameters:
- pdfFile: File (PDF to protect)
- password: String (optional, default: "defaultPassword")

Response: Protected PDF file
```

### File Conversion Service (Node.js)
```bash
POST /convert
Content-Type: multipart/form-data

Parameters:
- inputFile: File (File to convert)
- targetFormat: String (Desired output format)

Response: Converted file
```

## Project Structure
```
pdf-protector-converter/
├── pdf-protector/              # Flask backend
│   ├── app.py                 # Main Flask application
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile-flask       # Flask Dockerfile
├── backend/                   # Node.js backend
│   ├── index.js              # Main Node.js application
│   ├── package.json          # Node.js dependencies
│   └── Dockerfile-node       # Node.js Dockerfile
├── ui-testing/
│   └── client/               # React frontend
│       ├── src/              # React source code
│       ├── public/           # Static files
│       └── Dockerfile        # React Dockerfile
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Project documentation
```

## Environment Variables

Create `.env` files in respective directories:

### Flask Backend (.env)
```
FLASK_ENV=development
PORT=5001
SECRET_KEY=your_secret_key
```

### Node.js Backend (.env)
```
NODE_ENV=development
PORT=5002
```

### React Frontend (.env)
```
REACT_APP_FLASK_API_URL=http://localhost:5001
REACT_APP_NODE_API_URL=http://localhost:5002
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
