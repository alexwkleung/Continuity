import { ResumeUtil } from './resume-util.js'

//create new ResumeUtil object
const resumeUtil = new ResumeUtil();

//call invoke function
resumeUtil.invoke(
    'src/client/resume.md',
    'src/client/output-html/resume.html',
    'Letter', 
    'src/client/output-pdf/resume.pdf'
);
