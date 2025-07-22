

const userId = localStorage.getItem("userId");
const { data } = useGetRecommendationsQuery(userId);