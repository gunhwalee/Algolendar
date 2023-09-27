interface Profile {
  allQuestionsCount: Count[];
  matchedUser: {
    username: string;
    submitStats: {
      acSubmissionNum: Count[];
    };
  };
  recentSubmissionList: Submission[];
}

export interface Count {
  difficulty: string;
  count: number;
  submissions?: number;
  total?: number;
}

interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export function problemsCount(data: Profile): Count[] {
  const {
    allQuestionsCount,
    matchedUser: {
      submitStats: { acSubmissionNum },
    },
  } = data;
  const result: Count[] = [];

  for (let i = 0; i < allQuestionsCount.length; i++) {
    const { difficulty, count: total } = allQuestionsCount[i];
    const { count } = acSubmissionNum[i];

    result[i] = { difficulty, count, total };
  }

  return result;
}
