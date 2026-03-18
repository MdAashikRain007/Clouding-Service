import React, { useState } from 'react';
import DashboardLayout from '../layout/DeshboardLayout';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { apiEndpoints } from '../util/apiEndpoints';
import { useCredits } from '../context/CreditsContext';
import { Upload as UploadIcon, File, AlertCircle } from 'lucide-react';

function Upload() {
  const { getToken } = useAuth();
  const { credits, fetchCredits } = useCredits();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState([]);

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error('Select at least one file');
      return;
    }

    // client-side size check (matches backend limit)
    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    for (const f of files) {
      if (f.size > MAX_SIZE) {
        toast.error(`File ${f.name} is too large; limit is 50MB`);
        return;
      }
    }

    const formData = new FormData();
    for (const f of files) {
      formData.append('files', f);
    }

    setUploading(true);
    try {
      const token = await getToken();
      const res = await axios.post(apiEndpoints.UPLOAD_FILES, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Upload succeeded');
      setUploaded(res.data.files || []);
      fetchCredits();
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Upload">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2">Upload Files</h1>
            <p className="text-sm sm:text-base text-gray-600">Share your files securely with others</p>
          </div>

          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 transition p-12">
            <div className="text-center">
              <UploadIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <label className="block">
                <span className="text-xl font-semibold text-gray-900 mb-2 block">
                  Click to upload or drag and drop
                </span>
                <span className="text-gray-600">
                  Any file type (images, videos, documents, etc.) up to 50 MB each
                </span>
                <input
                  type="file"
                  multiple
                  accept="*/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* File Input with styling */}
          <div className="mt-6">
            <input
              type="file"
              multiple
              accept="*/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {/* Upload Button and Credits */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="inline-block animate-spin mr-2">⏳</span>
                  Uploading...
                </>
              ) : (
                'Upload Files'
              )}
            </button>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-900">
                {credits ?? 0} Credits Available
              </span>
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploaded.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <File className="w-5 h-5 text-green-600" />
                Recently Uploaded Files
              </h2>
              <ul className="space-y-2">
                {uploaded.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-gray-900 font-medium">{f.name}</span>
                    <span className="ml-auto text-sm text-green-600 font-semibold">✓ Uploaded</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Upload;