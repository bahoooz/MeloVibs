export const formatVoteCount = (votes: number): string => {
    if (votes >= 1000000) {
      return `${(votes / 1000000).toFixed(1)}M`;
    }
    if (votes >= 1000) {
      return `${(votes / 1000).toFixed(1)}k`;
    }
    return votes.toString();
  };