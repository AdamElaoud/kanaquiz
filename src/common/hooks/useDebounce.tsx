import { GenericFn } from "@/common/types";
import { debounce } from "debounce";
import { useCallback, useMemo } from "react";

const useDebounce = <T, V>(callbackFn: GenericFn<T, V>, delay = 1000) => {
  const memoizedCallback = useCallback(callbackFn, [callbackFn]);

  const debouncedCallbackFn = useMemo(() => {
    return debounce((...args: T[]) => memoizedCallback(...args), delay);
  }, [delay, memoizedCallback]);

  return debouncedCallbackFn;
};

export default useDebounce;