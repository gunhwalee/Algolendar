import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const username = body.leetcode;
  const query = `query ($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      socialAccounts
      githubUrl
    }
  }`;

  try {
    const res = await axios.post("https://leetcode.com/graphql", {
      variables: { username },
      query,
    });

    console.log(res.data);
    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.log("Error is: ", error);
    return NextResponse.json({ result: "ng" });
  }
}
