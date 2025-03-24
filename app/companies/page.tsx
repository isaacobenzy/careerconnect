"use client"
import { Building, Users, MapPin } from "lucide-react"
import { jobListings } from "@/lib/data"
import Link from "next/link"

export default function CompaniesPage() {
  // Get unique companies
  const companies = [...new Set(jobListings.map(job => ({
    name: job.company,
    logo: job.companyLogo,
    location: job.location,
    openPositions: jobListings.filter(j => j.company === job.company).length
  })))];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Top Companies Hiring</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <Link href={`/jobs?company=${company.name}`} key={index}>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {company.logo ? (
                      <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
                    ) : (
                      <Building className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{company.name}</h2>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {company.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {company.openPositions} open positions
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}