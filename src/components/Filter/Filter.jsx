import styles from '../Filter/Filter.module.css'

const Filter = ({ filter, onFilterChange }) => {
  const onChange = e => {
    onFilterChange(e.target.value);
  };
  return (
    <label className={styles.find_label}>
      Find contacts by name
      <input className={styles.find_input} type="text" value={filter} onChange={onChange} name="filter" />
    </label>
  );
};

export default Filter;