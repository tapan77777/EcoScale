'use client'
import { AlertCircle, Calendar, CheckCircle, Clock, Download, Eye, Filter, Leaf, MapPin, MoreVertical, Phone, Search, TrendingUp, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Estimate {
  tCO2e?: number
  revenueINR?: number
}

interface Submission {
  _id: string
  name: string
  phone?: string
  village: string
  district: string
  state: string
  cropType: string
  practice?: string
  areaHa: number
  estimate?: Estimate
  status: string
  createdAt: string
}

interface SubmissionsResponse {
  rows: Submission[]
}

export default function Admin() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [cropFilter, setCropFilter] = useState('all')
  const [data, setData] = useState<SubmissionsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/submissions?limit=100')
        if (!response.ok) throw new Error('Failed to fetch data')
        const result = await response.json() as SubmissionsResponse
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Data</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Filter data
  const filteredData = data.rows.filter(row => {
    const matchesSearch = row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         row.district.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || row.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCrop = cropFilter === 'all' || row.cropType.toLowerCase() === cropFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesCrop
  })

  // Calculate stats
  const totalSubmissions = data.rows.length
  const approvedSubmissions = data.rows.filter(r => r.status === 'Approved').length
  const pendingSubmissions = data.rows.filter(r => r.status === 'Submitted').length
  const totalCO2e = data.rows.reduce((sum, r) => sum + (r.estimate?.tCO2e || 0), 0)
  const totalRevenue = data.rows.reduce((sum, r) => sum + (r.estimate?.revenueINR || 0), 0)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />
      case 'submitted':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-green-600 p-2 rounded-lg mr-3">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">EcoScale Verifier Dashboard</h1>
                  <p className="text-gray-600">Monitor and verify carbon credit submissions</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{totalSubmissions}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedSubmissions}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingSubmissions}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total CO₂e</p>
                <p className="text-2xl font-bold text-gray-900">{totalCO2e.toFixed(1)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{(totalRevenue / 100000).toFixed(1)}L</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search farmers, villages, districts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Crops</option>
                <option value="rice">Rice</option>
                <option value="agroforestry">Agroforestry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farmer Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Farming Info
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Carbon Impact
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{row.name}</div>
                          {row.phone && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="w-3 h-3 mr-1" />
                              {row.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{row.village}</div>
                          <div className="text-gray-500">{row.district}, {row.state}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium capitalize">{row.cropType}</div>
                        {row.practice && row.practice !== 'NA' && (
                          <div className="text-gray-500">Practice: {row.practice}</div>
                        )}
                        <div className="text-gray-500">{row.areaHa} hectares</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-sm">
                        <div className="text-gray-900 font-medium">
                          {row.estimate?.tCO2e ? `${row.estimate.tCO2e} tCO₂e` : '-'}
                        </div>
                        {row.estimate?.revenueINR && (
                          <div className="text-green-600 font-medium">
                            ₹{row.estimate.revenueINR.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(row.status)}`}>
                        {getStatusIcon(row.status)}
                        <span className="ml-1">{row.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {filteredData.length} of {totalSubmissions} submissions
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Last updated: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}