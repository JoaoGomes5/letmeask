
import { ButtonHTMLAttributes } from 'react';
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = ButtonHTMLAttributes<HTMLButtonElement> &  { 
  code: string;
 }

export function RoomCode({ code, ...rest } : RoomCodeProps) {
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(code)
  }

  return (
    <button 
      className="room-code"
      onClick={copyRoomCodeToClipboard}
      {...rest}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Room #{code}</span>
    </button>
  )
}