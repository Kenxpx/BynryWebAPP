"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Plus, Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceRequestsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [serviceRequests, setServiceRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // This would normally fetch from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: "SR-2023-001",
          type: "Gas Leak",
          status: "In Progress",
          createdAt: "2023-04-15T10:30:00Z",
          updatedAt: "2023-04-15T14:45:00Z",
          description: "Possible gas leak in basement near water heater",
          priority: "high",
          address: "123 Main St, Anytown, CA",
        },
        {
          id: "SR-2023-002",
          type: "Billing Question",
          status: "Open",
          createdAt: "2023-04-10T09:15:00Z",
          updatedAt: "2023-04-10T09:15:00Z",
          description: "Question about recent bill increase",
          priority: "medium",
          address: "123 Main St, Anytown, CA",
        },
        {
          id: "SR-2023-003",
          type: "New Connection",
          status: "Scheduled",
          createdAt: "2023-03-28T11:00:00Z",
          updatedAt: "2023-04-12T16:30:00Z",
          description: "Request for new gas connection at property",
          priority: "medium",
          address: "456 Oak Ave, Anytown, CA",
        },
        {
          id: "SR-2023-004",
          type: "Meter Reading",
          status: "Completed",
          createdAt: "2023-03-15T13:45:00Z",
          updatedAt: "2023-03-18T10:20:00Z",
          description: "Request for manual meter reading",
          priority: "low",
          address: "123 Main St, Anytown, CA",
        },
        {
          id: "SR-2023-005",
          type: "Gas Leak",
          status: "Completed",
          createdAt: "2023-02-20T08:30:00Z",
          updatedAt: "2023-02-21T15:10:00Z",
          description: "Gas smell near outdoor meter",
          priority: "high",
          address: "789 Pine St, Anytown, CA",
        },
        {
          id: "SR-2023-006",
          type: "Billing Question",
          status: "Completed",
          createdAt: "2023-01-05T14:20:00Z",
          updatedAt: "2023-01-07T09:45:00Z",
          description: "Need explanation for service charge",
          priority: "low",
          address: "123 Main St, Anytown, CA",
        },
        {
          id: "SR-2023-007",
          type: "Service Interruption",
          status: "Completed",
          createdAt: "2022-12-12T11:30:00Z",
          updatedAt: "2022-12-13T16:20:00Z",
          description: "No gas service after street construction",
          priority: "high",
          address: "123 Main St, Anytown, CA",
        },
      ]
      setServiceRequests(mockData)
      setIsLoading(false)
    }, 1500)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let results = [...serviceRequests]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (request) =>
          request.id.toLowerCase().includes(query) ||
          request.description.toLowerCase().includes(query) ||
          request.type.toLowerCase().includes(query) ||
          request.address.toLowerCase().includes(query),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter((request) => request.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply type filter
    if (typeFilter !== "all") {
      results = results.filter((request) => request.type.toLowerCase() === typeFilter.toLowerCase())
    }

    // Apply sorting
    if (sortBy === "newest") {
      results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortBy === "oldest") {
      results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sortBy === "priority") {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      results.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    } else if (sortBy === "updated") {
      results.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    }

    setFilteredRequests(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [serviceRequests, searchQuery, statusFilter, typeFilter, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const currentItems = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-500"
      case "In Progress":
        return "bg-yellow-500"
      case "Scheduled":
        return "bg-purple-500"
      case "Completed":
        return "bg-green-500"
      case "On Hold":
        return "bg-orange-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="default">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setTypeFilter("all")
    setSortBy("newest")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Service Requests</h1>
          <p className="text-muted-foreground mt-1">Track and manage your service requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/service-requests/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
                {(statusFilter !== "all" || typeFilter !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {statusFilter !== "all" && typeFilter !== "all" ? "2" : "1"}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Requests</SheetTitle>
                <SheetDescription>Narrow down your service requests by status and type</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status</h3>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="on hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Request Type</h3>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="gas leak">Gas Leak</SelectItem>
                      <SelectItem value="billing question">Billing Question</SelectItem>
                      <SelectItem value="new connection">New Connection</SelectItem>
                      <SelectItem value="meter reading">Meter Reading</SelectItem>
                      <SelectItem value="service interruption">Service Interruption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-72" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>
                  <div className="flex justify-between mt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredRequests.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No service requests found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your filters or search query"
                    : "You haven't submitted any service requests yet"}
                </p>
                <Link href="/service-requests/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create New Request
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentItems.map((request) => (
                <Link href={`/service-requests/${request.id}`} key={request.id}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2 mb-2">
                              <FileText className="h-5 w-5 text-primary" />
                              {request.type} - {request.id}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground mb-2">{request.description}</div>
                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Location:</span> {request.address}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <div
                              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(request.status)}`}
                            >
                              {request.status}
                            </div>
                            {getPriorityBadge(request.priority)}
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground mt-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Created: {formatDate(request.createdAt)}</span>
                          </div>
                          <div>Last Updated: {formatDate(request.updatedAt)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {totalPages > 1 && (
                <Pagination className="mt-6">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

