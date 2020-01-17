import React, {useState, useEffect} from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import './styles.css'

const customStyles = {
    content : {
      top                   : '50%',
      padding: "10px",
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: "50%",
    }
  };

export default function Devs({ dev, onConfirmDelete, onUpdate }){
    const [showModal, setShowModal] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [codeForDelete, setCodeForDelete] = useState("")

    const [nameDev, setNameDev] = useState('')
    const [bioDev, setBioDev] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [techs, setTechs] = useState([])
    
    useEffect(() => {
        setNameDev(dev.name)
        setBioDev(dev.bio)
        setLatitude(dev.location.coordinates[1])
        setLongitude(dev.location.coordinates[0])
        setTechs(dev.techs.join(', '))
    }, [])

    async function confirmDeleteDev(git, code){
        await onConfirmDelete({
            github_user: git,
            codeForIdConfirmation: code
            
        })

        setCodeForDelete("")
    }

    async function confirmUpdateDev(git, name, latitude, longitude, bio, code, techs){
        onUpdate({
            github_user: git,
            name: name,
            latitude: latitude,
            longitude: longitude,
            bio: bio,
            codeForIdConfirmation: code,
            techs: techs
        })

        // setNameDev(dev.name)
        // setBioDev(dev.bio)
        // setLatitude(dev.location.coordinates[1])
        // setLongitude(dev.location.coordinates[0])
        // setTechs(dev.techs.join(', '))
    }

    return (
        <>
        <li>
            <header>
                <img src={dev.avatar_url}  alt={dev.name} />
                <div className="user_info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            <div id="icons">
                    <FaEdit size={25} color="#8e4dff" style={{cursor: "pointer"}} onClick={() => setShowModalUpdate(true)} />
                    <MdDelete size={25} color="#eb4242" style={{cursor: "pointer", marginLeft: '5px'}} onClick={() => setShowModal(true)} />
                    </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_user}`} target="_blank">Acessar perfil no github</a>
        </li>
        <Modal
            isOpen={showModal}
            // onRequestClose={true}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
                <div id="closeModal">
                    <MdClose size={25} onClick={() => setShowModal(false)} style={{cursor: "pointer", fontWeight: "bold"}} />
                </div>
            <div id="modal">
            <h1>Excluir Dev</h1>
            <p>Insira o código de confirmação informado no cadastro do dev</p>
            <form id="formModal">
              <label htmlFor="codeForDelete">Código de confirmação</label>
              <input 
              type="password" 
              name="codeForDelete" 
              id="codeForDelete"
              value={codeForDelete}
              onChange={e => setCodeForDelete(e.target.value)}
            ></input>
            </form>
            <button onClick={() => {
              confirmDeleteDev(dev.github_user, codeForDelete)
              setShowModal(false)
            }}>Exluir dev</button>
            </div> 
            </div>
            </Modal>
            <Modal
            isOpen={showModalUpdate}
            // onRequestClose={true}
            style={customStyles}
            // contentLabel="Example Modal"
          >
            <div>
                <div id="closeModal">
                    <MdClose size={25} onClick={() => setShowModalUpdate(false)} style={{cursor: "pointer", fontWeight: "bold"}} />
                </div>
            <div id="modal">
            <h1>Editar Dev</h1>
            <p>Edite as informações do Dev</p>
            
            <form id="formModal">            
                <div className="input_block">
                    <label htmlFor="dev_name">Nome do usuário</label>
                    <input 
                    name="dev_name" 
                    id="dev_name"
                    value={nameDev}
                    onChange={e => setNameDev(e.target.value)}
                    ></input>
                </div>

                <div className="input_block">
                    <label htmlFor="techs">Tecnologias</label>
                        <input 
                        name="techs" 
                        id="techs"
                        value={techs}
                        onChange={e => setTechs(e.target.value)}
                    ></input>
                </div>

                <div className="input_group">

                    <div className="input_block">
                        <label htmlFor="latitude">Latitude</label>
                            <input 
                            name="latitude" 
                            id="latitude"
                            value={latitude}
                            onChange={e => setLatitude(e.target.value)}
                        ></input>
                    </div>

                    <div className="input_block">
                        <label htmlFor="longitude">Longitude</label>
                            <input 
                            name="longitude" 
                            id="longitude"
                            value={longitude}
                            onChange={e => setLongitude(e.target.value)}
                        ></input>
                    </div>
                </div>
                
                <div className="input_block">
                    <label htmlFor="bio">Biografia</label>
                        <input 
                        name="bio" 
                        id="bio"
                        value={bioDev}
                        onChange={e => setBioDev(e.target.value)}
                    ></input>
                </div>

                <div className="input_block">
                    <label htmlFor="codeForDelete">Código de confirmação</label>
                    <input 
                    type="password" 
                    name="codeForDelete" 
                    id="codeForDelete"
                    value={codeForDelete}
                    onChange={e => setCodeForDelete(e.target.value)}
                    ></input>
                </div>
            </form>
            <button onClick={() => {
              confirmUpdateDev(dev.github_user, nameDev, latitude, longitude, bioDev, codeForDelete, techs)
              setShowModalUpdate(false)
            }}>Editar dev</button>
            </div> 
            </div>
            </Modal>
        </>
    )
}