const versions = [
  { version: "14.5", date: "August 10, 2026" },
  { version: "14.0", date: "July 2026" },
  { version: "13.5", date: "June 2026" },
  { version: "13.0", date: "May 2026" }
];

let currentVersion = 0;

const dotsContainer = document.querySelector("#dots");
const versionTitle = document.querySelector("#version");
const versionTag = document.querySelector("#version-tag");
const dateLabel = document.querySelector("#date");

function renderDots() {
  dotsContainer.innerHTML = "";

  versions.forEach((item, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "dot";
    button.title = "Version " + item.version;
    button.setAttribute("aria-label", "Version " + item.version);

    button.addEventListener("click", () => {
      setVersion(index);
    });

    dotsContainer.appendChild(button);
  });
}

function setVersion(index) {
  currentVersion = (index + versions.length) % versions.length;

  const item = versions[currentVersion];

  versionTitle.textContent = item.version;
  versionTag.textContent = "v" + item.version;
  dateLabel.textContent = item.date;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentVersion);
  });
}

document.querySelector("#prev").addEventListener("click", () => {
  setVersion(currentVersion + 1);
});

document.querySelector("#next").addEventListener("click", () => {
  setVersion(currentVersion - 1);
});

renderDots();
setVersion(0);

function updateProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percent = scrollableHeight > 0
    ? (window.scrollY / scrollableHeight) * 100
    : 0;

  document.querySelector("#progress").style.width =
    Math.min(100, percent) + "%";
}

window.addEventListener("scroll", updateProgress);
window.addEventListener("resize", updateProgress);

updateProgress();
document.querySelectorAll(".image-trigger").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".unit-item, .memoria-item");
    if (!item) return;

    const preview = item.querySelector(
      ".inline-preview-group, .inline-preview"
    );
    if (!preview) return;

    preview.hidden = !preview.hidden;
    button.setAttribute("aria-expanded", String(!preview.hidden));
  });
});