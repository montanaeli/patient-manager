import React, { useEffect, useMemo, useState } from 'react';

interface AvatarProps {
  name: string;
  avatar: string;
}

const uriWithInitials = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
 }

const validateUrl = (props: AvatarProps): string => {
  const [verifiedUri, setVerifiedUri] = useState<string>();

  useEffect(() => {
    const verifyImageUri = async () => {
      try {
        // Check if the image URL is valid, only Head request is enough
        const response = await fetch(props.avatar, { method: 'HEAD' });
        if (response.ok) {
          setVerifiedUri(props.avatar);
        } else {
          // Fallback to initials-based avatar if fetch fails
          setVerifiedUri(uriWithInitials(props.name));
        }
      } catch {
        // Fallback on network error
        setVerifiedUri(uriWithInitials(props.name));
      }
    };

    verifyImageUri();
  }, [props.avatar, props.name]);

  if (!verifiedUri) {
    return 'https://www.w3schools.com/w3images/avatar2.png';
  }

  return verifiedUri;
};

export const useAvatar = ({name, avatar} : AvatarProps): string => {
  const valid = validateUrl({ name, avatar });

  return valid;
};

export default useAvatar;