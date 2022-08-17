import React, { useEffect, useState } from 'react'
import './Chat.css'
import { user } from '../join/Join'
import socketIO from 'socket.io-client'
import Message from '../Message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = 'http://localhost:5000/'
let socket

const Chat = () => {
  const [id, setId] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = () => {
    const message = document.getElementById('ChatInput').value
    socket.emit('message', { id, message })
    document.getElementById('ChatInput').value = ''
  }

  useEffect(() => {
    socket = socketIO(ENDPOINT, {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      alert('Connected!!')
      setId(socket.id)
    })
    // emit means - data bhejna (server pr)
    socket.emit('joined', { user })

    // on means - data recieve from (backend)
    socket.on('welcome', (data) => {
      setMessages([...messages, data])
      // console.log(data.user, data.message)
    })

    socket.on('userjoined', (data) => {
      console.log(data.user, data.message)
    })

    socket.on('leave', (data) => {
      setMessages([...messages, data])
      // console.log(data.user, data.message)
    })

    return () => {
      socket.emit('disconnect')
      socket.off()
    }
  }, [])

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages([...messages, data])
      // console.log(data.user, data.message, data.id)
    })

    return () => {
      socket.off()
    }
  }, [messages])

  return (
    <div className='ChatPage'>
      <div className='ChatContainer'>
        <div className='Header'></div>
        <ReactScrollToBottom className='ChatBox'>
          {messages.map((item, index) => (
            <Message
              key={index}
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className='InputBox'>
          <input type='text' id='ChatInput' />
          <button onClick={sendMessage} className='ChatSendBtn'>
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
