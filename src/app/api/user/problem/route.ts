import { API } from "@/config/CONFIG";
import { QUERY, TOPIC } from "@/config/LEETCODE";
import TEXT from "@/constants/text";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const variables = {
  skip: 0,
  limit: 2000,
  filters: {},
};
interface Topic {
  name: string;
}

async function saveProblems(
  title: string,
  titleSlug: string,
  difficulty: string,
  topics: Topic[]
) {
  const problem = await prisma.problem.create({
    data: {
      title,
      titleSlug,
      difficulty,
      topics: {
        connect: topics.map((topic) => ({ name: topic.name })),
      },
    },
  });
  return problem;
}

export async function GET() {
  const query = QUERY.GET_PROBLEMS;
  try {
    const response = await fetch(API.LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const { data } = await response.json();
    const { questions } = data.problemsetQuestionList;
    const topics = await prisma.topic.findMany({});
    const topicNames = topics.map((element) => element.name);

    for (const question of questions) {
      const { title, titleSlug, difficulty, topicTags } = question;
      const existTopic = topicTags.filter((element: any) =>
        topicNames.includes(element.name)
      );
      saveProblems(title, titleSlug, difficulty, existTopic);
    }

    return NextResponse.json("ok");
  } catch (error) {
    console.error("Error is: ", error);

    return NextResponse.json({
      result: "error",
      message: TEXT.SERVER_ERROR,
    });
  }
}
