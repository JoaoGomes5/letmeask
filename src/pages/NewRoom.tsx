import { FormEvent ,useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../Hooks/useAuth'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'

export function NewRoom(){
  const history = useHistory()
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(e: FormEvent) {
     e.preventDefault()

     if(newRoom.trim() === ''){
       return
     }

     const roomRef = database.ref('rooms');

     const firebaseRoom = await roomRef.push({
       title: newRoom,
       authorId: user?.id
     })

     history.push(`/rooms/${firebaseRoom.key}`)


  }
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Perguntas e respostas" />
        <strong>Cria salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da audiência em real-time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma sala</h2>
            <form
              onSubmit={handleCreateRoom}
            >
              <input 
                type="text" 
                placeholder="Nome da sala"
                value={newRoom}
                onChange={event => setNewRoom(event.target.value)}
              />
              <Button> 
                Criar
              </Button>
            </form>
            <p>
              Quer entrar numa sala que já existe? <Link to="/">Carrega aqui</Link>
            </p>
        
        </div>
      </main>
    </div>
  )
}