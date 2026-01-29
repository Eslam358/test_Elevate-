import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { NotebookPen } from 'lucide-react';
import { createPost } from "@/services/posts.service"
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

// 1️⃣ Schema validation
const createPostSchema = z.object({
  title: z.string().min(1, "Post title is required"),
  body: z.string().min(1, "Post body is required"),
  userId: z.string().min(1, "Please select an author for this post"),
});

type CreatePostForm = z.infer<typeof createPostSchema>;

export default function CreatePost() {
  const navigate = useNavigate();
  const { users,getUsers } = useUserStore();
  useEffect(() => {
    if ( users.length === 0) {
      getUsers()
    }
    
  }, [getUsers, users.length]);


  // 2️⃣ React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePostForm>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      body: "",
      userId: "",
    },
  });

  // 3️⃣ Submit handler
  const onSubmit = async (data: CreatePostForm) => {
    try {
      await createPost({...data,userId:+data.userId})

      toast.success("Post has been successfully created");
      reset();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Internal Server Error: ${error.message}`);
      } else {
        toast.error("Internal Server Error");
      }
    }
  };


  return (
    <div className="flex-1 overflow-hidden bg-white/75 rounded-xl max-w-7xl h-full border backdrop-blur-md  mx-auto ">
      {/* Header */}
      <div className="flex items-center gap-2 border-b py-[18px] px-4  bg-white  text-black/70">

        <NotebookPen size={28} />
        <h2 className="text-2xl font-bold ">
          Create a New Post
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-5/6 sm:w-4/6 mx-auto  my-4  sm:mx-8 h-10/12  p-8 rounded-xl bg-white"
      >
        {/* Title */}
        <div>
          <label className="block font-bold  mb-2">
            Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter post title"
            className="w-full bg-[#e6e6e6] border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-400"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Body */}
        <div>
          <label className="block font-bold mb-2">
            Body
          </label>
          <textarea
            rows={3}
            {...register("body")}
            placeholder="Enter post body"
            className="w-full bg-black/10  border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-blue-400"
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">
              {errors.body.message}
            </p>
          )}
        </div>

        {/* Author */}
        <div>
          <label className="block font-bold   mb-2">
            Author
          </label>
          <select
            {...register("userId")}
            className="w-full  bg-black/10 border rounded-xl px-4 py-3 outline-none focus:ring ring-blue-400"
          >
            <option value="" disabled>Select Author</option>

         {
          users.map(user=>(
            <option key={user.id} value={user.id}>{user.name}</option>

          ))
         }
          </select>
          {errors.userId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userId.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button
            disabled={isSubmitting}
            className="w-full md:w-3/6  bg-[#333] hover:bg-black text-white py-6 rounded-xl text-lg font-semibold"
          >
            {isSubmitting ? "Saving..." : "Create Post"}
          </Button>


        </div>
      </form>
    </div>
  );
}
