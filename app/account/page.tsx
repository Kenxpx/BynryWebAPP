"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bell,
  CreditCard,
  Download,
  Home,
  Mail,
  Phone,
  Save,
  User,
  Shield,
  Key,
  Loader2,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AccountPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordErrors, setPasswordErrors] = useState({})

  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  })

  const [address, setAddress] = useState({
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  })

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    serviceUpdates: true,
    billingReminders: true,
    marketingOffers: false,
    emergencyAlerts: true,
    outageNotifications: true,
    accountChanges: true,
  })

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name, checked) => {
    setNotifications((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))

    // Clear errors when typing
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validatePasswordForm = () => {
    const errors = {}

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required"
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required"
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters"
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password"
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (!validatePasswordForm()) {
      return
    }

    setIsChangingPassword(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form and close dialog
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setShowPasswordDialog(false)

      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const saveChanges = async (section) => {
    setIsSaving(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Changes Saved",
        description: `Your ${section} information has been updated successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to save ${section} information. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Sample billing history
  const billingHistory = [
    {
      id: "INV-2023-001",
      date: "2023-04-01",
      amount: "$78.50",
      status: "Paid",
      type: "Monthly Service",
      dueDate: "2023-04-15",
    },
    {
      id: "INV-2023-002",
      date: "2023-03-01",
      amount: "$82.75",
      status: "Paid",
      type: "Monthly Service",
      dueDate: "2023-03-15",
    },
    {
      id: "INV-2023-003",
      date: "2023-02-01",
      amount: "$79.25",
      status: "Paid",
      type: "Monthly Service",
      dueDate: "2023-02-15",
    },
    {
      id: "INV-2023-004",
      date: "2023-01-01",
      amount: "$85.00",
      status: "Paid",
      type: "Monthly Service",
      dueDate: "2023-01-15",
    },
  ]

  // Sample payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Bank Account",
      last4: "9876",
      expiry: null,
      isDefault: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowPasswordDialog(true)}>
            <Key className="h-4 w-4" />
            Change Password
          </Button>
        </div>
      </div>

      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  <Input id="phone" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={() => saveChanges("personal")} disabled={isSaving}>
                  {isSaving && activeTab === "personal" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Service Address
                </CardTitle>
                <CardDescription>Update your service location</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" name="street" value={address.street} onChange={handleAddressChange} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={address.city} onChange={handleAddressChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={address.state} onChange={handleAddressChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" name="zip" value={address.zip} onChange={handleAddressChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={() => saveChanges("address")} disabled={isSaving}>
                  {isSaving && activeTab === "personal" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Address
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Billing History
                  </CardTitle>
                  <CardDescription>View and download your past invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>
                            <Badge variant={invoice.status === "Paid" ? "outline" : "default"}>{invoice.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="ml-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Download All
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {method.type} •••• {method.last4}
                        </div>
                        {method.expiry && <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>}
                      </div>
                      <div className="flex items-center">
                        {method.isDefault && (
                          <Badge variant="outline" className="mr-2">
                            Default
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add Payment Method</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Billing Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="paperless">Paperless Billing</Label>
                      <p className="text-sm text-muted-foreground">Receive bills via email</p>
                    </div>
                    <Switch id="paperless" checked={true} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autopay">Auto Pay</Label>
                      <p className="text-sm text-muted-foreground">Automatically pay bills when due</p>
                    </div>
                    <Switch id="autopay" checked={true} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive updates and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Communication Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked)}
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
                    checked={notifications.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
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
                    checked={notifications.serviceUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("serviceUpdates", checked)}
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
                    checked={notifications.billingReminders}
                    onCheckedChange={(checked) => handleNotificationChange("billingReminders", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Critical alerts about gas leaks or service disruptions
                    </p>
                  </div>
                  <Switch
                    id="emergency-alerts"
                    checked={notifications.emergencyAlerts}
                    onCheckedChange={(checked) => handleNotificationChange("emergencyAlerts", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="outage-notifications">Outage Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about planned or unplanned service outages
                    </p>
                  </div>
                  <Switch
                    id="outage-notifications"
                    checked={notifications.outageNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("outageNotifications", checked)}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-offers">Marketing & Offers</Label>
                    <p className="text-sm text-muted-foreground">Special offers and promotions</p>
                  </div>
                  <Switch
                    id="marketing-offers"
                    checked={notifications.marketingOffers}
                    onCheckedChange={(checked) => handleNotificationChange("marketingOffers", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => saveChanges("notification")} disabled={isSaving}>
                {isSaving && activeTab === "notifications" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Account Security
                </CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="account-changes">Account Change Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified when changes are made to your account</p>
                  </div>
                  <Switch
                    id="account-changes"
                    checked={notifications.accountChanges}
                    onCheckedChange={(checked) => handleNotificationChange("accountChanges", checked)}
                  />
                </div>
                <Separator />
                <div>
                  <Button variant="outline" className="w-full" onClick={() => setShowPasswordDialog(true)}>
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
                <CardDescription>Recent account access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.1</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      Active
                    </Badge>
                  </div>

                  <div className="flex justify-between items-start border-b pb-2">
                    <div>
                      <p className="font-medium">Previous Login</p>
                      <p className="text-sm text-muted-foreground">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.2</p>
                    </div>
                    <div className="text-sm text-muted-foreground">Yesterday, 3:42 PM</div>
                  </div>

                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Previous Login</p>
                      <p className="text-sm text-muted-foreground">Firefox on MacOS</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.3</p>
                    </div>
                    <div className="text-sm text-muted-foreground">Apr 10, 2023, 9:15 AM</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Login History
                </Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    The following actions are permanent and cannot be undone. Please proceed with caution.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Delete All Data
                  </Button>
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Close Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and a new password to update your account security.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className={passwordErrors.currentPassword ? "text-destructive" : ""}>
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.currentPassword ? "border-destructive" : ""}
                />
                {passwordErrors.currentPassword && (
                  <p className="text-xs text-destructive">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className={passwordErrors.newPassword ? "text-destructive" : ""}>
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.newPassword ? "border-destructive" : ""}
                />
                {passwordErrors.newPassword && <p className="text-xs text-destructive">{passwordErrors.newPassword}</p>}
                {!passwordErrors.newPassword && (
                  <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className={passwordErrors.confirmPassword ? "text-destructive" : ""}>
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={passwordErrors.confirmPassword ? "border-destructive" : ""}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-xs text-destructive">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setShowPasswordDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

