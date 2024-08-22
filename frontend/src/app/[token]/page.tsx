"use client";
import { env } from "@/env";
import { useEffect } from "react";
export default async function RedirectUrl({
  params,
}: {
  params: { token: string };
}) {
  useEffect(() => {
    async function getUrl() {
      const response = await fetch(
        `${env.API_BASE_URL}/${params.token}`
      ).then((response) => response.json());
      if (response.url) {
        if (typeof window !== "undefined") {
          window.open(response.url);
          window.location.replace(response.url);
        }
      }
      return response.url;
    }
    getUrl();
  }, []);

  return <h1>Redirecting to your URL...</h1>;
}
