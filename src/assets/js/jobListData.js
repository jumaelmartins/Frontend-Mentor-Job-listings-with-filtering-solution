const url = "src/data.json";



export const getJobList = async () => {
  try {
    const response = await fetch(url);
    const jsonBody = await response.json();
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
                    <p class="${job.new ? "NEW!" : ""}">${
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
                ${job.languages.forEach((lang) => {
                  let categories = document.querySelectorAll(".categories");
                  console.log(categories);
                })}
                </div>
            </li>
            `;
  });
};
