"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Clock,
  FileText,
  Trash2,
  MailOpen,
  Filter,
  Search,
  Settings,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    serviceUpdates: true,
    billingReminders: true,
    outageAlerts: true,
    marketingOffers: false,
    accountChanges: true,
  })

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Scheduled Maintenance",
      description: "Maintenance scheduled for North District on June 15, 2023 from 10:00 AM to 2:00 PM.",
      type: "info",
      category: "service",
      date: "2023-06-10T10:30:00Z",
      read: false,
    },
    {
      id: 2,
      title: "Service Disruption",
      description: "Gas service disruption reported in Downtown area. Crews are working to resolve the issue.",
      type: "warning",
      category: "outage",
      date: "2023-06-08T14:45:00Z",
      read: false,
    },
    {
      id: 3,
      title: "Bill Ready",
      description: "Your monthly bill is ready. Amount: $78.50. Due date: June 25, 2023.",
      type: "success",
      category: "billing",
      date: "2023-06-05T09:15:00Z",
      read: true,
    },
    {
      id: 4,
      title: "Service Request Update",
      description: "Your service request SR-2023-001 has been updated. A technician has been assigned.",
      type: "info",
      category: "service",
      date: "2023-06-03T11:20:00Z",
      read: true,
    },
    {
      id: 5,
      title: "Payment Confirmation",
      description: "Your payment of $82.75 has been processed successfully.",
      type: "success",
      category: "billing",
      date: "2023-05-25T15:10:00Z",
      read: true,
    },
    {
      id: 6,
      title: "Energy Saving Tips",
      description: "Check out our new guide for reducing your gas usage during summer months.",
      type: "info",
      category: "marketing",
      date: "2023-05-20T08:45:00Z",
      read: true,
    },
  ])

  // Filter notifications based on active tab and search query
  const filteredNotifications = notifications.filter((notification) => {
    // Filter by tab
    if (activeTab !== "all" && activeTab !== notification.category) {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return "Today, " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays === 1) {
      return "Yesterday, " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffDays < 7) {
      return (
        date.toLocaleDateString([], { weekday: "long" }) +
        ", " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    } else {
      return (
        date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }) +
        ", " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    }
  }

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "billing":
        return <FileText className="h-5 w-5" />
      case "service":
        return <Clock className="h-5 w-5" />
      case "outage":
        return <AlertTriangle className="h-5 w-5" />
      case "marketing":
        return <Bell className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
      description: "Your notification center has been cleared.",
    })
  }

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))

    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    })
  }

  // Delete selected notifications
  const deleteSelected = () => {
    setNotifications((prev) => prev.filter((notification) => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])

    toast({
      title: "Notifications deleted",
      description: `${selectedNotifications.length} notifications have been removed.`,
    })
  }

  // Toggle notification selection
  const toggleNotificationSelection = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((notificationId) => notificationId !== id) : [...prev, id],
    )
  }

  // Handle notification settings change
  const handleSettingsChange = (setting, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  // Save notification settings
  const saveNotificationSettings = () => {
    setShowSettingsDialog(false)

    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bell className="h-8 w-8 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground">Stay updated with important alerts and information about your service</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowSettingsDialog(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          {selectedNotifications.length > 0 && (
            <Button variant="destructive" onClick={deleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Selected ({selectedNotifications.length})
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab("all")}>All Notifications</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("billing")}>Billing</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("service")}>Service Updates</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("outage")}>Outage Alerts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab("marketing")}>Marketing & Tips</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" onClick={markAllAsRead}>
            <MailOpen className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="service">Service</TabsTrigger>
          <TabsTrigger value="outage">Outages</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "all"
                ? "All Notifications"
                : activeTab === "billing"
                  ? "Billing Notifications"
                  : activeTab === "service"
                    ? "Service Updates"
                    : activeTab === "outage"
                      ? "Outage Alerts"
                      : "Marketing & Tips"}
            </CardTitle>
            <CardDescription>
              {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search query or filters" : "You're all caught up!"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg ${!notification.read ? "bg-muted/50" : ""}`}
                  >
                    <div className="flex items-center h-5 mt-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleNotificationSelection(notification.id)}
                      />
                    </div>
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="default" className="ml-2">
                              New
                            </Badge>
                          )}
                        </h4>
                        <span className="text-xs text-muted-foreground">{formatDate(notification.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getCategoryIcon(notification.category)}
                          <span>{notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}</span>
                        </Badge>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
            <Button variant="outline" onClick={() => setShowSettingsDialog(true)}>
              Manage Notification Settings
            </Button>
          </CardFooter>
        </Card>
      </Tabs>

      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Notification Preferences</DialogTitle>
            <DialogDescription>Customize how and when you receive notifications</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Notification Channels</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.email}
                  onCheckedChange={(checked) => handleSettingsChange("email", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via text message</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.sms}
                  onCheckedChange={(checked) => handleSettingsChange("sms", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notificationSettings.push}
                  onCheckedChange={(checked) => handleSettingsChange("push", checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Notification Types</h3>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="service-updates">Service Updates</Label>
                  <p className="text-sm text-muted-foreground">Updates about your service requests</p>
                </div>
                <Switch
                  id="service-updates"
                  checked={notificationSettings.serviceUpdates}
                  onCheckedChange={(checked) => handleSettingsChange("serviceUpdates", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="billing-reminders">Billing Reminders</Label>
                  <p className="text-sm text-muted-foreground">Reminders about upcoming bills and payments</p>
                </div>
                <Switch
                  id="billing-reminders"
                  checked={notificationSettings.billingReminders}
                  onCheckedChange={(checked) => handleSettingsChange("billingReminders", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="outage-alerts">Outage Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical alerts about gas outages or service disruptions
                  </p>
                </div>
                <Switch
                  id="outage-alerts"
                  checked={notificationSettings.outageAlerts}
                  onCheckedChange={(checked) => handleSettingsChange("outageAlerts", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-offers">Marketing & Offers</Label>
                  <p className="text-sm text-muted-foreground">Special offers and energy saving tips</p>
                </div>
                <Switch
                  id="marketing-offers"
                  checked={notificationSettings.marketingOffers}
                  onCheckedChange={(checked) => handleSettingsChange("marketingOffers", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="account-changes">Account Changes</Label>
                  <p className="text-sm text-muted-foreground">Notifications about changes to your account</p>
                </div>
                <Switch
                  id="account-changes"
                  checked={notificationSettings.accountChanges}
                  onCheckedChange={(checked) => handleSettingsChange("accountChanges", checked)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={saveNotificationSettings}>Save Preferences</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

