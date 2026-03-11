import type { TeamMember } from "@/types"

type SearchResultProps = {
  user: TeamMember
}

function SearchResult({user}: SearchResultProps) {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 px-5 py-3">
        <p>{user.name}</p>
        <button
          type="button"
          className="text-purple-600 hover:text-purple-500 font-bold cursor-pointer active:scale-95 transition-transform ease-linear"
        >
          Agregar al proyecto
        </button>
      </div>
    </>
  )
}

export default SearchResult