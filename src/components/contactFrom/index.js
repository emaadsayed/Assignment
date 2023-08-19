import React, { useState, useEffect } from "react";

function ContactForm({ contact, onCreateContact, onEditContact, setShowForm, isMobile }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("active");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setStatus(contact.status);
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please fill in both first name and last name.");
      return;
    }

    const newContact = { firstName, lastName, status };

    if (contact) {
      newContact.id = contact.id;
      onEditContact(newContact);
    } else {
      onCreateContact(newContact);
    }

    setFirstName("");
    setLastName("");
    setStatus("active");
    setShowForm(false);
    setErrorMessage(""); 
  };
  return (
    <>
      <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto flex h-screen items-center justify-center m-2">
          <div className="rounded-lg shadow-lg bg-white">
            <div className="flex items-start justify-between p-5 border-b border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                {contact ? "Edit Contact" : "Create Contact"}
              </h3>
              <button
                className="p-1 ml-auto text-black opacity-50 text-2xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <form>
                <div className="mb-4">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      className="w-1/2 px-3 py-2 border rounded"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      className="w-1/2 px-3 py-2 border rounded"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value="active"
                      className="mr-1"
                      checked={status === "active"}
                      onChange={() => setStatus("active")}
                    />
                    ACTIVE
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="inactive"
                      className="mr-1"
                      checked={status === "inactive"}
                      onChange={() => setStatus("inactive")}
                    />
                    INACTIVE
                  </label>
                </div>
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
              </form>
            </div>
            <div className="flex items-center justify-end p-3 border-t border-slate-200 rounded-b">
              <button
                className="text-red-500 px-2 py-1 text-sm mr-2 focus:outline-none"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white px-3 py-2 text-sm rounded shadow hover:shadow-lg focus:outline-none"
                type="submit"
                onClick={handleSubmit}
              >
                {contact ? "Edit Contact" : "Add Contact"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default ContactForm;
