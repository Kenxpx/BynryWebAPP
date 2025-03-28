"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertOctagon, Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 text-center">
      <AlertOctagon className="h-16 w-16 text-destructive mb-6" />
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-xl text-muted-foreground mb-8">
        We apologize for the inconvenience. Please try again or contact support if the problem persists.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} size="lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          Try Again
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

