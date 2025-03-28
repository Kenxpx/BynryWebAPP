"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
  Search,
  ThumbsUp,
  MessageCircle,
  Users,
  Bookmark,
  Share2,
  Filter,
  Plus,
  User,
  Calendar,
  Clock,
  ChevronRight,
  Loader2,
  Eye,
  MapPin,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New post form state
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postCategory, setPostCategory] = useState("")

  // Sample discussions data
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: "Tips for reducing gas usage during winter",
      content:
        "With winter approaching, I'm looking for ways to reduce my gas usage while still keeping my home warm. Any suggestions from the community?",
      author: "EnergyMindful",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "energy-saving",
      date: "2023-06-05T14:30:00Z",
      replies: 12,
      likes: 24,
      views: 156,
      isLiked: false,
    },
    {
      id: 2,
      title: "Smart thermostats compatible with gas heating systems",
      content:
        "I'm looking to upgrade to a smart thermostat. Which ones work best with gas heating systems? Has anyone had good experiences with specific models?",
      author: "TechSavvy",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "smart-home",
      date: "2023-06-02T09:15:00Z",
      replies: 8,
      likes: 15,
      views: 102,
      isLiked: true,
    },
    {
      id: 3,
      title: "Understanding the recent rate changes",
      content:
        "I noticed my bill increased this month despite using less gas. Can someone explain the recent rate changes and how they affect residential customers?",
      author: "CuriousConsumer",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "billing",
      date: "2023-05-28T16:45:00Z",
      replies: 15,
      likes: 7,
      views: 203,
      isLiked: false,
    },
    {
      id: 4,
      title: "Gas fireplace maintenance tips",
      content:
        "I have a gas fireplace that I haven't used since last winter. What maintenance should I do before using it again this year?",
      author: "HomeOwner",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "maintenance",
      date: "2023-05-25T11:20:00Z",
      replies: 10,
      likes: 18,
      views: 142,
      isLiked: false,
    },
    {
      id: 5,
      title: "Experiences with gas line installation for outdoor kitchen",
      content:
        "I'm planning to install a gas line for my outdoor kitchen. Has anyone gone through this process? Any tips or things to watch out for?",
      author: "OutdoorChef",
      authorAvatar: "/placeholder.svg?height=40&width=40",
      category: "installation",
      date: "2023-05-20T13:10:00Z",
      replies: 7,
      likes: 12,
      views: 98,
      isLiked: false,
    },
  ])

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Energy Efficiency Workshop",
      description: "Learn practical tips for reducing your gas usage and lowering your utility bills.",
      date: "2023-06-20",
      time: "6:00 PM - 8:00 PM",
      location: "Community Center, 123 Main St",
      category: "workshop",
      attendees: 24,
    },
    {
      id: 2,
      title: "Home Safety Seminar",
      description: "Important information about gas safety in your home, including leak detection and prevention.",
      date: "2023-06-25",
      time: "10:00 AM - 12:00 PM",
      location: "Public Library, 456 Oak Ave",
      category: "seminar",
      attendees: 18,
    },
    {
      id: 3,
      title: "Community Advisory Board Meeting",
      description: "Monthly meeting to discuss utility services and community concerns. Open to all customers.",
      date: "2023-07-05",
      time: "5:30 PM - 7:00 PM",
      location: "Gas Utility Headquarters, 789 Elm St",
      category: "meeting",
      attendees: 12,
    },
  ]

  // Sample categories
  const categories = [
    { id: "energy-saving", name: "Energy Saving" },
    { id: "billing", name: "Billing & Rates" },
    { id: "maintenance", name: "Maintenance & Repair" },
    { id: "installation", name: "Installation" },
    { id: "smart-home", name: "Smart Home" },
    { id: "safety", name: "Safety" },
    { id: "general", name: "General Discussion" },
  ]

  // Filter discussions based on search query
  const filteredDiscussions = discussions.filter(
    (discussion) =>
      searchQuery === "" ||
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Format date
  function formatDate(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today"
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  // Get category name
  function getCategoryName(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : categoryId
  }

  // Handle like/unlike
  function handleLike(id) {
    setDiscussions((prev) =>
      prev.map((discussion) =>
        discussion.id === id
          ? {
              ...discussion,
              isLiked: !discussion.isLiked,
              likes: discussion.isLiked ? discussion.likes - 1 : discussion.likes + 1,
            }
          : discussion,
      ),
    )
  }

  // Handle creating a new post
  const handleCreatePost = (e) => {
    e.preventDefault()

    if (!postTitle.trim() || !postContent.trim() || !postCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: discussions.length + 1,
        title: postTitle.trim(),
        content: postContent.trim(),
        author: "You",
        authorAvatar: "/placeholder.svg?height=40&width=40",
        category: postCategory,
        date: new Date().toISOString(),
        replies: 0,
        likes: 0,
        views: 1,
        isLiked: false,
      }

      setDiscussions((prev) => [newPost, ...prev])

      // Reset form
      setPostTitle("")
      setPostContent("")
      setPostCategory("")

      setShowNewPostDialog(false)
      setIsSubmitting(false)

      toast({
        title: "Post Created",
        description: "Your discussion post has been published successfully.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Community Forum
          </h1>
          <p className="text-muted-foreground">Connect with other customers, share tips, and join community events</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setShowNewPostDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discussions and events..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">More Filters</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="events">Community Events</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Discussions</CardTitle>
                  <CardDescription>Join the conversation with other community members</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredDiscussions.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery
                          ? "Try adjusting your search query or filters"
                          : "Be the first to start a discussion!"}
                      </p>
                      <Button onClick={() => setShowNewPostDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Start a Discussion
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredDiscussions.map((discussion) => (
                        <div key={discussion.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={discussion.authorAvatar} alt={discussion.author} />
                              <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <h3 className="font-medium">{discussion.title}</h3>
                                <Badge variant="outline">{getCategoryName(discussion.category)}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{discussion.content}</p>
                              <div className="flex flex-wrap items-center gap-4 mt-4">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <User className="h-3 w-3" />
                                  <span>{discussion.author}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(discussion.date)}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{discussion.replies} replies</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Eye className="h-3 w-3" />
                                  <span>{discussion.views} views</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleLike(discussion.id)}
                                >
                                  <ThumbsUp
                                    className={`h-4 w-4 ${discussion.isLiked ? "text-primary fill-primary" : ""}`}
                                  />
                                  <span>{discussion.likes}</span>
                                </Button>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Bookmark className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    View Discussion
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
                    Showing {filteredDiscussions.length} of {discussions.length} discussions
                  </p>
                  <Button variant="outline">View All Discussions</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button key={category.id} variant="outline" className="w-full justify-between">
                        <span>{category.name}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p>
                    Our community forum is a place for customers to connect, share experiences, and help each other.
                  </p>
                  <div>
                    <p className="font-medium">Please remember to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Be respectful and courteous to other members</li>
                      <li>Stay on topic and post in the appropriate categories</li>
                      <li>Do not share personal account information</li>
                      <li>Report inappropriate content to moderators</li>
                    </ul>
                  </div>
                  <p>
                    For urgent service issues, please contact customer service directly rather than posting in the
                    forum.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Community Events</CardTitle>
              <CardDescription>Join us for workshops, seminars, and community meetings</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No events found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? "Try adjusting your search query or filters"
                      : "Check back soon for upcoming events!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="md:w-32 flex-shrink-0 bg-muted rounded-md p-4 text-center">
                          <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                          <div className="text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </div>
                          <div className="text-sm">
                            {new Date(event.date).toLocaleDateString("en-US", { year: "numeric" })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge variant="outline">
                              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-4">
                            <Button variant="outline" size="sm">
                              Register
                            </Button>
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
                Showing {filteredEvents.length} of {events.length} events
              </p>
              <Button variant="outline">View All Events</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Discussion Dialog */}
      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Start a New Discussion</DialogTitle>
            <DialogDescription>Share your questions, ideas, or experiences with the community</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreatePost}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="post-title">Title</Label>
                <Input
                  id="post-title"
                  placeholder="Enter a descriptive title for your discussion"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-category">Category</Label>
                <Select value={postCategory} onValueChange={setPostCategory}>
                  <SelectTrigger id="post-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={6}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Discussion Guidelines</Label>
                <div className="text-sm text-muted-foreground border rounded-md p-3">
                  <p>By posting, you agree to follow our community guidelines:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Be respectful and constructive</li>
                    <li>Do not share personal account information</li>
                    <li>Stay on topic and use appropriate language</li>
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowNewPostDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Discussion"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

