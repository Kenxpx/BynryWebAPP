"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, MapPin, User, X, Edit, Plus, Search, Filter, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export default function AppointmentsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  // New appointment form state
  const [date, setDate] = useState(null)
  const [timeSlot, setTimeSlot] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [propertyId, setPropertyId] = useState("")
  const [notes, setNotes] = useState("")

  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: "Meter Inspection",
      date: "2023-06-18",
      time: "10:00 AM - 12:00 PM",
      address: "123 Main St, Anytown, CA",
      technician: "John Smith",
      status: "scheduled",
      notes: "Annual meter inspection and safety check.",
    },
    {
      id: 2,
      type: "Water Heater Maintenance",
      date: "2023-06-25",
      time: "2:00 PM - 4:00 PM",
      address: "123 Main St, Anytown, CA",
      technician: "Sarah Johnson",
      status: "scheduled",
      notes: "Regular maintenance for water heater.",
    },
    {
      id: 3,
      type: "Gas Line Installation",
      date: "2023-05-15",
      time: "9:00 AM - 11:00 AM",
      address: "456 Oak Ave, Seaside, CA",
      technician: "Mike Brown",
      status: "completed",
      notes: "Installation of new gas line for outdoor grill.",
    },
    {
      id: 4,
      type: "Furnace Repair",
      date: "2023-04-22",
      time: "1:00 PM - 3:00 PM",
      address: "123 Main St, Anytown, CA",
      technician: "David Wilson",
      status: "completed",
      notes: "Repair of furnace ignition system.",
    },
    {
      id: 5,
      type: "Safety Inspection",
      date: "2023-03-10",
      time: "11:00 AM - 1:00 PM",
      address: "123 Main St, Anytown, CA",
      technician: "Lisa Garcia",
      status: "cancelled",
      notes: "Annual safety inspection of all gas appliances.",
    },
  ])

  // Sample properties data
  const properties = [
    {
      id: 1,
      nickname: "Main Residence",
      address: "123 Main St, Anytown, CA 12345",
    },
    {
      id: 2,
      nickname: "Vacation Home",
      address: "456 Beach Ave, Seaside, CA 67890",
    },
  ]

  // Sample service types
  const serviceTypes = [
    "Meter Inspection",
    "Appliance Installation",
    "Appliance Repair",
    "Gas Line Service",
    "Safety Inspection",
    "Water Heater Service",
    "Furnace Service",
    "Other",
  ]

  // Sample time slots
  const timeSlots = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
  ]

  // Filter appointments based on active tab and search query
  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by tab
    if (activeTab === "upcoming" && (appointment.status === "cancelled" || isAppointmentPast(appointment.date))) {
      return false
    }
    if (activeTab === "past" && !isAppointmentPast(appointment.date)) {
      return false
    }
    if (activeTab === "cancelled" && appointment.status !== "cancelled") {
      return false
    }

    // Filter by search query
    if (
      searchQuery &&
      !appointment.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !appointment.technician.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Check if appointment date is in the past
  function isAppointmentPast(dateString) {
    const appointmentDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return appointmentDate < today
  }

  // Format date
  function formatAppointmentDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Get status badge
  function getStatusBadge(status) {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-blue-500">Scheduled</Badge>
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-destructive border-destructive">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Handle scheduling a new appointment
  const handleScheduleAppointment = (e) => {
    e.preventDefault()

    if (!date || !timeSlot || !serviceType || !propertyId) {
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
      const selectedProperty = properties.find((p) => p.id.toString() === propertyId)

      const newAppointment = {
        id: appointments.length + 1,
        type: serviceType,
        date: format(date, "yyyy-MM-dd"),
        time: timeSlot,
        address: selectedProperty.address,
        technician: "To be assigned",
        status: "scheduled",
        notes: notes,
      }

      setAppointments((prev) => [...prev, newAppointment])

      // Reset form
      setDate(null)
      setTimeSlot("")
      setServiceType("")
      setPropertyId("")
      setNotes("")

      setShowScheduleDialog(false)
      setIsSubmitting(false)

      toast({
        title: "Appointment Scheduled",
        description: `Your appointment has been scheduled for ${formatAppointmentDate(newAppointment.date)} between ${newAppointment.time}.`,
      })
    }, 1500)
  }

  // Handle cancelling an appointment
  const handleCancelAppointment = () => {
    if (!selectedAppointment) return

    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.id === selectedAppointment.id ? { ...appointment, status: "cancelled" } : appointment,
        ),
      )

      setShowCancelDialog(false)
      setSelectedAppointment(null)
      setIsCancelling(false)

      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been cancelled successfully.",
      })
    }, 1500)
  }

  // Open cancel dialog
  const openCancelDialog = (appointment) => {
    setSelectedAppointment(appointment)
    setShowCancelDialog(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <CalendarIcon className="h-8 w-8 text-primary" />
            Service Appointments
          </h1>
          <p className="text-muted-foreground">Schedule and manage your service appointments</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setShowScheduleDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {serviceTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>
                  {type}
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
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "upcoming"
                ? "Upcoming Appointments"
                : activeTab === "past"
                  ? "Past Appointments"
                  : "Cancelled Appointments"}
            </CardTitle>
            <CardDescription>
              {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming appointments scheduled."
                    : activeTab === "past"
                      ? "You don't have any past appointments."
                      : "You don't have any cancelled appointments."}
                </p>
                {activeTab === "upcoming" && (
                  <Button onClick={() => setShowScheduleDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Appointment
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{appointment.type}</h3>
                            {getStatusBadge(appointment.status)}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{formatAppointmentDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </div>

                        {appointment.status === "scheduled" && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive"
                              onClick={() => openCancelDialog(appointment)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>

                      <Separator className="my-4" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Service Address</p>
                            <p className="text-sm text-muted-foreground">{appointment.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Technician</p>
                            <p className="text-sm text-muted-foreground">{appointment.technician}</p>
                          </div>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-4">
                          <p className="text-sm font-medium">Notes</p>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>

      {/* Schedule Appointment Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Schedule Service Appointment</DialogTitle>
            <DialogDescription>Select a date, time, and service type for your appointment</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleAppointment}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Service Type</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger id="service-type">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property">Property</Label>
                  <Select value={propertyId} onValueChange={setPropertyId}>
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id.toString()}>
                          {property.nickname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Appointment Date</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Input
                  id="notes"
                  placeholder="Any special instructions or details"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Appointment Confirmation</Label>
                <RadioGroup defaultValue="email">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email Confirmation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sms" id="sms" />
                    <Label htmlFor="sms">SMS Confirmation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both Email and SMS</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowScheduleDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  "Schedule Appointment"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cancel Appointment Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedAppointment && (
              <div className="border rounded-md p-3">
                <div className="font-medium">{selectedAppointment.type}</div>
                <div className="text-sm text-muted-foreground">
                  {formatAppointmentDate(selectedAppointment.date)} • {selectedAppointment.time}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{selectedAppointment.address}</div>
              </div>
            )}
            <div className="mt-4">
              <Label htmlFor="cancel-reason">Reason for Cancellation (Optional)</Label>
              <Select>
                <SelectTrigger id="cancel-reason">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="schedule-conflict">Schedule Conflict</SelectItem>
                  <SelectItem value="no-longer-needed">Service No Longer Needed</SelectItem>
                  <SelectItem value="reschedule">Need to Reschedule</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={handleCancelAppointment} disabled={isCancelling}>
              {isCancelling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cancelling...
                </>
              ) : (
                "Cancel Appointment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

