'use client'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (tabId: string) => void
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
}: TabsProps): React.ReactElement {
  return (
    <div className="flex gap-1 rounded-lg bg-app-gray-50 p-1">
      {tabs.map((tab: Tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`cursor-pointer rounded-md px-3.5 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black ${
            activeTab === tab.id
              ? 'bg-app-white text-app-black shadow-sm'
              : 'text-app-gray-400 hover:text-app-gray-600'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
