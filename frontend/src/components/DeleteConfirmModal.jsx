import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../redux/slices/contactSlice';
import '../styles/Modal.css';

function DeleteConfirmModal({ contact, onClose }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.contacts);

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact.id)).unwrap();
      onClose();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-header danger">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <div className="modal-header">
          <h2>Delete Contact</h2>
          <p>
            Are you sure you want to delete{' '}
            <strong>
              {contact.firstName} {contact.lastName}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="btn-danger"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner">Deleting...</span>
            ) : (
              'Delete Contact'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
