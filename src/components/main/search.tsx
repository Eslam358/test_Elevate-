import { Search } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import { Button } from "@/components/ui/button";
  import { Check, ChevronDown } from "lucide-react";
  
  type User = {
    id: number;
    name: string;
  };

type Props = {
    search: string;
    setSearch: (search: string) => void;
    setCurrentPage: (page: number) => void
    selectedAuthors: number[];
    setSelectedAuthors: (authors: number[]) => void;

}


export default function SearchInput({ search, setSearch,selectedAuthors, setCurrentPage,setSelectedAuthors }: Props) {
    const { users, getUsers } = useUserStore();
    useEffect(() => {
        if (users.length === 0) {
            getUsers()

        }


    }, [getUsers, users.length]);
    
    return (
        <div className="flex items-center justify-between py-3 px-2 h-18  bg-black/10 border-b border-b-black/15">

            <div className="relative h-full w-6/12 md:w-8/12 lg:w-9/12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2  text-gray-500 w-5 h-5" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search posts..."
                    className="w-full h-full pl-12 pr-4 rounded-xl bg-white border border-gray-200 outline-none focus:ring-2 focus:ring-black transition"
                />

            </div>
            <div className="flex h-full  items-center gap-2 mr-2" >
                <span>Author:</span>
<AuthorMultiSelect users={users} value={selectedAuthors} onChange={setSelectedAuthors} setCurrentPage={setCurrentPage}/>
            </div>
         

        </div>
    )
}

// **************** AuthorMultiSelect ***********

  
  export function AuthorMultiSelect({
    users,
    value,
    onChange,
    setCurrentPage,
  }: {
    users: User[];
    value: number[];
    onChange: (value: number[]) => void;
    setCurrentPage:(page:number)=>void;
  }) {
    const toggle = (id: number) => {
      setCurrentPage(1);
      onChange(
        value.includes(id)
          ? value.filter(v => v !== id)
          : [...value, id]
      );
    };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className=" w-30 h-full   justify-between">
            {value.length > 0
              ? `${value.length} selected`
              : "All"}
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
  
        <PopoverContent className="w-[220px] p-2">
          {users.map(user => (
            <button
              key={user.id}
              type="button"
              onClick={() => toggle(user.id)}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 hover:bg-gray-100"
            >
              <span>{user.name}</span>
              {value.includes(user.id) && <Check className="w-4 h-4" />}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    );
  }
  