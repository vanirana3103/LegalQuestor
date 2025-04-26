const cases = [
    {
      title: "Vishaka vs. State of Rajasthan",
      category: "Workplace Harassment",
      year: 1997,
      summary: "Established guidelines for sexual harassment at the workplace."
    },
    {
      title: "Shreya Singhal vs. Union of India",
      category: "Cyber Law",
      year: 2015,
      summary: "Struck down Section 66A of the IT Act as unconstitutional."
    }
  ];
  
  window.onload = function () {
    const container = document.getElementById("cases-container");
  
    cases.forEach((c) => {
      const div = document.createElement("div");
      div.className = "p-4 mb-4 border rounded shadow bg-white";
      div.innerHTML = `<h3 class="font-bold text-indigo-600">${c.title}</h3>
                       <p><strong>Category:</strong> ${c.category}</p>
                       <p><strong>Year:</strong> ${c.year}</p>
                       <p>${c.summary}</p>`;
      container.appendChild(div);
    });
  };
  