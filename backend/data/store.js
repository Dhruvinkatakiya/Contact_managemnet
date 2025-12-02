// In-memory data store for users and contacts
class DataStore {
  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.contactIdCounter = 1;
    this.initializeDemoData();
  }

  // Initialize with demo data for testing
  initializeDemoData() {
    // Demo user will be added through signup
  }

  // User methods
  createUser(userData) {
    if (this.users.has(userData.email)) {
      throw new Error('User already exists');
    }
    
    const user = {
      id: Date.now().toString(),
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString()
    };
    
    this.users.set(userData.email, user);
    return user;
  }

  getUserByEmail(email) {
    return this.users.get(email);
  }

  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Contact methods
  createContact(userId, contactData) {
    const contact = {
      id: this.contactIdCounter++,
      userId,
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      contactNumber: contactData.contactNumber,
      email: contactData.email || '',
      status: contactData.status || 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    if (!this.contacts.has(userId)) {
      this.contacts.set(userId, []);
    }
    
    this.contacts.get(userId).push(contact);
    return contact;
  }

  getContactsByUserId(userId) {
    return this.contacts.get(userId) || [];
  }

  getContactById(userId, contactId) {
    const userContacts = this.contacts.get(userId) || [];
    return userContacts.find(contact => contact.id === parseInt(contactId));
  }

  updateContact(userId, contactId, updateData) {
    const userContacts = this.contacts.get(userId);
    if (!userContacts) {
      return null;
    }
    
    const contactIndex = userContacts.findIndex(c => c.id === parseInt(contactId));
    if (contactIndex === -1) {
      return null;
    }
    
    const updatedContact = {
      ...userContacts[contactIndex],
      ...updateData,
      id: userContacts[contactIndex].id,
      userId: userContacts[contactIndex].userId,
      createdAt: userContacts[contactIndex].createdAt,
      updatedAt: new Date().toISOString()
    };
    
    userContacts[contactIndex] = updatedContact;
    return updatedContact;
  }

  deleteContact(userId, contactId) {
    const userContacts = this.contacts.get(userId);
    if (!userContacts) {
      return false;
    }
    
    const contactIndex = userContacts.findIndex(c => c.id === parseInt(contactId));
    if (contactIndex === -1) {
      return false;
    }
    
    userContacts.splice(contactIndex, 1);
    return true;
  }

  searchContacts(userId, searchTerm) {
    const userContacts = this.getContactsByUserId(userId);
    if (!searchTerm) {
      return userContacts;
    }
    
    const term = searchTerm.toLowerCase();
    return userContacts.filter(contact => 
      contact.firstName.toLowerCase().includes(term) ||
      contact.lastName.toLowerCase().includes(term) ||
      contact.contactNumber.includes(term) ||
      (contact.email && contact.email.toLowerCase().includes(term))
    );
  }
}

// Export singleton instance
const dataStore = new DataStore();
export default dataStore;
