
import { useHistory } from 'react-router-dom'

import '../styles/auth.scss'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useAuth } from '../Hooks/useAuth'

export function Home(){
  const history = useHistory();
  const { signInWithGoogle , user} = useAuth()

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle()
    }
    
    history.push('rooms/new')
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
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleImg} alt="Google" />
            Criar sala com o Goggle
          </button>
          <div className="separator">  
            ou entra numa sala 
          </div>
            <form>
              <input 
                type="text" 
                placeholder="Código da sala"
              />
              <Button> 
                Entrar na sala
              </Button>
            </form>
        
        </div>
      </main>
    </div>
  )
}


