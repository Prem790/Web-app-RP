PDF Protector & File Converter
A multi-functional web application for handling PDFs and files securely. This project features password protection for PDFs, a file converter, and a responsive React frontend for a seamless user experience. Powered by Flask, Node.js, React, and Docker, this app is designed for flexibility and ease of use.

Features
PDF Protection
Upload a PDF, add a password, and download a protected version.

File Conversion
Convert files between formats (e.g., PDF to other formats or vice versa).

Modern UI/UX
React-based frontend styled with TailwindCSS, offering a sleek and responsive user interface.

API Integration
Efficient backend API handling for file operations.

Docker Support
Easily deploy and manage services using Docker containers.

Technologies Used
Frontend: React.js, TailwindCSS
Backend: Flask, Node.js
Database: Local storage for file handling
DevOps: Docker and Docker Compose
Endpoints
Flask Backend (PDF Protection)
1. Protect PDF
URL: /upload
Method: POST
Description: Protects a PDF with a password.
Request:
Form Data:
pdfFile (file): The PDF file to be protected.
password (string): The password for encryption (optional, defaults to "defaultPassword").
Response:
Protected PDF file as a download.
Example with cURL:
bash
Copy code
curl -X POST -F "pdfFile=@sample.pdf" -F "password=mysecurepassword" http://localhost:5001/upload -o protected_sample.pdf
Node.js Backend (File Conversion)
1. Convert File
URL: /convert
Method: POST
Description: Converts files from one format to another.
Request:
Form Data:
inputFile (file): The file to be converted.
targetFormat (string): Desired output format.
Response:
Converted file as a download.
Example with cURL:
bash
Copy code
curl -X POST -F "inputFile=@sample.docx" -F "targetFormat=pdf" http://localhost:5002/convert -o sample.pdf
Frontend (React)
URL: http://localhost:3000
Description: React client for interacting with the API endpoints and managing file uploads/downloads.
How to Run the Project
1. Running Locally
Prerequisites
Install Node.js, Python 3.x, pip, and Docker.
Ensure docker and docker-compose are properly configured.
Steps
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Setup Flask Backend:

bash
Copy code
cd pdf-protector
python -m venv venv
source venv/bin/activate  # Use `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python app.py
Setup Node.js Backend:

bash
Copy code
cd backend
npm install
npm start
Setup React Frontend:

bash
Copy code
cd ui-testing/client
npm install
npm start
2. Running with Docker
Steps
Build Docker images:

bash
Copy code
docker build -f Dockerfile-flask -t file-converter-flask ./pdf-protector
docker build -f Dockerfile-node -t file-converter-node ./pdf-protector
docker build -f Dockerfile -t testing-server ./testing/server
docker build -f Dockerfile -t react-client ./ui-testing/client
Push Docker images (optional for Docker Hub):

bash
Copy code
docker tag file-converter-flask <dockerhub-username>/file-converter-flask
docker push <dockerhub-username>/file-converter-flask
# Repeat for other images
Run services:

bash
Copy code
docker run -d -p 5001:5001 file-converter-flask
docker run -d -p 5002:5002 file-converter-node
docker run -d -p 5000:5000 testing-server
docker run -d -p 3000:3000 react-client
3. Using Docker Compose
Ensure docker-compose.yml is configured:

yaml
Copy code
version: "3.8"
services:
  flask-app:
    build:
      context: ./pdf-protector
      dockerfile: Dockerfile-flask
    ports:
      - "5001:5001"
    volumes:
      - ./pdf-protector/uploads:/app/uploads
  node-backend:
    build:
      context: ./pdf-protector
      dockerfile: Dockerfile-node
    ports:
      - "5002:5002"
    volumes:
      - ./pdf-protector/backend/uploads:/app/uploads
  testing-server:
    build:
      context: ./testing/server
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./testing/server/uploads:/app/uploads
  react-client:
    build:
      context: ./ui-testing/client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
Start all services:

bash
Copy code
docker-compose up --build
Access the app:

Flask Backend: http://localhost:5001
Node.js Backend: http://localhost:5002
React Frontend: http://localhost:3000
4. Using the Bash Script
Save the script as run-services.sh:

bash
Copy code
chmod +x run-services.sh
./run-services.sh
The script will start and stop services one by one. Follow the prompts.

Folder Structure
php
Copy code
project-folder/
├── pdf-protector/
│   ├── app.py           # Flask app for PDF protection
│   ├── requirements.txt # Python dependencies
├── backend/
│   ├── index.js         # Node.js server for file conversion
│   ├── package.json     # Node.js dependencies
├── ui-testing/
│   └── client/
│       ├── src/         # React components
│       ├── public/      # React public files
├── testing/
│   └── server/
│       ├── Dockerfile   # Docker setup for testing server
├── docker-compose.yml   # Compose configuration
└── run-services.sh      # Bash script for running services
Contributing
Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit your changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Submit a pull request.
