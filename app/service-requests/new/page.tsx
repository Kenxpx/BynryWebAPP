"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, Upload, AlertTriangle, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function NewServiceRequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formErrors, setFormErrors] = useState({})
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    priority: "medium",
    preferredContact: "email",
    files: [],
  })

  // Simulate address lookup
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [isLookingUpAddress, setIsLookingUpAddress] = useState(false)

  const handleAddressLookup = () => {
    if (!formData.zip) {
      setFormErrors((prev) => ({ ...prev, zip: "ZIP code is required for address lookup" }))
      return
    }

    setIsLookingUpAddress(true)

    // Simulate API call for address lookup
    setTimeout(() => {
      // Mock address suggestions based on ZIP
      const mockSuggestions = [
        { address: "123 Main St", city: "Anytown", state: "CA", zip: formData.zip },
        { address: "456 Oak Ave", city: "Anytown", state: "CA", zip: formData.zip },
        { address: "789 Pine St", city: "Anytown", state: "CA", zip: formData.zip },
      ]
      setAddressSuggestions(mockSuggestions)
      setIsLookingUpAddress(false)
    }, 1500)
  }

  const selectSuggestedAddress = (address) => {
    setFormData((prev) => ({
      ...prev,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
    }))
    setAddressSuggestions([])
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.type) errors.type = "Request type is required"
    if (!formData.description) errors.description = "Description is required"
    if (!formData.address) errors.address = "Service address is required"
    if (!formData.city) errors.city = "City is required"
    if (!formData.state) errors.state = "State is required"
    if (!formData.zip) errors.zip = "ZIP code is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate file upload progress
    const uploadTimer = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadTimer)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Service Request Submitted",
        description: "Your request has been successfully submitted. Reference number: SR-2023-008",
        variant: "default",
      })

      // Redirect to service requests page
      router.push("/service-requests")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is filled
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is filled
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...selectedFiles] }))
  }

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Submit New Service Request</h1>
      <p className="text-muted-foreground mb-6">
        Please provide details about your service request so we can assist you promptly
      </p>

      {formData.type === "gas_leak" && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Safety Notice</AlertTitle>
          <AlertDescription>
            If you smell gas or suspect a serious gas leak, please evacuate the premises immediately and call our
            emergency hotline at <strong>1-800-123-4567</strong> from a safe location.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className={formErrors.type ? "text-destructive" : ""}>
                    Request Type {formErrors.type && <span className="text-xs">({formErrors.type})</span>}
                  </Label>
                  <Select required onValueChange={(value) => handleSelectChange("type", value)} value={formData.type}>
                    <SelectTrigger className={formErrors.type ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gas_leak">Gas Leak</SelectItem>
                      <SelectItem value="connection_issue">Connection Issue</SelectItem>
                      <SelectItem value="billing_question">Billing Question</SelectItem>
                      <SelectItem value="new_connection">New Connection</SelectItem>
                      <SelectItem value="meter_reading">Meter Reading</SelectItem>
                      <SelectItem value="service_interruption">Service Interruption</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className={formErrors.description ? "text-destructive" : ""}>
                    Description {formErrors.description && <span className="text-xs">({formErrors.description})</span>}
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Please describe your issue in detail"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className={formErrors.description ? "border-destructive" : ""}
                  />
                  <p className="text-xs text-muted-foreground">
                    Please include any relevant details that will help us address your request efficiently.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Priority Level</Label>
                  <RadioGroup
                    defaultValue="medium"
                    value={formData.priority}
                    onValueChange={(value) => handleSelectChange("priority", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-red-500 font-medium">
                        High - Urgent issue requiring immediate attention
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium">Medium - Standard priority issue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-muted-foreground">
                        Low - Non-urgent inquiry or request
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Contact Method</Label>
                  <RadioGroup
                    defaultValue="email"
                    value={formData.preferredContact}
                    onValueChange={(value) => handleSelectChange("preferredContact", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Phone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text">Text Message</Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-6 pt-4">
                <div className="flex gap-2 mb-4">
                  <div className="flex-grow">
                    <Input
                      placeholder="Enter ZIP code"
                      value={formData.zip}
                      onChange={(e) => handleSelectChange("zip", e.target.value)}
                      className={formErrors.zip ? "border-destructive" : ""}
                    />
                    {formErrors.zip && <p className="text-xs text-destructive mt-1">{formErrors.zip}</p>}
                  </div>
                  <Button type="button" variant="secondary" onClick={handleAddressLookup} disabled={isLookingUpAddress}>
                    {isLookingUpAddress ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Looking up...
                      </>
                    ) : (
                      "Find Address"
                    )}
                  </Button>
                </div>

                {addressSuggestions.length > 0 && (
                  <div className="mb-4 border rounded-md p-2">
                    <p className="text-sm font-medium mb-2">Select an address:</p>
                    <div className="space-y-2">
                      {addressSuggestions.map((address, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-muted rounded cursor-pointer"
                          onClick={() => selectSuggestedAddress(address)}
                        >
                          {address.address}, {address.city}, {address.state} {address.zip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="address" className={formErrors.address ? "text-destructive" : ""}>
                    Street Address {formErrors.address && <span className="text-xs">({formErrors.address})</span>}
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Enter the street address where service is needed"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className={formErrors.address ? "border-destructive" : ""}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className={formErrors.city ? "text-destructive" : ""}>
                      City {formErrors.city && <span className="text-xs">({formErrors.city})</span>}
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="City"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className={formErrors.city ? "border-destructive" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className={formErrors.state ? "text-destructive" : ""}>
                      State {formErrors.state && <span className="text-xs">({formErrors.state})</span>}
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="State"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className={formErrors.state ? "border-destructive" : ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip" className={formErrors.zip ? "text-destructive" : ""}>
                    ZIP Code {formErrors.zip && <span className="text-xs">({formErrors.zip})</span>}
                  </Label>
                  <Input
                    id="zip"
                    name="zip"
                    placeholder="ZIP Code"
                    required
                    value={formData.zip}
                    onChange={handleChange}
                    className={formErrors.zip ? "border-destructive" : ""}
                  />
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-6 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="files">Attach Files (optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop files here or click to browse</p>
                    <Input id="files" type="file" multiple className="hidden" onChange={handleFileChange} />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("files").click()}>
                      Select Files
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Max file size: 10MB. Supported formats: JPG, PNG, PDF, DOC
                    </p>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Selected files:</h4>
                      <div className="space-y-2">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                            <div className="flex items-center">
                              <div className="text-sm">{file.name}</div>
                              <div className="text-xs text-muted-foreground ml-2">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </div>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={() => removeFile(index)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Remove file</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Uploading files...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

