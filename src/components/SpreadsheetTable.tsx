import React, { useState } from 'react'

interface SpreadsheetTableProps {
  activeTab: string
}

const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({ activeTab }) => {
  const [headers, setHeaders] = useState([
    { label: 'Job Request', icon: '📁' },
    { label: 'Submitted', icon: '📅' },
    { label: 'Status', icon: '🏷️' },
    { label: 'Submitter', icon: '👤' },
    { label: 'URL', icon: '🌐' },
    { label: 'Assigned', icon: '👥', bgColor: 'bg-green-100' },
    { label: 'Priority', icon: '⚠️', bgColor: 'bg-purple-100' },
    { label: 'Due Date', icon: '🗓', bgColor: 'bg-purple-100' },
    { label: 'Est. Value', icon: '💰', bgColor: 'bg-orange-100' }
  ])

  const statusOptions = [
    { label: 'In-process', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'Need to start', color: 'bg-blue-100 text-blue-800' },
    { label: 'Complete', color: 'bg-green-100 text-green-800' },
    { label: 'Blocked', color: 'bg-red-100 text-red-800' }
  ]

  const priorityOptions = [
    { label: 'Low', color: 'bg-blue-100 text-blue-800' },
    { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { label: 'High', color: 'bg-red-100 text-red-800' }
  ]

  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 10 }, () => Array(headers.length).fill(''))
  )

  const [selected, setSelected] = useState<[number, number] | null>(null)

  const updateCell = (row: number, col: number, value: string) => {
    const updated = [...grid]
    updated[row][col] = value
    setGrid(updated)
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    row: number,
    col: number
  ) => {
    const maxRow = grid.length - 1
    const maxCol = headers.length - 1
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (row < maxRow) setSelected([row + 1, col])
        break
      case 'ArrowUp':
        e.preventDefault()
        if (row > 0) setSelected([row - 1, col])
        break
      case 'ArrowLeft':
        e.preventDefault()
        if (col > 0) setSelected([row, col - 1])
        break
      case 'ArrowRight':
      case 'Tab':
        e.preventDefault()
        if (col < maxCol) setSelected([row, col + 1])
        break
      case 'Enter':
        e.preventDefault()
        if (row < maxRow) setSelected([row + 1, col])
        break
    }
  }

  const getChipStyle = (value: string, type: 'status' | 'priority') => {
    const options = type === 'status' ? statusOptions : priorityOptions
    const match = options.find((opt) => opt.label === value)
    return match ? match.color : 'bg-gray-100 text-gray-700'
  }

  const shouldHighlight = (colLabel: string) => {
    if (activeTab === 'ABC') return colLabel === 'Assigned'
    if (activeTab === 'Answer a question')
      return colLabel === 'Priority' || colLabel === 'Due Date'
    if (activeTab === 'Extract') return colLabel === 'Est. Value'
    return false
  }

  return (
    <div className="p-4 bg-white overflow-auto max-h-[70vh] rounded shadow">
      <div className="min-w-[1000px] overflow-auto">
        <table className="border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="w-10 bg-gray-100 text-gray-500 text-sm text-center border-r">
                #
              </th>
              {headers.map((col, index) => (
                <th
                  key={index}
                  className={`min-w-[150px] px-2 py-1 text-left text-sm font-semibold text-gray-700 border-b ${
                    col.bgColor || 'bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <span>{col.icon}</span>
                    <span>{col.label}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((rowData, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                <td className="text-center text-gray-500 text-sm border-r bg-gray-50">
                  {rowIdx + 1}
                </td>
                {rowData.map((cell, colIdx) => {
                  const isSelected =
                    selected?.[0] === rowIdx && selected?.[1] === colIdx
                  const headerLabel = headers[colIdx]?.label

                  const isStatus = headerLabel === 'Status'
                  const isPriority = headerLabel === 'Priority'
                  const dropdownOptions = isStatus
                    ? statusOptions
                    : isPriority
                    ? priorityOptions
                    : null

                  const highlight = shouldHighlight(headerLabel)

                  return (
                    <td
                      key={colIdx}
                      className={`border border-gray-200 p-0 m-0 min-w-[150px] h-10 relative ${
                        isSelected ? 'ring-2 ring-green-500' : ''
                      } ${highlight ? 'bg-yellow-50' : ''}`}
                      onClick={() => setSelected([rowIdx, colIdx])}
                    >
                      {dropdownOptions ? (
                        isSelected ? (
                          <select
                            value={cell || dropdownOptions[0].label}
                            onChange={(e) =>
                              updateCell(rowIdx, colIdx, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                            className="w-full h-full px-2 text-sm focus:outline-none bg-white"
                          >
                            {dropdownOptions.map((opt) => (
                              <option key={opt.label} value={opt.label}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div
                            className={`w-full h-full flex items-center px-2 text-sm font-medium ${getChipStyle(
                              cell,
                              isStatus ? 'status' : 'priority'
                            )}`}
                          >
                            {cell}
                          </div>
                        )
                      ) : (
                        <input
                          type="text"
                          value={cell}
                          autoFocus={isSelected}
                          onChange={(e) =>
                            updateCell(rowIdx, colIdx, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                          className="w-full h-full px-2 focus:outline-none whitespace-nowrap"
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setGrid([...grid, Array(headers.length).fill('')])}
          className="px-4 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          + Add Row
        </button>

        <button
          onClick={() => console.log('Grid saved:', grid)}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          💾 Save (Console Log)
        </button>
      </div>
    </div>
  )
}

export default SpreadsheetTable
