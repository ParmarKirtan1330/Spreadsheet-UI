import React from 'react'

const tabs = [
  { name: 'Q3 Financial Overview', color: 'bg-green-100 text-green-700' },
  { name: 'ABC', color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Answer a question', color: 'bg-purple-100 text-purple-700' },
  { name: 'Extract', color: 'bg-orange-100 text-orange-700' }
]

interface Props {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const SheetTabs: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center overflow-x-auto space-x-2 px-4 py-2 border-b bg-white text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => {
            setActiveTab(tab.name)
            console.log(`${tab.name} clicked`)
          }}
          className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap 
            ${
              activeTab === tab.name
                ? `${tab.color} border border-opacity-50`
                : 'text-gray-600 hover:bg-gray-100'
            }`}
        >
          {tab.name}
        </button>
      ))}

      {/* + Tab */}
      <button
        onClick={() => console.log('Add new tab clicked')}
        className="px-3 py-1.5 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold"
      >
        +
      </button>
    </div>
  )
}

export default SheetTabs
