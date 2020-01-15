import React, {useEffect, useState} from 'react';
import './styles.css';

export default function Form({ onSubmit }){
    
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    const [github_user, setGithub_user] = useState([])
    const [techs, setTechs] = useState([])
    const [codeForIdConfirmation, setCodeForIdConfirmation] = useState('')
    const [confirmOfCodeForId, setConfirmOfCodeForId] = useState('')


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords 
    
            setLatitude(latitude)
            setLongitude(longitude)
        }, 
        (error) => {
    
        },{
          timeout: 30000,
        })
      }, [])

    async function handleSubmit(e){
        e.preventDefault()

        await onSubmit({
            github_user,
            techs,
            longitude,
            latitude, 
            codeForIdConfirmation,
            codeForIdConfirmation_confirm: confirmOfCodeForId
          })

        setGithub_user('')
        setTechs('')
        setCodeForIdConfirmation('')
        setConfirmOfCodeForId('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input_block">
                <label htmlFor="github_user">Usuário do GitHub</label>
                <input 
                name="github_user" 
                id="github_user" 
                required
                value={github_user}
                onChange={e => setGithub_user(e.target.value)}
                ></input>
            </div>

            <div className="input_block">
                <label htmlFor="techs">Tecnologias</label>
                <input 
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}
                ></input>
            </div>

            <div className="input_block">
                <label htmlFor="codeForIdConfirmation">Senha para modificações</label>
                <input 
                type="password" 
                name="codeForIdConfirmation" 
                id="codeForIdConfirmation"
                value={codeForIdConfirmation}
                onChange={e => setCodeForIdConfirmation(e.target.value)}
                required></input>
            </div>
            
            <div className="input_block">
                <label htmlFor="confirmOfCode">Confirmação da senha</label>
                <input 
                type="password" 
                name="confirmOfCode" 
                id="confirmOfCode" 
                required
                value={confirmOfCodeForId}
                onChange={e => setConfirmOfCodeForId(e.target.value)}
                ></input>
            </div>

            <div className="input_group">
            
                <div className="input_block">
                    <label htmlFor="latitude">Latitude</label>
                    <input 
                    name="latitude" 
                    id="latitude" 
                    required 
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}></input>
                </div>

                <div className="input_block">
                    <label htmlFor="longitude">Longitutide</label>
                    <input 
                    name="longitude" 
                    id="longitude" 
                    required 
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                    >
                    </input> 
                </div>
            
            </div>

            <button type="submit" id="submitButton">Salvar</button>
        </form>
    )
}