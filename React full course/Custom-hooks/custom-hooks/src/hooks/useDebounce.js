import { useRef } from "react"

export const useDebounce = (orignalFn)=>{
  const currentClock = useRef();

  const fn = ()=>{
    clearTimeout(currentClock.current);
    currentClock = setTimeout(orignalFn, 200);
  }


  return currentClock;
}