"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building, MapPin, Briefcase, Clock, CheckCircle2, Share2, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { jobListings } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageProps, Job } from "@/types"

export default function JobDetailsPage({ params }: PageProps) {
  const router = useRouter()
  const resolvedParams = React.use(params)
  const job = jobListings.find((job: Job) => job.id === resolvedParams.id) || jobListings[0]

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
            Back
          </Button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border border-gray-200">
                {job.companyLogo ? (
                  <img
                    src={
                      job.companyLogo ||
                      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop"
                    }
                    alt={`${job.company} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <Building className="text-gray-400" size={32} />
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <span>{job.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <BookmarkPlus className="h-5 w-5" />
                <span className="sr-only">Save job</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share job</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">Apply Now</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase size={16} className="mr-2 text-gray-500" />
              {job.jobType}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-gray-500" />
              Posted {job.postedDate}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2 text-gray-500" />
              {job.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="mb-6 bg-gray-100">
                    <TabsTrigger
                      value="description"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="requirements"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Requirements
                    </TabsTrigger>
                    <TabsTrigger
                      value="benefits"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                    >
                      Benefits
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
                      <p className="text-gray-700 leading-relaxed">
                        We are seeking a highly skilled and experienced Principal Software Engineer to lead the
                        development of innovative software solutions. The ideal candidate will possess a strong
                        technical background, excellent leadership qualities, and the ability to drive projects from
                        conception to completion. Responsibilities include mentoring junior developers, making
                        architectural decisions, and ensuring the successful delivery of projects.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Bachelor's degree in Computer Science or related field</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">10+ years of software engineering experience</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Proficiency in Java, Python, or C++</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">
                            Strong understanding of software development methodologies
                          </span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="mt-0">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-gray-900">Benefits</h2>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Competitive salary and benefits package</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Opportunities for professional growth</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Collaborative and innovative work environment</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Flexible working hours and remote work options</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">Health, dental, and vision insurance</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mt-1 mr-3">
                            <CheckCircle2 size={16} className="text-blue-500" />
                          </div>
                          <span className="text-gray-700">401(k) matching program</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Overview</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage
                      src={
                        job.companyLogo ||
                        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=100&auto=format&fit=crop"
                      }
                      alt={job.company}
                    />
                    <AvatarFallback className="rounded-md bg-gray-100 text-gray-500">
                      {job.company.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{job.company}</h3>
                    <p className="text-sm text-gray-600">Technology</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Tech Innovations Inc. is a leading technology company focused on developing cutting-edge solutions for
                  various industries. We are committed to fostering a culture of innovation, collaboration, and
                  continuous learning. Our team comprises talented individuals who are passionate about pushing the
                  boundaries of technology and making a positive impact on the world.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Company size</p>
                    <p className="font-medium text-gray-900">201-500 employees</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Founded</p>
                    <p className="font-medium text-gray-900">2015</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Industry</p>
                    <p className="font-medium text-gray-900">Technology</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Website</p>
                    <p className="font-medium text-blue-600">techinnovations.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-gray-200 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary</span>
                    <span className="font-medium text-gray-900">{job.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type</span>
                    <span className="font-medium text-gray-900">{job.jobType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted</span>
                    <span className="font-medium text-gray-900">{job.postedDate}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {jobListings
                    .slice(0, 3)
                    .filter((j) => j.id !== job.id)
                    .map((similarJob) => (
                      <div key={similarJob.id} className="group">
                        <a href={`/jobs/${similarJob.id}`} className="block">
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {similarJob.title}
                          </h4>
                          <p className="text-sm text-gray-600">{similarJob.company}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin size={14} className="mr-1" />
                            {similarJob.location}
                          </div>
                        </a>
                        <Separator className="my-3" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

