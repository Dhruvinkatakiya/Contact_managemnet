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
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
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
