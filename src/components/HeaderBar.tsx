import React from 'react'

const HeaderBar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm border-b">
      {/* Left: Breadcrumb */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-green-600">Workspace</span>
        <span className="mx-2">{'>'}</span>
        <span>Folder 2</span>
        <span className="mx-2">{'>'}</span>
        <span className="text-gray-800 font-medium">Spreadsheet 3</span>
      </div>

      {/* Right: Search, Profile, Action */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search within sheet"
          className="px-3 py-1 border rounded-md text-sm w-60 outline-none focus:ring-2 ring-green-300"
        />

        {/* Profile */}
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
          JD
        </div>

        {/* New Action Button */}
        <button
          className="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-700"
          onClick={() => console.log('New Action Clicked')}
        >
          New Action
        </button>
      </div>
    </div>
  )
}

export default HeaderBar
