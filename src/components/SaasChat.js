import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Send, Paperclip, ChevronDown, Moon, Sun, 
  HelpCircle, MoreVertical, Download, Share2, 
  User, Search, Pin, Sparkles, Bell, ChevronRight, 
  ArrowRight, FileText, Zap, Briefcase, Code, 
  BookOpen, Mail, Cpu, Monitor, Database } from 'lucide-react';

// Portfolio sections data
const portfolioSections = [
  {
    id: 'education',
    title: 'Education',
    icon: <BookOpen size={16} />,
    expanded: false,
    items: [
      {
        id: 'education-1',
        title: 'Computer Science Degree',
        preview: 'Bachelor of Computer Science, 2018-2022',
        timestamp: '2022',
      },
      {
        id: 'education-2',
        title: 'Machine Learning Certification',
        preview: 'Advanced ML and Deep Learning, 2023',
        timestamp: '2023',
      }
    ]
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: <Briefcase size={16} />,
    expanded: false,
    items: [
      {
        id: 'experience-1',
        title: 'Software Engineer',
        preview: 'TechCorp Inc., 2022-Present',
        timestamp: '2022-Present',
      },
      {
        id: 'experience-2',
        title: 'ML Research Intern',
        preview: 'AI Solutions Lab, Summer 2021',
        timestamp: '2021',
      }
    ]
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: <Code size={16} />,
    expanded: false,
    items: [
      {
        id: 'project-1',
        title: 'AI Chat Assistant',
        preview: 'React, Python, LangChain, ChatGroq',
        timestamp: '2024',
      },
      {
        id: 'project-2',
        title: 'Data Visualization Dashboard',
        preview: 'React, D3.js, Express, MongoDB',
        timestamp: '2023',
      },
      {
        id: 'project-3',
        title: 'E-commerce Platform',
        preview: 'Next.js, Stripe, Firebase, Tailwind CSS',
        timestamp: '2022',
      }
    ]
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <Cpu size={16} />,
    expanded: false,
    items: [
      {
        id: 'skills-frontend',
        title: 'Frontend Development',
        preview: 'React, Next.js, Tailwind CSS, TypeScript',
        timestamp: '',
      },
      {
        id: 'skills-backend',
        title: 'Backend Development',
        preview: 'Python, Node.js, Express, Django',
        timestamp: '',
      },
      {
        id: 'skills-ai',
        title: 'AI & Machine Learning',
        preview: 'LangChain, PyTorch, TensorFlow, LLMs',
        timestamp: '',
      },
      {
        id: 'skills-databases',
        title: 'Databases',
        preview: 'MongoDB, PostgreSQL, Firebase, Redis',
        timestamp: '',
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact',
    icon: <Mail size={16} />,
    expanded: false,
    items: [
      {
        id: 'contact-email',
        title: 'Email',
        preview: 'yourname@example.com',
        timestamp: '',
      },
      {
        id: 'contact-linkedin',
        title: 'LinkedIn',
        preview: 'linkedin.com/in/yourprofile',
        timestamp: '',
      },
      {
        id: 'contact-github',
        title: 'GitHub',
        preview: 'github.com/yourusername',
        timestamp: '',
      }
    ]
  }
];

// Sample pre-loaded messages for each portfolio item
const portfolioItemMessages = {
  'education-1': [
    {
      id: 1,
      sender: "ai",
      content: "I completed my Bachelor of Computer Science from University Tech from 2018 to 2022. My major was in Artificial Intelligence and Machine Learning with a minor in Data Science. I graduated with honors and a 3.8 GPA.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'education-2': [
    {
      id: 1,
      sender: "ai",
      content: "In 2023, I earned an Advanced Machine Learning and Deep Learning certification from AI Institute. The program covered neural networks, reinforcement learning, computer vision, and NLP. I completed several practical projects including building a real-time object detection system.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'experience-1': [
    {
      id: 1,
      sender: "ai",
      content: "I've been working as a Software Engineer at TechCorp Inc. since 2022. My responsibilities include developing and maintaining web applications using React, implementing backend services with Node.js, and integrating AI models to enhance user experiences. I've led several key projects and collaborated with cross-functional teams to deliver innovative solutions.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'experience-2': [
    {
      id: 1,
      sender: "ai",
      content: "During Summer 2021, I worked as an ML Research Intern at AI Solutions Lab. I contributed to a project focused on improving natural language understanding in conversational AI systems. I implemented and evaluated several transformer-based models, conducted extensive data analysis, and co-authored a research paper presented at a workshop.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'project-1': [
    {
      id: 1,
      sender: "ai",
      content: "My AI Chat Assistant project is an interactive portfolio website that simulates an AI chat experience. It uses React and Tailwind CSS for the frontend with Python, LangChain, and ChatGroq powering the backend. The system allows visitors to explore my portfolio through natural conversation, asking questions about my projects, skills, and experience.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'project-2': [
    {
      id: 1,
      sender: "ai",
      content: "The Data Visualization Dashboard is a comprehensive analytics platform built with React and D3.js. It features interactive charts, real-time data updates, and customizable views. The backend uses Express and MongoDB to manage and serve data efficiently. The project demonstrates my skills in data visualization, frontend development, and backend integration.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'project-3': [
    {
      id: 1,
      sender: "ai",
      content: "I developed a full-featured E-commerce Platform using Next.js, integrated with Stripe for payments and Firebase for authentication and database. The UI was built with Tailwind CSS for a responsive, modern design. Features include product catalog, user accounts, shopping cart, checkout process, order history, and admin dashboard for inventory management.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'skills-frontend': [
    {
      id: 1,
      sender: "ai",
      content: "My frontend development skills include proficiency in React, Next.js, Tailwind CSS, and TypeScript. I've built numerous responsive web applications with focus on performance, accessibility, and user experience. I'm experienced with state management solutions like Redux and Context API, as well as testing frameworks such as Jest and React Testing Library.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'skills-backend': [
    {
      id: 1,
      sender: "ai",
      content: "In backend development, I'm proficient in Python, Node.js, Express, and Django. I've developed RESTful APIs, implemented authentication systems, and built scalable microservices architectures. I'm experienced in writing efficient server-side code, handling database operations, and implementing security best practices.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'skills-ai': [
    {
      id: 1,
      sender: "ai",
      content: "My AI and Machine Learning skills include experience with LangChain for building conversational AI systems, PyTorch and TensorFlow for developing and training machine learning models, and working with various Large Language Models (LLMs). I've implemented computer vision algorithms, natural language processing systems, and recommendation engines for practical applications.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'skills-databases': [
    {
      id: 1,
      sender: "ai",
      content: "I'm skilled in working with various database technologies including MongoDB, PostgreSQL, Firebase, and Redis. I can design efficient database schemas, optimize queries for performance, implement data migration strategies, and ensure data integrity and security. I've used these technologies in production environments across multiple projects.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'contact-email': [
    {
      id: 1,
      sender: "ai",
      content: "You can reach me via email at yourname@example.com. I typically respond within 24-48 hours.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'contact-linkedin': [
    {
      id: 1,
      sender: "ai",
      content: "Connect with me on LinkedIn at linkedin.com/in/yourprofile. I regularly share industry insights and updates about my latest projects.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
  'contact-github': [
    {
      id: 1,
      sender: "ai",
      content: "Check out my open-source contributions and projects on GitHub at github.com/yourusername. I maintain several repositories including code samples from my portfolio projects.",
      timestamp: "Just now",
      status: "delivered"
    }
  ],
};

// Initial welcome message
const welcomeMessage = {
  id: 0,
  sender: "ai",
  content: "👋 Hi there! I'm the interactive portfolio assistant for [Your Name]. Feel free to explore my education, experience, projects, skills, or contact information by selecting a category from the sidebar. You can also ask me any questions about my background or work!",
  timestamp: "Just now",
  status: "delivered"
};

// Available AI models (representing portfolio interaction modes)
const aiModels = [
  { id: 1, name: "Portfolio AI", description: "Interactive Q&A about portfolio items", tier: "premium" },
  { id: 2, name: "Resume Mode", description: "Structured information from my resume", tier: "standard" },
  { id: 3, name: "Casual Chat", description: "More conversational, personal perspective", tier: "basic" }
];

const THEME_COLORS = {
  light: {
    primary: "#4F46E5", // Deeper indigo
    secondary: "#A5B4FC", // Lighter indigo
    accent: "#E11D48", // Rose
    success: "#059669", // Emerald
    warning: "#D97706", // Amber
    danger: "#DC2626", // Red
    info: "#2563EB", // Blue
    gradient: "linear-gradient(135deg, #4F46E5, #7C3AED)" // Indigo to purple
  },
  dark: {
    primary: "#6366F1", // Indigo for dark mode
    secondary: "#4F46E5", // Deeper indigo
    accent: "#FB7185", // Lighter rose
    success: "#10B981", // Emerald
    warning: "#F59E0B", // Amber
    danger: "#EF4444", // Red
    info: "#3B82F6", // Blue
    gradient: "linear-gradient(135deg, #6366F1, #8B5CF6)" // Indigo to purple
  }
};

const PortfolioChat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sections, setSections] = useState(portfolioSections);
  const [activeItem, setActiveItem] = useState(null);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(aiModels[0]);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [progress, setProgress] = useState({ status: 'online', usage: 42 }); // New status state
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  
  const colors = darkMode ? THEME_COLORS.dark : THEME_COLORS.light;

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [newMessage]);

  // Load messages when active item changes
  useEffect(() => {
    if (activeItem) {
      // Load pre-defined messages for this portfolio item
      if (portfolioItemMessages[activeItem.id]) {
        setMessages(portfolioItemMessages[activeItem.id]);
      } else {
        // If no specific messages are defined, use a generic introduction
        setMessages([{
          id: 1,
          sender: "ai",
          content: `This is information about ${activeItem.title}. Feel free to ask me any specific questions!`,
          timestamp: "Just now",
          status: "delivered"
        }]);
      }
    } else {
      setMessages([welcomeMessage]);
    }
  }, [activeItem]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: "delivered"
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        content: "I'm processing your request. In a real implementation, this response would be generated by your Python backend with LangChain and ChatGroq.",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: "delivered"
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Show notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Update progress
      setProgress(prev => ({ ...prev, usage: prev.usage + 2 }));
    }, 1500);
  };

  // Toggle section expansion
  const toggleSectionExpand = (sectionId) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, expanded: !section.expanded } : section
    ));
  };

  // Filter sidebar items based on search
  const filteredSections = sections.map(section => {
    // If search query exists, filter the items
    if (searchQuery) {
      const filteredItems = section.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.preview.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Return section with filtered items (if any match)
      return {
        ...section,
        items: filteredItems,
        // Auto-expand sections that have matching items
        expanded: filteredItems.length > 0 ? true : section.expanded
      };
    }
    
    // If no search query, return section as is
    return section;
  });

  return (
    <div 
      className={`flex h-screen w-full bg-slate-50 text-slate-900 font-sans ${darkMode ? 'dark' : ''}`}
      style={{
        '--color-primary': colors.primary,
        '--color-secondary': colors.secondary,
        '--color-accent': colors.accent,
        '--color-success': colors.success,
        '--color-warning': colors.warning,
        '--color-danger': colors.danger,
        '--color-info': colors.info,
        '--color-gradient': colors.gradient
      }}
    >
      {/* Notification system */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-3 rounded-xl shadow-lg z-50 animate-fade-in-out flex items-center border-l-4 border-indigo-500 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <Bell size={18} className="text-indigo-500 mr-2" />
          <span className="font-medium">New response received</span>
        </div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-80' : 'w-0'} lg:w-80 bg-white dark:bg-slate-800 transition-all duration-300 flex flex-col h-full relative overflow-hidden shadow-lg z-10 border-r border-slate-200 dark:border-slate-700`}
      >
        {/* Sidebar toggle for mobile */}
        <button 
          className="lg:hidden absolute -right-10 top-4 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg z-10"
          style={{ background: colors.gradient }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? 
            <X size={20} className="text-white" /> : 
            <Menu size={20} className="text-white" />
          }
        </button>
        
        {sidebarOpen && (
          <>
            {/* Sidebar header */}
            <div className="py-6 px-5 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: colors.gradient }}>
                  <User size={22} />
                </div>
                <div>
                  <h1 className="font-bold text-xl dark:text-white">Your Name</h1>
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Software Engineer & AI Developer</span>
                  </div>
                </div>
              </div>
              
              {/* Status indicator */}
              <div className="mt-5 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">AI Assistant Online</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-24 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(progress.usage / 100) * 100}%`,
                        background: colors.gradient
                      }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{progress.usage}%</span>
                </div>
              </div>
            </div>
            
            {/* Portfolio actions */}
            <div className="px-5 py-4 grid grid-cols-2 gap-3">
              <button 
                className="py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all text-white shadow-md hover:shadow-lg active:shadow-sm"
                style={{ background: colors.gradient }}
                onClick={() => setResumeOpen(true)}
              >
                <Download size={15} />
                <span className="text-sm font-medium">Resume</span>
              </button>
              <button 
                className="py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setAboutOpen(true)}
              >
                <InfoIcon size={15} />
                <span className="text-sm font-medium">About</span>
              </button>
            </div>
            
            {/* Search */}
            <div className="px-5 py-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search portfolio..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-slate-900 dark:text-white text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400" />
                {searchQuery && (
                  <button 
                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
            
            {/* Portfolio sections */}
            <div className="flex-1 overflow-y-auto pb-4 px-3 scrollbar-thin">
              {filteredSections.map(section => (
                <div key={section.id} className="mb-3">
                  <button 
                    className="w-full px-3 py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/70 rounded-lg transition-colors"
                    onClick={() => toggleSectionExpand(section.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-50 dark:bg-slate-700 text-indigo-500 dark:text-indigo-400">
                        {section.icon}
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </div>
                    <ChevronRight 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-200 ${section.expanded ? 'transform rotate-90' : ''}`} 
                    />
                  </button>
                  
                  {/* Section items */}
                  {section.expanded && section.items.length > 0 && (
                    <div className="ml-12 mt-2 space-y-1.5 pr-2">
                      {section.items.map(item => (
                        <div 
                          key={item.id}
                          className={`p-2.5 rounded-lg cursor-pointer transition-all relative group ${
                            activeItem && activeItem.id === item.id
                              ? 'bg-indigo-50 dark:bg-slate-700 shadow-sm'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          }`}
                          onClick={() => setActiveItem(item)}
                        >
                          <div className="flex items-start">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-sm truncate dark:text-white">{item.title}</h3>
                                {item.timestamp && (
                                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 whitespace-nowrap">{item.timestamp}</span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-1">{item.preview}</p>
                            </div>
                          </div>
                          
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Empty state for section with no matching items */}
                  {section.expanded && section.items.length === 0 && (
                    <div className="ml-12 mt-2 mb-3 px-3 py-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      No matching items found
                    </div>
                  )}
                </div>
              ))}
              
              {/* Empty search results */}
              {filteredSections.every(section => section.items.length === 0) && searchQuery && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search size={40} className="text-slate-300 dark:text-slate-600 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 font-medium">No portfolio items found</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try different search terms</p>
                </div>
              )}
            </div>
            
            {/* Sidebar footer */}
            <div className="mt-auto p-5 border-t border-slate-100 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-600 flex items-center justify-center text-indigo-500">
                    <CodeIcon size={15} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Pro Plan</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Unlimited access</span>
                  </div>
                </div>
                <button 
                  className="p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                  onClick={() => setSettingsOpen(!settingsOpen)}
                >
                  <MoreVertical size={20} />
                </button>
              </div>
              
              {/* Social links */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-4">
                  <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <CodeIcon size={16} />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <User size={16} />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-indigo-100 dark:hover:bg-slate-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Mail size={16} />
                  </a>
                </div>
                <button 
                  className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
              
              {/* Settings menu */}
              {settingsOpen && (
                <div className="mt-4 bg-white dark:bg-slate-700 rounded-xl shadow-lg p-2 space-y-1 animate-fade-in">
                  <button 
                    className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? (
                      <>
                        <Sun size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm dark:text-white">Light mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={16} className="text-slate-500 dark:text-slate-400" />
                        <span className="text-sm dark:text-white">Dark mode</span>
                      </>
                    )}
                  </button>
                  <button 
                    className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    onClick={() => setResumeOpen(true)}
                  >
                    <Download size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-sm dark:text-white">Download resume</span>
                  </button>
                  <button 
                    className="w-full flex items-center space-x-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
                    onClick={() => setAboutOpen(true)}
                  >
                    <HelpCircle size={16} className="text-slate-500 dark:text-slate-400" />
                    <span className="text-sm dark:text-white">About this site</span>
                  </button>
                </div>
              )}
              
              {/* About Popup */}
              {aboutOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-lg m-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold dark:text-white">About This Portfolio</h3>
                      <button 
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                        onClick={() => setAboutOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                      This interactive portfolio simulates an AI chat experience to showcase my skills, experience, and projects. It combines modern UI design with conversational AI to create an engaging way to explore my work.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-5">
                        <h4 className="font-medium text-lg mb-3 dark:text-white">Technologies Used</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-indigo-500">
                              <Monitor size={20} />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm dark:text-white">Frontend</h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400">React & Tailwind CSS</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-indigo-500">
                              <Database size={20} />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm dark:text-white">Database</h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400">MongoDB</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-indigo-500">
                              <Code size={20} />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm dark:text-white">Backend</h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400">Python & LangChain</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-indigo-500">
                              <Cpu size={20} />
                            </div>
                            <div>
                              <h5 className="font-medium text-sm dark:text-white">AI Model</h5>
                              <p className="text-xs text-slate-600 dark:text-slate-400">ChatGroq LLM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-lg dark:text-white">How It Works</h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          The system uses LangChain to provide context about my portfolio to the LLM. You can ask questions about my experience, education, skills, and projects, and the AI will respond with relevant information.
                        </p>
                        
                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                          Feel free to explore different sections and ask specific or open-ended questions about my work and background!
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button 
                        className="px-6 py-3 rounded-xl text-sm font-medium text-white shadow-md hover:shadow-lg transition-all"
                        style={{ background: colors.gradient }}
                        onClick={() => setAboutOpen(false)}
                      >
                        Continue Exploring
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Resume Popup */}
              {resumeOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-lg m-4 animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold dark:text-white">Download Resume</h3>
                      <button 
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                        onClick={() => setResumeOpen(false)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-slate-700 p-5 rounded-xl mb-8 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-600 shadow-sm flex items-center justify-center text-indigo-500 mr-4">
                          <FileText size={24} />
                        </div>
                        <div>
                          <h4 className="font-medium text-lg dark:text-white">Resume_YourName.pdf</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Updated February 2024 • 2 pages</p>
                        </div>
                      </div>
                      <a 
                        href="/path/to/your/resume.pdf" 
                        download 
                        className="p-2.5 bg-white dark:bg-slate-600 rounded-lg text-indigo-500 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-500 transition-colors shadow-sm"
                      >
                        <Download size={20} />
                      </a>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-lg dark:text-white">Available formats</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <button className="py-4 px-5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl flex items-center justify-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
                          <FileText size={20} className="text-indigo-500" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">PDF Format</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Best for printing</span>
                          </div>
                        </button>
                        <button className="py-4 px-5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl flex items-center justify-center space-x-3 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm">
                          <FileText size={20} className="text-indigo-500" />
                          <div className="text-left">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 block">DOCX Format</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Editable version</span>
                          </div>
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end space-x-4">
                      <button 
                        className="px-5 py-3 border border-slate-300 dark:border-slate-600 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() => setResumeOpen(false)}
                      >
                        Cancel
                      </button>
                      <a 
                        href="/path/to/your/resume.pdf" 
                        download 
                        className="px-5 py-3 rounded-xl text-sm font-medium text-white shadow-md hover:shadow-lg transition-all flex items-center space-x-2"
                        style={{ background: colors.gradient }}
                        onClick={() => setResumeOpen(false)}
                      >
                        <span>Download PDF</span>
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Main chat and media area - Two-column layout */}
      <div className="flex-1 flex h-full bg-slate-50 dark:bg-slate-900 relative">
        {/* Left column - Chat content */}
        <div className="flex-1 flex flex-col h-full border-r border-slate-200 dark:border-slate-700">
          {/* Chat header */}
          <div className="h-16 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 bg-white dark:bg-slate-800 shadow-sm z-10">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-indigo-500 mr-3">
                {activeItem ? (
                  activeItem.id.includes('project') ? <Code size={16} /> :
                  activeItem.id.includes('experience') ? <Briefcase size={16} /> :
                  activeItem.id.includes('education') ? <BookOpen size={16} /> :
                  activeItem.id.includes('skills') ? <Cpu size={16} /> :
                  <Mail size={16} />
                ) : (
                  <Sparkles size={16} />
                )}
              </div>
              <div>
                <h2 className="font-semibold dark:text-white">
                  {activeItem ? activeItem.title : "AI Portfolio Assistant"}
                </h2>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {activeItem ? 
                      (activeItem.id.includes('project') ? "Project Details" : 
                      activeItem.id.includes('experience') ? "Work Experience" :
                      activeItem.id.includes('education') ? "Educational Background" :
                      activeItem.id.includes('skills') ? "Technical Expertise" :
                      "Contact Information") : "Interactive Portfolio"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {activeItem && (
                <>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400" title="Share this section">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-500 dark:text-slate-400" title="Download information">
                    <Download size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
          
          {/* Chat messages - Perplexity style */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {messages.map(message => (
              <div key={message.id} className="py-6 px-8">
                {message.sender === 'user' ? (
                  // User message - Perplexity style
                  <div className="mb-8">
                    <div className="flex items-center mb-3">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-slate-700 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mr-3 shadow-sm">
                        <User size={14} />
                      </div>
                      <span className="font-medium text-sm text-slate-900 dark:text-white">Your Question</span>
                    </div>
                    <div className="ml-10 text-slate-800 dark:text-slate-200 text-base leading-relaxed">{message.content}</div>
                  </div>
                ) : (
                  // AI message - Perplexity style
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-7 h-7 rounded-full" style={{ background: colors.gradient }}>
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <Sparkles size={14} />
                        </div>
                      </div>
                      <span className="font-medium text-sm text-slate-900 dark:text-white ml-3">Portfolio AI</span>
                      <div className="ml-2 px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        Pro
                      </div>
                    </div>
                    
                    {/* AI response with improved formatting */}
                    <div className="ml-10 text-slate-800 dark:text-slate-200 leading-relaxed">
                      <div className="prose dark:prose-invert max-w-none prose-p:my-3 prose-p:leading-relaxed prose-ul:my-3 prose-li:my-1">
                        {message.content}
                      </div>
                      
                      {/* Citation section */}
                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center text-xs text-slate-500 dark:text-slate-400">
                        <span className="mr-3 font-medium">Sources:</span>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">Portfolio</span>
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">Resume</span>
                          {activeItem && activeItem.id.includes('project') && 
                            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs">GitHub</span>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="py-6 px-8">
                <div className="flex items-center mb-4">
                  <div className="w-7 h-7 rounded-full" style={{ background: colors.gradient }}>
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <Sparkles size={14} />
                    </div>
                  </div>
                  <span className="font-medium text-sm text-slate-900 dark:text-white ml-3">Portfolio AI</span>
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">thinking...</span>
                </div>
                <div className="ml-10 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-0"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="flex-1 flex items-center bg-slate-100 dark:bg-slate-700 rounded-xl pr-3 focus-within:ring-2 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400 shadow-sm">
                <textarea
                  ref={textareaRef}
                  className="flex-1 px-4 py-3.5 resize-none focus:outline-none bg-transparent dark:text-white placeholder-slate-500 dark:placeholder-slate-400 text-base"
                  placeholder={activeItem 
                    ? `Ask me about ${activeItem.title}...` 
                    : "Ask me about my education, projects, experience, or skills..."}
                  rows={1}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"
                  title="Attach files"
                >
                  <Paperclip size={18} />
                </button>
              </div>
              <button 
                className={`p-3 h-12 w-12 flex items-center justify-center rounded-full transition-all ${
                  newMessage.trim() === ''
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
                    : 'text-white shadow-md hover:shadow-lg active:shadow-sm'
                }`}
                style={newMessage.trim() === '' ? {} : { background: colors.gradient }}
                onClick={handleSendMessage}
                disabled={newMessage.trim() === ''}
              >
                <Send size={18} className={newMessage.trim() === '' ? '' : 'transform rotate-45'} />
              </button>
            </div>
            <div className="mt-3 flex justify-between items-center px-1">
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 space-x-3">
                <span>Shift + Enter for new line</span>
                <div className="w-1 h-1 bg-slate-400 dark:bg-slate-500 rounded-full"></div>
                <div className="flex items-center">
                  <div className="h-1.5 w-16 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mr-1.5">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${(progress.usage / 100) * 100}%`,
                        background: colors.gradient
                      }}
                    ></div>
                  </div>
                  <span>{progress.usage}% usage</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <div 
                  className="px-2.5 py-1 rounded-lg text-xs font-medium"
                  style={{ background: colors.gradient }}
                >
                  <span className="text-white">Using {selectedModel.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Media gallery */}
        <div className="hidden lg:block w-96 h-full overflow-y-auto bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-inner">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Relevant Media</h3>
              
              {/* Media gallery grid */}
              <div className="grid grid-cols-2 gap-3">
                {activeItem && [1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative overflow-hidden rounded-xl group shadow-sm border border-slate-200 dark:border-slate-700">
                    <div className="aspect-w-16 aspect-h-10 bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      {/* Media thumbnail */}
                      <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-700">
                        {item % 2 === 0 ? (
                          <CodeIcon size={22} className="text-slate-400" />
                        ) : (
                          <FileText size={22} className="text-slate-400" />
                        )}
                      </div>
                    </div>
                    
                    {/* Hover overlay with play button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="black" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* AI Assistant information */}
            <div className="mb-6">
              <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg" style={{ background: colors.gradient }}>
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <Sparkles size={18} />
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-slate-900 dark:text-white">Portfolio AI</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Interactive assistant</p>
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ask specific questions about my experience, skills, education, or projects to get detailed information.
                </p>
              </div>
            </div>
            
            {/* Portfolio AI mode selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">AI Mode</h3>
              <div className="space-y-2.5">
                {aiModels.map(model => (
                  <button
                    key={model.id}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center border ${
                      selectedModel.id === model.id
                        ? 'bg-indigo-50 dark:bg-slate-700 border-indigo-200 dark:border-indigo-900 shadow-sm'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 border-transparent'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      model.tier === 'premium' 
                        ? 'bg-indigo-500' 
                        : model.tier === 'standard'
                          ? 'bg-emerald-500'
                          : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-white">{model.name}</span>
                        {model.tier === 'premium' && (
                          <span className="text-xs px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded font-medium">Pro</span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{model.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Generate custom visualization button */}
            {activeItem && activeItem.id.includes('project') && (
              <div className="mt-8">
                <button 
                  className="w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all text-white shadow-md hover:shadow-lg active:shadow-sm"
                  style={{ background: colors.gradient }}
                >
                  <Cpu size={16} className="text-white" />
                  <span className="text-sm font-medium">Generate Visualization</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom icons
const InfoIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const CodeIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

// Add global CSS for animations and utilities
const globalStyles = `
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(-10px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-10px); }
  }

  .animate-fade-in-out {
    animation: fadeInOut 3s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fadeIn 0.2s ease-in-out;
  }

  .dark {
    color-scheme: dark;
  }

  .delay-0 {
    animation-delay: 0ms;
  }

  .delay-150 {
    animation-delay: 150ms;
  }

  .delay-300 {
    animation-delay: 300ms;
  }
  
  /* Custom scrollbar */
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(100, 116, 139, 0.2);
    border-radius: 9999px;
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.2);
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 116, 139, 0.4);
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: rgba(148, 163, 184, 0.4);
  }
  
  /* Prose styles */
  .prose {
    max-width: 65ch;
    color: inherit;
  }
  
  .prose p {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
  }
  
  .prose a {
    color: #4F46E5;
    text-decoration: underline;
    font-weight: 500;
  }
  
  .dark .prose a {
    color: #818CF8;
  }
  
  .prose strong {
    font-weight: 600;
    color: inherit;
  }
  
  .prose ul {
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    padding-left: 1.625em;
  }
  
  .prose ul li {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    position: relative;
  }
  
  .prose ul li::before {
    content: "";
    position: absolute;
    background-color: #D1D5DB;
    border-radius: 50%;
    width: 0.375em;
    height: 0.375em;
    top: 0.6875em;
    left: -1.25em;
  }
  
  .dark .prose ul li::before {
    background-color: #6B7280;
  }
  
  .prose code {
    color: #111827;
    background-color: #F3F4F6;
    padding: 0.25em 0.4em;
    border-radius: 0.25em;
    font-size: 0.875em;
  }
  
  .dark .prose code {
    color: #E5E7EB;
    background-color: #374151;
  }
`;

const PortfolioChatWithStyles = () => (
  <>
    <style>{globalStyles}</style>
    <PortfolioChat />
  </>
);

export default PortfolioChatWithStyles;