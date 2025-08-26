import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

// function usePostTitle() {
//   const [post, setPost] = useState({});

//   async function getPost() {
//     const response = await fetch("http://jsonplaceholder.typicode.com/posts/1");
//     const json = await response.json();

//     setPost(json);
//   }

//   useEffect(() => {
//     getPost();
//   }, []);

//   return post ? post.title : undefined;
// }

// export default usePostTitle;


export function useFetchPost(url) {
  const [Finalpost, setFinaPost] = useState({});

  async function getPost() {
    const response = await fetch(url);
    const json = await response.json();
    setFinaPost(json)
  }

   const debounce = useDebounce(getPost);

  useEffect(() => {
    getPost();
  }, [url]);

  return Finalpost ? Finalpost.title : undefined;
}
