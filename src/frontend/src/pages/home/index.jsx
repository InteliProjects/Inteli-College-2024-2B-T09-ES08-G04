import Header from "../../components/header/index";
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/index";
import {jwtDecode} from "jwt-decode";
import { useAuth0 } from '@auth0/auth0-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [userIdsInput, setUserIdsInput] = useState(''); // Campo para os IDs
  const [userSub, setUserSub] = useState('');
  const navigate = useNavigate();
  const { getIdTokenClaims } = useAuth0();

  const fetchProjects = async () => {
    try {
      const claims = await getIdTokenClaims();
      const idToken = claims.__raw;
      console.log("ID Token:", idToken);

      const decodedToken = jwtDecode(idToken);
      setUserSub(decodedToken.sub);
      console.log("Decoded Token:", decodedToken);

      const response = await api.get('/api/docs/projects/user', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      setProjects(response.data.data);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
      console.error('Erro ao buscar projetos:', error);
    }
  };

  const handleViewProject = (projectId) => {
    navigate(`/projetos/${projectId}`);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setModalErrorMessage('');
    setProjectName('');
    setProjectDescription('');
    setUserIdsInput('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalErrorMessage('');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();

    if (!projectName.trim() || !projectDescription.trim() || !userIdsInput.trim()) {
      setModalErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const userIds = userIdsInput.split(',').map(id => id.trim()); // Converte a string para um array

    const newProject = {
      name: projectName,
      description: projectDescription,
      userId: userIds, // Array de IDs do usuário
      status: 'in progress',
    };

    try {
      await api.post('/api/docs/projects/', newProject);
      alert('Projeto cadastrado com sucesso!');
      closeModal();
      fetchProjects();
    } catch (error) {
      console.error('Erro ao cadastrar o projeto:', error);
      setModalErrorMessage('Erro ao cadastrar o projeto. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  return (
    <>
      <Header />
      <div className={styles["container--initial"]}>
        <h1 className={styles["container--initial__title"]}>Projetos de Inspeção</h1>
        <button className={styles["container--initial__button"]} onClick={openModal}>
          <img src="./src/assets/add.svg" alt="Adicionar Projeto" />
          Cadastrar Projeto de Inspeção
        </button>
      </div>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.container}>
        <ul className={styles.container__ul}>
          {Array.isArray(projects) && projects.map((project) => (
            <li key={project.id} className={styles.container__ul__li}>
              <div className={styles.container__ul__li__div}>
                <h2 className={styles.container__ul__li__div__title}>{project.name}</h2>
                <p className={styles["container__ul__li__div__date"]}>Descrição: {project.description}</p>
                <button
                  className={styles["container__ul__li__div__button"]}
                  onClick={() => handleViewProject(project._id)}
                >
                  Visualizar Projeto
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className={styles.modal} onClick={(e) => e.target.classList.contains(styles.modal) && closeModal()}>
          <div className={styles.modal__content}>
            <button className={styles["modal__button--close"]} onClick={closeModal} aria-label="Fechar Modal">
              <img src="./src/assets/close.svg" alt="Fechar Modal" />
            </button>
            <h2 className={styles.modal__title}>Cadastrar Projeto de Inspeção</h2>

            {modalErrorMessage && <div className={styles.error}>{modalErrorMessage}</div>}

            <form className={styles.modal__form} onSubmit={handleProjectSubmit}>
              <div className={styles["modal__form--group"]}>
                <Input
                  label="Nome do Projeto"
                  type="text"
                  name="name"
                  id="name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className={styles["modal__form--group"]}>
                <Input
                  label="Descrição do Projeto"
                  type="text"
                  name="description"
                  id="description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className={styles["modal__form--group"]}>
                <Input
                  label="IDs dos Usuários (separados por vírgula)"
                  type="text"
                  name="userIds"
                  id="userIds"
                  value={userIdsInput}
                  onChange={(e) => setUserIdsInput(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.modal__form__button}>
                Cadastrar Projeto
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
