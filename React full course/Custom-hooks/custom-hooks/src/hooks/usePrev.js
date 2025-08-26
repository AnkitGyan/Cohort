import { useEffect, useRef } from "react"

 export const usePrev = (Value)=>{
  const ref = useRef();

  useEffect(()=>{
    ref.current = Value
  }, [Value]);

return ref.current;
}