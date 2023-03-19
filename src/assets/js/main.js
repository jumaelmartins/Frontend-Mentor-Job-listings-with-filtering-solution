import "../styles/main.scss";
import { getJobList } from "./jobListData";
import json from "/src/assets/data.json";

const jobListHtml = document.querySelector("ul");
const filter = [];

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

const loadItens = async () => {
  jobListHtml.innerHTML = "";
  const jobList = Array.from(await getJobList())
    .map(convertJobListToHtml)
    .join("");
  jobListHtml.innerHTML = jobList;
};

const filterItens = async () => {
  jobListHtml.innerHTML = "";
  const jobList = Array.from(await getJobList())
    .filter((job) => {
      if ((filter.length > 0)) {
        console.log(filter[filter.length - 1]);
        return (
          job.role.includes(filter[filter.length - 1]) ||
          job.level.includes(filter[filter.length - 1]) ||
          job.languages.includes(filter[filter.length - 1])
        );
      }
    })
    .map(convertJobListToHtml)
    .join("");
  jobListHtml.innerHTML = jobList;
};

const arrayToHtml = (array) => {
  let p = document.createElement("p");
  array.forEach((item) => {
    p.innerHTML += `<p>${item}</p>`;
  });
  return p;
};

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
        p.innerHTML = iten;
        filterHtml.classList.remove("hidden");
        filterHtml.appendChild(p);
        filterItens();
      }
    }
  });
};

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
