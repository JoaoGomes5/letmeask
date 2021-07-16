
import { FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


import { database } from '../services/firebase';
import { useAuth } from '../Hooks/useAuth';
import { Button } from '../components/Button'

import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'
import { useEffect } from 'react';


type Questions = Record<string, {
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type Question = {
  id: string,
  author: {
    name: string,
    avatar: string,
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}

type RoomParams = {
  id: string
}

export function Room(){

  const { user } = useAuth();
  const { id } = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  
  async function handleSendQuestion(event: FormEvent) {
      event.preventDefault()

      if(newQuestion.trim() === ''){
        return;
      }

      if(!user) {
        throw new Error('You must be logged in');
      }

      const question = {
        content: newQuestion,
        author: {
          name: user.name,
          avatar: user.avatar,
        },
        isHighlighted: false,
        isAnswered: false
      }
      
      toast.success('Question sented!', {
        style: {
          border: '1px solid #991F36',
          padding: '16px',
          color: '#991F36',
        },
        iconTheme: {
          primary: '#991F36',
          secondary: '#FFFAEE',
        },
      });
      await database.ref(`rooms/${id}/questions`).push(question);


      setNewQuestion('')
  }

  useEffect(() => {
    const roomRef = database.ref(`rooms/${id}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const broughtQuestions: Questions = databaseRoom.questions ?? {};
      
      const parsedQuestions = Object.entries(broughtQuestions).map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          }
      })
      
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  },[id])

  return (
    <div id="page-room">
     <header>
        
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode 
            code={id}
          />
        </div>
      </header>

      <main >
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} Question(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="What do you want to ask?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                To submit a question,    
                <Link to='/'> 
                  you need to login 
                </Link>.
              </span>
            )}
            
            <Button
              type="submit"
              disabled={!user}
            >
              Send question
            </Button>
            <Toaster
              toastOptions={{
                duration: 2000
              }}
            />

          </div>
        </form>

        {JSON.stringify(questions)}
      </main>


    </div>
  );
}