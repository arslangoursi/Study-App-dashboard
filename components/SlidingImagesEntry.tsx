"use client";

import Image from "next/image";

const colors = ["rgba(227, 229, 231, 1)", "rgba(227, 229, 231, 1)"];

function SlidingImagesEntry({
  project
}: {
  project: {
    image: string;
    link: string;
  };
}) {
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="project" style={{ backgroundColor }}>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="imageContainer"
      >
        <Image
          alt="zood"
          src={project.image}
          className="image"
          width={300}
          height={270}
          quality={100}
        />
      </a>
    </div>
  );
}

export default SlidingImagesEntry;
