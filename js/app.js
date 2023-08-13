/**
 *
 * @param  {...any} elements : toggle the "active" class for all the elements supplied to the function
 */
const toggleActiveClasses = (...elements) => {
  elements.forEach((element) => element.classList.toggle("active"));
};

/**
 * detects when sections are in view, and triggers class toggling
 * @param {*} sections
 * @param {*} navLinks
 * @returns an function that can be be used in an event handler
 */
const detectSectionsInView = (sections, navLinks) => {
  let lastActiveSectionIndex = 0;

  return (event) => {
    event.preventDefault();
    sections.forEach((section, index) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < 250) {
        toggleActiveClasses(
          sections[lastActiveSectionIndex],
          navLinks[lastActiveSectionIndex]
        );
        toggleActiveClasses(section, navLinks[index]);
        lastActiveSectionIndex = index;
      }
    });
  };
};

// creates nav links and appends them into nav element
const appendNavLinks = () => {
  const nav = document.querySelector(".nav-links-list");
  const sections = window.document.querySelectorAll("section");
  let navLinks = [];

  sections.forEach((section, index) => {
    const li = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.href = "#" + section.id;
    anchor.innerHTML = section.getAttribute("name");
    li.appendChild(anchor);

    if (index === 0) {
      toggleActiveClasses(li, section);
    }

    navLinks = [...navLinks, li];
    nav.append(li);
    anchor.addEventListener("click", (event) => {
      // stops thed default link behaviour
      event.preventDefault();

      // scrolls the section into view
      section.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  });

  // add scroll event listener
  window.addEventListener("scroll", detectSectionsInView(sections, navLinks));
};

// initilizes page logic/script
const initilizePage = () => {
  appendNavLinks();
};

// call the initilizePage function when page loads.
window.onload = initilizePage;
