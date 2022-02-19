import { PropertyError } from '../generated/graphql';

export const mapErrors = (errors: PropertyError[]) => {
  const map: Record<string, string> = {};
  errors.forEach(({ message, property }) => {
    if (property) {
      map[property] = message;
    }
  });

  return map;
};
