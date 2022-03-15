import { PostContentFragment } from '../../generated/graphql';

export const sortPostsByTop = (posts: PostContentFragment[]) => {
  const clonedPosts = [...posts];
  clonedPosts.sort((a, b) => Number(b.points) - Number(a.points));
  return clonedPosts;
};
