function ContactDetails({ contact, onEdit, onDelete }) {
    return (
      <div>
        <p>Name: {contact.firstName} {contact.lastName}</p>
        <p>Status: {contact.status}</p>
        <button onClick={() => onEdit(contact)}>Edit</button>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    );
  }
  