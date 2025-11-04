'use client'
import { useState } from 'react'
import axios from 'axios'

interface FormData {
  vendor_name: string
  email: string
  company_name: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    vendor_name: '',
    email: '',
    company_name: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      setMessage('Please select a warranty document')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const submitData = new FormData()
      submitData.append('vendor_name', formData.vendor_name)
      submitData.append('email', formData.email)
      submitData.append('company_name', formData.company_name)
      submitData.append('warranty_document', file)

      await axios.post('http://localhost:8001/api/warranties/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage('Warranty uploaded successfully!')
      setMessageType('success')
      
      // Reset form
      setFormData({ vendor_name: '', email: '', company_name: '' })
      setFile(null)
      
      // Reset file input
      const fileInput = document.getElementById('warranty_document') as HTMLInputElement
      if (fileInput) fileInput.value = ''

    } catch (error: any) {
      console.error('Upload failed:', error)
      setMessage('Upload failed. Please try again.')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Warranty Upload System
        </h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="vendor_name" className="block text-sm font-medium text-gray-700 mb-1">
              Vendor Name *
            </label>
            <input
              type="text"
              id="vendor_name"
              name="vendor_name"
              value={formData.vendor_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter vendor name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="vendor@company.com"
            />
          </div>

          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label htmlFor="warranty_document" className="block text-sm font-medium text-gray-700 mb-1">
              Warranty Document *
            </label>
            <input
              type="file"
              id="warranty_document"
              name="warranty_document"
              onChange={handleFileChange}
              required
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? 'Uploading...' : 'Upload Warranty Document'}
          </button>
        </form>
      </div>
    </div>
  )
}
