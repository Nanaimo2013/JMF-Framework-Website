import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { withAdmin } from '../../context/AuthContext';
import adminApi from '../../services/api/adminApi';
import { useNotification } from '../../components/NotificationManager';
import '../../styles/DocEditor.css';

interface DocFormData {
  title: string;
  slug: string;
  content: string;
  section: string;
  order: number;
  isPublished: boolean;
}

const DocEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<DocFormData>({
    title: '',
    slug: '',
    content: '',
    section: 'getting-started',
    order: 0,
    isPublished: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Load documentation data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchDoc = async () => {
        try {
          setIsLoading(true);
          // In a real app, this would be an API call
          // Mock data for demo
          setTimeout(() => {
            setFormData({
              title: 'Getting Started with JMF',
              slug: 'getting-started-with-jmf',
              content: `# Getting Started with JMF

## Introduction
JMF Framework is a modern JavaScript framework for building scalable web applications. This guide will help you get started with JMF.

## Installation
You can install JMF using npm or yarn:

\`\`\`bash
npm install jmf-framework
\`\`\`

## Basic Usage
Here's a simple example of how to use JMF:

\`\`\`javascript
import { createApp } from 'jmf-framework';

const app = createApp({
  root: '#app',
  data: {
    message: 'Hello JMF!'
  }
});

app.mount();
\`\`\`

## Next Steps
Check out the [API Reference](/docs/api) to learn more about JMF's capabilities.`,
              section: 'getting-started',
              order: 1,
              isPublished: true
            });
            setIsLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Failed to load documentation', error);
          addNotification('Failed to load documentation data', 'error');
          setIsLoading(false);
        }
      };
      
      fetchDoc();
    }
  }, [id, isEditMode, addNotification]);

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

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')  // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-');      // Remove consecutive hyphens
    
    setFormData(prev => ({ ...prev, slug }));
  };

  // Add markdown formatting
  const addMarkdownFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    let newText = '';
    let newCursorPos = 0;
    
    switch (format) {
      case 'h1':
        newText = `${text.substring(0, start)}# ${text.substring(start, end)}${text.substring(end)}`;
        newCursorPos = end + 2;
        break;
      case 'h2':
        newText = `${text.substring(0, start)}## ${text.substring(start, end)}${text.substring(end)}`;
        newCursorPos = end + 3;
        break;
      case 'h3':
        newText = `${text.substring(0, start)}### ${text.substring(start, end)}${text.substring(end)}`;
        newCursorPos = end + 4;
        break;
      case 'bold':
        newText = `${text.substring(0, start)}**${text.substring(start, end)}**${text.substring(end)}`;
        newCursorPos = end + 4;
        break;
      case 'italic':
        newText = `${text.substring(0, start)}*${text.substring(start, end)}*${text.substring(end)}`;
        newCursorPos = end + 2;
        break;
      case 'link':
        newText = `${text.substring(0, start)}[${text.substring(start, end)}](url)${text.substring(end)}`;
        newCursorPos = end + 7;
        break;
      case 'code':
        if (start === end) {
          // No selection, insert inline code markers
          newText = `${text.substring(0, start)}\`code\`${text.substring(end)}`;
          newCursorPos = start + 1;
        } else {
          // Selection, wrap in code block
          newText = `${text.substring(0, start)}\`\`\`\n${text.substring(start, end)}\n\`\`\`${text.substring(end)}`;
          newCursorPos = end + 8;
        }
        break;
      case 'list':
        newText = `${text.substring(0, start)}- ${text.substring(start, end)}${text.substring(end)}`;
        newCursorPos = end + 2;
        break;
      default:
        break;
    }
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    // Reset focus and cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
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
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification(
        isEditMode ? 'Documentation updated successfully' : 'Documentation created successfully',
        'success'
      );
      navigate('/admin/docs');
    } catch (error) {
      console.error('Error saving documentation:', error);
      addNotification('Failed to save documentation', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Cancel button handler
  const handleCancel = () => {
    navigate('/admin/docs');
  };

  // Render markdown preview
  const renderMarkdown = (markdown: string) => {
    // In a real app, use a proper markdown renderer like marked or react-markdown
    // This is a simple placeholder to demonstrate the concept
    return (
      <div className="markdown-preview">
        <div dangerouslySetInnerHTML={{ __html: markdown
          .replace(/^# (.*$)/gm, '<h1>$1</h1>')
          .replace(/^## (.*$)/gm, '<h2>$1</h2>')
          .replace(/^### (.*$)/gm, '<h3>$1</h3>')
          .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
          .replace(/\*(.*)\*/gm, '<em>$1</em>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/gm, '<a href="$2">$1</a>')
          .replace(/`([^`]+)`/gm, '<code>$1</code>')
          .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
          .replace(/- (.*)/gm, '<li>$1</li>')
          .split('\n\n').join('<br/>')
        }} />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="doc-editor-loading">
        <div className="loading-spinner"></div>
        <p>Loading documentation data...</p>
      </div>
    );
  }

  return (
    <div className="doc-editor">
      <div className="doc-editor-header">
        <h1>{isEditMode ? 'Edit Documentation' : 'Create Documentation Page'}</h1>
        <p className="doc-editor-subheader">
          {isEditMode 
            ? 'Update documentation content and settings' 
            : 'Create a new documentation page with markdown support'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid doc-form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                onBlur={() => !formData.slug && generateSlug()}
                placeholder="Documentation Title"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <div className="error-message">{errors.title}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="slug">URL Slug <span className="required">*</span></label>
              <div className="slug-field">
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="documentation-slug"
                  className={errors.slug ? 'error' : ''}
                />
                <button 
                  type="button" 
                  className="generate-slug-button" 
                  onClick={generateSlug}
                  title="Generate from title"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                </button>
              </div>
              {errors.slug && <div className="error-message">{errors.slug}</div>}
              <div className="field-help">Will be used in the URL: /docs/{formData.slug}</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="section">Section</label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
              >
                <option value="getting-started">Getting Started</option>
                <option value="api">API Reference</option>
                <option value="cli">CLI Commands</option>
                <option value="examples">Examples</option>
                <option value="advanced">Advanced Topics</option>
              </select>
              <div className="field-help">The documentation section this page belongs to</div>
            </div>
            
            <div className="form-group">
              <label htmlFor="order">Display Order</label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
              <div className="field-help">Determines the order in the sidebar navigation</div>
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
              <div className="field-help">When checked, the page will be visible on the website</div>
            </div>
          </div>
          
          <div className="form-column">
            <div className="form-group content-group">
              <div className="content-header">
                <label htmlFor="content">Content <span className="required">*</span></label>
                <div className="content-view-toggle">
                  <button
                    type="button"
                    className={`toggle-button ${!showPreview ? 'active' : ''}`}
                    onClick={() => setShowPreview(false)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`toggle-button ${showPreview ? 'active' : ''}`}
                    onClick={() => setShowPreview(true)}
                  >
                    Preview
                  </button>
                </div>
              </div>
              
              {showPreview ? (
                renderMarkdown(formData.content)
              ) : (
                <div className="markdown-editor">
                  <div className="editor-toolbar">
                    <button type="button" onClick={() => addMarkdownFormatting('h1')} title="Heading 1">H1</button>
                    <button type="button" onClick={() => addMarkdownFormatting('h2')} title="Heading 2">H2</button>
                    <button type="button" onClick={() => addMarkdownFormatting('h3')} title="Heading 3">H3</button>
                    <span className="toolbar-divider"></span>
                    <button type="button" onClick={() => addMarkdownFormatting('bold')} title="Bold">
                      <strong>B</strong>
                    </button>
                    <button type="button" onClick={() => addMarkdownFormatting('italic')} title="Italic">
                      <em>I</em>
                    </button>
                    <button type="button" onClick={() => addMarkdownFormatting('link')} title="Link">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-link">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </button>
                    <span className="toolbar-divider"></span>
                    <button type="button" onClick={() => addMarkdownFormatting('list')} title="List">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </button>
                    <button type="button" onClick={() => addMarkdownFormatting('code')} title="Code">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-code">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </button>
                  </div>
                  
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write documentation content using Markdown..."
                    className={errors.content ? 'error' : ''}
                    rows={20}
                  ></textarea>
                  
                  {errors.content && <div className="error-message">{errors.content}</div>}
                  <div className="field-help">Supports Markdown formatting</div>
                </div>
              )}
            </div>
          </div>
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
              isEditMode ? 'Save Changes' : 'Create Documentation'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAdmin(DocEditor); 