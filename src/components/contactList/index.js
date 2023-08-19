import React from 'react';
import { useSelector } from 'react-redux';

function ContactList() {
  const contacts = useSelector((state) => state.contacts);

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>{contact.firstName} {contact.lastName}</li>
      ))}
    </ul>
  );
}

export default ContactList;
