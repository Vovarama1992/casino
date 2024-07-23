'use client';
import React from 'react';
import styles from './ChatInterface.module.scss';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import SendIcon from './icons/SendIcon';
import AttachIcon from './icons/AttachIcon';
import { useState, useEffect } from 'react';
import { IAppeal } from '@/types/profile';

const ChatInterface = ({ ticket }: { ticket: IAppeal }) => {
  const isMedia768 = useMediaQuery(768);
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  let accessToken = '';

  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken') || '';
  }
  useEffect(() => {
    /*const socketUrl = `wss://${process.env.NEXT_PUBLIC_SOCKET_URL}/ticket/chat/ws?ticket_id=${encodeURIComponent(ticket.id)}&token=${encodeURIComponent(accessToken || '')}`;*/
    const socketUrl = `wss://api.moon-gamble.fans/ws/ticket/${encodeURIComponent(ticket.id)}/?token=${encodeURIComponent(accessToken || '')}`;
    console.log('Connecting to:', socketUrl);

    const ws = new WebSocket(socketUrl);

    let openTime: Date;

    ws.onopen = () => {
      openTime = new Date();
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);

      const messageData = JSON.parse(event.data);

      const messageContent = messageData.content;

      setMessages((prevMessages) => [...prevMessages, messageContent]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = (event) => {
      console.log('closetime');
      const closeTime = new Date();
      console.log('Server closed connection:', event);
      console.log('Close code:', event.code);
      console.log('Close reason:', event.reason);
      console.log('wasClean:', event.wasClean);
      if (openTime) {
        const duration = closeTime.getTime() - openTime.getTime();
        console.log(`WebSocket connection duration: ${duration} ms`);
      }
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [ticket.id]);

  function waitForSocketConnection(socket: WebSocket): Promise<void> {
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (socket.readyState === 1) {
          console.log('Connection is made');
          resolve();
        } else {
          console.log('wait for connection...');
          setTimeout(checkConnection, 5);
        }
      };
      checkConnection();
    });
  }

  const sendMessage = async (socket: WebSocket, content: string) => {
    if (currentMessage.length > 0) {
      await waitForSocketConnection(socket);
      const message = {
        message: content,
      };

      console.log('sendtime');
      socket.send(JSON.stringify(message));
      console.log('message sent!!!' + ' ' + content);
      setCurrentMessage('');
    }
  };

  return (
    <>
      <div className={styles.Chat}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className={styles.InputBox}>
        <input
          className={styles.Input}
          type="text"
          placeholder="Введите сообщение..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <div className={styles.InputButtons}>
          <button className={styles.AttachMediaButton}>
            <AttachIcon />
          </button>
          <button
            className={styles.SendButton}
            onClick={() => {
              if (socket) {
                console.log('sent try');
                sendMessage(socket, currentMessage);
              }
            }}
          >
            {isMedia768 ? <SendIcon /> : 'Отправить'}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
