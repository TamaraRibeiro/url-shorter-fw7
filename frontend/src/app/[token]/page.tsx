"use client";
import { useEffect } from "react";
export default async function RedirectUrl({
  params,
}: {
  params: { token: string };
}) {
  useEffect(() => {
    async function getUrl() {
      const response = await fetch(
        `http://localhost:3333/${params.token}`
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

  return <div className="px-4 py-6"><h1 className="font-semibold text-sm md:text-lg">Redirecting to your URL...</h1></div>;
}
