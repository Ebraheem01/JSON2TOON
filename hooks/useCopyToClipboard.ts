
import { useState, useCallback } from 'react';

type CopyFn = () => void;

export const useCopyToClipboard = (textToCopy: string): [boolean, CopyFn] => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(() => {
    if (isCopied || !textToCopy) return;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // You could add user-facing error handling here
    });
  }, [textToCopy, isCopied]);

  return [isCopied, copy];
};
