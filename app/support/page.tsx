"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Send,
  Phone,
  Mail,
  Search,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  FileText,
  Clock,
  ChevronRight,
  Paperclip,
  Bot,
  User,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function SupportPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("chat")
  const [searchQuery, setSearchQuery] = useState("")
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      sender: "bot",
      message: "Hello! I'm your virtual assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])

  const messagesEndRef = useRef(null)

  // Sample FAQ data
  const faqData = [
    {
      id: 1,
      category: "billing",
      question: "How do I read my gas bill?",
      answer:
        "Your gas bill includes several sections: account summary, usage history, payment information, and charges breakdown. The account summary shows your previous balance, payments, and current charges. The usage section displays your gas consumption history. The charges section breaks down your bill into supply charges, delivery charges, and taxes.",
    },
    {
      id: 2,
      category: "billing",
      question: "Why did my bill increase this month?",
      answer:
        "Bills can increase due to several factors: increased usage during colder months, rate changes, or changes in your consumption patterns. You can compare your usage history on your bill to see if your consumption has increased. If you believe there's an error, please contact our customer service.",
    },
    {
      id: 3,
      category: "service",
      question: "How do I report a gas leak?",
      answer:
        "If you smell gas or suspect a gas leak, leave the area immediately and call our emergency hotline at 1-800-123-4567 from a safe location. Do not use phones, light switches, or any electrical devices near the suspected leak area.",
    },
    {
      id: 4,
      category: "service",
      question: "How do I schedule a service appointment?",
      answer:
        "You can schedule a service appointment through your online account, by calling our customer service at 1-800-123-4567, or by using the appointment scheduler in our mobile app. We offer flexible scheduling options including same-day appointments for urgent issues.",
    },
    {
      id: 5,
      category: "account",
      question: "How do I update my contact information?",
      answer:
        "You can update your contact information by logging into your account and navigating to the 'Account Settings' section. Alternatively, you can call our customer service team who will be happy to update your information for you.",
    },
    {
      id: 6,
      category: "account",
      question: "How do I sign up for paperless billing?",
      answer:
        "To sign up for paperless billing, log into your account and go to 'Billing Preferences'. Toggle the 'Paperless Billing' option to 'On'. You'll receive an email confirmation once the change is made. You'll then receive bill notifications via email instead of paper bills.",
    },
  ]

  // Sample knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: "Understanding Your Gas Bill",
      category: "billing",
      summary: "A comprehensive guide to reading and understanding your monthly gas bill.",
      readTime: "5 min read",
      lastUpdated: "2023-05-15",
    },
    {
      id: 2,
      title: "Gas Safety in Your Home",
      category: "safety",
      summary: "Important safety tips and guidelines for gas appliances and installations.",
      readTime: "8 min read",
      lastUpdated: "2023-04-20",
    },
    {
      id: 3,
      title: "Energy Saving Tips for Winter",
      category: "efficiency",
      summary: "Ways to reduce your gas consumption and save money during colder months.",
      readTime: "6 min read",
      lastUpdated: "2023-03-10",
    },
    {
      id: 4,
      title: "How to Submit a Service Request",
      category: "service",
      summary: "Step-by-step guide for submitting and tracking service requests.",
      readTime: "4 min read",
      lastUpdated: "2023-05-22",
    },
    {
      id: 5,
      title: "Payment Options and Methods",
      category: "billing",
      summary: "Overview of all available payment methods and options for your gas service.",
      readTime: "3 min read",
      lastUpdated: "2023-06-01",
    },
    {
      id: 6,
      title: "Smart Home Integration Guide",
      category: "technology",
      summary: "How to connect your gas service with smart home devices for better monitoring.",
      readTime: "10 min read",
      lastUpdated: "2023-05-28",
    },
  ]

  // Filter FAQ and knowledge base based on search query
  const filteredFAQ = faqData.filter(
    (item) =>
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredArticles = knowledgeBaseArticles.filter(
    (item) =>
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Scroll to bottom of chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatHistory])

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!message.trim()) return

    // Add user message to chat
    const userMessage = {
      id: chatHistory.length + 1,
      sender: "user",
      message: message.trim(),
      timestamp: new Date().toISOString(),
    }

    setChatHistory((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponses = [
        "I understand you're asking about your gas service. Could you provide more details so I can better assist you?",
        "Thank you for your question. Based on your account, I can see that your next bill is due on June 25, 2023.",
        "I'd be happy to help with that. You can submit a service request through your online account or I can help you create one now.",
        "For gas leaks or emergencies, please call our emergency hotline at 1-800-123-4567 immediately.",
        "Your current gas usage is 15% lower than the same period last year. Great job on conserving energy!",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage = {
        id: chatHistory.length + 2,
        sender: "bot",
        message: randomResponse,
        timestamp: new Date().toISOString(),
      }

      setChatHistory((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Handle FAQ feedback
  const handleFAQFeedback = (helpful, questionId) => {
    toast({
      title: helpful ? "Thank you for your feedback!" : "We'll improve this answer",
      description: helpful
        ? "We're glad this information was helpful."
        : "Thank you for letting us know. We'll work on making this answer more helpful.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <HelpCircle className="h-8 w-8 text-primary" />
            Customer Support
          </h1>
          <p className="text-muted-foreground">Get help with your account, billing, or service questions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="chat">Virtual Assistant</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    Chat with our Virtual Assistant
                  </CardTitle>
                  <CardDescription>
                    Get instant answers to your questions about your account, billing, or service
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                  <div className="space-y-4">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex gap-3 max-w-[80%] ${
                            chat.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <Avatar className="h-8 w-8">
                            {chat.sender === "user" ? (
                              <>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </>
                            ) : (
                              <>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                                <AvatarFallback>
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div>
                            <div
                              className={`p-3 rounded-lg ${
                                chat.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p>{chat.message}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-1">{formatTimestamp(chat.timestamp)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                            <AvatarFallback>
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="p-3 rounded-lg bg-muted">
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Button type="button" size="icon" variant="outline" className="shrink-0">
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="shrink-0">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>Find quick answers to common questions about your gas service</CardDescription>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search FAQs..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredFAQ.length === 0 ? (
                    <div className="text-center py-8">
                      <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground">Try adjusting your search query or browse all FAQs</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredFAQ.map((faq) => (
                        <div key={faq.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Badge variant="outline" className="mt-1">
                              {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                            </Badge>
                            <div className="flex-1">
                              <h3 className="font-medium mb-2">{faq.question}</h3>
                              <p className="text-sm text-muted-foreground">{faq.answer}</p>
                              <div className="flex justify-end mt-4">
                                <div className="flex items-center gap-4">
                                  <span className="text-sm text-muted-foreground">Was this helpful?</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleFAQFeedback(true, faq.id)}
                                    className="text-green-500 hover:text-green-600 hover:bg-green-50"
                                  >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Yes
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleFAQFeedback(false, faq.id)}
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                    No
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredFAQ.length} of {faqData.length} FAQs
                  </p>
                  <Button variant="outline">View All FAQs</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Knowledge Base
                  </CardTitle>
                  <CardDescription>Detailed articles and guides about your gas service</CardDescription>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search knowledge base..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No articles found</h3>
                      <p className="text-muted-foreground">Try adjusting your search query or browse all articles</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredArticles.map((article) => (
                        <div key={article.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{article.title}</h3>
                            <Badge variant="outline">
                              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{article.summary}</p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{article.readTime}</span>
                              <span>•</span>
                              <span>Updated: {article.lastUpdated}</span>
                            </div>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Read Article
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredArticles.length} of {knowledgeBaseArticles.length} articles
                  </p>
                  <Button variant="outline">Browse All Articles</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our customer support team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Customer Service</h3>
                  <p className="text-sm text-muted-foreground">1-800-123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Monday - Friday: 8am - 8pm
                    <br />
                    Saturday: 9am - 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-destructive mt-1" />
                <div>
                  <h3 className="font-medium">Emergency Hotline</h3>
                  <p className="text-sm text-muted-foreground">1-800-123-4567</p>
                  <p className="text-xs text-muted-foreground mt-1">Available 24/7 for gas leaks and emergencies</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@gasutility.com</p>
                  <p className="text-xs text-muted-foreground mt-1">We typically respond within 24 hours</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Popular Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Understanding Your Bill
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Service Appointment Scheduling
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Gas Leak Safety
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Account Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

