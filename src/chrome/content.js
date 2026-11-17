(() => {
  "use strict";

  const id = "friend-feed-shortcut";
  const destination = "https://www.facebook.com/?filter=friends&sk=h_chr";
  let scheduled = false;

  function updateShortcut() {
    scheduled = false;
    // Match semantic navigation and URL paths instead of Facebook's generated classes.
    for (const navigation of document.querySelectorAll('[role="navigation"], nav')) {
      const home = Array.from(navigation.querySelectorAll('a[href]')).find((link) => {
        const url = new URL(link.href, location.href);
        return url.hostname === location.hostname && url.pathname === "/" &&
          !url.search && link.querySelector("svg") &&
          link.getBoundingClientRect().top < 110;
      });
      if (!home) continue;

      const list = home.closest('ul, [role="tablist"], [role="list"]');
      if (!list || !navigation.contains(list)) continue;
      list.classList.add("friend-feed-navigation");
      let homeItem = home;
      while (homeItem.parentElement !== list) homeItem = homeItem.parentElement;

      const template = Array.from(list.children).find((child) =>
        child !== homeItem && child.id !== id && child.querySelector("a[href]")
      ) || homeItem;
      let item = document.getElementById(id);
      if (!item) {
        // Clone the native wrappers and decorative layers, without React listeners.
        item = template.cloneNode(true);
        for (const element of item.querySelectorAll(".friend-feed-muted-indicator")) {
          element.classList.remove("friend-feed-muted-indicator");
        }
        item.removeAttribute("id");
        for (const element of item.querySelectorAll("[id]")) element.removeAttribute("id");
        const nativeLink = item.querySelector("a[href]");
        item.id = id;
        const link = document.createElement("a");
        link.className = nativeLink.className;
        link.classList.add("friend-feed-link");
        link.setAttribute("role", "link");
        link.tabIndex = 0;
        link.href = destination;
        link.setAttribute("aria-label", "Friends feed");
        link.setAttribute("aria-describedby", `${id}-tooltip`);
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 28 28");
        svg.setAttribute("aria-hidden", "true");
        for (const data of [
          "M17 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
          "M5 23v-2a7 7 0 0 1 14 0v2H5Z",
          "M20 6a3 3 0 0 1 0 6M22 16a5 5 0 0 1 3 5v2h-3"
        ]) {
          const path = document.createElementNS(svg.namespaceURI, "path");
          path.setAttribute("d", data);
          svg.append(path);
        }
        link.append(svg);
        const tooltip = document.createElement("span");
        tooltip.id = `${id}-tooltip`;
        tooltip.className = "friend-feed-tooltip";
        tooltip.setAttribute("role", "tooltip");
        tooltip.textContent = "Friends feed";
        link.append(tooltip);
        // A full navigation ensures Facebook applies the requested feed filter.
        link.addEventListener("click", (event) => {
          if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          event.stopPropagation();
          location.assign(destination);
        });
        nativeLink.replaceWith(link);
      }
      // Keep the same native list-item classes as the neighboring tab.
      item.className = Array.from(template.classList)
        .filter((name) => !name.startsWith("friend-feed-"))
        .join(" ");
      if (homeItem.nextElementSibling !== item) homeItem.after(item);
      const active = location.pathname === "/" &&
        new URLSearchParams(location.search).get("filter") === "friends";
      const link = item.querySelector(".friend-feed-link");
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
      for (const sibling of list.children) {
        if (sibling === item) continue;
        sibling.classList.toggle("friend-feed-muted-tab", active);
        for (const element of sibling.querySelectorAll("*")) {
          if (!active) {
            element.classList.remove("friend-feed-muted-indicator");
            continue;
          }
          // Native selected indicators can be separate layers outside the link.
          const background = getComputedStyle(element).backgroundColor;
          if (/^rgba?\((8, 102, 255|24, 119, 242|8, 102, 255, 1)\)$/.test(background)) {
            element.classList.add("friend-feed-muted-indicator");
          }
        }
      }
      return;
    }
  }

  function scheduleUpdate() {
    // During startup, insert in the mutation callback before the next paint.
    // Later updates can be batched to avoid scanning on every feed mutation.
    if (!document.getElementById(id)) {
      updateShortcut();
      return;
    }
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateShortcut);
  }

  // document is available even before documentElement at document_start.
  new MutationObserver(scheduleUpdate).observe(document, {
    childList: true,
    subtree: true
  });
  window.addEventListener("popstate", scheduleUpdate);
  window.addEventListener("resize", scheduleUpdate);
  updateShortcut();
})();
