import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import { getContactsThunk } from 'redux/users/users.thunk';

import {
  userAddAction,
  userDeleteAction,
  userFilterAction,
} from 'redux/users/users.slice';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import {
  Main,
  MainTitle,
  SecondartTitle,
} from './TitleAndMainStyled/TitleAndMainStyled.styled';

export const App = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const contacts = useSelector(state => state.contacts.items);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const addUser = data => {
    const findExistsName = contacts.some(contact => contact.name === data.name);
    if (findExistsName) {
      Notify.warning(`${data.name} is already in contacts`);
      return;
    } else {
      const newAbonent = {
        id: nanoid(),
        ...data,
      };
      dispatch(userAddAction(newAbonent));
      // setContacts(prevState => [newAbonent, ...prevState]);
    }
  };

  const handleSearch = e => {
    dispatch(userFilterAction(e.target.value));
  };
  const handleDeleteContact = contactId => {
    dispatch(userDeleteAction(contactId));
    // setContacts(prevState => prevState.filter(item => item.id !== contactId));
  };

  const contactsLenght = contacts.length;
  const newUsers = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Main>
      <MainTitle>PhoneBook</MainTitle>
      <ContactForm onSubmit={addUser} />

      <SecondartTitle>Contacts</SecondartTitle>
      <Filter filterValue={filter} onSearch={handleSearch} />
      {contactsLenght > 0 && (
        <ContactList users={newUsers} onDeleteContact={handleDeleteContact} />
      )}
    </Main>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.number.isRequired,
      number: PropTypes.number,
    })
  ),
  filter: PropTypes.string,
};
