
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useAuth } from '../Hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export function Home(){
  const history = useHistory();
  const [ roomCode , setRoomCode ] = useState('')
  const { signInWithGoogle , user} = useAuth()


  async function handleSignIn() {
    if(!user) {
      await signInWithGoogle()
    }
    
    history.push('rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if(roomCode.trim() === ''){
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if(!roomRef.exists()) {
      toast.success('Room does not exists :(', {
        style: {
          border: '1px solid #EA4335',
          padding: '16px',
          color: '#EA4335',
        },
        iconTheme: {
          primary: '#EA4335',
          secondary: '#FFFAEE',
        },
      });
      return
    }

    history.push(`rooms/${roomCode}`)

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
          <button 
            onClick={handleSignIn}
            className="create-room"
          >
            <img src={googleImg} alt="Google" />
            Criar sala com o Goggle
          </button>
          <div className="separator">  
            ou entra numa sala 
          </div>
            <form onSubmit={handleJoinRoom}>
              <input 
                type="text" 
                placeholder="Código da sala"
                value={roomCode}
                onChange={e => setRoomCode(e.target.value)}
              />
              <Button 
                type="submit" 
              > 
                Entrar na sala
              </Button>
              <Toaster />
            </form>
        
        </div>
      </main>
    </div>
  )
}


