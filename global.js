console.log("IT’S ALIVE!");

const ARE_WE_HOME = document.documentElement.classList.contains("home");
const pages = [
  { url: "index.html", title: "Home" },
  { url: "contact/index.html", title: "Contact" },
  { url: "projects/index.html", title: "Projects" },
  { url: "resume/index.html", title: "Resume" },
  { url: "https://github.com/bothermeQAQ", title: "GitHub", external: true }
];
const nav = document.createElement("nav");

pages.forEach(page => {
  let url = page.url;
  if (!ARE_WE_HOME && !url.startsWith("http")) {
    url = "../" + url;
  }
  const link = document.createElement("a");
  link.href = url;
  link.textContent = page.title;
  if (page.external) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  nav.appendChild(link);
});

document.body.prepend(nav);

const themeSwitcherHTML = `
  <div class="theme-switch-container">
    <label class="color-scheme">
      Theme:
      <select id="theme-select">
        <option value="auto">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  </div>
`;
nav.insertAdjacentHTML("afterend", themeSwitcherHTML);

document.querySelectorAll("nav a").forEach(link => {
  if (link.host === location.host && link.pathname === location.pathname) {
    link.classList.add("current");
  }
});

const themeSelect = document.getElementById("theme-select");
function applyTheme(theme) {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  localStorage.colorScheme = theme;
}
let savedTheme = "auto";
if ("colorScheme" in localStorage) {
  savedTheme = localStorage.colorScheme;
}
applyTheme(savedTheme);
themeSelect.value = savedTheme;
themeSelect.addEventListener("change", event => {
  applyTheme(event.target.value);
});

// ========== Exported Functions ==========

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch JSON: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON data:", error);
  }
}

export function renderProjects(projects, containerElement, headingLevel = "h2") {
  if (!containerElement) {
    console.error("Error: containerElement is null or undefined.");
    return;
  }
  
  containerElement.innerHTML = "";

  projects.forEach(project => {
    const article = document.createElement("article");

    const heading = document.createElement(headingLevel);
    heading.textContent = project.title;
    article.appendChild(heading);

    const image = document.createElement("img");
    image.src = project.image || "https://via.placeholder.com/150";
    image.alt = project.title || "Project Image";
    article.appendChild(image);

    const description = document.createElement("p");
    description.textContent = project.description || "No description available.";

    if (project.link) {
      description.appendChild(document.createTextNode(" "));
      const link = document.createElement("a");
      link.href = project.link;
      link.textContent = "View Project";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      description.appendChild(link);
    }

    article.appendChild(description);
    containerElement.appendChild(article);
  });
}

// ADD THIS: fetchGitHubData to fetch from GitHub API
export async function fetchGitHubData(username) {
  // Uses the same fetchJSON but calls GitHub’s user API
  return fetchJSON(`https://api.github.com/users/${username}`);
}
