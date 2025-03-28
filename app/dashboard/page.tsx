"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Droplets,
  Flame,
  Settings,
  TrendingDown,
  TrendingUp,
  LayoutDashboard,
  Maximize2,
  Minimize2,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Import chart components
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7days")
  const [dashboardLayout, setDashboardLayout] = useState({
    usageWidget: { expanded: false },
    billWidget: { expanded: false },
    serviceWidget: { expanded: false },
    alertsWidget: { expanded: false },
  })

  // Sample data for charts
  const usageData = [
    { day: "Mon", usage: 5.2 },
    { day: "Tue", usage: 4.8 },
    { day: "Wed", usage: 5.5 },
    { day: "Thu", usage: 6.2 },
    { day: "Fri", usage: 5.7 },
    { day: "Sat", usage: 4.3 },
    { day: "Sun", usage: 3.9 },
  ]

  const monthlyUsageData = [
    { month: "Jan", usage: 120, average: 140 },
    { month: "Feb", usage: 130, average: 135 },
    { month: "Mar", usage: 110, average: 130 },
    { month: "Apr", usage: 90, average: 120 },
    { month: "May", usage: 75, average: 110 },
    { month: "Jun", usage: 60, average: 100 },
    { month: "Jul", usage: 55, average: 95 },
    { month: "Aug", usage: 60, average: 100 },
    { month: "Sep", usage: 80, average: 110 },
    { month: "Oct", usage: 95, average: 120 },
    { month: "Nov", usage: 110, average: 130 },
    { month: "Dec", usage: 125, average: 140 },
  ]

  const usageBreakdownData = [
    { name: "Heating", value: 45 },
    { name: "Water Heating", value: 25 },
    { name: "Cooking", value: 15 },
    { name: "Other", value: 15 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Sample alerts
  const alerts = [
    {
      id: 1,
      title: "Scheduled Maintenance",
      description: "Maintenance scheduled for North District on June 15, 2023 from 10:00 AM to 2:00 PM.",
      type: "info",
      date: "2023-06-10T10:30:00Z",
    },
    {
      id: 2,
      title: "Service Disruption",
      description: "Gas service disruption reported in Downtown area. Crews are working to resolve the issue.",
      type: "warning",
      date: "2023-06-08T14:45:00Z",
    },
    {
      id: 3,
      title: "Bill Ready",
      description: "Your monthly bill is ready. Amount: $78.50. Due date: June 25, 2023.",
      type: "success",
      date: "2023-06-05T09:15:00Z",
    },
  ]

  // Sample service requests
  const serviceRequests = [
    {
      id: "SR-2023-001",
      type: "Gas Leak",
      status: "In Progress",
      createdAt: "2023-04-15T10:30:00Z",
      priority: "high",
    },
    {
      id: "SR-2023-002",
      type: "Billing Question",
      status: "Open",
      createdAt: "2023-04-10T09:15:00Z",
      priority: "medium",
    },
  ]

  // Sample upcoming appointments
  const appointments = [
    {
      id: 1,
      title: "Meter Inspection",
      date: "2023-06-18",
      time: "10:00 AM - 12:00 PM",
      technician: "John Smith",
    },
    {
      id: 2,
      title: "Water Heater Maintenance",
      date: "2023-06-25",
      time: "2:00 PM - 4:00 PM",
      technician: "Sarah Johnson",
    },
  ]

  // Sample bill summary
  const billSummary = {
    currentBill: 78.5,
    dueDate: "2023-06-25",
    lastBill: 82.75,
    yearToDate: 487.25,
    paymentStatus: "Not Paid",
    autopay: true,
    autopayDate: "2023-06-23",
  }

  // Calculate usage change
  const currentUsage = usageData.reduce((sum, day) => sum + day.usage, 0)
  const previousWeekUsage = currentUsage * 1.08 // Simulated previous week usage
  const usageChange = ((currentUsage - previousWeekUsage) / previousWeekUsage) * 100

  // Toggle widget expansion
  const toggleWidgetExpansion = (widgetName) => {
    setDashboardLayout((prev) => ({
      ...prev,
      [widgetName]: { expanded: !prev[widgetName].expanded },
    }))
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get alert icon based on type
  const getAlertIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "info":
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-primary" />
            My Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your gas service and account.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Usage</p>
                <p className="text-3xl font-bold">
                  {currentUsage.toFixed(1)} <span className="text-base font-normal text-muted-foreground">therms</span>
                </p>
              </div>
              <div className={`flex items-center ${usageChange < 0 ? "text-green-500" : "text-red-500"}`}>
                {usageChange < 0 ? <TrendingDown className="h-5 w-5 mr-1" /> : <TrendingUp className="h-5 w-5 mr-1" />}
                <span>{Math.abs(usageChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Compared to last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Bill</p>
                <p className="text-3xl font-bold">${billSummary.currentBill.toFixed(2)}</p>
              </div>
              <Badge variant={billSummary.paymentStatus === "Paid" ? "outline" : "default"}>
                {billSummary.paymentStatus}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Due on {billSummary.dueDate}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Requests</p>
                <p className="text-3xl font-bold">{serviceRequests.length}</p>
              </div>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {serviceRequests.length > 0
                ? `Last updated: ${formatDate(serviceRequests[0].createdAt)}`
                : "No active requests"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className={`${dashboardLayout.usageWidget.expanded ? "lg:col-span-3" : "lg:col-span-2"}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Gas Usage Trends
              </CardTitle>
              <CardDescription>Your gas consumption over time</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => toggleWidgetExpansion("usageWidget")}>
                {dashboardLayout.usageWidget.expanded ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Download Data</DropdownMenuItem>
                  <DropdownMenuItem>Change Chart Type</DropdownMenuItem>
                  <DropdownMenuItem>View Full History</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily">
              <TabsList className="mb-4">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="breakdown">Usage Breakdown</TabsTrigger>
              </TabsList>
              <TabsContent value="daily" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="usage" name="Daily Usage (therms)" fill="#3b82f6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="monthly" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={monthlyUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      name="Your Usage"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="average"
                      name="Neighborhood Average"
                      stroke="#94a3b8"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="breakdown" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={usageBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usageBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Usage Analysis
            </Button>
          </CardFooter>
        </Card>

        <Card className={`${dashboardLayout.alertsWidget.expanded ? "lg:col-span-3" : "lg:col-span-1"}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Important notifications about your service</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleWidgetExpansion("alertsWidget")}>
              {dashboardLayout.alertsWidget.expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-1">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className="text-xs text-muted-foreground">{formatDate(alert.date)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No recent alerts</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={`${dashboardLayout.serviceWidget.expanded ? "lg:col-span-2" : "lg:col-span-1"}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Service Requests & Appointments
              </CardTitle>
              <CardDescription>Track your active service requests and upcoming appointments</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleWidgetExpansion("serviceWidget")}>
              {dashboardLayout.serviceWidget.expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="requests">
              <TabsList className="mb-4">
                <TabsTrigger value="requests">Service Requests</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
              </TabsList>
              <TabsContent value="requests">
                {serviceRequests.length > 0 ? (
                  <div className="space-y-4">
                    {serviceRequests.map((request) => (
                      <div key={request.id} className="flex items-start justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{request.type}</h4>
                            <Badge variant={request.priority === "high" ? "destructive" : "outline"}>
                              {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{request.id}</p>
                          <p className="text-xs text-muted-foreground mt-1">Created: {formatDate(request.createdAt)}</p>
                        </div>
                        <div>
                          <Badge
                            className={`
                            ${
                              request.status === "In Progress"
                                ? "bg-yellow-500"
                                : request.status === "Open"
                                  ? "bg-blue-500"
                                  : request.status === "Completed"
                                    ? "bg-green-500"
                                    : "bg-gray-500"
                            }
                            text-white
                          `}
                          >
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No active service requests</p>
                )}
              </TabsContent>
              <TabsContent value="appointments">
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{appointment.title}</h4>
                          <Badge variant="outline">{appointment.date}</Badge>
                        </div>
                        <p className="text-sm mt-1">Time: {appointment.time}</p>
                        <p className="text-sm text-muted-foreground mt-1">Technician: {appointment.technician}</p>
                        <div className="flex justify-end gap-2 mt-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No upcoming appointments</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Create New Request</Button>
            <Button>Schedule Appointment</Button>
          </CardFooter>
        </Card>

        <Card className={`${dashboardLayout.billWidget.expanded ? "lg:col-span-2" : "lg:col-span-1"}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                Billing Summary
              </CardTitle>
              <CardDescription>Overview of your current and past bills</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={() => toggleWidgetExpansion("billWidget")}>
              {dashboardLayout.billWidget.expanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="p-4 border rounded-lg flex-1">
                  <p className="text-sm text-muted-foreground">Current Bill</p>
                  <p className="text-2xl font-bold">${billSummary.currentBill.toFixed(2)}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">Due Date:</span>
                    <span className="text-sm font-medium">{billSummary.dueDate}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm">Status:</span>
                    <Badge variant={billSummary.paymentStatus === "Paid" ? "outline" : "default"}>
                      {billSummary.paymentStatus}
                    </Badge>
                  </div>
                  {billSummary.autopay && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 inline-block mr-1" />
                      Scheduled for AutoPay on {billSummary.autopayDate}
                    </div>
                  )}
                </div>

                <div className="p-4 border rounded-lg flex-1">
                  <p className="text-sm text-muted-foreground">Bill Comparison</p>
                  <div className="mt-2 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Current Bill</span>
                        <span className="font-medium">${billSummary.currentBill.toFixed(2)}</span>
                      </div>
                      <Progress value={100} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Previous Bill</span>
                        <span className="font-medium">${billSummary.lastBill.toFixed(2)}</span>
                      </div>
                      <Progress value={(billSummary.lastBill / billSummary.currentBill) * 100} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Year to Date</span>
                        <span className="font-medium">${billSummary.yearToDate.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Payment Options</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" className="h-auto py-2 flex flex-col">
                    <span>Pay Now</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-2 flex flex-col">
                    <span>Payment History</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-2 flex flex-col">
                    <span>Billing Preferences</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-2 flex flex-col">
                    <span>Payment Methods</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View Detailed Billing</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

