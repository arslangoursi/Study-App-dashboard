"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

import { UseActionParams } from "@/interfaces";
import { mutate } from "swr";
import { toast } from "react-toastify";
import useLanguage from "./useLanguage";
import { usePathname, useRouter } from "next/navigation";

export default function useAction<TArgs = any, TData = any>({
  promise,
  successMessage,
  errorMessage,
  mutatePath,
  goBack,
  onSuccess,
  onError,
  logError,
  retryCount = 0,
  successToastOptions,
  errorToastOptions,
  needsConfirmation
}: UseActionParams<TArgs, TData>): [
  boolean,
  (args?: TArgs) => Promise<TData>,
  () => void
] {
  const pathname = usePathname();
  const router = useRouter();
  const [lang] = useLanguage();
  const [processing, setProcessing] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isPending, startTransition] = useTransition();

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const handleSuccess = useCallback(
    async (data: TData) => {
      if (mutatePath) {
        await mutate(mutatePath);
      }
      startTransition(() => {
        if (goBack) {
          router.refresh();
          router.replace(pathname.split("/").slice(0, -1).join("/") || "/");
        } else {
          router.refresh();
        }
      });

      await onSuccess?.(data);

      if (successMessage) toast.success(successMessage, successToastOptions);
    },
    [mutatePath, successMessage, successToastOptions, goBack, router, onSuccess]
  );

  const handleError = useCallback(
    (error: Error) => {
      const message =
        error?.message ||
        errorMessage ||
        (lang === "ar" ? "حدث خطأ غير معروف" : "An unknown error occurred");

      toast.error(message, errorToastOptions);
      onError?.(error);
      logError?.(error);
    },
    [errorMessage, errorToastOptions, lang, onError, logError]
  );

  const actionCallback = useCallback(
    async (args?: TArgs): Promise<TData> => {
      setProcessing(true);
      abortControllerRef.current = new AbortController();
      let retries = 0;

      const executeRequest = async (): Promise<TData> => {
        try {
          if (needsConfirmation) {
            const confirmed = confirm(
              lang === "ar"
                ? "هل أنت متأكد من تنفيذ هذا الإجراء؟"
                : "Are you sure you want to perform this action?"
            );
            if (!confirmed) {
              setProcessing(false);
              throw new Error("Action cancelled by user");
            }
          }

          const result = await promise(
            args as TArgs,
            abortControllerRef.current?.signal
          );
          const data = result?.data;

          if ((data as any)?.error) throw new Error((data as any).error);

          await handleSuccess(data);
          return data;
        } catch (error: any) {
          if (retries < retryCount) {
            retries += 1;
            return executeRequest();
          }
          handleError(error);
          throw error;
        } finally {
          setProcessing(false);
        }
      };

      return executeRequest();
    },
    [promise, retryCount, handleSuccess, handleError]
  );

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, [cancelRequest]);

  return [processing || isPending, actionCallback, cancelRequest];
}
