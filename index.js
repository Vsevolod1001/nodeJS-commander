const { program } = require("commander");
const contactsOperation = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsOperation.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const getById = await contactsOperation.getContactById(id);
      if (!getById) {
        throw new Error(`Product with ${id} not found`);
      }
      console.log(getById);
      break;

    case "add":
      const create = await contactsOperation.addContact(name, email, phone);
      console.log(create);
      break;

    case "remove":
      const deleteContact = await contactsOperation.removeContact(id);
      if (deleteContact) {
        throw new Error(`Product with ${id} not found`);
      }
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
