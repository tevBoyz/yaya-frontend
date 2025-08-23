import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

const SearchBar = ({ onSearch, placeholder = "Search transactions..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default SearchBar