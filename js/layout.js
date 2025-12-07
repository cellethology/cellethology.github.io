document.addEventListener("DOMContentLoaded", () => {
    const includeTargets = document.querySelectorAll("[data-include]");
    includeTargets.forEach((el) => {
        const url = el.getAttribute("data-include");
        if (!url) return;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then((html) => {
                el.outerHTML = html;
            })
            .catch((err) => {
                console.error(err);
            });
    });
});
