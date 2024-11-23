# **PDF Protector & File Converter**

A **multi-functional web application** for managing PDFs and file conversions. This project allows users to securely encrypt PDF files with a password, convert files between formats, and interact with a modern, responsive React-based UI. Built using Flask, Node.js, React, and Docker, it is designed for ease of use and flexibility.

---

## **Features**

- **Password Protection for PDFs**  
  Encrypt PDF files with a password and download the protected version.
  
- **File Conversion**  
  Convert files between different formats, such as DOCX to PDF.

- **Modern UI/UX**  
  Built with React and styled with TailwindCSS, providing a clean, responsive interface.

- **API Integration**  
  Efficient backend API for file handling and processing.

- **Docker Support**  
  Deploy all services easily with Docker.

---

## **Technologies Used**

- **Frontend:** React.js, TailwindCSS  
- **Backend:** Flask (Python), Node.js (JavaScript)  
- **DevOps:** Docker, Docker Compose  
- **Utilities:** PyPDF2 for PDF handling, multer for file uploads.

---

## **How to Run the Project Locally**

### **Prerequisites**

Ensure the following are installed on your system:
- **Node.js** (v16 or above)
- **Python 3.x** and **pip**
- **Docker** and **Docker Compose** (for Docker-based setup)

---

### **Step-by-Step Local Setup**

#### **1. Clone the Repository**
```bash
git clone <repository-url>
cd <repository-folder>
2. Set Up Flask Backend (PDF Protection)
Navigate to the backend folder:
bash
Copy code
cd pdf-protector
Create a virtual environment and activate it:
bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
Install required dependencies:
bash
Copy code
pip install -r requirements.txt
Start the Flask server:
bash
Copy code
python app.py
Flask server will run at http://127.0.0.1:5001.
3. Set Up Node.js Backend (File Conversion)
Navigate to the Node.js backend folder:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Start the Node.js server:
bash
Copy code
npm start
Node.js server will run at http://127.0.0.1:5002.
4. Set Up React Frontend
Navigate to the React client folder:
bash
Copy code
cd ui-testing/client
Install dependencies:
bash
Copy code
npm install
Start the React development server:
bash
Copy code
npm start
React app will be available at http://localhost:3000.
Endpoints
Flask Backend Endpoints
1. Protect PDF
URL: /upload
Method: POST
Description: Protects a PDF file with a password.
Request:
Form Data:
pdfFile (file): The PDF file to encrypt.
password (string): The desired password (optional; default: "defaultPassword").
Response:
The encrypted PDF file as a download.
Example cURL Command:
bash
Copy code
curl -X POST -F "pdfFile=@sample.pdf" -F "password=secure123" http://localhost:5001/upload -o protected_sample.pdf
Node.js Backend Endpoints
1. Convert File
URL: /convert
Method: POST
Description: Converts a file from one format to another.
Request:
Form Data:
inputFile (file): The file to convert.
targetFormat (string): Desired output format.
Response:
The converted file as a download.
Example cURL Command:
bash
Copy code
curl -X POST -F "inputFile=@document.docx" -F "targetFormat=pdf" http://localhost:5002/convert -o document.pdf
Running with Docker
Step-by-Step Guide
1. Build Docker Images
bash
Copy code
docker build -f Dockerfile-flask -t pdf-protector-backend ./pdf-protector
docker build -f Dockerfile-node -t file-converter-backend ./backend
docker build -f Dockerfile -t react-frontend ./ui-testing/client
2. Run Docker Containers
bash
Copy code
docker run -d -p 5001:5001 pdf-protector-backend
docker run -d -p 5002:5002 file-converter-backend
docker run -d -p 3000:3000 react-frontend
3. Access the Application
Flask API: http://localhost:5001
Node.js API: http://localhost:5002
React Client: http://localhost:3000
Using Docker Compose
Make sure your docker-compose.yml is set up:
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
  node-app:
    build:
      context: ./backend
      dockerfile: Dockerfile-node
    ports:
      - "5002:5002"
  react-client:
    build:
      context: ./ui-testing/client
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
Start all services:
bash
Copy code
docker-compose up --build
Using the Bash Script
Save the following as run-services.sh:

bash
Copy code
#!/bin/bash

echo "Starting Flask Backend..."
docker run -d -p 5001:5001 pdf-protector-backend

echo "Starting Node.js Backend..."
docker run -d -p 5002:5002 file-converter-backend

echo "Starting React Frontend..."
docker run -d -p 3000:3000 react-frontend
Make it executable:

bash
Copy code
chmod +x run-services.sh
Run the script:

bash
Copy code
./run-services.sh
Folder Structure
php
Copy code
project/
├── pdf-protector/          # Flask backend
│   ├── app.py
│   ├── requirements.txt
├── backend/                # Node.js backend
│   ├── index.js
│   ├── package.json
├── ui-testing/
│   ├── client/             # React frontend
│       ├── src/
│       ├── public/
├── docker-compose.yml      # Docker Compose configuration
├── run-services.sh         # Bash script to run services
Contributing
Fork the repository.
Create a new branch: git checkout -b feature-name.
Commit changes: git commit -m "Add feature".
Push to the branch: git push origin feature-name.
Submit a pull request.
