import React, { useState, useEffect } from 'react';
import api from './config/api'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './global.css';
import './sidebar.css';
import './app.css'
import './main.css'

import Form from './components/FormAside'
import Dev from './components/DevCompt'


function App() {

  const [devs, setDevs] = useState([])
  
  useEffect(() => {
    async function getDevs(){
      const dev = await api.get('/devs')
      setDevs(dev.data)
    }
    
    getDevs();
    
  }, [])


  async function saveDev(data){

    await api.post('storeDevs', data).then(
      response => {
        setDevs([...devs, response.data])
      }
    ).catch(err => {
      toast.error(`${err.response.data.error}` , {
        position: "top-right",
        autoClose: 4000,
      });
    })
  }

  async function confirmDeleteDev(data_of_user){
    await api.delete('deleteDev', {data: data_of_user}).then(response => {
      setDevs(devs.filter(dev => dev.github_user !== data_of_user.github_user))
    }).catch(err => {
      toast.error(`${err.response.data.error}` , {
        position: "top-right",
        autoClose: 4000,
      });
    })
  }

  async function confirmUpdateDev(data_of_user){
    await api.post('updateDev', data_of_user).then(response => {
      setDevs(devs.map(dev => dev.github_user !== data_of_user.github_user ? dev : dev = response.data ))
    }).catch(err => {
      toast.error(`${err.response.data.error}` , {
        position: "top-right",
        autoClose: 4000,
      });
    })
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <Form onSubmit={saveDev} />
      </aside>
      
      <main>
        <ul>
          {devs.map(dev => (
            <Dev key={dev._id} dev={dev} onConfirmDelete={confirmDeleteDev} onUpdate={confirmUpdateDev} />
          ))}
        </ul>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
