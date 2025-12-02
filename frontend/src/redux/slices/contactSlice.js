import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Helper to add demo fields for presentation
const enrichContact = (contact) => ({
  ...contact,
  status: contact.status || 'Active',
  lastActive: contact.lastActive || new Date().toISOString()
});

// Async thunks for contact operations
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (searchTerm = '', { rejectWithValue }) => {
    try {
      const url = searchTerm ? `/contacts?search=${searchTerm}` : '/contacts';
      const response = await api.get(url);
      return response.data.data.contacts.map(enrichContact);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch contacts'
      );
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await api.post('/contacts', contactData);
      return enrichContact(response.data.data.contact);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add contact'
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  'contacts/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/contacts/${id}`, data);
      return enrichContact(response.data.data.contact);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update contact'
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete contact'
      );
    }
  }
);

// Calculate stats from contacts
const calculateStats = (contacts) => {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return {
    total: contacts.length,
    newThisWeek: contacts.filter(
      (c) => new Date(c.createdAt) > oneWeekAgo
    ).length,
    active: contacts.filter((c) => c.status === 'Active').length,
  };
};

// Initial state
const initialState = {
  contacts: [],
  filteredContacts: [],
  searchQuery: '',
  stats: { total: 0, newThisWeek: 0, active: 0 },
  loading: false,
  error: null,
  successMessage: null,
};

// Contact slice
const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload.trim() === '') {
        state.filteredContacts = state.contacts;
      } else {
        const term = action.payload.toLowerCase();
        state.filteredContacts = state.contacts.filter(
          (contact) =>
            contact.firstName.toLowerCase().includes(term) ||
            contact.lastName.toLowerCase().includes(term) ||
            contact.contactNumber.includes(term) ||
            (contact.email && contact.email.toLowerCase().includes(term))
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearContacts: (state) => {
      state.contacts = [];
      state.filteredContacts = [];
      state.searchQuery = '';
      state.stats = { total: 0, newThisWeek: 0, active: 0 };
    },
  },
  extraReducers: (builder) => {
    // Fetch contacts
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.filteredContacts = action.payload;
        state.stats = calculateStats(action.payload);
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add contact
    builder
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
        state.filteredContacts = state.contacts;
        state.stats = calculateStats(state.contacts);
        state.successMessage = 'Contact added successfully!';
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update contact
    builder
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
          state.filteredContacts = state.contacts;
        }
        state.stats = calculateStats(state.contacts);
        state.successMessage = 'Contact updated successfully!';
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete contact
    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
        state.filteredContacts = state.filteredContacts.filter(
          (contact) => contact.id !== action.payload
        );
        state.stats = calculateStats(state.contacts);
        state.successMessage = 'Contact deleted successfully!';
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearError, clearSuccessMessage, clearContacts } =
  contactSlice.actions;
export default contactSlice.reducer;
