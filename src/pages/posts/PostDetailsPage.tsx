
// import { usePostStore } from "@/store/postStore";
// import { useUserStore } from "@/store/userStore";
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ArrowLeft, User, Calendar } from "lucide-react"; // الأيقونات المطلوبة
// import { Button } from "@/components/ui/button";


// export default  function PostDetailsPage() {
//   const {loading,error,getPostById, selectedPost}=usePostStore()
//   const {loading:loadUser,error:errorUser,getUsersById,selectedUser}=useUserStore()
//   const {id} =useParams()




//   useEffect(() => {

//       getPostById(id)

//     console.log(selectedPost);

//   }, [id]);

//   useEffect(() => {


//     if(selectedPost){
//       getUsersById(selectedPost.userId)
//     }
//     console.log(selectedUser);

//   }, [id,selectedPost]);


//   if (loading) return <p className="text-white">loading...</p>
//   if (error) return <p className="text-white">{error}</p>
//   return (
//     <div className="backdrop-blur h-full">
//      <div className=" h-6/12 bg-linear-to-t from-[#21609A]/70 to-[#00254A]/70 flex items-end ">
//      <Button variant="outline" size="sm" >uu</Button>

//      </div>
//      <div></div>
//     </div>
//   )
// }

import { usePostStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailsPage() {
  const { loading, error, getPostById, selectedPost } = usePostStore();
  const { getUsersById, selectedUser } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    if (!id) return;
    getPostById(id);



  }, [id, getPostById]);

  useEffect(() => {
    if (selectedPost?.userId) {

      getUsersById(selectedPost.userId);
    }


  }, [selectedPost, getUsersById]);

 
  if (error) return <p className="text-destructive text-center mt-10">{error}</p>;
  if (!selectedPost) return null;

  return (

    <div key={id} className="bg-white/70 backdrop-blur-lg rounded-xl  overflow-hidden flex flex-col h-full   ">

      <div className=" h-1/2 bg-linear-to-b from-[#21609A]/70 to-[#00254A]/70  flex flex-col justify-end gap-2 px-5 py-3">

        <Button
          variant="ghost"
          size="sm"
          className=" text-black bg-white/75 hover:bg-white/30 rounded-full w-fit py-5 px-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Posts
        </Button>
        {!loading ?
          <h1 className="text-white text-4xl  font-bold leading-tight mb-6 my-4 ">
            {selectedPost.title}
          </h1>

          :

          <Skeleton className="h-8 w-100  mb-6 my-4 " />



        }

        <div className="flex items-center gap-6 text-white/80 text-sm font-light">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            <User className="w-4 h-4 " />
            <span>{selectedUser?.name || "Unknown Author"}</span>
          </div>

          <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm ">
            <Calendar className="w-4 h-4" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      <div className="flex-1   overflow-y-auto custom-scrollbar px-5 py-3 ">
        <article className="max-w-xl ">
          {
            loading ?
            <>
            <Skeleton className="h-5 w-full  mb-6 my-4 shadow  " />
            <Skeleton className="h-5 w-10/12  mb-6 my-4 shadow-lg " />
            <Skeleton className="h-5 w-9/12  mb-6 my-4 shadow " />
            
            </>
              :
              <p className=" text-lg md:text-xl  ">
                {selectedPost.body}
              </p>

          }
        </article>
      </div>
    </div>
  );
}

