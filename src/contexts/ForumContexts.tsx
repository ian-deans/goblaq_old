import {createContext, useContext} from "react";

//# Forum Posts
const PostContext = createContext({
  postID: undefined,
  refetchFn: undefined,
});

export const PostProvider = PostContext.Provider;

export const usePostContext = () => {
  const { postID, refetchFn } = useContext(PostContext);
  return { postID, refetchFn };
};
