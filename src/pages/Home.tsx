import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home(){
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Perguntas e respostas" />
        <strong>Cria salas de Q&amp;A ao-vivo</strong>
        <p>Tira as dúvidas da audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button className="create-room">
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