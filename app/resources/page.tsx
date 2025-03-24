"use client"
import { useState } from "react"
import { BookOpen, FileText, Video, Users, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const resources = [
    {
      title: "Career Guides",
      icon: BookOpen,
      description: "Comprehensive guides on career development and job search strategies",
      links: ["Resume Writing", "Interview Tips", "Salary Negotiation"]
    },
    {
      title: "Blog Articles",
      icon: FileText,
      description: "Latest insights on industry trends and professional growth",
      links: ["Tech Trends", "Remote Work", "Career Change"]
    },
    {
      title: "Video Tutorials",
      icon: Video,
      description: "Learn from experts through our curated video content",
      links: ["Interview Preparation", "LinkedIn Optimization", "Portfolio Building"]
    },
    {
      title: "Community",
      icon: Users,
      description: "Connect with other professionals and share experiences",
      links: ["Discussion Forums", "Networking Events", "Mentorship Programs"]
    }
  ]

  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.links.some(link => link.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Career Resources</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-12 bg-white border-gray-200 focus-visible:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <resource.icon className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">{resource.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <ul className="space-y-2">
                {resource.links.map((link, i) => (
                  <li key={i}>
                    <Link href="#" className="text-blue-600 hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No resources found matching your search.
          </div>
        )}
      </div>
    </main>
  )
}