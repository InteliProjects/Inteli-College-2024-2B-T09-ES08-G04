import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function Input({ label, type, name, placeholder, value, onChange, id }) {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.container__label}>{label}</label>
      <input
        className={styles.container__input}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
      />
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
