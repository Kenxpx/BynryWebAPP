"use client"

import { Switch } from "@/components/ui/switch"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  LineChart,
  TrendingDown,
  TrendingUp,
  Calendar,
  Download,
  Info,
  Lightbulb,
  ThermometerSun,
  Droplets,
  Home,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Import a chart library
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
  Legend,
} from "recharts"

export default function UsagePage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [comparisonType, setComparisonType] = useState("neighborhood")

  // Sample usage data
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

  // Sample daily usage data
  const dailyUsageData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    usage: Math.floor(Math.random() * 6) + 2, // Random usage between 2-7
  }))

  // Sample efficiency tips
  const efficiencyTips = [
    {
      id: 1,
      title: "Lower Your Water Heater Temperature",
      description: "Set your water heater to 120°F instead of 140°F to save up to 10% on water heating costs.",
      icon: <ThermometerSun className="h-8 w-8 text-primary" />,
      savingsEstimate: "10%",
    },
    {
      id: 2,
      title: "Install Low-Flow Fixtures",
      description:
        "Low-flow showerheads and faucet aerators can reduce hot water usage, saving on gas for water heating.",
      icon: <Droplets className="h-8 w-8 text-primary" />,
      savingsEstimate: "5-10%",
    },
    {
      id: 3,
      title: "Seal Leaks Around Windows and Doors",
      description: "Weatherstripping and caulking can prevent heat loss in winter and keep cool air in during summer.",
      icon: <Home className="h-8 w-8 text-primary" />,
      savingsEstimate: "10-15%",
    },
    {
      id: 4,
      title: "Use Smart Thermostats",
      description: "Program your thermostat to lower temperatures when you're asleep or away from home.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      savingsEstimate: "15-20%",
    },
  ]

  // Sample billing data
  const billingData = [
    { month: "Jan", amount: 78.5, usage: 120 },
    { month: "Feb", amount: 82.75, usage: 130 },
    { month: "Mar", amount: 72.25, usage: 110 },
    { month: "Apr", amount: 65.0, usage: 90 },
    { month: "May", amount: 58.5, usage: 75 },
    { month: "Jun", amount: 52.75, usage: 60 },
  ]

  // Calculate current month's usage vs previous month
  const currentMonthIndex = new Date().getMonth()
  const currentMonth = monthlyUsageData[currentMonthIndex]
  const previousMonth = monthlyUsageData[(currentMonthIndex - 1 + 12) % 12]
  const usageChange = ((currentMonth.usage - previousMonth.usage) / previousMonth.usage) * 100

  // Calculate efficiency score
  const efficiencyScore = Math.round((1 - currentMonth.usage / currentMonth.average) * 100)

  // Filter data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "1month":
        return monthlyUsageData.slice(-1)
      case "3months":
        return monthlyUsageData.slice(-3)
      case "6months":
        return monthlyUsageData.slice(-6)
      case "1year":
        return monthlyUsageData
      default:
        return monthlyUsageData.slice(-6)
    }
  }

  const filteredData = getFilteredData()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Usage & Efficiency</h1>
          <p className="text-muted-foreground">Monitor your gas usage and find ways to improve efficiency</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Current Usage</p>
                <p className="text-3xl font-bold">
                  {currentMonth.usage} <span className="text-base font-normal text-muted-foreground">therms</span>
                </p>
              </div>
              <div className={`flex items-center ${usageChange < 0 ? "text-green-500" : "text-red-500"}`}>
                {usageChange < 0 ? <TrendingDown className="h-5 w-5 mr-1" /> : <TrendingUp className="h-5 w-5 mr-1" />}
                <span>{Math.abs(usageChange).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Compared to last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Average Daily Usage</p>
                <p className="text-3xl font-bold">
                  {(currentMonth.usage / 30).toFixed(1)}{" "}
                  <span className="text-base font-normal text-muted-foreground">therms</span>
                </p>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Based on the current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Score</p>
                <p className="text-3xl font-bold">
                  {efficiencyScore} <span className="text-base font-normal text-muted-foreground">/ 100</span>
                </p>
              </div>
              <div>
                <Badge
                  variant={efficiencyScore > 50 ? "default" : "outline"}
                  className={efficiencyScore > 50 ? "bg-green-500" : ""}
                >
                  {efficiencyScore > 75
                    ? "Excellent"
                    : efficiencyScore > 50
                      ? "Good"
                      : efficiencyScore > 25
                        ? "Fair"
                        : "Poor"}
                </Badge>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Compared to similar households</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Monthly Usage Trends
              </CardTitle>
              <CardDescription>Your gas usage over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Daily Usage Breakdown
              </CardTitle>
              <CardDescription>Your daily gas consumption for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={dailyUsageData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="usage" name="Daily Usage (therms)" fill="#3b82f6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Compare Your Usage</h3>
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select comparison type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="neighborhood">Similar Homes in Your Area</SelectItem>
                <SelectItem value="size">Homes of Similar Size</SelectItem>
                <SelectItem value="previous">Your Previous Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Comparison</CardTitle>
              <CardDescription>
                {comparisonType === "neighborhood"
                  ? "How your usage compares to similar homes in your neighborhood"
                  : comparisonType === "size"
                    ? "How your usage compares to homes of similar size"
                    : "How your usage compares to your usage last year"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="usage" name="Your Usage" fill="#3b82f6" />
                    <Bar
                      dataKey="average"
                      name={
                        comparisonType === "neighborhood"
                          ? "Neighborhood Average"
                          : comparisonType === "size"
                            ? "Similar Home Average"
                            : "Your Previous Year"
                      }
                      fill="#94a3b8"
                    />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-2">Efficiency Analysis</p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow bg-muted rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        efficiencyScore > 75
                          ? "bg-green-500"
                          : efficiencyScore > 50
                            ? "bg-blue-500"
                            : efficiencyScore > 25
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                      style={{ width: `${efficiencyScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{efficiencyScore}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {efficiencyScore > 75
                    ? "Excellent! Your usage is significantly below average."
                    : efficiencyScore > 50
                      ? "Good job! Your usage is below average."
                      : efficiencyScore > 25
                        ? "Your usage is slightly above average. See tips below to improve."
                        : "Your usage is above average. Check out our efficiency tips to save."}
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Efficiency Tips
              </CardTitle>
              <CardDescription>Personalized recommendations to help you save</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {efficiencyTips.map((tip) => (
                  <div key={tip.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{tip.icon}</div>
                      <div>
                        <h4 className="font-medium mb-1">{tip.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{tip.description}</p>
                        <div className="flex items-center">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Potential Savings: {tip.savingsEstimate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View All Efficiency Tips</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Usage Correlation</CardTitle>
              <CardDescription>See how your usage affects your monthly bill</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={billingData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="usage"
                      name="Usage (therms)"
                      stroke="#3b82f6"
                      yAxisId="left"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      name="Bill Amount ($)"
                      stroke="#f97316"
                      yAxisId="right"
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full text-sm text-muted-foreground">
                <p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="inline-flex items-center">
                        <Info className="h-4 w-4 mr-1" />
                        Rate Information
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Current rate: $0.65 per therm + $15 base fee</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </p>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Your recent billing history and payment status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Usage (therms)</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingData.map((bill, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{bill.month}</TableCell>
                      <TableCell>{bill.usage}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{bill.month} 15, 2023</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Billing History
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Options</CardTitle>
              <CardDescription>Manage your payment methods and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Auto Pay</div>
                  <div className="text-sm text-muted-foreground">Automatically pay your bill on the due date</div>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Paperless Billing</div>
                  <div className="text-sm text-muted-foreground">Receive your bills via email</div>
                </div>
                <Switch checked={true} />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Budget Billing</div>
                  <div className="text-sm text-muted-foreground">
                    Pay the same amount each month based on your average usage
                  </div>
                </div>
                <Switch checked={false} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Manage Payment Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

