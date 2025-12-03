import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../redux/slices/contactSlice';
import '../styles/Modal.css';

function ContactModal({ contact = null, onClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contacts);

  const isEdit = Boolean(contact);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (isEdit) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        contactNumber: contact.contactNumber || '',
        email: contact.email || '',
        status: contact.status || 'Active',
      });
    }
  }, [contact, isEdit]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        break;
      case 'contactNumber':
        if (!value.trim()) {
          error = 'Contact number is required';
        } else if (!/^[0-9+\-\s()]+$/.test(value)) {
          error = 'Invalid contact number format';
        } else {
          const digitCount = value.replace(/\D/g, '').length;
          if (digitCount < 10) {
            error = 'Must be at least 10 digits';
          } else if (value.length > 15) {
            error = 'Contact number too long (max 15 characters)';
          }
        }
        break;
      case 'email':
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email address';
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.firstName = validateField('firstName', formData.firstName);
    newErrors.lastName = validateField('lastName', formData.lastName);
    newErrors.contactNumber = validateField('contactNumber', formData.contactNumber);
    newErrors.email = validateField('email', formData.email);

    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setTouched({
      firstName: true,
      lastName: true,
      contactNumber: true,
      email: true,
    });

    if (!validateForm()) return;

    try {
      if (isEdit) {
        await dispatch(updateContact({ id: contact.id, data: formData })).unwrap();
      } else {
        await dispatch(addContact(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      console.error('Contact save error:', err);
      
      let errorMessage = 'Failed to save contact';
      
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.errors && Array.isArray(err.errors)) {
        errorMessage = err.errors.map(e => e.msg).join(', ');
      }
      
      setErrors({ submit: errorMessage });
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="modal-header" style={{ textAlign: 'center' }}>
          
          
          <div className={`modal-icon-header ${isEdit ? 'primary' : 'primary'}`}>
            <div className="modal-icon-circle">
              {isEdit ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              )}
            </div>
          </div>

          <h2>{isEdit ? 'Edit Contact' : 'Add New Contact'}</h2>
          <p className="modal-subtitle">
            {isEdit ? 'Update contact information below' : 'Fill in the details to create a new contact'}
          </p>
        </div>

        {/* BODY */}
        <form className="modal-form" onSubmit={handleSubmit}>

          {/* Name Row */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={errors.firstName && touched.firstName ? 'error' : ''}
                autoFocus
              />
              {errors.firstName && touched.firstName && (
                <span className="field-error">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className={errors.lastName && touched.lastName ? 'error' : ''}
              />
              {errors.lastName && touched.lastName && (
                <span className="field-error">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contactNumber">
              Contact Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="+1 (234) 567-890"
              value={formData.contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={errors.contactNumber && touched.contactNumber ? 'error' : ''}
            />
            {errors.contactNumber && touched.contactNumber && (
              <span className="field-error">{errors.contactNumber}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="field-error">{errors.email}</span>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="error-message">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              {errors.submit}
            </div>
          )}

          {/* FOOTER - Inside Form */}
          <div className="modal-actions">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onClose} 
              disabled={loading}
            >
              Cancel
            </button>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                <>
                  {isEdit ? (
                    <>
                      Update Contact
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add Contact
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
