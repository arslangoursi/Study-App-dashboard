import Image from "next/image";
import { memo } from "react";
import styles from "./style.module.scss";
import { ProjectProps } from "@/interfaces";

function index({ index, image, manageModal, year, location }: ProjectProps) {
  return (
    <div
      onMouseEnter={(e) => manageModal(true, index, e.clientX, e.clientY)}
      onMouseLeave={(e) => manageModal(false, index, e.clientX, e.clientY)}
      className={styles.project}
    >
      <Image
        alt="zood"
        className={styles.logoicon}
        src={image}
        width={100}
        height={100}
      />
      <div>
        <h3>{year}</h3> <p className="subheadinggcolor">{location}</p>
      </div>
    </div>
  );
}

export default memo(index);
