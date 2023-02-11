const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "bd/contacts.json");

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, JSON.stringify());
  const getAll = JSON.parse(data);
  return getAll;
};

const getContactById = async (contactId) => {
  const getAll = await listContacts();
  const contact = getAll.find((item) => item === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const getAll = await listContacts();
  const ind = getAll.findIndex((item) => item === contactId);
  if (ind === -1) {
    return null;
  }
  const [deleteContact] = getAll.splice(ind, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getAll));
  return deleteContact;
};

const addContact = async (name, email, phone) => {
  const getAll = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  getAll.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAll));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
