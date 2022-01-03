import { usePostQuery } from '../generated/graphql';
import { useGetPostIdFromUrl } from './useGetPostIdFromUrl';

export const useGetPostFromUrl = () => {
  const thisPostId = useGetPostIdFromUrl();
  return usePostQuery({ pause: thisPostId === 'undefined', variables: { id: thisPostId } });
};
