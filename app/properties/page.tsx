"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, Plus, MapPin, Calendar, User, Edit, Trash2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PropertiesPage() {
  const { toast } = useToast()
  const [showAddPropertyDialog, setShowAddPropertyDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [newProperty, setNewProperty] = useState({
    nickname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    type: "residential",
    occupants: "1-2",
  })

  // Sample properties data
  const [properties, setProperties] = useState([
    {
      id: 1,
      nickname: "Main Residence",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
      type: "residential",
      status: "active",
      serviceStartDate: "2018-05-15",
      occupants: "3-4",
      isPrimary: true,
    },
    {
      id: 2,
      nickname: "Vacation Home",
      address: "456 Beach Ave",
      city: "Seaside",
      state: "CA",
      zip: "67890",
      type: "residential",
      status: "active",
      serviceStartDate: "2020-07-22",
      occupants: "1-2",
      isPrimary: false,
    },
  ])

  // Sample service history
  const serviceHistory = [
    {
      id: 1,
      propertyId: 1,
      date: "2023-03-15",
      type: "Maintenance",
      description: "Annual system inspection",
      technician: "John Smith",
    },
    {
      id: 2,
      propertyId: 1,
      date: "2022-11-10",
      type: "Repair",
      description: "Fixed gas leak in kitchen",
      technician: "Sarah Johnson",
    },
    {
      id: 3,
      propertyId: 2,
      date: "2023-01-05",
      type: "Installation",
      description: "New water heater installation",
      technician: "Mike Brown",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewProperty((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setNewProperty((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddProperty = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newPropertyObj = {
        id: properties.length + 1,
        ...newProperty,
        status: "active",
        serviceStartDate: new Date().toISOString().split("T")[0],
        isPrimary: properties.length === 0,
      }

      setProperties((prev) => [...prev, newPropertyObj])

      // Reset form and close dialog
      setNewProperty({
        nickname: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        type: "residential",
        occupants: "1-2",
      })
      setShowAddPropertyDialog(false)

      toast({
        title: "Property Added",
        description: "Your property has been successfully added.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteProperty = async () => {
    if (!selectedProperty) return

    setIsDeleting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProperties((prev) => prev.filter((p) => p.id !== selectedProperty.id))

      setShowDeleteDialog(false)
      setSelectedProperty(null)

      toast({
        title: "Property Deleted",
        description: "The property has been successfully removed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const confirmDelete = (property) => {
    setSelectedProperty(property)
    setShowDeleteDialog(true)
  }

  const getPropertyServiceHistory = (propertyId) => {
    return serviceHistory.filter((service) => service.propertyId === propertyId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Properties</h1>
          <p className="text-muted-foreground">Manage your service locations</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button onClick={() => setShowAddPropertyDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </div>
      </div>

      {properties.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent className="pt-6">
            <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">You haven't added any properties yet</p>
            <Button onClick={() => setShowAddPropertyDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-primary" />
                      {property.nickname}
                      {property.isPrimary && (
                        <Badge variant="default" className="ml-2">
                          Primary
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {property.type.charAt(0).toUpperCase() + property.type.slice(1)} Property
                    </CardDescription>
                  </div>
                  <Badge
                    variant={property.status === "active" ? "outline" : "secondary"}
                    className={property.status === "active" ? "bg-green-50 text-green-700 border-green-200" : ""}
                  >
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p>{property.address}</p>
                    <p>
                      {property.city}, {property.state} {property.zip}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Service Since</p>
                      <p>{new Date(property.serviceStartDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Occupants</p>
                      <p>{property.occupants} people</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="details">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="history">Service History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Account Number</span>
                        <span className="text-sm">GA-{property.id.toString().padStart(6, "0")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Meter Number</span>
                        <span className="text-sm">M-{(property.id * 12345).toString().padStart(8, "0")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Service Type</span>
                        <span className="text-sm">Residential Gas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Rate Plan</span>
                        <span className="text-sm">Standard Residential</span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="pt-4">
                    {getPropertyServiceHistory(property.id).length > 0 ? (
                      <div className="space-y-3">
                        {getPropertyServiceHistory(property.id).map((service) => (
                          <div key={service.id} className="border rounded-md p-3">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{service.type}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(service.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm">{service.description}</p>
                            <p className="text-xs text-muted-foreground mt-1">Technician: {service.technician}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">No service history available</p>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => confirmDelete(property)}
                  disabled={property.isPrimary}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAddPropertyDialog} onOpenChange={setShowAddPropertyDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Property</DialogTitle>
            <DialogDescription>Add a new property to your account for gas service</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddProperty}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Property Nickname</Label>
                <Input
                  id="nickname"
                  name="nickname"
                  placeholder="e.g. Main Home, Vacation House"
                  value={newProperty.nickname}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Street Address"
                  value={newProperty.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="City"
                    value={newProperty.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    placeholder="State"
                    value={newProperty.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  name="zip"
                  placeholder="ZIP Code"
                  value={newProperty.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select value={newProperty.type} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="multi-family">Multi-Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupants">Number of Occupants</Label>
                  <Select
                    value={newProperty.occupants}
                    onValueChange={(value) => handleSelectChange("occupants", value)}
                  >
                    <SelectTrigger id="occupants">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 people</SelectItem>
                      <SelectItem value="3-4">3-4 people</SelectItem>
                      <SelectItem value="5+">5+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowAddPropertyDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Property"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedProperty && (
              <div className="border rounded-md p-3">
                <p className="font-medium">{selectedProperty.nickname}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProperty} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Property"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

