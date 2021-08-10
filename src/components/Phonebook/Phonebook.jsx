import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from '../ContactList/ContactList';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import styles from '../Phonebook/Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };
  addContact = contact => {
    if (
      this.state.contacts.some(
        item => item.name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      alert('This contact is already exist!! Try one more time, please!');
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...contact, id: uuidv4() }],
    }));
  };

  onDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  getFilteredContacts() {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    );
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevState) {
    console.log(prevState);
    console.log(this.state);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getFilteredContacts();
    const { filter } = this.state;

    return (
        <div className={ styles.phonebook}>
            <h1>Phonebook</h1>
        <Form addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onFilterChange={this.onFilterChange} />
        {visibleContacts.length > 0 ? (
          <ContactList
            contact={visibleContacts}
            onDeleteContact={this.onDeleteContact}
          />
        ) : (
          <p>No Contacts</p>
        )}
      </div>
    );
  }
}

export default Phonebook;