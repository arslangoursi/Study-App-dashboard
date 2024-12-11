"use client";

import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";

import Image from "next/image";
import Project from "./components/project";
import gsap from "gsap";
import memoizedData from "./data.json";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import useLanguage from "@/hooks/useLanguage";

function Home() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);
  const xMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const yMoveContainer = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const xMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursorLabel = useRef<gsap.QuickToFunc | null>(null);
  const [lang] = useLanguage();

  const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
    }
  };

  useLayoutEffect(() => {
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3"
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3"
    });
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3"
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3"
    });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3"
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3"
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    if (xMoveContainer.current) xMoveContainer.current(x);
    if (yMoveContainer.current) yMoveContainer.current(y);
    if (xMoveCursor.current) xMoveCursor.current(x);
    if (yMoveCursor.current) yMoveCursor.current(y);
    if (xMoveCursorLabel.current) xMoveCursorLabel.current(x);
    if (yMoveCursorLabel.current) yMoveCursorLabel.current(y);
  };

  interface ManageModal {
    (active: boolean, index: number, x: number, y: number): void;
  }

  const manageModal: ManageModal = useCallback((active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  }, []);

  return (
    <div className={styles?.headingfixed} id="Timeline">
      <div data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
        <h2
          className="eleven__heading__prjct heading__with__span"
          style={{ paddingTop: "0.5em" }}
        >
          {lang === "ar" ? "خطّنا الزمني" : "Our Timeline"}
        </h2>
      </div>
      <main
        onMouseMove={(e) => moveItems(e.clientX, e.clientY)}
        className={styles.projects}
      >
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          className={styles.body}
        >
          {memoizedData?.map((project, index) => (
            <Project
              index={index}
              image={project.logo}
              year={project.timeline}
              location={project.city.en}
              manageModal={manageModal}
              key={index}
            />
          ))}
        </div>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          // @ts-ignore
          className={styles.modalContainer}
        >
          <div
            style={{ top: `${index * -100}%` }}
            className={styles.modalSlider}
          >
            {memoizedData?.map((project, index) => (
              <div
                className={styles.modal}
                style={{ backgroundColor: "#f5f5f5", objectFit: "cover" }}
                key={`modal_${index}`}
              >
                <Image
                  alt="Project Banner"
                  src={project.banner}
                  height={300}
                  width={300}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default memo(Home);
