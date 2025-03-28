import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText, Home, Phone, User, BarChart, Bell } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  // This would normally be fetched from an API
  const recentAlerts = [
    {
      id: 1,
      title: "Scheduled Maintenance",
      description: "Maintenance scheduled for North District on June 15, 2023 from 10:00 AM to 2:00 PM.",
      type: "info",
    },
    {
      id: 2,
      title: "Service Disruption",
      description: "Gas service disruption reported in Downtown area. Crews are working to resolve the issue.",
      type: "warning",
    },
  ]

  const quickStats = [
    { label: "Active Requests", value: 3, change: "+1" },
    { label: "Completed Requests", value: 12, change: "+2" },
    { label: "Avg. Resolution Time", value: "1.5 days", change: "-0.5" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Gas Utility Customer Portal</h1>
            <p className="text-xl text-muted-foreground">Manage your service requests and account information</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
              <Badge className="ml-1">2</Badge>
            </Button>
            <Button variant="default" size="sm">
              <span className="hidden md:inline">Quick Help</span>
            </Button>
          </div>
        </div>
      </header>

      {recentAlerts.length > 0 && (
        <div className="mb-8 space-y-4">
          {recentAlerts.map((alert) => (
            <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Badge variant={stat.change.startsWith("+") ? "default" : "secondary"} className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Tabs defaultValue="services" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Submit Service Request
                </CardTitle>
                <CardDescription>Create a new service request for your gas utility needs</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Submit requests for gas leaks, connection issues, billing questions, or other service needs. Attach
                  relevant documents to help us serve you better.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/service-requests/new" className="w-full">
                  <Button className="w-full">Create Request</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Track Requests
                </CardTitle>
                <CardDescription>View and track the status of your service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Check the current status of your service requests, view request history, and see estimated completion
                  times for ongoing work.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/service-requests" className="w-full">
                  <Button variant="outline" className="w-full">
                    View My Requests
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Usage & Efficiency
                </CardTitle>
                <CardDescription>Monitor your gas usage and get efficiency tips</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  View your historical gas usage, compare with similar households, and get personalized tips to improve
                  efficiency and save money.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/usage" className="w-full">
                  <Button variant="outline" className="w-full">
                    View Usage
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Account Information
                </CardTitle>
                <CardDescription>Manage your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Update your contact information, view billing history, and manage notification preferences for your
                  account.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/account" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Account
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Properties
                </CardTitle>
                <CardDescription>Manage your service locations</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Add or update properties where you receive gas service, and manage service details for each location.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/properties" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Properties
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Customize how we contact you</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Set your communication preferences for service updates, billing notifications, and emergency alerts.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/account?tab=notifications" className="w-full">
                  <Button variant="outline" className="w-full">
                    Manage Notifications
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-muted rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
            <div className="flex items-center gap-3 text-lg">
              <Phone className="h-6 w-6 text-destructive" />
              <span>For gas leaks or emergencies, call our 24/7 hotline: </span>
              <a href="tel:1-800-123-4567" className="font-bold text-destructive">
                1-800-123-4567
              </a>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="destructive" size="lg" className="w-full md:w-auto">
              Report Emergency
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

