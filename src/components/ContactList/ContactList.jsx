import styles from '../ContactList/ContactList.module.css';

const ContactList = ({ contact, onDeleteContact }) => (
  <ul className={styles.contact_list}>
    {contact.map(({ id, name, number }) => (
      <li className={styles.сontact_list_item} key={id}>
        <span>{name} :</span>
        <span> {number} </span>
        <button
          className={styles.contact_list_btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          {' '}
          Del
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;