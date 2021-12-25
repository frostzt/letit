import { PropertyError } from '../generated/graphql';

export const mapErrors = (errors: PropertyError[]) => {
  const map: Record<string, string> = {};
  errors.forEach(({ message, property }) => {
    map[property] = message;
  });

  return map;
};
