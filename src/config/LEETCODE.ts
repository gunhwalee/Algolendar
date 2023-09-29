import prisma from "@/lib/db";

export const QUERY = {
  CHECK_USER: `query ($username: String!) {
    matchedUser(username: $username) {
      username
    }
  }`,
  GET_PROFILE: `query ($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentSubmissionList(username: $username, limit: 20) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }`,
  GET_PROBLEMS: `query problemsetQuestionList($limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(
      categorySlug: "algorithms"
      limit: $limit
      skip: $skip
      filters: $filters
    ) {
      total: totalNum
      questions: data {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
        hasSolution
        hasVideoSolution
      }
    }
  }`,
  GET_TODAY: `query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      userStatus
      link
      question {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        hasVideoSolution
        hasSolution
        topicTags {
          name
          id
          slug
        }
      }
    }
  }`,
};

export const TOPIC = [
  "Array",
  "Binary",
  "Binary Search",
  "Binary Search Tree",
  "Binary Tree",
  "Dynamic Programming",
  "Graph",
  "Hash Table",
  "Heap (Priority Queue)",
  "Linked List",
  "Math",
  "Matrix",
  "Queue",
  "Recursion",
  "Stack",
  "String",
  "Trie",
];

// Topic 저장용 코드
const formattedTopics = TOPIC.map((topic) => ({
  name: topic,
  nameSlug: topic.toLowerCase().replace(/\s+/g, "-"),
}));

const dbfetch = async () => {
  for (const topic of formattedTopics) {
    const news = await prisma.topic.create({
      data: {
        name: topic.name,
        nameSlug: topic.nameSlug,
      },
    });
    console.log(news);
  }
};
// dbfetch();
