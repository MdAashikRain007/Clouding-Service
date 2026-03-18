import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../util/apiEndpoints';

function PublicFileView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(apiEndpoints.PUBLIC_FILE(id));
        setFile(res.data);
      } catch (err) {
        console.error(err);
        setError('File not found or not public');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  // simple preview for images/videos/audio
  const renderPreview = () => {
    if (!file) return null;
    const extension = file.name.split('.').pop().toLowerCase();
    const url = apiEndpoints.DOWNLOAD_FILE_INLINE(file.id);
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <img src={url} alt={file.name} className="max-w-full max-h-96" />;
    }
    if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
      return <video src={url} controls className="max-w-full max-h-96" />;
    }
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <audio src={url} controls />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <button
          onClick={() => window.history.back()}
          className="mb-4 text-sm text-blue-600 hover:underline"
        >
          &larr; Back
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">{file.name}</h2>
        <p className="text-sm text-gray-500 mb-2">
          Size: {(file.size / 1024).toFixed(2)} KB
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Uploaded: {new Date(file.uploadedAt).toLocaleString()}
        </p>
        <div className="mb-4">{renderPreview()}</div>
        <a
          href={apiEndpoints.DOWNLOAD_FILE(file.id)}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download
        </a>
      </div>
    </div>
  );
}

export default PublicFileView;