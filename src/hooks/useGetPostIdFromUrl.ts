import { useRouter } from 'next/router';

export const useGetPostIdFromUrl = () => {
  const router = useRouter();
  const thisPostId = typeof router.query.id === 'string' ? router.query.id : 'undefined';
  return thisPostId;
};
