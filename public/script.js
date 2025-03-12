document.addEventListener("DOMContentLoaded", function () {
  const jobsContainer = document.getElementById("jobs");
  const applicationForm = document.getElementById("application-form");

  // Fetch all jobs
  fetch("/jobs")
      .then(response => response.json())
      .then(jobs => {
          jobsContainer.innerHTML = "";
          jobs.forEach(job => {
              const jobElement = document.createElement("div");
              jobElement.classList.add("job");
              jobElement.innerHTML = `
                  <h3>${job.title}</h3>
                  <p><strong>Company:</strong> ${job.company}</p>
                  <p><strong>Location:</strong> ${job.location}</p>
                  <p>${job.description}</p>
                  <p><strong>Job ID:</strong> ${job.id}</p>
              `;
              jobsContainer.appendChild(jobElement);
          });
      })
      .catch(error => console.error("Error fetching jobs:", error));

  // Handle job application form submission
  applicationForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const job_id = document.getElementById("job_id").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const cover_letter = document.getElementById("cover_letter").value;

      fetch("/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              job_id: parseInt(job_id),
              applicant_name: name,
              applicant_email: email,
              cover_letter: cover_letter
          })
      })
      .then(response => response.json())
      .then(data => {
          alert("Application submitted successfully!");
          applicationForm.reset();
      })
      .catch(error => console.error("Error submitting application:", error));
  });
});
