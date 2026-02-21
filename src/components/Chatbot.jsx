import { useState, useRef, useEffect } from 'react';
import faqData from '../data/knowledgeBase.json';

const MessageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I am the ICU Virtual Assistant. How can I help you today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [isDarkMode]);

    const findAnswer = (query) => {
        const cleanQuery = query.toLowerCase().replace(/[^\w\s]/g, '');

        // Check all categories in our knowledge base
        for (const category in faqData) {
            const faqs = faqData[category];
            for (const faq of faqs) {
                // If any of the patterns match the user's query
                if (faq.questionPatterns.some(pattern => cleanQuery.includes(pattern))) {
                    return faq.answer;
                }
            }
        }

        return "I'm sorry, I couldn't find an answer to that. Please contact support at info@icu.edu for further assistance.";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim();
        setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
        setInputValue('');
        setIsTyping(true);

        // Simulate network delay
        setTimeout(() => {
            const response = findAnswer(userMessage);
            setMessages(prev => [...prev, { text: response, isBot: true }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Widget Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-transform hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'
                    } bg-blue-600 text-white`}
            >
                <MessageIcon />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={`fixed bottom-6 right-6 w-80 sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-colors duration-300 border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
                    }`} style={{ height: '500px' }}>

                    {/* Header */}
                    <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
                                <img src="/logo.png" alt="ICU Logo" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="font-semibold">ICU Assistant</h3>
                        </div>
                        <div className="flex gap-2 text-white/80">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="hover:text-white transition-colors"
                                title="Toggle Theme"
                            >
                                {isDarkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:text-white transition-colors"
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className={`flex-1 p-4 overflow-y-auto flex flex-col gap-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                        {messages.map((msg, idx) => {
                            // Parse URLs in the message text
                            const parts = msg.text.split(/(https?:\/\/[^\s]+)/g);
                            const formattedText = parts.map((part, i) => {
                                if (part.match(/https?:\/\/[^\s]+/)) {
                                    return (
                                        <a
                                            key={i}
                                            href={part}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${msg.isBot && !isDarkMode ? 'text-blue-600' : 'text-blue-300'} hover:underline font-medium`}
                                        >
                                            {part}
                                        </a>
                                    );
                                }
                                return part;
                            });

                            return (
                                <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.isBot
                                            ? isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                                            : 'bg-blue-600 text-white'
                                        } ${msg.isBot ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
                                        {formattedText}
                                    </div>
                                </div>
                            );
                        })}
                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className={`max-w-[80%] rounded-2xl rounded-tl-none px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                                    }`}>
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-100 bg-white'
                        }`}>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your question..."
                                className={`flex-1 px-4 py-2 text-sm rounded-full outline-none focus:ring-2 focus:ring-blue-500 transition-all ${isDarkMode
                                    ? 'bg-gray-800 text-white border-transparent placeholder-gray-400'
                                    : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-transparent'
                                    } border`}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
