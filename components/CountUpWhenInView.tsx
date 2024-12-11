"use client";

import { createRef, memo, useCallback, useEffect, useState } from "react";

import CountUp from "react-countup";

interface CountUpWhenInViewProps {
  start: number;
  end: number;
  duration?: number;
  delay?: number;
  onEnd?: () => void;
  [key: string]: any;
}

const CountUpWhenInView = (props: CountUpWhenInViewProps) => {
  const elementRef = createRef<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(false);
  const [countedUp, setCountedUp] = useState(false);

  const handleCountUpComplete = useCallback(() => {
    setCountedUp(true);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    });

    if (observer && elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [handleIntersect]);

  return (
    <div
      ref={elementRef}
      style={{
        visibility: isVisible ? "visible" : "hidden",
        display: "inline"
      }}
    >
      {(isVisible && !countedUp) || countedUp ? (
        <CountUp
          {...props}
          start={countedUp ? props.end : props.start}
          onEnd={handleCountUpComplete}
        />
      ) : null}
    </div>
  );
};

export default memo(CountUpWhenInView);
