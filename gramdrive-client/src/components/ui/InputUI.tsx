import { Input } from "@headlessui/react"

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputUI ({ value, onChange }: Props) {
  return (
    <>
      <Input 
        className="mt-2 w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-sm/6 text-white placeholder:text-gray-600 focus:border-1 focus:border-white focus:outline-none"
        value={value}
        onChange={onChange}
        />  
    </>
  )
}