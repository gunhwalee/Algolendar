import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import GRAPHQL from "@/config/LEETCODE";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const username = body.leetcode;
  const query = GRAPHQL.CHECK_USER;
  const { id } = params;

  try {
    const {
      data: { data },
    } = await axios.post("https://leetcode.com/graphql", {
      variables: { username },
      query,
    });

    if (data.errors || !data.matchedUser) {
      return NextResponse.json({ result: "error" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: { leetcode: data.matchedUser.username },
    });

    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.log("Error is: ", error);
    return NextResponse.json({ result: "ng" }, { status: 500 });
  }
}

/*
{
  errors: [
    {
      message: 'That user does not exist.',
      locations: [Array],
      path: [Array],
      extensions: [Object]
    }
  ],
  data: { matchedUser: null }
}
*/
