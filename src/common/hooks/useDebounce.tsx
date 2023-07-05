import { GenericFn } from "@/common/types";
import { debounce } from "debounce";
import { useEffect, useMemo, useRef } from "react";

const useDebounce = <T, V>(callbackFn: GenericFn<T, V>, delay = 1000) => {
    const callbackRef = useRef<GenericFn<T, V>>(callbackFn);

  useEffect(() => {
    callbackRef.current = callbackFn;
    
  }, [callbackFn]);

  const debouncedCallbackFn = useMemo(() => {
    return debounce((...args: T[]) => callbackRef.current(...args), delay);
  }, [delay]);

  return debouncedCallbackFn;
};

export default useDebounce;