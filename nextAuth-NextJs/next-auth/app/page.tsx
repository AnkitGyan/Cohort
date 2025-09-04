"use client"
import { setEngine } from "crypto";
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default async function Home(){
  const session = await getServerSession();

  return(
    <div>
     {JSON.stringify(session)}
    </div>
  )
}

// export default function Home() {
//   return(
//     <SessionProvider><RealHome/></SessionProvider>
//   )
  
// }

// function RealHome(){

//    const { data: session, status } = useSession()

//   return (
//       <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       {status === "authenticated" && <button onClick={()=>signOut()}>Logout</button>}
//       {status === "unauthenticated" && <button onClick={()=>signIn()}>Sign In</button>}
//       {JSON.stringify(session)}
//       </div>
//   );
// }
