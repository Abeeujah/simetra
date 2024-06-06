export function validationErrorBuilder(errors) {
  const missing = {};
  errors.forEach((error) => {
    const errPath = error.path[0];
    missing[errPath] = error.message;
  });
  return missing;
}

export const minLengthMessage = (field, count) =>
  `${field} must be at least ${count} characters long.`;

export const maxLengthMessage = (field, count) =>
  `${field} must be no more than ${count} characters long.`;
