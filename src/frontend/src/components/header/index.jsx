import styles from './styles.module.scss';
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`${styles.header} ${menuOpen ? styles.menuActive : ''}`}>
      <div className={styles.header__container}>
        <img
          src="/src/assets/logo-inspetec.png"
          alt="Logo"
          className={styles.header__container__img}
        />
        <button
          className={styles.header__menuButton}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <img src="/src/assets/close.svg" alt="Fechar menu" />
          ) : (
            <img src="/src/assets/menu.svg" alt="Abrir menu" />
          )}
        </button>
      </div>

      <nav className={`${styles.header__nav} ${menuOpen ? styles.open : ''}`}>
        <ul className={styles.header__nav__ul}>
          <li
            className={`${styles.header__nav__ul__li} ${
              !location.pathname.startsWith('/documentos-inspecao') &&
              !location.pathname.startsWith('/projetos')
                ? styles.header__nav__ul__li__not_selected
                : ''
            }`}
          >
            <Link
              to="/documentos-inspecao"
              className={`${styles.header__nav__ul__li__a} ${
                location.pathname.startsWith('/documentos-inspecao') ||
                location.pathname.startsWith('/projetos')
                  ? styles.header__nav__ul__li__a__selected
                  : styles.header__nav__ul__li__a__not_selected
              }`}
            >
              Projetos
            </Link>
          </li>
          <li
            className={`${styles.header__nav__ul__li} ${
              location.pathname !== '/dispositivos-cadastrados'
                ? styles.header__nav__ul__li__not_selected
                : ''
            }`}
          >
            <Link
              to="/dispositivos-cadastrados"
              className={`${styles.header__nav__ul__li__a} ${
                location.pathname === '/dispositivos-cadastrados'
                  ? styles.header__nav__ul__li__a__selected
                  : styles.header__nav__ul__li__a__not_selected
              }`}
            >
              Dispositivos Cadastrados
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
