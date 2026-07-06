import { useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { fetchApi } from "../api/fetch.js";

export const useAutoSave = (data, endpoint, onConflict) => {
  const save = useCallback(
    () =>
      debounce(async (currentData) => {
        try {
          await fetchApi(endpoint, {
            method: "PUT",
            body: JSON.stringify(currentData),
          });
        } catch (err) {
          if (err.message.includes("409") || err.message.includes("Conflict")) {
            onConflict();
          }
        }
      }, 2000),
    [endpoint],
  );

  useEffect(() => {
    save(data);
    return () => save.cancel();
  }, [data, save]);
};
