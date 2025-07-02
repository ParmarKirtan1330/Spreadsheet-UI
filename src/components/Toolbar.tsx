import React from 'react'

const Toolbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white border-b">
      {/* Left Buttons */}
      <div className="flex items-center space-x-3 text-sm text-gray-700">
        {['Tool bar', 'Hide fields', 'Sort', 'Filter', 'Cell view'].map(
          (item) => (
            <button
              key={item}
              className="px-2 py-1 hover:bg-gray-100 rounded-md"
              onClick={() => console.log(`${item} clicked`)}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* Right Buttons */}
      <div className="flex items-center space-x-3">
        {['Import', 'Export', 'Share'].map((item) => (
          <button
            key={item}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => console.log(`${item} clicked`)}
          >
            {item}
          </button>
        ))}

        <button
          className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-700"
          onClick={() => console.log('New Action clicked')}
        >
          New Action
        </button>
      </div>
    </div>
  )
}

export default Toolbar
