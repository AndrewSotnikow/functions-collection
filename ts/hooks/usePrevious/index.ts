import { useEffect, useRef } from 'react';

export const usePrevious = (
  value: any,
  updateCondition?: (v: any) => boolean,
) => {
  const ref = useRef();
  useEffect(() => {
    if (typeof updateCondition !== 'function') {
      ref.current = value;
      return;
    }
    ref.current = updateCondition(value)
      ? value
      : ref.current;
  }, [updateCondition, value]);
  return ref.current;
};
