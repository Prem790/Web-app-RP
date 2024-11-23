import React, { useState } from "react";
import axios from "axios";

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [fileMetadata, setFileMetadata] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState("wordToPdf");

  const resetStates = () => {
    setFile(null);
    setFileMetadata(null);
    setPassword("");
    setError("");
    setSuccess("");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetStates();
  };

  const validateFile = (fileToValidate) => {
    if (!fileToValidate) return false;
    if (activeTab === "wordToPdf") {
      return fileToValidate.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    return fileToValidate.type === "application/pdf";
  };

  const handleFileChange = async (fileInput) => {
    if (!fileInput) {
      setError("Please select a file.");
      setFile(null);
      return;
    }

    if (!validateFile(fileInput)) {
      setError(
        activeTab === "wordToPdf"
          ? "Please select a valid Word (.docx) file."
          : "Please select a valid PDF file."
      );
      setFile(null);
      return;
    }

    // Create FormData and append file
    const formData = new FormData();
    formData.append('file', fileInput);

    try {
      // Call metadata endpoint
      const response = await axios.post('https://web-app-rp-testing.onrender.com/metadata', formData);
      setFileMetadata(response.data);
    } catch (err) {
      console.error('Error fetching metadata:', err);
      // Continue without metadata if there's an error
    }

    setFile(fileInput);
    setError("");
    setSuccess("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileChange(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    if (activeTab === "pdfProtect" && !password) {
      setError("Please enter a password for the PDF.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    if (activeTab === "wordToPdf") {
      formData.append("file", file);
    } else {
      formData.append("pdfFile", file);
      formData.append("password", password);
    }

    try {
      const endpoint =
        activeTab === "wordToPdf"
          ? "https://web-app-rp-testing.onrender.com/convert"
          : "https://web-app-rp-pdf-protector-python.onrender.com/upload";

      const response = await axios.post(endpoint, formData, {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
        validateStatus: function (status) {
          return status < 500;
        },
      });

      if (response.status === 400) {
        const errorText = await new Response(response.data).text();
        throw new Error(errorText || "Bad request - please check your input");
      }

      const fileName =
        activeTab === "wordToPdf"
          ? `${file.name.replace(".docx", "")}_converted.pdf`
          : `${file.name.replace(".pdf", "")}_protected.pdf`;

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(
        activeTab === "wordToPdf"
          ? "File successfully converted! Download started."
          : "PDF successfully protected! Download started."
      );
      setFile(null);
      setPassword("");
    } catch (err) {
      console.error("Error details:", err);
      let errorMessage = "An unexpected error occurred.";
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Invalid request. Please check your file and password.";
        } else if (err.response.status === 413) {
          errorMessage = "File is too large. Please try a smaller file.";
        }
      } else if (err.request) {
        errorMessage = "No response from server. Please try again later.";
      } else {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white mb-2">
            File Converter & Protector
          </h1>
          <p className="text-indigo-100 text-center text-sm md:text-base">
            Convert Word documents to PDF or protect your PDF files with encryption
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleTabChange("wordToPdf")}
              className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "wordToPdf"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Word to PDF
            </button>
            <button
              type="button"
              onClick={() => handleTabChange("pdfProtect")}
              className={`px-6 py-3 rounded-xl text-sm md:text-base font-medium transition-all ${
                activeTab === "pdfProtect"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Protect PDF
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* File Upload Area */}
              <div className="flex-grow">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all h-full min-h-[200px] flex items-center justify-center ${
                    isDragOver
                      ? "border-indigo-400 bg-indigo-50"
                      : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="file"
                    id="fileInput"
                    accept={activeTab === "wordToPdf" ? ".docx" : ".pdf"}
                    onChange={(e) => handleFileChange(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="fileInput" className="cursor-pointer w-full">
                    <div className="flex flex-col items-center gap-4">
                      {file ? (
                        <div className="text-indigo-600 font-medium break-all">
                          {file.name}
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-indigo-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              />
                            </svg>
                          </div>
                          <p className="text-lg font-medium text-gray-700">
                            Drag and drop your file here
                          </p>
                          <p className="text-sm text-gray-500">
                            or{" "}
                            <span className="text-indigo-600 hover:text-indigo-700">
                              browse files
                            </span>
                          </p>
                          <p className="text-xs text-gray-400">
                            {activeTab === "wordToPdf"
                              ? "Accepts .docx files"
                              : "Accepts PDF files"}
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Metadata Section */}
              {file && activeTab === "wordToPdf" && (
                <div className="lg:w-1/3 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    File Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-sm text-gray-800 break-all">
                        {file.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-sm text-gray-800">{file.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Size</p>
                      <p className="text-sm text-gray-800">
                        {fileMetadata ? fileMetadata.size : `${(file.size / 1024).toFixed(2)} KB`}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Date Created
                      </p>
                      <p className="text-sm text-gray-800">
                        {fileMetadata ? new Date(fileMetadata.createdDate).toLocaleString() : 'Fetching...'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Password Input for PDF Protection */}
            {activeTab === "pdfProtect" && (
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter password to protect PDF"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all pl-10"
                    minLength="4"
                    required
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 ml-2">
                  Password must be at least 4 characters long
                </p>
              </div>
            )}

            {/* Status Messages */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center font-medium">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-indigo-700 hover:to-violet-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Convert Now"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileConverter;
