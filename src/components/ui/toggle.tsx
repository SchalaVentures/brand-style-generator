'use client'

interface ToggleProps {
  options: [string, string]
  value: string
  onChange: (value: string) => void
}

export default function Toggle({
  options,
  value,
  onChange,
}: ToggleProps): React.ReactElement {
  return (
    <div className="inline-flex rounded-full bg-app-gray-50 p-1">
      {options.map((option: string) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-black ${
            value === option
              ? 'bg-app-black text-app-white shadow-sm'
              : 'text-app-gray-400 hover:text-app-gray-600'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
