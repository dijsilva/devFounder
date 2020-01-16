import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


import './styles.css'

export default function Devs({ dev, onDelete }){
    
    const codeForIdConfirmation = 'c'
    async function deleteDev(git){
        await onDelete({
            github_user: git,
            codeForIdConfirmation
            
        })
    }

    return (
        <li>
            <header>
                <img src={dev.avatar_url}  alt={dev.name} />
                <div className="user_info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            <div id="icons">
                    <FaEdit size={25} color="#8e4dff" style={{cursor: "pointer"}} onClick={() => {}} />
                    <MdDelete size={25} color="#eb4242" style={{cursor: "pointer", marginLeft: '5px'}} onClick={() => {deleteDev(dev.github_user)}} />
                    </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_user}`} target="_blank">Acessar perfil no github</a>
        </li>
    )
}