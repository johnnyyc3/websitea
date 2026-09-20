const searchInput = document.querySelector("#finding-search");
const severityFilter = document.querySelector("#severity-filter");
const findings = [...document.querySelectorAll(".finding")];
const emptyState = document.querySelector("#empty-state");

function filterFindings() {
  const query = searchInput.value.trim().toLowerCase();
  const severity = severityFilter.value;
  let visible = 0;

  findings.forEach((finding) => {
    const matchesText = finding.textContent.toLowerCase().includes(query);
    const matchesSeverity = severity === "all" || finding.dataset.severity === severity;
    const show = matchesText && matchesSeverity;
    finding.hidden = !show;
    if (show) visible += 1;
  });

  emptyState.hidden = visible !== 0;
}

searchInput.addEventListener("input", filterFindings);
severityFilter.addEventListener("change", filterFindings);

document.querySelectorAll(".check-item input").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    checkbox.closest(".check-item").classList.toggle("done", checkbox.checked);
    document.querySelector("#check-count").textContent = document.querySelectorAll(".check-item input:checked").length;
  });
});

document.querySelector(".notice button").addEventListener("click", (event) => {
  event.currentTarget.closest(".notice").remove();
});

document.querySelector(".mobile-menu").addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("mobile-open");
});
