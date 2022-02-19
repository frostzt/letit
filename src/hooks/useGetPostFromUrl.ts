import { usePostQuery } from '../generated/graphql';
import { useGetPostIdFromUrl } from './useGetPostIdFromUrl';

export const useGetPostFromUrl = () => {
  const thisPostId = useGetPostIdFromUrl();
  return usePostQuery({ skip: thisPostId === 'undefined', variables: { id: thisPostId } });
};
