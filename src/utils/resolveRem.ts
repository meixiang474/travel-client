const setRemUnit = () => {
  let fontSize = window.innerWidth / 10;
  fontSize = fontSize > 50 ? 50 : fontSize;
  const html = document.querySelector("html") as HTMLElement;
  html.style.fontSize = `${fontSize}px`;
};

export const resolveRem = () => {
  document.addEventListener("DOMContentLoaded", setRemUnit);
  window.addEventListener("resize", setRemUnit);
};
