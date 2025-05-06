function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);

  // 切换 Logo 图
  const logo = document.getElementById("siteLogo");
  if (logo) {
    logo.src = next === "dark"
      ? "static/images/CM97_Geometric_Logo (Night View).png"
      : "static/images/CM97_Geometric_Logo (Edit).png";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.querySelector(".nav-toggle").addEventListener("click", toggleMenu);

  // 加载项目列表
  fetch("static/data/projects.json")
    .then(res => res.json())
    .then(projects => {
      const container = document.getElementById("project-list");
      container.innerHTML = "";
      projects.forEach(p => {
        container.innerHTML += `
          <div class="project-card">
            <img src="${p.image}" alt="${p.title || 'Project'}">
            <h3>${p.title || "Untitled Project"}</h3>
            <p>${p.description || "No description available."}</p>
            <p><strong>Tech:</strong> ${p.tech || "N/A"}</p>
            ${p.github ? `<a href="${p.github}" target="_blank" class="btn">GitHub</a>` : ""}
          </div>
        `;
      });
    })
    .catch(err => {
      document.getElementById("project-list").innerHTML = "⚠️ Failed to load projects.";
      console.error("Error loading projects:", err.message);
    });
});
