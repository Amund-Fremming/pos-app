import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { ApiErrorModal } from "../components/shared/ApiErrorModal/ApiErrorModal";

type RetryFn = () => Promise<void> | void;

type ApiErrorContextValue = {
  /** Shows the blocking "can't reach the server" modal. `retry` is re-run when the user presses Prøv igjen. */
  showApiError: (retry: RetryFn) => void;
};

const ApiErrorContext = createContext<ApiErrorContextValue | null>(null);

export function ApiErrorProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [occurredAt, setOccurredAt] = useState<Date | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const retryRef = useRef<RetryFn | null>(null);

  const showApiError = useCallback((retry: RetryFn) => {
    retryRef.current = retry;
    setOccurredAt(new Date());
    setVisible(true);
  }, []);

  const handleRetry = useCallback(async () => {
    const retry = retryRef.current;
    if (!retry) return;

    setIsRetrying(true);
    try {
      await retry();
      retryRef.current = null;
      setVisible(false);
    } catch (error) {
      console.warn("Retry failed", error);
      setOccurredAt(new Date());
    } finally {
      setIsRetrying(false);
    }
  }, []);

  const value = useMemo<ApiErrorContextValue>(() => ({ showApiError }), [showApiError]);

  return (
    <ApiErrorContext.Provider value={value}>
      {children}
      <ApiErrorModal visible={visible} occurredAt={occurredAt} isRetrying={isRetrying} onRetry={handleRetry} />
    </ApiErrorContext.Provider>
  );
}

export function useApiError(): ApiErrorContextValue {
  const ctx = useContext(ApiErrorContext);
  if (!ctx) throw new Error("useApiError must be used within an ApiErrorProvider");
  return ctx;
}
