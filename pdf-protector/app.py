from flask import Flask, request, send_file
from PyPDF2 import PdfReader, PdfWriter
import os
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS - Fixed the origin URL (removed trailing slash)
CORS(app, resources={
    r"/upload": {
        "origins": ["https://file-converter-new.netlify.app"],
        "methods": ["POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Add OPTIONS method handling
@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return '', 200
        
    # Get the uploaded file and password from the request
    file = request.files.get('pdfFile')
    password = request.form.get('password', 'defaultPassword')

    if not file:
        return 'No file uploaded.', 400

    try:
        # Create uploads directory if it doesn't exist
        os.makedirs('uploads', exist_ok=True)

        # Save the uploaded PDF to a temporary file
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)

        # Apply password protection to the PDF
        protected_pdf_path = os.path.join('uploads', f'protected_{file.filename}')
        apply_pdf_password(file_path, protected_pdf_path, password)

        # Send the protected PDF back as a download
        response = send_file(
            protected_pdf_path,
            as_attachment=True,
            download_name=f'protected_{file.filename}',
            mimetype='application/pdf'
        )

        # Add CORS headers to the response
        response.headers.add('Access-Control-Allow-Origin', 'https://file-converter-new.netlify.app')
        
        # Clean up: Delete the protected file after sending
        os.remove(protected_pdf_path)
        
        return response

    except Exception as e:
        # Clean up in case of errors
        if os.path.exists(file_path):
            os.remove(file_path)
        if os.path.exists(protected_pdf_path):
            os.remove(protected_pdf_path)
        return str(e), 500

def apply_pdf_password(input_pdf_path, output_pdf_path, password):
    try:
        reader = PdfReader(input_pdf_path)
        writer = PdfWriter()

        # Add all pages to the writer object
        for page in reader.pages:
            writer.add_page(page)

        # Encrypt the PDF with the provided password
        writer.encrypt(password)

        # Write the protected PDF to a new file
        with open(output_pdf_path, 'wb') as output_file:
            writer.write(output_file)

    finally:
        # Clean up: Delete the original uploaded file
        if os.path.exists(input_pdf_path):
            os.remove(input_pdf_path)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
