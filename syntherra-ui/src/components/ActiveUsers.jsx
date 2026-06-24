import { useEffect, useState } from "react";
import api from "../services/api";
export default function ActiveUsers() {

  const [count, setCount] =
    useState(0);

  useEffect(() => {

    const loadCount =
      async () => {

        try {

          const response =
            await api.get(
              "/activity/count"
            );

          setCount(
            response.data.activeDevices ?? 0
          );

        } catch {

          setCount(0);

        }

      };

    loadCount();

    const interval =
      setInterval(
        loadCount,
        10000
      );

    return () =>
      clearInterval(
        interval
      );

  }, []);

  return null;

}