import '../styles/main.scss';
import { convertJobListToHtml, getJobList } from './jobListData';
const jobListHtml = document.querySelector("ul");


convertJobListToHtml();