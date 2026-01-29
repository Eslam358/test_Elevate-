import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout";

import PostsPage from "@/pages/posts/PostsPage";
import PostDetailsPage from "@/pages/posts/PostDetailsPage";
import CreatePostPage from "@/pages/posts/CreatePostPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <PostsPage />,
      },
      {
        path: "posts/:id",
        element: <PostDetailsPage />,
      },
      {
        path: "create",
        element: <CreatePostPage />,
      },
    ],
  },
]);
