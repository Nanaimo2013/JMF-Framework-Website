import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { withAdmin } from '../../context/AuthContext';
import adminApi from '../../services/api/adminApi';
import downloadsApi, { Release, ReleaseType, Platform } from '../../services/api/downloadsApi';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/ReleaseForm.css';

interface ReleaseFile {
  file: File;
  platform: Platform;
  type: 'binary' | 'source';
  uploading: boolean;
  progress: number;
  uploaded: boolean;
  url?: string;
}

const ReleaseForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const isEditMode = !!id;
  
  // Form state
  const [formData, setFormData] = useState<Partial<Release>>({
    version: '',
    releaseDate: new Date().toISOString().split('T')[0],
    releaseType: 'stable' as ReleaseType,
    changelog: '',
    isPublished: false,
    downloadCount: 0,
  });
  
  const [files, setFiles] = useState<ReleaseFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load release data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchRelease = async () => {
        try {
          setIsLoading(true);
          // In a real app, you would fetch the release data from the API
          // Mock for demo purposes
          setTimeout(() => {
            setFormData({
              version: '2.1.0',
              releaseDate: '2023-06-15',
              releaseType: 'stable',
              changelog: '## What\'s New\n\n- Added support for new features\n- Fixed bugs\n- Improved performance',
              isPublished: true,
              downloadCount: 1245,
            });
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Failed to load release', error);
          addNotification('Failed to load release data', 'error');
          setIsLoading(false);
        }
      };
      
      fetchRelease();
    }
  }, [id, isEditMode, addNotification]);

  // File drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: ReleaseFile[] = acceptedFiles.map(file => {
      // Determine platform from filename
      let platform: Platform = 'all';
      if (file.name.includes('windows') || file.name.includes('win')) {
        platform = 'windows';
      } else if (file.name.includes('mac') || file.name.includes('darwin')) {
        platform = 'mac';
      } else if (file.name.includes('linux')) {
        platform = 'linux';
      }
      
      // Determine file type
      const type = file.name.includes('source') ? 'source' : 'binary';
      
      return {
        file,
        platform,
        type,
        uploading: false,
        progress: 0,
        uploaded: false
      };
    });
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    noClick: false
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // For checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // File platform change
  const handleFilePlatformChange = (index: number, platform: Platform) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index].platform = platform;
      return newFiles;
    });
  };

  // File type change
  const handleFileTypeChange = (index: number, type: 'binary' | 'source') => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index].type = type;
      return newFiles;
    });
  };

  // Remove file
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.version?.trim()) {
      newErrors.version = 'Version is required';
    } else if (!/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9]+)?$/.test(formData.version)) {
      newErrors.version = 'Version must be in format x.y.z or x.y.z-suffix';
    }
    
    if (!formData.releaseDate?.trim()) {
      newErrors.releaseDate = 'Release date is required';
    }
    
    if (!formData.changelog?.trim()) {
      newErrors.changelog = 'Changelog is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      addNotification('Please fix the errors in the form', 'error');
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Upload files
      for (let i = 0; i < files.length; i++) {
        if (!files[i].uploaded) {
          setFiles(prev => {
            const newFiles = [...prev];
            newFiles[i].uploading = true;
            return newFiles;
          });
          
          // Simulate file upload with progress
          await new Promise<void>(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 10;
              setFiles(prev => {
                const newFiles = [...prev];
                newFiles[i].progress = progress;
                return newFiles;
              });
              
              if (progress >= 100) {
                clearInterval(interval);
                setFiles(prev => {
                  const newFiles = [...prev];
                  newFiles[i].uploading = false;
                  newFiles[i].uploaded = true;
                  newFiles[i].url = 'https://example.com/uploads/' + newFiles[i].file.name;
                  return newFiles;
                });
                resolve();
              }
            }, 200);
          });
        }
      }
      
      // Success
      addNotification(
        isEditMode ? 'Release updated successfully' : 'Release created successfully', 
        'success'
      );
      navigate('/admin/releases');
    } catch (error) {
      console.error('Error saving release:', error);
      addNotification('Failed to save release', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate('/admin/releases');
  };

  if (isLoading) {
    return (
      <div className="release-form-loading">
        <div className="loading-spinner"></div>
        <p>Loading release data...</p>
      </div>
    );
  }

  return (
    <div className="release-form">
      <div className="release-form-header">
        <h1>{isEditMode ? 'Edit Release' : 'Create New Release'}</h1>
        <p className="release-form-subheader">
          {isEditMode 
            ? 'Update release information and files' 
            : 'Create a new software release with version, changelog and files'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="version">Version <span className="required">*</span></label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                placeholder="e.g. 2.1.0 or 2.1.0-beta"
                className={errors.version ? 'error' : ''}
              />
              {errors.version && <div className="error-message">{errors.version}</div>}
              <div className="field-help">Use semantic versioning: major.minor.patch</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="releaseDate">Release Date <span className="required">*</span></label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleInputChange}
                className={errors.releaseDate ? 'error' : ''}
              />
              {errors.releaseDate && <div className="error-message">{errors.releaseDate}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="releaseType">Release Type</label>
              <select
                id="releaseType"
                name="releaseType"
                value={formData.releaseType}
                onChange={handleInputChange}
              >
                <option value="stable">Stable</option>
                <option value="beta">Beta</option>
                <option value="alpha">Alpha</option>
                <option value="rc">Release Candidate</option>
              </select>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                />
                <span>Publish immediately</span>
              </label>
              <div className="field-help">When checked, the release will be available on the website</div>
            </div>
            
            {isEditMode && (
              <div className="form-group stats-group">
                <h3>Release Statistics</h3>
                <div className="stats-item">
                  <span className="stats-label">Download Count:</span>
                  <span className="stats-value">{formData.downloadCount}</span>
                </div>
                <div className="stats-item">
                  <span className="stats-label">Created:</span>
                  <span className="stats-value">June 15, 2023</span>
                </div>
                <div className="stats-item">
                  <span className="stats-label">Last Updated:</span>
                  <span className="stats-value">June 20, 2023</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="form-column">
            <div className="form-group changelog-group">
              <label htmlFor="changelog">Changelog <span className="required">*</span></label>
              <div className="changelog-editor">
                <div className="editor-toolbar">
                  <button type="button" title="Add heading" onClick={() => setFormData(prev => ({ ...prev, changelog: prev.changelog + '## Heading\n' }))}>H2</button>
                  <button type="button" title="Add bold text" onClick={() => setFormData(prev => ({ ...prev, changelog: prev.changelog + '**Bold**' }))}>B</button>
                  <button type="button" title="Add italic text" onClick={() => setFormData(prev => ({ ...prev, changelog: prev.changelog + '*Italic*' }))}>I</button>
                  <button type="button" title="Add list item" onClick={() => setFormData(prev => ({ ...prev, changelog: prev.changelog + '\n- List item' }))}>•</button>
                  <button type="button" title="Add link" onClick={() => setFormData(prev => ({ ...prev, changelog: prev.changelog + '[Link text](url)' }))}>🔗</button>
                </div>
                <textarea
                  id="changelog"
                  name="changelog"
                  value={formData.changelog}
                  onChange={handleInputChange}
                  placeholder="## What's New&#10;&#10;- Added feature 1&#10;- Fixed bug 2&#10;- Improved performance"
                  className={errors.changelog ? 'error' : ''}
                  rows={12}
                ></textarea>
                {errors.changelog && <div className="error-message">{errors.changelog}</div>}
                <div className="field-help">Supports Markdown formatting</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2>Release Files</h2>
          <p className="section-description">Upload binary files for different platforms</p>
          
          <div className="release-files-dropzone">
            <div 
              {...getRootProps()} 
              className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
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
                  <span className="dropzone-help">Include platform in filename for automatic detection (e.g., app-windows.exe)</span>
                </div>
              )}
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="release-files-list">
              <div className="files-list-header">
                <div className="file-name-col">File</div>
                <div className="file-platform-col">Platform</div>
                <div className="file-type-col">Type</div>
                <div className="file-size-col">Size</div>
                <div className="file-actions-col">Actions</div>
              </div>
              {files.map((file, index) => (
                <div key={index} className="file-list-item">
                  <div className="file-name-col">
                    <div className="file-name">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="file-icon">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      {file.file.name}
                    </div>
                    {file.uploading && (
                      <div className="upload-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${file.progress}%` }}></div>
                        </div>
                        <span className="progress-value">{file.progress}%</span>
                      </div>
                    )}
                  </div>
                  <div className="file-platform-col">
                    <select 
                      value={file.platform} 
                      onChange={(e) => handleFilePlatformChange(index, e.target.value as Platform)}
                      disabled={file.uploading || file.uploaded}
                    >
                      <option value="windows">Windows</option>
                      <option value="mac">Mac OS</option>
                      <option value="linux">Linux</option>
                      <option value="all">All Platforms</option>
                    </select>
                  </div>
                  <div className="file-type-col">
                    <select 
                      value={file.type} 
                      onChange={(e) => handleFileTypeChange(index, e.target.value as 'binary' | 'source')}
                      disabled={file.uploading || file.uploaded}
                    >
                      <option value="binary">Binary</option>
                      <option value="source">Source</option>
                    </select>
                  </div>
                  <div className="file-size-col">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </div>
                  <div className="file-actions-col">
                    <button 
                      type="button" 
                      className="file-action-button delete"
                      onClick={() => handleRemoveFile(index)}
                      disabled={file.uploading}
                      title="Remove file"
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
        
        <div className="form-actions">
          <button type="button" className="button secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="button primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="loading-spinner-small"></span>
                {isEditMode ? 'Saving...' : 'Creating...'}
              </>
            ) : (
              isEditMode ? 'Save Changes' : 'Create Release'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAdmin(ReleaseForm); 