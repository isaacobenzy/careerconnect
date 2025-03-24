import Link from "next/link"
import { Building, MapPin, Clock, BookmarkPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { JobCardProps } from "@/types"

export default function JobCard({ job, featured = false }: JobCardProps) {
  if (featured) {
    return (
      <Link href={`/jobs/${job.id}`} className="block group">
        <Card className="h-full transition-all duration-200 hover:shadow-md overflow-hidden border-gray-200 hover:border-blue-300 bg-white">
          <CardContent className="p-0">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img
                src={
                  job.coverImage ||
                  "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=500&auto=format&fit=crop"
                }
                alt={`${job.title} environment`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <div>
                  <h3 className="font-medium text-white text-lg mb-1">{job.title}</h3>
                  <p className="text-white/80 text-sm">{job.company}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                      >
                        <BookmarkPlus className="h-4 w-4 text-gray-700" />
                        <span className="sr-only">Save job</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save job</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center text-sm text-gray-500 gap-3">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {job.jobType}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <Card className="transition-all duration-200 hover:shadow-md overflow-hidden border-gray-200 hover:border-blue-300 bg-white">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
              {job.companyLogo ? (
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <Building className="text-gray-400" size={24} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {job.title}
                </h3>
                {job.isNew && (
                  <Badge variant="outline" className="text-xs font-normal bg-blue-50 text-blue-600 border-blue-200">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-2 truncate">
                {job.company} • {job.location}
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  {job.jobType}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {job.location}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

