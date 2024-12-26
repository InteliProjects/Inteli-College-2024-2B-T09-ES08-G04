import { useState, useEffect } from "react";
import Header from "../../components/header/index";
import styles from "./styles.module.scss";

export default function Devices() {
  const [devices, setDevices] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/devices/test/auth0/users");
        const data = await response.json();

        const formattedDevices = data.map((user) => ({
          name: user.name || "Desconhecido",
          ip: user.last_ip || "N/A",
          date: user.last_login
            ? new Date(user.last_login).toLocaleDateString("pt-BR") 
            : "N/A",
          location: user.location?.city || "Local não especificado",
        }));

        setDevices(formattedDevices);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        console.error("Erro ao buscar dispositivos:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchDevices();
  }, []);

  return (
    <>
      <Header />

      <div className={styles["container--initial"]}>
        <h1 className={styles["container--initial__title"]}>Dispositivos Cadastrados</h1>
      </div>

      {errorMessage && (
        <div className={styles.error}>
          {errorMessage}
        </div>
      )}

      <div className={styles.container}>
        {loading ? (
          <p>Carregando dispositivos...</p>
        ) : (
          <ul className={styles.container__ul}>
            {devices.map((device, index) => (
              <li key={index} className={styles.container__ul__li}>
                <div className={styles.container__ul__li__div}>
                  <h2 className={styles.container__ul__li__div__title}>{device.name}</h2>
                  <p className={styles["container__ul__li__div__ip"]}>Endereço IP: {device.ip}</p>
                  <p className={styles["container__ul__li__div__date"]}>Data: {device.date}</p>
                  <p className={styles["container__ul__li__div__location"]}>Localização: {device.location}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
