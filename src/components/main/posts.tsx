import { useEffect, useMemo, useState } from "react";
import { usePostStore } from "@/store/postStore";

import { PaginationDemo1 } from "./PaginationDemo";
import SearchInput from "./search";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";



export default function Posts() {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedAuthors, setSelectedAuthors] = useState<number[]>([]);


    const { posts, loading, error, getPosts } = usePostStore();

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getPosts();
    }, [getPosts]);

   


    const filterPosts =
        useMemo(() => {

            if (!search.trim()) return posts;

            return posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
        }, [posts, search])

    const filteredPosts =
        useMemo(() => {
            if (selectedAuthors.length === 0) return filterPosts;
            return filterPosts.filter(post => selectedAuthors.includes(post.userId));

        }, [filterPosts, selectedAuthors])

        // useEffect(() => {
        //     setCurrentPage(1)
        // }, [filteredPosts,filterPosts]);








    if (error) return <p className="text-white">{error}</p>;
    if (posts.length === 0) return <p className="text-white">Loading...</p>;


    const itemsPerPage = 10
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPosts?.slice(indexOfFirstItem, indexOfLastItem);


    const totalPages = Math.ceil(filteredPosts?.length / itemsPerPage);





    return (


        <section className="flex flex-col mt-3 h-full  rounded-md overflow-hidden backdrop-blur-sm bg-blue-200/60  ">
            <div className="flex items-center justify-between text-black font-bold bg-white p-2  ">

                <div className="p-1 flex items-center gap-2 " >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 14H11.6667M17.5 9.33333H11.6667M22.1667 19.8333V5.83333C22.1667 5.21449 21.9208 4.621 21.4832 4.18342C21.0457 3.74583 20.4522 3.5 19.8333 3.5H4.66666M4.66666 3.5C5.2855 3.5 5.87899 3.74583 6.31658 4.18342C6.75416 4.621 6.99999 5.21449 6.99999 5.83333V22.1667C6.99999 22.7855 7.24583 23.379 7.68341 23.8166C8.121 24.2542 8.71449 24.5 9.33333 24.5M4.66666 3.5C4.04782 3.5 3.45433 3.74583 3.01675 4.18342C2.57916 4.621 2.33333 5.21449 2.33333 5.83333V8.16667C2.33333 8.47609 2.45624 8.77283 2.67504 8.99162C2.89383 9.21042 3.19058 9.33333 3.49999 9.33333H6.99999M9.33333 24.5H23.3333C23.9522 24.5 24.5457 24.2542 24.9832 23.8166C25.4208 23.379 25.6667 22.7855 25.6667 22.1667V21C25.6667 20.6906 25.5437 20.3938 25.325 20.175C25.1062 19.9562 24.8094 19.8333 24.5 19.8333H12.8333C12.5239 19.8333 12.2272 19.9562 12.0084 20.175C11.7896 20.3938 11.6667 20.6906 11.6667 21V22.1667C11.6667 22.7855 11.4208 23.379 10.9832 23.8166C10.5457 24.2542 9.95217 24.5 9.33333 24.5Z" stroke="black" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Post List</span>

                </div>
                <Link to="/create" className="flex items-center gap-2 mr-2 text-black/50 font-medium" >
                    <span>+</span>
                    <span>Create a new post</span>

                </Link>

            </div>

            <SearchInput search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} setSelectedAuthors={setSelectedAuthors} selectedAuthors={selectedAuthors} />
            <div className="flex flex-col flex-1 ">
                {loading ? <>
                    {Array.from({ length: 10 }).map((p, index) => (

                        <div key={index} className="bg-transparent flex-1 max-h-20 border-b border-b-black/10">
                            <Skeleton className="h-full w-full" />                        </div>
                    ))}

                </> : <>
                    {currentItems?.map((post) => (

                        <Link to={`/posts/${post.id}`} key={post.id} className="bg-white/50 flex-1 max-h-20 border-b border-b-black/10 hover:bg-white/75  px-3">
                            <h2 className="font-medium flex  items-center  h-full">{post.title} {post.id}</h2>
                        </Link>
                    ))}

                </>

                }


            </div>

            <PaginationDemo1
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />



        </section>


    )
}





