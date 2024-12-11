"use client";

import "@/styles/app_redirect.scss";

import { useState, useEffect } from "react";

const AppRedirect = () => {
  const [showModal, setShowModal] = useState(false);
  const [storeLink, setStoreLink] = useState("");

  useEffect(() => {
    const hasWindow = typeof window !== "undefined";

    if (!hasWindow || window.innerWidth < 768) return;

    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes("android");
    const isBrowser = typeof window !== "undefined" && window.navigator;

    const appStoreLink =
      "https://apps.apple.com/us/app/spotify-music/id324684580";
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=com.spotify.music";

    const userPreference = localStorage.getItem("zoodAppPreference");

    if (isBrowser && userPreference !== "dismissed") {
      const intentUrl = "zood://";
      const startTime = Date.now();
      window.location.href = intentUrl;

      const timeout = setTimeout(() => {
        if (Date.now() - startTime < 2000) {
          setStoreLink(isAndroid ? playStoreLink : appStoreLink);
          setShowModal(true);
        }
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, []);

  const handleDismiss = () => {
    setShowModal(false);
    localStorage.setItem("zoodAppPreference", "dismissed");
  };

  return (
    <>
      {showModal && (
        <div className="app__redirect__modal">
          <div className="app__redirect__modal__content">
            <h2>App Not Installed</h2>
            <p>
              It seems like you don&#39;t have the Zood app installed. Would you
              like to download it?
            </p>
            <div className="app__redirect__modal__actions">
              <button type="button" title="Cancel" onClick={handleDismiss}>
                Cancel
              </button>
              <a href={storeLink} target="_blank" rel="noopener noreferrer">
                Download Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppRedirect;
