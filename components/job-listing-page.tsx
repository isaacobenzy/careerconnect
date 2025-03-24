"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, ChevronDown, Filter, MapPin, Briefcase, Clock, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import JobCard from "@/components/job-card"
import AdvancedFilterModal from "@/components/advanced-filter-modal"
import { jobListings } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "@/hooks/use-debounce"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMobile } from "@/hooks/use-mobile"
import { SearchSuggestion, Job } from "@/types"
import { Badge } from "@/components/ui/badge"

export default function JobListingPage() {
  const [visibleJobCount, setVisibleJobCount] = useState(6)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  // Add categories array
  const categories = [
    "All Jobs",
    "Engineering",
    "Design",
    "Marketing",
    "Product",
    "Sales",
  ]

  // Add handleSuggestionClick function
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.value)
    setShowSuggestions(false)
  }
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobListings)
  const [isLoading, setIsLoading] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All Jobs")
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const isMobile = useMobile()

  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const searchInputRef = useRef(null)

  // Inside useEffect for search suggestions
  useEffect(() => {
    if (debouncedSearchQuery.length > 1) {
      // Collect unique job titles and skills
      const titles = [...new Set(jobListings.map((job) => job.title))]
      const companies = [...new Set(jobListings.map((job) => job.company))]
      const skills = [...new Set(jobListings.flatMap((job) => job.tags))]

      // Filter based on query
      const filteredTitles = titles.filter((title) => title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
      const filteredCompanies = companies.filter((company) =>
        company.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      )
      const filteredSkills = skills.filter((skill) => skill.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))

      // Combine and limit results with proper type assertions
      setSearchSuggestions(
        [
          ...filteredTitles.map((t) => ({ type: "title" as const, value: t })),
          ...filteredCompanies.map((c) => ({ type: "company" as const, value: c })),
          ...filteredSkills.map((s) => ({ type: "skill" as const, value: s })),
        ].slice(0, 5)
      )

      setShowSuggestions(true)
    } else {
      setSearchSuggestions([])
      setShowSuggestions(false)
    }
  }, [debouncedSearchQuery])

  // Apply filters whenever search changes
  useEffect(() => {
    setIsLoading(true)

    // Simulate API call delay
    const timer = setTimeout(() => {
      const filtered = jobListings.filter((job) => {
        // Search query filter
        const searchMatches =
          !debouncedSearchQuery ||
          job.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          job.tags.some((tag) => tag.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))

        // Category filter
        const categoryMatches = activeCategory === "All Jobs" || job.category === activeCategory

        return searchMatches && categoryMatches
      })

      setFilteredJobs(filtered)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [debouncedSearchQuery, activeCategory])

  const featuredJobs = filteredJobs.filter((job) => job.featured).slice(0, 4)
  const recentJobs = filteredJobs.filter((job) => !job.featured).slice(0, visibleJobCount)
  
  const handleLoadMore = () => {
    setVisibleJobCount(prev => prev + 3)
  }

  // In the Recent Listings section, update the Load More button:
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find your dream job</h1>
            <p className="text-gray-600 text-lg">Browse through thousands of full-time and part-time jobs near you</p>

            {/* Enhanced Search Bar */}
            <div className="relative mt-8">
              <Popover 
                open={showSuggestions && searchSuggestions.length > 0} 
                onOpenChange={setShowSuggestions}
              >
                <PopoverTrigger asChild>
                  <div className={`relative flex items-center transition-all duration-200 ${
                    isSearchFocused ? 'transform scale-105' : ''
                  }`}>
                    <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                      isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                    }`} size={20} />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search jobs, companies, or keywords"
                      className={`pl-12 pr-4 h-14 rounded-full bg-white border-gray-200 shadow-sm w-full 
                        ${isSearchFocused 
                          ? 'border-blue-500 ring-2 ring-blue-100 shadow-lg' 
                          : 'hover:border-gray-300'
                        }`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        setIsSearchFocused(true)
                        searchSuggestions.length > 0 && setShowSuggestions(true)
                      }}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] max-w-[450px]" align="start">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No results found</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        {searchSuggestions.map((suggestion, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => handleSuggestionClick(suggestion)}
                            className="cursor-pointer"
                          >
                            {suggestion.type === "title" && <Briefcase className="mr-2 h-4 w-4 text-blue-500" />}
                            {suggestion.type === "company" && <MapPin className="mr-2 h-4 w-4 text-blue-500" />}
                            {suggestion.type === "skill" && <Search className="mr-2 h-4 w-4 text-blue-500" />}
                            <span>{suggestion.value}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${activeCategory === category ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-gray-200"}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                  {category !== "All Jobs" && <ChevronDown className="ml-1 h-4 w-4" />}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-white text-gray-700 border-gray-200"
                onClick={() => setShowFilterModal(true)}
              >
                <Filter className="mr-1 h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Featured Jobs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} featured={true} />
            ))}
          </div>
        </section>

        {/* Recent Listings Section */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">RECENT LISTINGS</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Job Listings */}
            <div className="flex-1">
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <article key={job.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <Link href={`/jobs/${job.id}`} className="group">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                          <span>{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          {job.isNew && (
                            <Badge variant="default" className="bg-green-500">New</Badge>
                          )}
                          {job.isUrgent && (
                            <Badge variant="destructive">Hot</Badge>
                          )}
                          <Badge variant="outline" className="text-gray-600">
                            {job.jobType}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={`${job.company} logo`}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <Building className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              
              {/* Load More Button */}
              {filteredJobs.filter(job => !job.featured).length > visibleJobCount && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-gray-700 bg-gray-100 hover:bg-gray-200"
                    onClick={handleLoadMore}
                  >
                    LOAD MORE
                  </Button>
                </div>
              )}
            </div>

          
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* No Results State */}
        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jobs found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Advanced Filter Modal */}
      <AdvancedFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </div>
  )
}

