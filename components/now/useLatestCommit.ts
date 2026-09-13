"use client";

import { useEffect, useState } from "react";

interface GitHubPushEvent {
  type: string;
  created_at: string;
}

/**
 * Fetches the date of the user's most recent public push, client-side and
 * non-blocking. Renders the static fallback immediately and swaps in the
 * live date if the request succeeds; stays on the fallback otherwise.
 */
export function useLatestCommit(username: string, fallbackDate: string): string {
  const [caption, setCaption] = useState(`Last updated ${fallbackDate}`);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((res) => (res.ok ? (res.json() as Promise<GitHubPushEvent[]>) : Promise.reject(res.status)))
      .then((events) => {
        const pushEvent = events.find((event) => event.type === "PushEvent");
        if (!pushEvent || cancelled) return;

        const date = new Date(pushEvent.created_at).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
        setCaption(`Last updated ${date}`);
      })
      .catch(() => {
        // Fallback caption is already showing; nothing to do.
      });

    return () => {
      cancelled = true;
    };
  }, [username, fallbackDate]);

  return caption;
}
