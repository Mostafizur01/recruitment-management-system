import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { fetchApi } from "../api/fetch.js";

export const useAutoSave = (data, endpoint, onConflict) => {
  const debouncedSave = useMemo(
    () =>
      debounce(async (currentData) => {
        if (!currentData) return;
        try {
          await fetchApi(endpoint, {
            method: "PUT",
            body: JSON.stringify(currentData),
          });
        } catch (err) {
          const message = String(err.message || "");
          if (
            message.includes("409") ||
            message.toLowerCase().includes("conflict")
          ) {
            onConflict();
          }
        }
      }, 2000),
    [endpoint, onConflict],
  );

  useEffect(() => {
    if (!data) return;
    debouncedSave(data);
    return () => debouncedSave.cancel();
  }, [data, debouncedSave]);
};
