import React, { useState } from 'react'
import HeaderBar from './components/HeaderBar'
import Toolbar from './components/Toolbar'
import SheetTabs from './components/SheetTabs'
import SpreadsheetTable from './components/SpreadsheetTable'
import BottomTabBar from './components/BottomTabBar'

const App: React.FC = () => {
  const [sheetTabs] = useState([
    'Q3 Financial Overview',
    'ABC',
    'Answer a question',
    'Extract'
  ])
  const [activeSheetTab, setActiveSheetTab] = useState(sheetTabs[0])

  const [tabs, setTabs] = useState([
    'All Orders',
    'Pending',
    'Reviewed',
    'Arrived'
  ])
  const [activeTab, setActiveTab] = useState('All Orders')

  const handleAddTab = () => {
    const newTab = `Tab ${tabs.length + 1}`
    setTabs([...tabs, newTab])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderBar />
      <Toolbar />
      <SheetTabs activeTab={activeSheetTab} setActiveTab={setActiveSheetTab} />
      <SpreadsheetTable activeTab={activeSheetTab} />
      <BottomTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddTab={handleAddTab}
      />
    </div>
  )
}

export default App
