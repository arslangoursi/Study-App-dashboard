const generateColors = (length: number, alpha = 1): string[] => {
  if (length <= 0) return [];

  return Array.from({ length }, (_, i) => {
    const shade = Math.floor((i / length) * 200 + 55);
    return `rgba(${shade}, ${shade}, ${shade}, ${alpha})`;
  });
};

export default generateColors;
