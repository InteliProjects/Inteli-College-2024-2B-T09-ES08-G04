import Button from '../../components/button/index';
import Input from '../../components/input/index';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; 
import { setIdToken } from '../../services/axios'; // Importa corretamente setIdToken

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithRedirect, getIdTokenClaims, isAuthenticated } = useAuth0(); 

  useEffect(() => {
    const configureToken = async () => {
      try {
        if (isAuthenticated) {
          const claims = await getIdTokenClaims(); // Obtém as claims do token
          const token = claims.__raw; // Extrai o id_token
          setIdToken(token); // Configura o Axios com o id_token
          console.log("ID Token configurado automaticamente:", token);
        }
      } catch (error) {
        console.error("Erro ao configurar o token automaticamente:", error);
      }
    };

    configureToken(); // Configura o token ao carregar o componente, se autenticado
  }, [isAuthenticated, getIdTokenClaims]);

  const handleEmailChange = (value) => setEmail(value);
  const handlePasswordChange = (value) => setPassword(value);

  const handleLogin = async () => {
    try {
      await loginWithRedirect(); // Realiza o login via Auth0
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__div}>
        <div className={styles.container__div__infos}>
          <img
            className={styles.container__div__infos__image}
            src="./src/assets/logo-inspetec.png"
          />
          <h1 className={styles.container__div__infos__title}>Login</h1>
        </div>
        <form className={styles.container__form}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            name="password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />

          <div className={styles.container__form__div}>
            <Button
              type="button"
              text="Entrar"
              onClick={handleLogin} 
            />
            <Button
              type="button"
              text="Entrar com Google"
              onClick={() =>
                loginWithRedirect({ connection: 'google-oauth2' })}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
