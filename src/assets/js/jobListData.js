import json from "/src/assets/data.json";

export const getJobList = async () => {
  try {
    const jsonBody = json;
    return jsonBody;
  } catch (e) {
    console.log(e);
  }
};
