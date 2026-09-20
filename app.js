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

const modal = document.querySelector("#finding-modal");
const modalTitle = document.querySelector("#modal-title");

function openFinding(finding) {
  modalTitle.textContent = finding.dataset.finding;
  modal.hidden = false;
  document.querySelector("#modal-close").focus();
}

findings.forEach((finding) => {
  finding.addEventListener("click", () => openFinding(finding));
  finding.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFinding(finding);
    }
  });
});

document.querySelector("#modal-close").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.hidden = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) modal.hidden = true;
});

document.querySelectorAll(".domain-card").forEach((domain) => {
  const selectDomain = () => {
    document.querySelectorAll(".domain-card").forEach((card) => card.classList.remove("selected"));
    domain.classList.add("selected");
  };
  domain.addEventListener("click", selectDomain);
  domain.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectDomain();
    }
  });
});

document.querySelector("#manage-domains").addEventListener("click", () => {
  document.querySelector("#domains").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#activity-toggle").addEventListener("click", (event) => {
  event.currentTarget.textContent = "Showing latest";
});

document.querySelector("#modal-evidence").addEventListener("click", () => {
  modal.hidden = true;
  document.querySelector("#evidence").scrollIntoView({ behavior: "smooth" });
});
