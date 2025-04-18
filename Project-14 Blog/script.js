'use strict';

// navbar variables
const nav = document.querySelector('.mobile-nav');
const navMenuBtn = document.querySelector('.nav-menu-btn');
const navCloseBtn = document.querySelector('.nav-close-btn');


// navToggle function
const navToggleFunc = function () { nav.classList.toggle('active'); }

navMenuBtn.addEventListener('click', navToggleFunc);
navCloseBtn.addEventListener('click', navToggleFunc);



// theme toggle variables
const themeBtn = document.querySelectorAll('.theme-btn');


for (let i = 0; i < themeBtn.length; i++) {

  themeBtn[i].addEventListener('click', function () {

    // toggle `light-theme` & `dark-theme` class from `body`
    // when clicked `theme-btn`
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    for (let i = 0; i < themeBtn.length; i++) {

      // When the `theme-btn` is clicked,
      // it toggles classes between `light` & `dark` for all `theme-btn`.
      themeBtn[i].classList.toggle('light');
      themeBtn[i].classList.toggle('dark');

    }
    function filterTopics() {
      const input = document.getElementById("searchInput");
      const filter = input.value.toLowerCase();
      const dropdown = document.getElementById("topicDropdown");
      const items = dropdown.getElementsByTagName("li");
      const clearBtn = document.getElementById("clearBtn");

      let hasMatch = false;
      for (let i = 0; i < items.length; i++) {
        const txtValue = items[i].textContent || items[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          items[i].style.display = "";
          hasMatch = true;
        } else {
          items[i].style.display = "none";
        }
      }

      dropdown.style.display = hasMatch ? "block" : "none";
      clearBtn.style.display = input.value ? "block" : "none";
    }

    function selectTopic(topic) {
      const input = document.getElementById('searchInput');
      input.value = topic;
      document.getElementById('topicDropdown').style.display = 'none';
      document.getElementById('clearBtn').style.display = 'block';
    } 
      

    function showDropdown() {
      const dropdown = document.getElementById('topicDropdown');
      const items = dropdown.getElementsByTagName("li");

      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "";
      }

      dropdown.style.display = 'block';
    }

    function clearSearch() {
      const input = document.getElementById("searchInput");
      const dropdown = document.getElementById("topicDropdown");
      const clearBtn = document.getElementById("clearBtn");

      input.value = "";
      dropdown.style.display = "none";
      clearBtn.style.display = "none";
    }

    document.addEventListener('click', function (event) {
      const dropdown = document.getElementById('topicDropdown');
      const input = document.getElementById('searchInput');
      const clearBtn = document.getElementById('clearBtn');

      if (!input.contains(event.target) && !dropdown.contains(event.target) && !clearBtn.contains(event.target)) {
        dropdown.style.display = 'none';
      }
    });
  })

}
function toggleComments() {
  const section = document.getElementById("commentSection");
  const toggleBtn = document.querySelector(".comment-toggle button");

  if (section.style.display === "none") {
    section.style.display = "block";
    toggleBtn.textContent = "Hide Comments";
  } else {
    section.style.display = "none";
    toggleBtn.textContent = "Show Comments";
  }
}

// Handle comment submission
document.getElementById("commentForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (name && comment) {
    const commentItem = document.createElement("li");
    commentItem.innerHTML = `<strong>${name}</strong>: ${comment}`;
    document.getElementById("commentList").appendChild(commentItem);
    document.getElementById("commentForm").reset();
  }
});

