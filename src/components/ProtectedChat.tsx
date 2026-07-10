import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

interface ProtectedChatProps {
  children: React.ReactNode
  fallbackMessage?: string
}

export function ProtectedChat({ children, fallbackMessage }: ProtectedChatProps) {
  const { user, loading } = useAuth()
  const [showRedirectModal, setShowRedirectModal] = useState(false)

  if (loading) {
    return null
  }

  const handleProtectedAction = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowRedirectModal(true)
  }

  return (
    <>
      {user ? (
        children
      ) : (
        <div onClick={handleProtectedAction} className="cursor-pointer">
          {children}
        </div>
      )}

      {showRedirectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Login Required
            </h3>
            <p className="text-gray-600 mb-4">
              {fallbackMessage || 'Please log in or create an account to chat with sellers.'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRedirectModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <a
                href="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                onClick={() => setShowRedirectModal(false)}
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
