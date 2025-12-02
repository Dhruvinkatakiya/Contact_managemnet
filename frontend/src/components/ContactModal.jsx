import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../redux/slices/contactSlice';
import '../styles/Modal.css';

function ContactModal({ contact, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    status: 'Active',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        contactNumber: contact.contactNumber || '',
        email: contact.email || '',
        status: contact.status || 'Active',
      });
    }
  }, [contact]);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Contact Number validation
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    } else if (formData.contactNumber.replace(/[^0-9]/g, '').length < 10) {
      newErrors.contactNumber = 'Contact number must be at least 10 digits';
    }

    // Email validation (optional)
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', { contact, formData });

    if (validateForm()) {
      try {
        if (contact) {
          console.log('Updating contact:', { id: contact.id, data: formData });
          const result = await dispatch(updateContact({ id: contact.id, data: formData })).unwrap();
          console.log('Update successful:', result);
        } else {
          console.log('Adding contact:', formData);
          const result = await dispatch(addContact(formData)).unwrap();
          console.log('Add successful:', result);
        }
        onClose();
      } catch (error) {
        console.error('Error saving contact:', error);
        setErrors({ submit: error.message || 'Failed to save contact' });
      }
    } else {
      console.log('Validation failed:', errors);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-header primary">
          <div className="modal-icon-circle">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {contact ? (
                <>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </>
              ) : (
                <>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <line x1="20" y1="8" x2="20" y2="14" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </>
              )}
            </svg>
          </div>
        </div>
        <div className="modal-header">
          <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
          <p className="modal-subtitle">
            {contact
              ? 'Update contact information below'
              : 'Fill in the details to add a new contact'}
          </p>
          <button onClick={onClose} className="modal-close">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={errors.firstName ? 'error' : ''}
                disabled={loading}
              />
              {errors.firstName && (
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
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={errors.lastName ? 'error' : ''}
                disabled={loading}
              />
              {errors.lastName && (
                <span className="field-error">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactNumber">
              Contact Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
              className={errors.contactNumber ? 'error' : ''}
              disabled={loading}
            />
            {errors.contactNumber && (
              <span className="field-error">{errors.contactNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email (Optional)</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={errors.email ? 'error' : ''}
              disabled={loading}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={errors.status ? 'error' : ''}
              disabled={loading}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && <span className="field-error">{errors.status}</span>}
          </div>

          {errors.submit && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#dc2626',
              fontSize: '14px',
              marginTop: '16px'
            }}>
              ⚠️ {errors.submit}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? (
                <span className="loading-spinner">Saving...</span>
              ) : contact ? (
                'Update Contact'
              ) : (
                'Add Contact'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactModal;
