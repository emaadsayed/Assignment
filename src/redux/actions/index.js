import { v4 as uuidv4 } from 'uuid'; // Import uuid library

export const addContact = (contact) => {
  const newContact = { ...contact, id: uuidv4() };
  return { type: 'ADD_CONTACT', payload: newContact };
};

export const editContact = (contact) => {
  return { type: 'EDIT_CONTACT', payload: contact };
};

export const deleteContact = (contactId) => {
  return { type: 'DELETE_CONTACT', payload: contactId };
};
