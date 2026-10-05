(() => {
  const button = document.querySelector("[data-navbtn]");
  const navigation = document.querySelector("[data-nav]");

  const closeNavigation = (restoreFocus = false) => {
    if (!button || !navigation) return;
    navigation.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    if (restoreFocus) button.focus();
  };

  if (button && navigation) {
    button.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNavigation();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("open")) closeNavigation(true);
    });
  }

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
