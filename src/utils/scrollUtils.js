export function scrollToTop(immediate = true) {
  const behavior = immediate ? "auto" : "smooth";

  window.scrollTo({ top: 0, left: 0, behavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);

  if (!element) return;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${sectionId}`);
}

export function restoreScrollPosition({ hash, scrollY }) {
  if (hash) {
    const element = document.querySelector(hash);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
  }

  if (typeof scrollY === "number") {
    window.scrollTo({ top: scrollY, left: 0, behavior: "smooth" });
    return true;
  }

  return false;
}
