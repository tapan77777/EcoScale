'use client'

import { Calculator, Leaf, MapPin, Plus, Sprout, Trash2, User } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

interface Species {
  name: string
  category: 'fast' | 'fruit' | 'hardwood'
  count: number
}

interface FormState {
  name: string
  phone: string
  village: string
  district: string
  state: string
  areaHa: string
  cropType: 'rice' | 'agroforestry'
  practice: 'AWD' | 'Flooded'
  species: Species[]
}

interface EstimateResult {
  method: string
  tCO2e: number
  pricePerTon: number
  revenueINR: number
  uncertainty: number
}

export default function Home() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    village: '',
    district: '',
    state: '',
    areaHa: '',
    cropType: 'rice',
    practice: 'AWD',
    species: [{ name: 'Mango', category: 'fruit', count: 10 }],
  })

  const [result, setResult] = useState<EstimateResult | null>(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    if (!form.name || !form.areaHa) {
      alert('Please fill in required fields (Name and Area)')
      return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        areaHa: Number(form.areaHa || 0),
        species: form.cropType === 'agroforestry' ? form.species : [],
      }
      // Simulating API call since we don't have the actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000))
      const mockResult: EstimateResult = {
        method: form.cropType === 'rice' ? 'Rice Methane Reduction' : 'Agroforestry Sequestration',
        tCO2e: form.cropType === 'rice' ? Number(form.areaHa) * 2.5 : form.species.reduce((sum, s) => sum + s.count * 0.5, 0),
        pricePerTon: 1200,
        revenueINR: 0,
        uncertainty: 0.15
      }
      mockResult.revenueINR = mockResult.tCO2e * mockResult.pricePerTon
      setResult(mockResult)
    } catch (err) {
      console.error(err)
      alert('Error submitting form')
    } finally {
      setLoading(false)
    }
  }

  const addSpecies = () => {
    setForm({
      ...form,
      species: [...form.species, { name: '', category: 'hardwood', count: 0 }],
    })
  }

  const removeSpecies = (index: number) => {
    const newSpecies = form.species.filter((_, i) => i !== index)
    setForm({ ...form, species: newSpecies })
  }

  const updateSpecies = (index: number, field: keyof Species, value: any) => {
    const species = [...form.species]
    species[index] = { ...species[index], [field]: value }
    setForm({ ...form, species })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Leaf className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            EcoScale MRV
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your carbon credit potential and contribute to a sustainable future
          </p>
        </div>

        <div className="space-y-8">
          {/* Farmer Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Farmer Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Farmer Name *</label>
                <input
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Location Information Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <MapPin className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Location Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Village</label>
                <input
                  name="village"
                  placeholder="Village name"
                  value={form.village}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  name="district"
                  placeholder="District name"
                  value={form.district}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">State</label>
                <input
                  name="state"
                  placeholder="State name"
                  value={form.state}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Area (hectares) *</label>
                <input
                  name="areaHa"
                  placeholder="e.g., 2.5"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.areaHa}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Farming Practice Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Sprout className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-900">Farming Practice</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                <select
                  name="cropType"
                  value={form.cropType}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                >
                  <option value="rice">Rice Cultivation</option>
                  <option value="agroforestry">Agroforestry</option>
                </select>
              </div>

              {form.cropType === 'rice' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Water Management</label>
                  <select
                    name="practice"
                    value={form.practice}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  >
                    <option value="AWD">AWD (Alternate Wetting & Drying)</option>
                    <option value="Flooded">Continuous Flooding</option>
                  </select>
                </div>
              )}
            </div>

            {/* Agroforestry Species Section */}
            {form.cropType === 'agroforestry' && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Tree Species</h3>
                  <button
                    type="button"
                    onClick={addSpecies}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Species
                  </button>
                </div>

                <div className="space-y-4">
                  {form.species.map((species, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                        <div className="sm:col-span-5 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Species Name</label>
                          <input
                            placeholder="e.g., Mango, Teak, Bamboo"
                            value={species.name}
                            onChange={(e) => updateSpecies(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div className="sm:col-span-3 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            value={species.category}
                            onChange={(e) => updateSpecies(index, 'category', e.target.value as Species['category'])}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="fast">Fast-growing</option>
                            <option value="fruit">Fruit Trees</option>
                            <option value="hardwood">Hardwood</option>
                          </select>
                        </div>
                        <div className="sm:col-span-3 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Count</label>
                          <input
                            type="number"
                            min={0}
                            placeholder="0"
                            value={species.count}
                            onChange={(e) => updateSpecies(index, 'count', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div className="sm:col-span-1">
                          {form.species.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSpecies(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={submit}
              disabled={loading}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Calculator className="w-5 h-5 mr-2" />
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                'Calculate Carbon Credits'
              )}
            </button>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">Carbon Credit Estimate</h3>
              <p className="text-green-100">{result.method}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">{result.tCO2e.toFixed(2)}</div>
                <div className="text-green-100 text-sm">tCO₂e Potential</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">₹{result.pricePerTon.toLocaleString()}</div>
                <div className="text-green-100 text-sm">Price per Ton</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">₹{result.revenueINR.toLocaleString()}</div>
                <div className="text-green-100 text-sm">Annual Revenue</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">±{Math.round(result.uncertainty * 100)}%</div>
                <div className="text-green-100 text-sm">Uncertainty</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg">
              <p className="text-sm text-green-100 text-center">
                * This is a preliminary estimate. Actual carbon credit certification requires detailed verification and monitoring.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}