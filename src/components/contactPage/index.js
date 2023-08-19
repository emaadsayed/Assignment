import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact, deleteContact } from "../../redux/actions";
import ContactForm from "../contactFrom";
import ContactCard from "../contactCard";
import { FiPlus } from "react-icons/fi";

function ContactPage({ isMobile }) {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleCreateContact = (newContact) => {
    dispatch(addContact(newContact));
    setShowForm(false);
  };

  const handleEditContact = (editedContact) => {
    dispatch(editContact(editedContact));
    setSelectedContact(null);
  };

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="flex-grow p-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Contacts</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
        >
          <FiPlus className="mr-2" /> Create Contact
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={() => setSelectedContact(contact)}
            onDelete={() => handleDeleteContact(contact.id)}
          />
        ))}
      </div>

      {showForm && (
        <ContactForm
          setShowForm={setShowForm}
          onCreateContact={handleCreateContact}
          isMobile={isMobile}
        />
      )}

      {selectedContact && (
        <ContactForm
          contact={selectedContact}
          onEditContact={handleEditContact}
          setShowForm={setShowForm}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}

export default ContactPage;
