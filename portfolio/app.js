function go(id) {
  var element = document.getElementById(id); 
  element.scrollIntoView({behavior: "smooth"});
}

function displayProjects() {
  projects = JSON.parse(this.responseText);
  projectsDOM = document.getElementById("projects");
  for (i = projects.length - 1; i >= 0; i--) {
    p = projects[i]; // extract project object from the projects list obtained from 'projects.json'
    // fill in the blanks using object notation
    tags_str = ""
    if (p.tags) {
      for (tag of p.tags) {
        tags_str = tags_str + `<span class="tag">${tag}</span>`
      }
    }
    let cardTemplate = `
        <div data-aos="fade-up" class="project-tile">
          <p class="gradient project-name">${p.name}</p>
          <p class="gradient project-description">${p.description}</p>
          <div class="project-tags">
            ${tags_str}
          </div>
          <img class="project-screenshot" src="${p.screenshot_url}">
          <div class="project-links">
            <a href="${p.demo_url}" target="_blank" class="far fa-eye project-demo"></a>
            <a href="${p.source_url}" target="_blank" class="fas fa-file-code project-source"></a>
          </div>
        </div>`
    projectsDOM.insertAdjacentHTML('beforeend', cardTemplate);
  }
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", displayProjects);
oReq.open("GET", "projects.json");
oReq.send();

// window.onload = displayProjects();