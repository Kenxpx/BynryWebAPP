"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Clock,
  FileText,
  MessageSquare,
  Paperclip,
  Send,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Calendar,
  MapPin,
  Phone,
  User,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineTitle,
  TimelineBody,
  TimelineTime,
} from "@/components/ui/timeline"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ServiceRequestDetailPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [isSendingComment, setIsSendingComment] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [request, setRequest] = useState(null)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  // This would normally fetch from an API based on the ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRequest = {
        id: id,
        type: "Gas Leak",
        status: "In Progress",
        createdAt: "2023-04-15T10:30:00Z",
        updatedAt: "2023-04-15T14:45:00Z",
        description:
          "Possible gas leak in basement near water heater. I can smell gas when I'm in the basement, especially near the utility room. The smell has been present for about 2 days now.",
        priority: "high",
        address: "123 Main Street, Anytown, USA",
        assignedTo: "John Technician",
        estimatedCompletion: "2023-04-16T17:00:00Z",
        attachments: [
          {
            name: "basement_photo.jpg",
            size: "2.4 MB",
            type: "image/jpeg",
            url: "/placeholder.svg?height=300&width=400",
          },
          {
            name: "utility_room.jpg",
            size: "1.8 MB",
            type: "image/jpeg",
            url: "/placeholder.svg?height=300&width=400",
          },
        ],
        comments: [
          {
            id: 1,
            author: "System",
            authorType: "system",
            content: "Service request created",
            timestamp: "2023-04-15T10:30:00Z",
          },
          {
            id: 2,
            author: "Sarah Support",
            authorType: "staff",
            content:
              "Thank you for reporting this issue. We're treating this as a high priority case and will dispatch a technician as soon as possible. Please evacuate the premises if the smell becomes stronger.",
            timestamp: "2023-04-15T10:45:00Z",
          },
          {
            id: 3,
            author: "John Technician",
            authorType: "staff",
            content:
              "I've been assigned to your case and will arrive between 2-4pm today. Please ensure someone is home to provide access.",
            timestamp: "2023-04-15T11:30:00Z",
          },
          {
            id: 4,
            author: "You",
            authorType: "customer",
            content: "Thank you. I'll be home all day waiting for your arrival.",
            timestamp: "2023-04-15T11:45:00Z",
          },
        ],
        statusHistory: [
          { status: "Open", timestamp: "2023-04-15T10:30:00Z", note: "Request submitted" },
          { status: "In Progress", timestamp: "2023-04-15T10:45:00Z", note: "Assigned to technician" },
          { status: "Scheduled", timestamp: "2023-04-15T11:30:00Z", note: "Technician visit scheduled for 2-4pm" },
          { status: "In Progress", timestamp: "2023-04-15T14:45:00Z", note: "Technician on site" },
        ],
      }
      setRequest(mockRequest)
      setIsLoading(false)
    }, 1500)
  }, [id])

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-500"
      case "In Progress":
        return "bg-yellow-500"
      case "Scheduled":
        return "bg-purple-500"
      case "Completed":
        return "bg-green-500"
      case "On Hold":
        return "bg-orange-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <FileText className="h-4 w-4" />
      case "In Progress":
        return <Loader2 className="h-4 w-4" />
      case "Scheduled":
        return <Calendar className="h-4 w-4" />
      case "Completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "On Hold":
        return <AlertTriangle className="h-4 w-4" />
      case "Cancelled":
        return <X className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="default">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSendingComment(true)

    // This would normally send to an API
    setTimeout(() => {
      const newCommentObj = {
        id: request.comments.length + 1,
        author: "You",
        authorType: "customer",
        content: newComment,
        timestamp: new Date().toISOString(),
      }

      setRequest((prev) => ({
        ...prev,
        comments: [...prev.comments, newCommentObj],
        updatedAt: new Date().toISOString(),
      }))

      setNewComment("")
      setIsSendingComment(false)

      toast({
        title: "Comment Added",
        description: "Your comment has been added to the service request.",
      })
    }, 1000)
  }

  const handleCancelRequest = () => {
    setIsCancelling(true)

    // This would normally send to an API
    setTimeout(() => {
      setRequest((prev) => ({
        ...prev,
        status: "Cancelled",
        statusHistory: [
          ...prev.statusHistory,
          {
            status: "Cancelled",
            timestamp: new Date().toISOString(),
            note: "Cancelled by customer",
          },
        ],
        updatedAt: new Date().toISOString(),
      }))

      setIsCancelling(false)
      setShowCancelDialog(false)

      toast({
        title: "Request Cancelled",
        description: "Your service request has been cancelled.",
      })
    }, 1500)
  }

  const submitFeedback = (isPositive) => {
    toast({
      title: "Feedback Submitted",
      description: `Thank you for your ${isPositive ? "positive" : "negative"} feedback.`,
    })
    setFeedbackSubmitted(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>

          <div className="flex justify-between items-start">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-48" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Requests
        </Button>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              {request.type} - {request.id}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div
                className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(request.status)}`}
              >
                {request.status}
              </div>
              {getPriorityBadge(request.priority)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-end gap-1">
                <Clock className="h-4 w-4" />
                <span>Created: {formatDate(request.createdAt)}</span>
              </div>
              <div className="mt-1">Last Updated: {formatDate(request.updatedAt)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Description</h3>
                    <p className="mt-1">{request.description}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Service Address</h3>
                      <p className="mt-1">{request.address}</p>
                    </div>
                  </div>

                  {request.assignedTo && (
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Assigned Technician</h3>
                        <p className="mt-1">{request.assignedTo}</p>
                      </div>
                    </div>
                  )}

                  {request.estimatedCompletion && (
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Estimated Completion</h3>
                        <p className="mt-1">{formatDate(request.estimatedCompletion)}</p>
                      </div>
                    </div>
                  )}

                  {request.attachments && request.attachments.length > 0 && (
                    <div>
                      <h3 className="font-medium text-muted-foreground flex items-center gap-1 mb-2">
                        <Paperclip className="h-4 w-4" />
                        Attachments
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {request.attachments.map((file, index) => (
                          <div key={index} className="border rounded-md overflow-hidden">
                            <div className="aspect-video relative bg-muted">
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-2">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">{file.size}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Communication History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {request.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-lg ${
                          comment.authorType === "customer"
                            ? "bg-primary/10 ml-6"
                            : comment.authorType === "system"
                              ? "bg-muted"
                              : "bg-secondary/10 mr-6"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">
                            {comment.author}
                            {comment.authorType === "staff" && (
                              <Badge variant="outline" className="ml-2">
                                Staff
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</div>
                        </div>
                        <p>{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-4">
                  <form onSubmit={handleSubmitComment} className="w-full">
                    <div className="flex flex-col space-y-2">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="resize-none"
                        disabled={request.status === "Cancelled" || request.status === "Completed"}
                      />
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={
                            !newComment.trim() ||
                            isSendingComment ||
                            request.status === "Cancelled" ||
                            request.status === "Completed"
                          }
                        >
                          {isSendingComment ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline>
                    {request.statusHistory.map((item, index) => (
                      <TimelineItem key={index}>
                        {index < request.statusHistory.length - 1 && <TimelineConnector />}
                        <TimelineHeader>
                          <TimelineIcon className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                          </TimelineIcon>
                          <TimelineTitle>{item.status}</TimelineTitle>
                          <TimelineTime>{formatDate(item.timestamp)}</TimelineTime>
                        </TimelineHeader>
                        <TimelineBody>
                          <p>{item.note}</p>
                        </TimelineBody>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Request Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Support
              </Button>

              {request.status !== "Completed" && request.status !== "Cancelled" && (
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full text-destructive">
                      Cancel Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Service Request</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel this service request? This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-destructive font-medium">
                        <AlertTriangle className="h-4 w-4 inline-block mr-2" />
                        Warning: If this is a gas leak or emergency situation, please call our emergency hotline instead
                        of cancelling.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                        Keep Request
                      </Button>
                      <Button variant="destructive" onClick={handleCancelRequest} disabled={isCancelling}>
                        {isCancelling ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Cancelling...
                          </>
                        ) : (
                          "Cancel Request"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Help & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="#" className="text-primary hover:underline block">
                Gas Safety Guidelines
              </Link>
              <Link href="#" className="text-primary hover:underline block">
                Service Request FAQ
              </Link>
              <Link href="#" className="text-primary hover:underline block">
                Emergency Procedures
              </Link>
              <Separator className="my-2" />
              <div className="pt-2">
                <h3 className="font-medium">Emergency Contact</h3>
                <p className="text-sm mt-1">For gas leaks or emergencies, call our 24/7 hotline:</p>
                <a href="tel:1-800-123-4567" className="font-bold text-destructive block mt-1">
                  1-800-123-4567
                </a>
              </div>
            </CardContent>
          </Card>

          {request.status === "Completed" && !feedbackSubmitted && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Service Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">How would you rate our service for this request?</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center gap-2"
                    onClick={() => submitFeedback(true)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    Satisfied
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center gap-2"
                    onClick={() => submitFeedback(false)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Unsatisfied
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

