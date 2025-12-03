import express from 'express';
import { body, validationResult } from 'express-validator';
import dataStore from '../data/store.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

const validateContact = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('contactNumber')
    .trim()
    .notEmpty()
    .withMessage('Contact number is required')
    .custom((value) => {
      const digits = value.replace(/\D/g, '');
      if (digits.length === 10 && /^[6-9][0-9]{9}$/.test(digits)) {
        return true;
      }
      if (digits.length === 12 && /^91[6-9][0-9]{9}$/.test(digits)) {
        return true;
      }
      throw new Error('Please provide a valid Indian mobile number (10 digits or +91 followed by 10 digits)');
    }),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('status')
    .optional()
    .isIn(['Active', 'Inactive'])
    .withMessage('Status must be either Active or Inactive')
];

router.get('/', (req, res) => {
  try {
    const { search } = req.query;
    let contacts;

    if (search) {
      contacts = dataStore.searchContacts(req.user.userId, search);
    } else {
      contacts = dataStore.getContactsByUserId(req.user.userId);
    }

    res.json({
      success: true,
      data: {
        contacts,
        count: contacts.length
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts'
    });
  }
});

router.get('/:id', (req, res) => {
  try {
    const contact = dataStore.getContactById(req.user.userId, req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: { contact }
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact'
    });
  }
});

router.post('/', validateContact, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, contactNumber, email, status } = req.body;

    const contact = dataStore.createContact(req.user.userId, {
      firstName,
      lastName,
      contactNumber,
      email,
      status: status || 'Active'
    });

    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: { contact }
    });
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating contact'
    });
  }
});

router.put('/:id', validateContact, (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, contactNumber, email, status } = req.body;

    const updatedContact = dataStore.updateContact(
      req.user.userId,
      req.params.id,
      { firstName, lastName, contactNumber, email, status }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: { contact: updatedContact }
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact'
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deleted = dataStore.deleteContact(req.user.userId, req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact'
    });
  }
});

export default router;
