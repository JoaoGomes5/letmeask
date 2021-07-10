import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

export function NewRoom(){
  

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
            <form>
              <input 
                type="text" 
                placeholder="Nome da sala"
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