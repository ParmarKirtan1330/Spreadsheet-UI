import React from 'react'

interface BottomTabBarProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  onAddTab?: () => void
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  onAddTab
}) => {
  return (
    <div className="border-t mt-4 pt-2">
      <div className="flex gap-2 px-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-1.5 rounded-t-md text-sm border border-b-0 ${
              activeTab === tab
                ? 'bg-white text-green-700 font-semibold border-green-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={onAddTab}
          className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 border border-transparent text-sm"
          title="Add Tab"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default BottomTabBar
