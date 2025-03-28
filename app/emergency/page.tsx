import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Phone, ArrowLeft, MapPin, Info, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

export default function EmergencyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h1 className="text-3xl font-bold text-destructive">Gas Emergency Information</h1>
        </div>

        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important Safety Notice</AlertTitle>
          <AlertDescription>
            If you smell gas or suspect a gas leak, leave the area immediately and call our emergency hotline from a
            safe location.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-destructive" />
                Emergency Contact
              </CardTitle>
              <CardDescription>Call our 24/7 emergency hotline immediately</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-6 border-2 border-destructive rounded-lg">
                <p className="text-lg font-medium mb-2">Gas Emergency Hotline</p>
                <a href="tel:1-800-123-4567" className="text-3xl font-bold text-destructive">
                  1-800-123-4567
                </a>
                <p className="text-sm text-muted-foreground mt-2">Available 24 hours a day, 7 days a week</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">When to call the emergency line:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You smell gas (rotten egg odor)</li>
                  <li>You hear a hissing sound near a gas line</li>
                  <li>You see damaged gas infrastructure</li>
                  <li>Your carbon monoxide detector is alarming</li>
                  <li>There's a fire or explosion related to natural gas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What to Do in a Gas Emergency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 rounded-full p-2 mt-1">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium">If You Smell Gas</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      <li>Do not light matches, candles, or create any flames</li>
                      <li>Do not turn electrical appliances or switches on or off</li>
                      <li>Do not use phones (including cell phones) in the area</li>
                      <li>Open windows and doors to ventilate the area</li>
                      <li>Evacuate everyone from the building immediately</li>
                      <li>Call our emergency number from a safe location</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 rounded-full p-2 mt-1">
                    <MapPin className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium">If You Suspect a Gas Line Damage</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      <li>Leave the area immediately</li>
                      <li>Warn others to stay away</li>
                      <li>Call our emergency number</li>
                      <li>Do not attempt to repair the damage yourself</li>
                      <li>Wait for qualified technicians to arrive</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 rounded-full p-2 mt-1">
                    <Info className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-medium">Carbon Monoxide Safety</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      <li>Install carbon monoxide detectors on every level of your home</li>
                      <li>If your CO detector alarms, evacuate immediately</li>
                      <li>Call emergency services from outside the building</li>
                      <li>Seek medical attention if you experience symptoms (headache, dizziness, nausea)</li>
                      <li>Have all fuel-burning appliances inspected annually</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Prevention Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Regular Inspections</p>
                  <p className="text-sm text-muted-foreground">
                    Have gas appliances inspected annually by qualified technicians.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Install Detectors</p>
                  <p className="text-sm text-muted-foreground">
                    Install and maintain carbon monoxide detectors in your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Know Your Equipment</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to shut off your gas supply in an emergency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Clear Vents</p>
                  <p className="text-sm text-muted-foreground">Keep vents and flues clear of debris, snow, and ice.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Safety Guide
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="#" className="text-primary hover:underline block">
                Gas Safety Guidelines
              </Link>
              <Link href="#" className="text-primary hover:underline block">
                Carbon Monoxide Information
              </Link>
              <Link href="#" className="text-primary hover:underline block">
                Appliance Safety Tips
              </Link>
              <Link href="#" className="text-primary hover:underline block">
                Emergency Preparedness
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

