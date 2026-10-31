(() => {
  document.querySelectorAll("[data-language-browser]").forEach((browser) => {
    const toggle = browser.querySelector("[data-language-toggle]");
    const posts = [...browser.querySelectorAll("[data-post-lang]")];
    const pager = browser.querySelector("[data-filter-pager]");
    const pageSize = Number(browser.dataset.pageSize) || posts.length || 1;
    let showItalian = false;
    let currentPage = 1;

    function render() {
      const eligible = posts.filter((post) => showItalian || post.dataset.postLang !== "it");
      const pageCount = Math.max(1, Math.ceil(eligible.length / pageSize));
      currentPage = Math.min(currentPage, pageCount);
      const first = (currentPage - 1) * pageSize;
      const visible = new Set(pager ? eligible.slice(first, first + pageSize) : eligible);
      posts.forEach((post) => { post.hidden = !visible.has(post); });

      browser.querySelectorAll("[data-post-category]").forEach((category) => {
        const count = [...category.querySelectorAll("[data-post-lang]")].filter((post) => !post.hidden).length;
        category.hidden = count === 0;
        category.querySelector("[data-category-count]").textContent = count;
      });

      toggle.setAttribute("aria-checked", String(showItalian));
      if (pager) {
        pager.hidden = pageCount < 2;
        pager.querySelector("[data-page-status]").textContent = `Page ${currentPage} of ${pageCount}`;
        pager.querySelector("[data-page-previous]").disabled = currentPage === 1;
        pager.querySelector("[data-page-next]").disabled = currentPage === pageCount;
      }
    }

    toggle.addEventListener("click", () => {
      showItalian = !showItalian;
      currentPage = 1;
      render();
    });

    if (pager) {
      function changePage(direction) {
        currentPage += direction;
        render();
        const heading = browser.querySelector(".post-list-heading");
        if (heading) heading.focus();
      }
      pager.querySelector("[data-page-previous]").addEventListener("click", () => changePage(-1));
      pager.querySelector("[data-page-next]").addEventListener("click", () => changePage(1));
    }
    render();
    toggle.hidden = false;
  });
})();
