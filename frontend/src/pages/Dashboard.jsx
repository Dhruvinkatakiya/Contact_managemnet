import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  setSearchQuery,
} from '../redux/slices/contactSlice';
import ContactModal from '../components/ContactModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import LogoutConfirmModal from '../components/LogoutConfirmModal';
import '../styles/Dashboard.css';

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { filteredContacts, stats, loading, searchQuery } = useSelector(
    (state) => state.contacts
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    dispatch(logout());
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (contactToDelete) {
      await dispatch(deleteContact(contactToDelete.id));
      setIsDeleteModalOpen(false);
      setContactToDelete(null);
    }
  };

  const handleSaveContact = async (data) => {
    if (selectedContact) {
      await dispatch(updateContact({ id: selectedContact.id, data }));
    } else {
      await dispatch(addContact(data));
    }
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInWeeks === 1) return '1 week ago';
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
    if (diffInMonths === 1) return '1 month ago';
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Pending':
        return 'status-pending';
      case 'Inactive':
        return 'status-inactive';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#006666" />
                <path
                  d="M16 9C13.2386 9 11 11.2386 11 14C11 16.7614 13.2386 19 16 19C18.7614 19 21 16.7614 21 14C21 11.2386 18.7614 9 16 9Z"
                  fill="white"
                />
                <path
                  d="M9 23C9 20.2386 11.2386 18 14 18H18C20.7614 18 23 20.2386 23 23V24H9V23Z"
                  fill="white"
                />
              </svg>
            </div>
            <span>ContactFlow</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 5C7.79086 5 6 6.79086 6 9C6 11.2091 7.79086 13 10 13C12.2091 13 14 11.2091 14 9C14 6.79086 12.2091 5 10 5Z"
                fill="currentColor"
              />
              <path
                d="M4 16C4 13.7909 5.79086 12 8 12H12C14.2091 12 16 13.7909 16 16V17H4V16Z"
                fill="currentColor"
              />
            </svg>
            Home
          </a>
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">
            <span>{user?.name?.charAt(0).toUpperCase() || 'A'}</span>
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'User'}</div>
            <div className="user-email">{user?.email}</div>
          </div>
          <button className="user-menu" onClick={handleLogout} title="Logout">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 17H4C3.44772 17 3 16.5523 3 16V4C3 3.44772 3.44772 3 4 3H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M13 13L17 10L13 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 10H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <h1>All Contacts</h1>
          </div>
         </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Total Contacts</span>
              <div className="stat-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="stat-value">{stats.total.toLocaleString()}</div>
            <div className="stat-footer">
              
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">New This Week</span>
              <div className="stat-icon purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="stat-value">{stats.newThisWeek}</div>
            
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Active Users</span>
              <div className="stat-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 10V3L4 14H11L11 21L20 10L13 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="stat-value">{stats.active}</div>
            <div className="stat-footer">
              <span className="stat-change positive">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                +5%
              </span>
              <span className="stat-label">engagement</span>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="contacts-section">
          <div className="section-header">
            <div className="search-wrapper">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
                <path
                  d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, email, or number..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => dispatch(setSearchQuery(''))}
                  title="Clear search"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
            <div className="section-actions">
              <button className="btn-primary" onClick={handleAddContact}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add New Contact
              </button>
            </div>
          </div>

          <div className="table-container">
            {loading && filteredContacts.length === 0 ? (
              <div className="loading-state">
                <div className="spinner large"></div>
                <p>Loading contacts...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="empty-state">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
                  <path
                    d="M32 22C27.5817 22 24 25.5817 24 30C24 34.4183 27.5817 38 32 38C36.4183 38 40 34.4183 40 30C40 25.5817 36.4183 22 32 22Z"
                    fill="#9CA3AF"
                  />
                  <path
                    d="M20 46C20 41.5817 23.5817 38 28 38H36C40.4183 38 44 41.5817 44 46V48H20V46Z"
                    fill="#9CA3AF"
                  />
                </svg>
                <h3>
                  {searchQuery ? 'No contacts found' : 'No contacts yet'}
                </h3>
                <p>
                  {searchQuery
                    ? 'Try adjusting your search terms'
                    : 'Get started by adding your first contact'}
                </p>
                {!searchQuery && (
                  <button className="btn-primary" onClick={handleAddContact}>
                    Add New Contact
                  </button>
                )}
              </div>
            ) : (
              <table className="contacts-table">
                <thead>
                  <tr>
                    <th>CONTACT NAME</th>
                    <th>CONTACT NUMBER</th>
                    <th>STATUS</th>
                    <th>LAST ACTIVE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>
                        <div className="contact-info">
                          <div className="contact-avatar">
                            {contact.firstName.charAt(0)}
                            {contact.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="contact-name">
                              {contact.firstName} {contact.lastName}
                            </div>
                            <div className="contact-email">{contact.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{contact.contactNumber}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadgeClass(contact.status)}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td>{formatDate(contact.lastActive)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-button"
                            onClick={() => handleEditContact(contact)}
                            title="Edit"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M11.3333 2.00004C11.5083 1.82494 11.7162 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6666 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.825 1.82494 14 2.00004C14.1751 2.17513 14.314 2.38308 14.4087 2.61194C14.5035 2.8408 14.5523 3.08604 14.5523 3.33337C14.5523 3.58071 14.5035 3.82594 14.4087 4.0548C14.314 4.28366 14.1751 4.49161 14 4.66671L5 13.6667L1.33331 14.6667L2.33331 11L11.3333 2.00004Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <button
                            className="action-button danger"
                            onClick={() => handleDeleteClick(contact)}
                            title="Delete"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M2 4H14M12.6667 4V13.3333C12.6667 14.0697 12.0697 14.6667 11.3333 14.6667H4.66667C3.93029 14.6667 3.33333 14.0697 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 1.93029 5.93029 1.33333 6.66667 1.33333H9.33333C10.0697 1.33333 10.6667 1.93029 10.6667 2.66667V4M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {isModalOpen && (
        <ContactModal
          contact={selectedContact}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedContact(null);
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          contact={contactToDelete}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setContactToDelete(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      )}

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
}

export default Dashboard;
