import React, { useEffect, useState } from 'react'
import DashboardLayout from '../layout/DeshboardLayout'
import { Grid, List, File, Globe, Lock, Copy, Download, Trash2, Eye, Image, Video, Music, FileText, FileIcon } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react'
import axios from "axios"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import FileCard from '../component/FileCard'
import { apiEndpoints } from '../util/apiEndpoints'
import ConfirmationDialog from '../component/ConfirmationDialog'

function MyFiles() {

  const [files, setFiles] = useState([])
  const [viewMode, setViewMode] = useState("list")
  const { getToken } = useAuth()
  const navigate = useNavigate()
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    fileID: null
  })

  // ================= FILES EXTENSION =================
  const getFileIcon = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <Image size={24} className="text-purple-500" />
    }
    if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
      return <Video size={24} className="text-blue-500" />
    }
    if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <Music size={24} className="text-green-500" />
    }
    if (['pdf', 'doc', 'txt', 'rtf', 'docx'].includes(extension)) {
      return <FileText size={24} className="text-amber-500" />
    }

    return <FileIcon size={24} className='text-purple-500' />
  }

  // ================= FETCH FILES =================
  const fetchFiles = async () => {

    try {

      const token = await getToken()

      const response = await axios.get(
        apiEndpoints.FETCH_FILES,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status === 200) {
        setFiles(response.data)
      }

    } catch (error) {

      console.log("Error fetching files:", error)
      toast.error("Error fetching files from server")

    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchFiles();
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ================= TOGGLE THE PUBLIC / PRIVATE STATUS OF A FILE =================


  const togglePublic = async (fileToUpdate) => {
    try {
      const token = await getToken();
      await axios.patch(apiEndpoints.TOGGLE_FILE(fileToUpdate.id), {}, { headers: { Authorization: `Bearer ${token}` } });
      setFiles(files.map((file) => file.id === fileToUpdate.id ? { ...file, isPublic: !file.isPublic } : file))
      toast.success(`File marked ${fileToUpdate.isPublic ? 'private' : 'public'}`);
    } catch (error) {
      console.error("Error toggling file status", error);
      toast.error('Error toggling file status');
    }
  }

  // ================= COPY SHARE LINK =================
  const copyShareLink = (id) => {
    const url = `${window.location.origin}/file/${id}`;
    navigator.clipboard.writeText(url);
    toast.success("Share link copied!");
  }

  // ================= DOWNLOAD FILE =================
  const handleDownload = async (file) => {

    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoints.DOWNLOAD_FILE(file.id), { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' });
      //create a blob url and toggle download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed ", error);
      toast.error("Error downloading file ", error);

    }



  }
  // ================= DELETE CLOSE =================
  const openDeleteDialog = (id) => {
    setDeleteConfirmation({ isOpen: true, fileID: id });
  };

  const closeDeleteDialog = () => {
    setDeleteConfirmation({ isOpen: false, fileID: null });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.fileID) {
      await deleteFile(deleteConfirmation.fileID);
      closeDeleteDialog();
    }
  };

  // ================= DELETE FILE =================
  const deleteFile = async (id) => {

    try {

      const token = await getToken()

      await axios.delete(
        `http://localhost:8080/api/v1.0/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      toast.success("File deleted")

      fetchFiles()

    } catch (error) {

      console.log(error)

      toast.error("Error deleting file")

    }

  }

  return (
    <DashboardLayout activeMenu="My Files">

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-6 md:p-8">

        {/* HEADER */}
        <div className='mb-6 sm:mb-8'>

          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
            <div>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 sm:mb-2'>
                My Files
              </h1>
              <p className='text-sm sm:text-base text-gray-600'>
                {files.length} file{files.length !== 1 ? 's' : ''} stored
              </p>
            </div>

            <div className='flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1 self-start sm:self-auto'>

              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition ${viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                title="List view"
              >
                <List size={20} />
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition ${viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                  }`}
                title="Grid view"
              >
                <Grid size={20} />
              </button>

            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {files.length === 0 ? (

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex flex-col items-center">

            <File size={60} className="text-gray-300 mb-4" />

            <h3 className='text-xl font-medium text-gray-700 mb-2'>
              No files uploaded yet
            </h3>

            <p className="text-gray-500 text-center max-w-md mb-6">
              Start uploading files to see them listed here.
            </p>

            <button
              onClick={() => navigate('/upload')}
              className='px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold transition'
            >
              Upload Your First File
            </button>

          </div>

        ) : viewMode === "grid" ? (

          /* GRID VIEW */

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onTogglePublic={() => togglePublic(file)}
                onDownload={() => handleDownload(file)}
                onDelete={() => openDeleteDialog(file.id)}
                onShare={() => copyShareLink(file.id)}
              />
            ))}
          </div>

        ) : (

          /* LIST VIEW */

          <div className='overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200'>

            <table className='min-w-full'>

              <thead className='bg-gray-50 border-b border-gray-200'>

                <tr>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Name
                  </th>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Size
                  </th>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Uploaded
                  </th>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Sharing
                  </th>

                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {files.map(file => (

                  <tr key={file.id} className='border-b hover:bg-gray-50 transition'>

                    <td className='px-6 py-4'>
                      <div className="flex items-center gap-3">
                        {getFileIcon(file)}
                        <span className='font-medium text-gray-900'>{file.name}</span>
                      </div>
                    </td>

                    <td className='px-6 py-4 text-gray-600'>
                      {(file.size / 1024).toFixed(2)} KB
                    </td>

                    <td className='px-6 py-4 text-gray-600'>
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </td>

                    <td className='px-6 py-4'>
                      <button
                        onClick={() => togglePublic(file)}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition"
                        style={{
                          backgroundColor: file.isPublic ? '#dcfce7' : '#f3f4f6',
                          color: file.isPublic ? '#15803d' : '#6b7280'
                        }}
                      >

                        {file.isPublic ? (

                          <>
                            <Globe size={14} />
                            <span>Public</span>
                          </>

                        ) : (

                          <>
                            <Lock size={14} />
                            <span>Private</span>
                          </>

                        )}

                      </button>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex gap-3'>

                        {/* SHARE */}
                        {file.isPublic && (

                          <button
                            onClick={() => copyShareLink(file.id)}
                            title="Share this file"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-md transition"
                          >
                            <Copy size={18} />
                          </button>

                        )}

                        {/* DOWNLOAD */}
                        <button
                          title="Download"
                          onClick={() => handleDownload(file)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 p-2 rounded-md transition"
                        >
                          <Download size={18} />
                        </button>

                        {/* VIEW */}
                        {file.isPublic && (
                          <a href={`/file/${file.id}`} title="View File" target="_blank" rel="noreferrer" className='text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 rounded-md transition'>
                            <Eye size={18} />
                          </a>
                        )}

                        {/* DELETE */}
                        <button
                          title="Delete"
                          onClick={() => openDeleteDialog(file.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}
        {/* confirmation dailog */}
        <ConfirmationDialog
          isOpen={deleteConfirmation.isOpen}
          onClose={closeDeleteDialog}
          title="Delete File"
          message="Are you sure you want to delete this file? This action cannot be undone"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDelete}
          confirmationButtonClass="bg-red-600 hover:bg-red-700"
        />

      </div>

    </DashboardLayout>
  )
}

export default MyFiles