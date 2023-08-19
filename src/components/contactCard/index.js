import React from 'react';

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="p-4 border rounded shadow-md">
      <div className="mb-2">
        <p className="text-lg">
          <span className="font-semibold">First Name:</span> {contact.firstName}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Last Name:</span> {contact.lastName}
        </p>
      </div>
      <p>
        <span className="font-semibold">Status:</span> {contact.status}
      </p>
      <div className="mt-4 space-x-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
