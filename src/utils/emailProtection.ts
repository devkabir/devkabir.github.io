export const encodeEmail = (email: string): string => {
  return btoa(email);
};

export const decodeEmail = (encodedEmail: string): string => {
  try {
    return atob(encodedEmail);
  } catch {
    return '';
  }
};

export const getMailtoLink = (encodedEmail: string): string => {
  const email = decodeEmail(encodedEmail);
  return email ? `mailto:${email}` : '#';
};
