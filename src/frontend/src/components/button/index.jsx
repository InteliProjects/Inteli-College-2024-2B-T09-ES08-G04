import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function Button({ type, text, onClick }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>{text}</button>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};