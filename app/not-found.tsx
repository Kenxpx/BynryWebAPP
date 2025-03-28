import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <AlertTriangle className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8">Sorry, we couldn't find the page you're looking for.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/service-requests">View Service Requests</Link>
        </Button>
      </div>
    </div>
  )
}

