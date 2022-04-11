import { PostContentFragment } from '../../generated/graphql';

/**
 * Sort posts by most number of points they received
 * @param {PostContentFragment[]} posts, all that are to be sorted
 * @returns {PostContentFragment[]} posts, sorted posts by points
 */
export const sortPostsByTop = (posts: PostContentFragment[]) => {
  const clonedPosts = [...posts];
  clonedPosts.sort((a, b) => Number(b.points) - Number(a.points));
  return clonedPosts;
};
