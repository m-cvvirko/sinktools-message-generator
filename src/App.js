// src/App.js
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [endpoint, setEndpoint] = useState('https://localhost:1234/messages');
    const [message, setMessage] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [idCounter, setIdCounter] = useState(1);

    useEffect(() => {
        if (message.trim()) {
            const now = new Date();
            const formattedTimestamp = now.toISOString();
            setTimestamp(formattedTimestamp);
        } else {
            setTimestamp('');
        }
    }, [message]);

    const sendMessage = async () => {
        const newMessage = {
            id: idCounter,
            timestamp: timestamp,
            message: message,
        };

        try {
            await axios.post(endpoint, newMessage);
            console.log('Message sent:', newMessage);

            setMessage('');
            setTimestamp('');
            setIdCounter(idCounter + 1);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Sink Tools Message Generator</h1>
                <div>
                    <div className="info">
                        Endpoint: <input className="endpoint"
                            type="text"
                            value={endpoint}
                            onChange={(e) => setEndpoint(e.target.value)}
                            placeholder="https://your-endpoint.com/messages"
                        />
                    </div>
                    <div>
                      <textarea className="textarea"
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here"
                      />
                    </div>
                    <div className="info">
                        Generated Timestamp: {timestamp && (
                            <span>{timestamp}</span>
                        )}
                    </div>
                    <div>
                        <button className="trigger-btn" onClick={sendMessage}>Send Message</button>
                    </div>
                </div>
            </header>


        </div>
    );
};

export default App;
