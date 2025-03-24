export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  coverImage?: string
  location: string
  jobType: string
  salary: string
  description: string
  postedDate: string
  isUrgent: boolean
  isNew: boolean
  featured: boolean
  category: string
  tags: string[]
}

export interface JobCardProps {
  job: Job
  featured?: boolean
}

export interface PageProps {
  params: Promise<{ id: string }>
}

// Theme related types
export interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  storageKey?: string
  suppressHydrationWarning?: boolean
}

// Filter related types
export interface FilterOption {
  id: string
  label: string
  value: string
}

export interface JobFilters {
  location?: string
  jobType?: string
  category?: string
  salary?: string
  experience?: string
  tags?: string[]
}

// Search related types
export interface SearchParams {
  query?: string
  filters?: JobFilters
  page?: number
  limit?: number
}

export interface SearchSuggestion {
  type: 'title' | 'company' | 'skill'
  value: string
}

export interface JobListingPageProps {
  searchSuggestions: SearchSuggestion[]
  filteredJobs: Job[]
}