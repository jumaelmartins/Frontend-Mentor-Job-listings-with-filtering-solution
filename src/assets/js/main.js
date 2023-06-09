import "../styles/main.scss";
import { getJobList } from "./jobListData";

const jobListHtml = document.querySelector("ul"); 
const filter = []; /* Array para captirar os filtros setados pelo usuaario*/

// função para ler os dados do json e converter em html
const convertJobListToHtml = (job) => {
  return `
              <li class="${job.featured ? "featured" : ""}">
              <div class="jobInformation">
                  <div class="companyLogo">
                  <img width="48" src="${job.logo}" alt="" />
                  </div>
  
                  <div class="container">
                  <div class="companyDesciption">
                      <h2 class="companyName">${job.company}</h2>
                      <div class="featureContainer">
                      <p class="${job.new ? "new" : ""}">${
    job.new ? "NEW!" : ""
  }</p>
                      <p class="${job.featured ? "featured" : ""}">${
    job.featured ? "featured" : ""
  }</p>
                      </div>
                      </div>
  
                  <div class="jobTitles">
                  <h2>${job.position}</h2>
                  </div>
                  
                  <div class="jobDescription">
                  <p>${job.postedAt}</p>
                  <p>${job.contract}</p>
                  <p>${job.location}</p>
                  </div>
                  </div>
                  </div>
                  
                  <div class="categories">
                  <p>${job.role}</P>
                  <p>${job.level}</P>
                  ${arrayToHtml(job.languages).innerHTML}
                  ${arrayToHtml(job.tools).innerHTML}
                  </div>
                  </li>
                  `;
};

// função para carregar os itens na pagina
const loadItens = async () => {
  jobListHtml.innerHTML = "";
  const jobList = Array.from(await getJobList())
    .map(convertJobListToHtml)
    .join("");
  jobListHtml.innerHTML = jobList;
};

// função para filtrar os itens na pagina
const filterItens = () => {
  const categories = document.querySelectorAll("li > [class=categories]");

  categories.forEach((iten) => {
    const filteredIten = filter.every((value) =>
      iten.textContent.includes(value)
    );
    if (!filteredIten) iten.parentNode.classList.add("hidden");
  });
};

// função para remover os filtros
const filterRemove = () => {
  const filterDiv = document.querySelectorAll(".filter p");

  filterDiv.forEach((iten) => {
    iten.onclick = (e) => {
      if (e.target.nodeName === "BUTTON") {
        e.target.closest("p").classList.add("hidden");
        const index = filter.indexOf(e.target.parentNode.textContent);
        if (index !== -1) {
          filter.splice(index, 1);
        }

        const categories = document.querySelectorAll("li > [class=categories]");

        categories.forEach((iten) => {
          const filteredIten = filter.every((value) =>
            iten.textContent.includes(value)
          );
          if (filteredIten) iten.parentNode.classList.remove("hidden");
        });

        if (filter.length === 0) {
          iten.closest("div").classList.add("hidden");
        }
      }
    };
  });
};

// função para converter array em html
const arrayToHtml = (array) => {
  let p = document.createElement("p");
  array.forEach((item) => {
    p.innerHTML += `<p>${item}</p>`;
  });
  return p;
};

// função para adicionar o filtro no array filter e exibir os filtros aplicados no topo da pagina
const addFilter = () => {
  let filterHtml = document.querySelector(".filter");

  document.addEventListener("click", (e) => {
    let iten = categories.filter((word) => word === e.target.innerHTML);
    if (iten.length > 0) {
      if (filter.indexOf(iten.join(",")) !== -1) {
        return;
      } else {
        filter.push(iten.join(","));
        let p = document.createElement("p");
        let button = document.createElement("button");
        p.innerHTML = iten;
        p.appendChild(button);
        filterHtml.classList.remove("hidden");
        filterHtml.appendChild(p);
        filterItens();
        filterRemove();
      }
    }
  });
};

// categorias de filtro
const categories = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Junior",
  "Midweight",
  "Senior",
  "Python",
  "Ruby",
  "JavaScript",
  "HTML",
  "React",
  "Sass",
  "Vue",
  "Django",
  "RoR",
  "CSS",
];

const init = () => {
  addFilter();
  loadItens();
};
init();
