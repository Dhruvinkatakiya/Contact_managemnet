import '../styles/Modal.css';

function LogoutConfirmModal({ isOpen, onConfirm, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-header warning">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>

        <div className="modal-header">
          <h2>Logout Confirmation</h2>
          <p>Are you sure you want to logout? You'll need to sign in again to access your contacts.</p>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;
