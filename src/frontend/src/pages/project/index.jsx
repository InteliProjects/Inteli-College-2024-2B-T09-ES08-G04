import styles from "./styles.module.scss";
import Header from "../../components/header/index";
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";


export default function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [modalErrorMessage, setModalErrorMessage] = useState("");
  const [description, setDescription] = useState("");


  const { getAccessTokenSilently } = useAuth0();
  const fetchProjectDetails = async () => {
    try {
      // Obtém o token de autenticação
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);

      // Requisição para obter os detalhes do projeto
      const projectResponse = await api.get(`/api/docs/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setProjectDetails(projectResponse.data.data);

      // Requisição para obter os arquivos do projeto
      const filesResponse = await api.get("/api/docs/files", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const allDocuments = filesResponse.data.data || [];
      const filteredDocuments = allDocuments.filter(
        (doc) => doc.projectId === projectId
      );

      setDocuments(filteredDocuments);
    } catch (error) {
      setErrorMessage(
        "Não foi possível carregar os dados do projeto ou os documentos."
      );
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleViewDocument = async (fileName) => {
    try {

      const accessToken = await getAccessTokenSilently();
      const response = await api.get(`/api/docs/files/download/${fileName}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName.replace(".enc", ""));
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar o documento:", error);
      alert("Erro ao baixar o documento. Tente novamente mais tarde.");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalErrorMessage("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFiles([]);
    setModalErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFiles.length || !description.trim()) {
      setModalErrorMessage(
        "Por favor, adicione pelo menos um arquivo e uma descrição."
      );
      return;
    }

    try {

      const accessToken = await getAccessTokenSilently();
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description);
        formData.append("projectId", projectId);

        await api.post("/api/docs/files/upload", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      alert("Documentos enviados com sucesso!");
      closeModal();
      fetchProjectDetails();
    } catch (error) {
      console.error("Erro ao enviar documentos:", error);
      setModalErrorMessage(
        "Erro ao enviar documentos. Verifique sua conexão e tente novamente."
      );
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);  return (
    <>
      <Header />
      <div className={styles["container--initial"]}>
        <button className={styles["container--initial__back"]} onClick={() => navigate(-1)}>
          <img src="/src/assets/back.svg" alt="Voltar" />
          Voltar
        </button>
        
        <h1 className={styles["container--initial__title"]}>
          {projectDetails ? projectDetails.name : "Carregando..."}
        </h1>
        <p className={styles["container--initial__description"]}>
          {projectDetails ? projectDetails.description : ""}
        </p>

        <div className={styles["container--initial__line"]} />
        <div className={styles["container--initial__div"]}>
          <h2 className={styles["container--initial__div__subtitle"]}>Documentos</h2>
          <button className={styles["container--initial__div__button"]} onClick={openModal}>
            <img src="/src/assets/add.svg" alt="Adicionar Documento" />
            Adicionar Documento
          </button>
        </div>
      </div>

      <div className={styles["container--initial__div__documents"]}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <ul className={styles["container--initial__div__documents__ul"]}>
          {documents.map((doc) => {
            const fileNameWithoutEnc = doc.originalFileName || doc.fileName.replace(".enc", "");

            return (
              <li key={doc._id} className={styles["container--initial__div__documents__ul__li"]}>
                <div className={styles["container--initial__div__documents__ul__li__div"]}>
                  <h2 className={styles["container--initial__div__documents__ul__li__div__title"]}>
                    {fileNameWithoutEnc}
                  </h2>
                  <p className={styles["container--initial__div__documents__ul__li__div__description"]}>
                    Descrição: {doc.description}
                  </p>
                  <p className={styles["container--initial__div__documents__ul__li__div__date"]}>
                    Data: {doc.formattedUploadDate}
                  </p>
                  <button
                    className={styles["container--initial__div__documents__ul__li__div__button"]}
                    onClick={() => handleViewDocument(doc.fileName)}
                  >
                    Download do Documento
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <div
          className={styles.modal}
          onClick={(e) => e.target.classList.contains(styles.modal) && closeModal()}
        >
          <div className={styles.modal__content}>
            <button
              className={styles["modal__button--close"]}
              onClick={closeModal}
              aria-label="Fechar Modal"
            >
              <img src="/src/assets/close.svg" alt="Fechar Modal" />
            </button>
            <h2 className={styles.modal__title}>Cadastrar Documento</h2>

            {modalErrorMessage && <div className={styles.error}>{modalErrorMessage}</div>}

            <form className={styles.modal__form} onSubmit={handleSubmit}>
              <div className={styles["modal__form--group"]}>
                <label htmlFor="fileUpload" className={styles["modal__form--group__label"]}>
                  Upload de arquivos
                </label>
                <div
                  className={styles["modal__form--group__container"]}
                  onClick={() => document.getElementById("fileUpload").click()}
                >
                  <input
                    type="file"
                    id="fileUpload"
                    multiple
                    className={styles["modal__form--group__container__input--file"]}
                    onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                  />
                  <img src="/src/assets/uploud-file.svg" alt="Upload de arquivos" />
                  <span>
                    {selectedFiles.length
                      ? selectedFiles.map((file) => file.name).join(", ")
                      : "Adicione seus documentos"}
                  </span>
                </div>
              </div>

              <div className={styles["modal__form--group"]}>
                <label htmlFor="description" className={styles["modal__form--group__label"]}>
                  Descrição
                </label>
                <textarea
                  id="description"
                  className={styles["modal__form--group__textarea"]}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className={styles.modal__form__button}>
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
