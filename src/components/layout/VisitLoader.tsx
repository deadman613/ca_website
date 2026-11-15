"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VisitLoader.module.css";

const storageKey = "dcs-visit-loader-shown";
const layerCount = 26;
const layerStep = 1.6;

export default function VisitLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const initialized = useRef(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (window.sessionStorage.getItem(storageKey)) return;
      window.sessionStorage.setItem(storageKey, "true");
    } catch (error) {
      if (error instanceof DOMException && error.name === "SecurityError") return;
      throw error;
    }

    window.setTimeout(() => setVisible(true), 0);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const minimumDuration = reducedMotion.current ? 700 : 4600;
    let animationFinished = false;
    let pageLoaded = document.readyState === "complete";
    let exitStarted = false;
    let animationTimer = 0;
    let removeTimer = 0;

    const maybeExit = () => {
      if (!animationFinished || !pageLoaded || exitStarted) return;
      exitStarted = true;
      setExiting(true);
      removeTimer = window.setTimeout(() => setVisible(false), 350);
    };

    const handlePageLoad = () => {
      pageLoaded = true;
      maybeExit();
    };

    animationTimer = window.setTimeout(() => {
      animationFinished = true;
      maybeExit();
    }, minimumDuration);

    if (!pageLoaded) {
      window.addEventListener("load", handlePageLoad, { once: true });
    }

    return () => {
      window.clearTimeout(animationTimer);
      window.clearTimeout(removeTimer);
      window.removeEventListener("load", handlePageLoad);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Delhi CA School"
      aria-live="polite"
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      role="status"
    >
      <div className={styles.loader}>
        <div className={styles.scene}>
          <div aria-hidden="true" className={styles.mark}>
            {Array.from({ length: layerCount }, (_, index) => {
              const depth = layerCount - index;
              const t = depth / layerCount;
              const red = Math.round(20 - 14 * t);
              const green = Math.round(70 - 50 * t);
              const blue = Math.round(210 - 120 * t);

              return (
                <span
                  className={`${styles.layer} ${styles.back}`}
                  key={depth}
                  style={{
                    color: `rgb(${red}, ${green}, ${blue})`,
                    transform: `translateZ(${-depth * layerStep}px)`,
                  }}
                >
                  DCAS
                </span>
              );
            })}
            <span className={`${styles.layer} ${styles.edge}`}>DCAS</span>
            <span className={`${styles.layer} ${styles.fill}`}>DCAS</span>
            <span className={`${styles.layer} ${styles.sheen}`}>DCAS</span>
          </div>
          <div aria-hidden="true" className={styles.shadow} />
        </div>
        <div className={styles.label}>
          Loading<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
}
