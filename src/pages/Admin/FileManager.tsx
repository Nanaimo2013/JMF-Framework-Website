import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { withAdmin } from '../../context/AuthContext';
import adminApi, { FileUploadResponse } from '../../services/api/adminApi';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/FileManager.css';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadDate: string;
  category: 'image' | 'document' | 'release' | 'other';
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { addNotification } = useNotification();

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        // Simulate API call with mock data
        setTimeout(() => {
          const mockFiles: FileItem[] = [
            {
              id: '1',
              name: 'screenshot.png',
              size: 1024 * 1024 * 2.3, // 2.3 MB
              type: 'image/png',
              url: 'https://via.placeholder.com/150',
              uploadDate: new Date(Date.now() - 3600000).toISOString(),
              category: 'image'
            },
            {
              id: '2',
              name: 'documentation.pdf',
              size: 1024 * 1024 * 4.1, // 4.1 MB
              type: 'application/pdf',
              url: 'https://example.com/docs.pdf',
              uploadDate: new Date(Date.now() - 86400000).toISOString(),
              category: 'document'
            },
            {
              id: '3',
              name: 'jmf-framework-v2.1.0.zip',
              size: 1024 * 1024 * 15.8, // 15.8 MB
              type: 'application/zip',
              url: 'https://example.com/framework.zip',
              uploadDate: new Date(Date.now() - 172800000).toISOString(),
              category: 'release'
            },
            {
              id: '4',
              name: 'logo.svg',
              size: 1024 * 25, // 25 KB
              type: 'image/svg+xml',
              url: 'https://via.placeholder.com/150',
              uploadDate: new Date(Date.now() - 259200000).toISOString(),
              category: 'image'
            },
            {
              id: '5',
              name: 'config.json',
              size: 1024 * 2, // 2 KB
              type: 'application/json',
              url: 'https://example.com/config.json',
              uploadDate: new Date(Date.now() - 432000000).toISOString(),
              category: 'other'
            }
          ];
          
          setFiles(mockFiles);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to load files', error);
        addNotification('Failed to load files', 'error');
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [addNotification]);

  // File drop functionality
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Mock upload process with progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Add new files to the list
          const newFiles: FileItem[] = acceptedFiles.map((file, index) => {
            const category = getFileCategory(file.type);
            return {
              id: `new-${Date.now()}-${index}`,
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file),
              uploadDate: new Date().toISOString(),
              category
            };
          });
          
          setFiles(prevFiles => [...newFiles, ...prevFiles]);
          setUploading(false);
          addNotification(`${acceptedFiles.length} ${acceptedFiles.length === 1 ? 'file' : 'files'} uploaded successfully`, 'success');
          return 0;
        }
        return newProgress;
      });
    }, 300);
    
  }, [addNotification]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    noClick: false
  });

  // Get file category based on MIME type
  const getFileCategory = (mimeType: string): 'image' | 'document' | 'release' | 'other' => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType === 'application/pdf' || mimeType.includes('document') || mimeType.includes('text/')) return 'document';
    if (mimeType === 'application/zip' || mimeType === 'application/x-tar' || mimeType.includes('compressed')) return 'release';
    return 'other';
  };

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Get file icon based on MIME type or category
  const getFileIcon = (file: FileItem) => {
    if (file.category === 'image') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-icon image">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      );
    }
    
    if (file.category === 'document') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-icon document">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      );
    }
    
    if (file.category === 'release') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-icon release">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      );
    }
    
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-icon other">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
      </svg>
    );
  };

  // Filter and sort files based on user selection
  const filteredAndSortedFiles = files
    .filter(file => {
      // Apply type filter
      if (filterType !== 'all' && file.category !== filterType) return false;
      
      // Apply search query
      if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      }
      
      if (sortBy === 'size') {
        return sortOrder === 'asc' 
          ? a.size - b.size 
          : b.size - a.size;
      }
      
      // Default: sort by date
      return sortOrder === 'asc' 
        ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime() 
        : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });

  // Toggle file selection
  const toggleFileSelection = (id: string) => {
    setSelectedFiles(prev => 
      prev.includes(id) 
        ? prev.filter(fileId => fileId !== id) 
        : [...prev, id]
    );
  };

  // Select/deselect all files
  const toggleSelectAll = () => {
    if (selectedFiles.length === filteredAndSortedFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredAndSortedFiles.map(file => file.id));
    }
  };

  // Delete selected files
  const deleteSelectedFiles = () => {
    if (selectedFiles.length === 0) return;
    
    // In a real app, you would call your API to delete the files
    setFiles(prevFiles => prevFiles.filter(file => !selectedFiles.includes(file.id)));
    addNotification(`${selectedFiles.length} ${selectedFiles.length === 1 ? 'file' : 'files'} deleted`, 'success');
    setSelectedFiles([]);
  };

  return (
    <div className="file-manager">
      <div className="file-manager-header">
        <h1>File Manager</h1>
        <p className="file-manager-subheader">Manage and organize your files</p>
      </div>
      
      <div className="file-manager-toolbar">
        <div className="left-actions">
          <button 
            className={`toolbar-button ${selectedFiles.length > 0 ? 'active' : ''}`}
            onClick={toggleSelectAll}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            <span>{selectedFiles.length === filteredAndSortedFiles.length ? 'Deselect All' : 'Select All'}</span>
          </button>
          
          <button 
            className="toolbar-button danger"
            disabled={selectedFiles.length === 0}
            onClick={deleteSelectedFiles}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span>Delete {selectedFiles.length ? `(${selectedFiles.length})` : ''}</span>
          </button>
        </div>
        
        <div className="right-actions">
          <div className="search-field">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder="Search files..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="filter-type">Type:</label>
            <select 
              id="filter-type" 
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="all">All Files</option>
              <option value="image">Images</option>
              <option value="document">Documents</option>
              <option value="release">Releases</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort-by">Sort:</label>
            <select 
              id="sort-by" 
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="size">Size</option>
            </select>
            <button 
              className="sort-order-button" 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="file-manager-content">
        <div className="file-manager-upload-area">
          <div 
            {...getRootProps()} 
            className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
          >
            <input {...getInputProps()} />
            
            {uploading ? (
              <div className="upload-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                </div>
                <p>{uploadProgress}% Uploading...</p>
              </div>
            ) : isDragActive ? (
              <div className="dropzone-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drop files here to upload</p>
              </div>
            ) : (
              <div className="dropzone-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag & drop files here or click to upload</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="file-list-header">
          <div className="file-checkbox">
            <input 
              type="checkbox" 
              checked={selectedFiles.length === filteredAndSortedFiles.length && filteredAndSortedFiles.length > 0} 
              onChange={toggleSelectAll}
            />
          </div>
          <div className="file-icon-cell"></div>
          <div className="file-name">Name</div>
          <div className="file-type">Type</div>
          <div className="file-size">Size</div>
          <div className="file-date">Upload Date</div>
          <div className="file-actions">Actions</div>
        </div>
        
        {isLoading ? (
          <div className="file-list-loading">
            <div className="loading-spinner"></div>
            <p>Loading files...</p>
          </div>
        ) : filteredAndSortedFiles.length === 0 ? (
          <div className="file-list-empty">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
            {searchQuery || filterType !== 'all' ? (
              <p>No files match your search or filter criteria.</p>
            ) : (
              <p>No files found. Upload files to get started.</p>
            )}
          </div>
        ) : (
          <div className="file-list">
            {filteredAndSortedFiles.map(file => (
              <div 
                key={file.id} 
                className={`file-list-item ${selectedFiles.includes(file.id) ? 'selected' : ''}`}
                onClick={() => toggleFileSelection(file.id)}
              >
                <div className="file-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedFiles.includes(file.id)} 
                    onChange={() => {}} // We're handling changes via the row click
                    onClick={e => e.stopPropagation()} // Prevent row click from triggering
                  />
                </div>
                <div className="file-icon-cell">
                  {getFileIcon(file)}
                </div>
                <div className="file-name" title={file.name}>
                  {file.name}
                </div>
                <div className="file-type">
                  {file.category.charAt(0).toUpperCase() + file.category.slice(1)}
                </div>
                <div className="file-size">
                  {formatFileSize(file.size)}
                </div>
                <div className="file-date">
                  {new Date(file.uploadDate).toLocaleString()}
                </div>
                <div className="file-actions" onClick={e => e.stopPropagation()}>
                  <button className="file-action-button view" title="View">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className="file-action-button download" title="Download">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </button>
                  <button 
                    className="file-action-button delete" 
                    title="Delete"
                    onClick={() => {
                      setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
                      setSelectedFiles(prev => prev.filter(id => id !== file.id));
                      addNotification(`File "${file.name}" deleted`, 'success');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="file-manager-footer">
        <p>{filteredAndSortedFiles.length} {filteredAndSortedFiles.length === 1 ? 'file' : 'files'}</p>
        <p>Total size: {formatFileSize(filteredAndSortedFiles.reduce((total, file) => total + file.size, 0))}</p>
      </div>
    </div>
  );
};

export default withAdmin(FileManager); 