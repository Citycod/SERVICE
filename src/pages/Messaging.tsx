/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  ArrowLeft,
  Image,
  Paperclip,
  Smile,
  Mic,
  Check,
  CheckCheck,
  DollarSign,
  MessageCircle,
} from 'lucide-react'

interface Message {
  id: string
  sender: string
  senderId: string
  recipient: string
  recipientId: string
  content: string
  timestamp: string
  type: 'text' | 'image' | 'file' | 'system'
  status: 'sent' | 'delivered' | 'read'
  replyTo?: string
}

interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar: string
    role: 'buyer' | 'seller'
    online: boolean
    lastSeen?: string
  }
  lastMessage: string
  timestamp: string
  unreadCount: number
  service?: {
    id: string
    title: string
    price: number
    image: string
  }
}

const Messaging = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showConversationList, setShowConversationList] = useState(true)

  // Mock conversations data
  const mockConversations: Conversation[] = [
    {
      id: '1',
      participant: {
        id: 'seller1',
        name: 'Chiamaka Okoro',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
        role: 'seller',
        online: true,
        lastSeen: 'Just now'
      },
      lastMessage: 'Hi, regarding your order for the traditional wedding attire...',
      timestamp: '10:30 AM',
      unreadCount: 2,
      service: {
        id: '1',
        title: 'Traditional Wedding Attire',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=200'
      }
    },
    {
      id: '2',
      participant: {
        id: 'seller2',
        name: 'Oluwaseun Adeyemi',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
        role: 'seller',
        online: false,
        lastSeen: '2 hours ago'
      },
      lastMessage: 'The plumbing repair will be completed by tomorrow.',
      timestamp: 'Yesterday',
      unreadCount: 0,
      service: {
        id: '2',
        title: 'Professional Plumbing Repair',
        price: 15000,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=200'
      }
    },
    {
      id: '3',
      participant: {
        id: 'buyer1',
        name: 'Adebola Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200',
        role: 'buyer',
        online: true,
        lastSeen: '5 min ago'
      },
      lastMessage: 'Thank you for the beautiful dress!',
      timestamp: '09:15 AM',
      unreadCount: 1
    }
  ]

  // Mock messages data
  const mockMessages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        sender: 'Chiamaka Okoro',
        senderId: 'seller1',
        recipient: user?.name || '',
        recipientId: user?.id || '',
        content: 'Hi! Thanks for your interest in my traditional wedding attire service.',
        timestamp: '2024-01-15 10:00',
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        sender: user?.name || '',
        senderId: user?.id || '',
        recipient: 'Chiamaka Okoro',
        recipientId: 'seller1',
        content: 'Hello! I love your work. Can you tell me more about the fabric options?',
        timestamp: '2024-01-15 10:05',
        type: 'text',
        status: 'read'
      },
      {
        id: '3',
        sender: 'Chiamaka Okoro',
        senderId: 'seller1',
        recipient: user?.name || '',
        recipientId: user?.id || '',
        content: 'Of course! I work with premium Ankara, lace, and aso-oke fabrics. Do you have a specific event date?',
        timestamp: '2024-01-15 10:10',
        type: 'text',
        status: 'read'
      },
      {
        id: '4',
        sender: user?.name || '',
        senderId: user?.id || '',
        recipient: 'Chiamaka Okoro',
        recipientId: 'seller1',
        content: 'The wedding is in 4 weeks. Is that enough time?',
        timestamp: '2024-01-15 10:15',
        type: 'text',
        status: 'delivered'
      }
    ]
  }

  useEffect(() => {
    // Simulate API call to load conversations
    setTimeout(() => {
      setConversations(mockConversations)
      setLoading(false)
      
      // Check if we have a conversation from navigation state
     type MessagingLocationState = {
  recipient?: any;
  service?: any;
  initialMessage?: string;
};

const state = (location.state as MessagingLocationState) ?? {};

      
      if (state?.recipient) {
        // Check if conversation already exists
        const existingConversation = mockConversations.find(conv => 
          conv.participant.id === state.recipient.id
        )
        
        if (existingConversation) {
          // Select existing conversation
          handleSelectConversation(existingConversation.id)
          if (state.initialMessage) {
            setNewMessage(state.initialMessage)
          }
        } else {
          // Create new conversation
          const newConversation: Conversation = {
            id: `new-${state.recipient.id}`,
            participant: {
              id: state.recipient.id,
              name: state.recipient.name,
              avatar: state.recipient.avatar,
              role: state.recipient.role as 'buyer' | 'seller',
              online: true,
              lastSeen: 'Just now'
            },
            lastMessage: state.initialMessage || 'New conversation',
            timestamp: new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            }),
            unreadCount: 0,
            service: state.service
          }
          
          setConversations(prev => [newConversation, ...prev])
          handleSelectConversation(newConversation.id)
          if (state.initialMessage) {
            setNewMessage(state.initialMessage)
          }
        }
      }
    }, 1000)
  }, [location.state, user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
    setMessages(mockMessages[conversationId] || [])
    setShowConversationList(false)
    
    // Mark messages as read
    setConversations(prev => prev.map(conv => 
      conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
    ))
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    const conversation = conversations.find(c => c.id === selectedConversation)
    if (!conversation) return

    const newMsg: Message = {
      id: `${Date.now()}`,
      sender: user?.name || '',
      senderId: user?.id || '',
      recipient: conversation.participant.name,
      recipientId: conversation.participant.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sent'
    }

    setMessages(prev => [...prev, newMsg])
    
    // Update conversation last message and timestamp
    setConversations(prev => prev.map(conv => 
      conv.id === selectedConversation 
        ? { 
            ...conv, 
            lastMessage: newMessage, 
            timestamp: new Date().toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })
          }
        : conv
    ))
    
    setNewMessage('')

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
      ))
    }, 1000)

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMsg.id ? { ...msg, status: 'read' } : msg
      ))
    }, 3000)
  }

  const handleBackToConversations = () => {
    setSelectedConversation(null)
    setShowConversationList(true)
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Please Sign In</h2>
          <p className="mb-6 text-gray-600">You need to be signed in to view your messages.</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
        {/* Conversations List */}
        {showConversationList && (
          <div className="flex flex-col w-full border-r border-gray-200 md:w-96">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No conversations found
                </div>
              ) : (
                filteredConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name}
                          className="object-cover w-12 h-12 rounded-full"
                        />
                        {conversation.participant.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {conversation.participant.name}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {conversation.timestamp}
                          </span>
                        </div>
                        
                        <p className="mb-1 text-sm text-gray-600 truncate">
                          {conversation.lastMessage}
                        </p>
                        
                        {conversation.service && (
                          <div className="flex items-center text-xs text-gray-500">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ₦{conversation.service.price.toLocaleString()} • {conversation.service.title}
                          </div>
                        )}
                        
                        {conversation.unreadCount > 0 && (
                          <div className="flex items-center justify-between mt-1">
                            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Chat Area */}
        {selectedConversation && (
          <div className="flex flex-col flex-1">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleBackToConversations}
                  className="p-2 rounded-lg md:hidden hover:bg-gray-100"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="relative">
                  <img
                    src={conversations.find(c => c.id === selectedConversation)?.participant.avatar}
                    alt="Avatar"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                  {conversations.find(c => c.id === selectedConversation)?.participant.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.participant.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.participant.online 
                      ? 'Online' 
                      : `Last seen ${conversations.find(c => c.id === selectedConversation)?.participant.lastSeen}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.senderId === user.id
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.senderId === user.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {message.senderId === user.id && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSend} className="flex items-center space-x-2">
                <button type="button" className="p-2 rounded-lg hover:bg-gray-100">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button type="button" className="p-2 rounded-lg hover:bg-gray-100">
                  <Image className="w-5 h-5 text-gray-600" />
                </button>
                
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type a message..."
                />
                
                <button type="button" className="p-2 rounded-lg hover:bg-gray-100">
                  <Smile className="w-5 h-5 text-gray-600" />
                </button>
                <button type="button" className="p-2 rounded-lg hover:bg-gray-100">
                  <Mic className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-3 text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!selectedConversation && !showConversationList && (
          <div className="flex items-center justify-center flex-1">
            <div className="text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full">
                <MessageCircle className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No Conversation Selected</h3>
              <p className="mb-4 text-gray-600">Choose a conversation from the list to start messaging</p>
              <button 
                onClick={() => setShowConversationList(true)}
                className="btn btn-primary"
              >
                View Conversations
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Messaging