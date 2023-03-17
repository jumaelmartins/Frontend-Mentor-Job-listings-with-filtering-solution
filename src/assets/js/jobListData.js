import json from "/src/assets/data.json";

export const getJobList = async () => {
  try {
    const jsonBody = json;
    return jsonBody;
  } catch (e) {
    console.log(e);
  }
};

export const convertJobListToHtml = async () => {
  const jobList = await getJobList();
  let p = document.createElement("p");
  jobList.forEach((job) => {
    // console.log(job.featured)
    let jobListHtml = document.querySelector("ul");

    // console.log(job)
    jobListHtml.innerHTML += `
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
  });
};

const arrayToHtml = (array) => {
  let p = document.createElement("p");
  array.forEach((item) => {
    p.innerHTML += `<p>${item}</p>`;
  });
  return p;
};

const filter = [];

const addFilter = () => {
  document.addEventListener("click", (e) => {
    let iten = categories.filter((word) => word === e.target.innerHTML);

    if (iten.length > 0) {
      filter.push(iten.join(","));
    }

    console.log(filter);
  });
};
addFilter();
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
