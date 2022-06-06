const moment = require("moment");
const Resume = require("./Georgios_Giatsidis.resume.json");

const buildResumeFromJson = () => {
  return `\\input{settings}
\\begin{document}

\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{{\\LARGE ${Resume.basics.name}}} & Email: \\href{mailto:}{${
    Resume.basics.email
  }}\\\\
  \\href{https://www.linkedin.com/in/georgegiatsidis}{Linkedin: linkedin.com/in/georgegiatsidis} & Mobile:~~~+30 6975542395 \\\\
  \\href{https://github.com/georgiosgiatsidis}{Github: ~~github.com/georgiosgiatsidis} \\\\
\\end{tabular*}

\\section{Working Experience}
${Resume.work
  .map((x) => {
    return `
   \\resumeSubHeadingListStart
   \\resumeSubheading{\\href{${x.url}}{${x.name}}}{${
      x.location ? `\\faMapMarker~${x.location}` : "Remote"
    }}
   {${x.position} ${x.type || ""}}{${moment(x.startDate).format(
      "MMMM YYYY"
    )} - ${
      x.endDate ? moment(x.endDate).format("MMMM YYYY") : "\\textbf{present}"
    }}
   \\resumeItemListStart
    ${x.summary
      .split("\n")
      .map((sum) => `\\resumeItemWithoutTitle{${sum.replace("- ", "")}}`)
      .join("\n")}
  \\resumeItemListEnd
  \\resumeSubHeadingListEnd
  `;
  })
  .join("\n")}

  \\section{~~Education}
    ${Resume.education
      .map((x) => {
        return `
      \\resumeSubHeadingListStart
      \\resumeSubheading
        {${x.institution}}{${x.location ? `\\faMapMarker~${x.location}` : ""}}
        {${x.studyType}${x.area ? ` - ${x.area}` : ""}}{${moment(
          x.startDate
        ).format("YYYY")} - ${moment(x.endDate).format("YYYY")}}
        ${
          x.courses && x.courses.length > 0
            ? `{\\scriptsize \\textit{ \\footnotesize{\\newline{}\\textbf{Courses:} ${x.courses.map(
                (course) => course.split("-")[1]
              )}}}}`
            : ""
        }
        ${
          x.thesis
            ? `{\\scriptsize \\textit{ \\footnotesize{\\newline{}\\textbf{Thesis:} ${x.thesis}}}}`
            : ""
        }
        \\resumeSubHeadingListEnd
        \\vspace{-5pt}
      `;
      })
      .join("\n")}

  \\vspace{-5pt}
  \\section{Skills Summary}
    \\resumeSubHeadingListStart
    \\resumeSubItem{Languages}{English - Professional working proficiency, Greek - Native, Spanish - Basic}
    \\resumeSubItem{Frontend}{JavaScript, Typescript, React.js, HTML, CSS, SASS, Mobx, Jest}
    \\resumeSubItem{Backend}{Node.js, Python, PHP, Java, MySQL, MongoDB, Docker, Nginx, Laravel, Redis}
    \\resumeSubItem{Soft Skills}{Teamwork, Knowledge Sharing, Planning, Problem-solving, Active Listening, Flexibility, Ownership, Openness to criticism}

  \\resumeSubHeadingListEnd
  \\vspace{-5pt}
\\end{document}`;
};

console.log(buildResumeFromJson());
