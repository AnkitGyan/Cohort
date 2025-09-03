import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";

const prismaClient = new PrismaClient();

export function POST(req : NextRequest){
   const data = req.json();

   return(
    NextResponse.json({
      token : "jdkfjkalfkl3r42343432jinfadkfn9u932u"
    })
   )
}