const QUERY = {
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
};

export default QUERY;
