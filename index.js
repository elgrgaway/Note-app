const menu = document.querySelector(".menu");
const container = document.querySelector(".container");
const arrowButton = document.querySelector(".arrow-button");
const plusButton = document.querySelector(".plus-button");
const searchButton = document.querySelector(".search-mobile");
const searchInputElement = document.querySelector(".search-input");
const searchSubmitElement = document.querySelector(".search-submit");
const menuButton = document.querySelector(".humburger-menu-button");
const notesLink = document.querySelector(".notes-link");
const addNotesLink = document.querySelector(".add-notes-link");
const crossButton = document.querySelector(".cross");
const titleInputElement = document.querySelector("#title");
const authorInputElement = document.querySelector("#author");
const textareaInputElement = document.querySelector("#textarea");
const normalListElement = document.querySelector(".normal-list");
const pinnedListElement = document.querySelector(".pinned-list");
const normalSubmit = document.querySelector(".add-normal-note");
const pinnedSubmit = document.querySelector(".add-pinned-note");
const displayNoteH3 = document.querySelector(".display-note h3");
const displayNoteSpan = document.querySelector(".display-note span");
const displayNoteP = document.querySelector(".display-note p");
const displayNoteCross = document.querySelector(".display-note__cross");
const noteBoxElements = () => document.querySelectorAll(".note-box");
const liHeadingElement = () => document.querySelectorAll(".note-box__head");
const deleteButtonsNormal = () =>
  document.querySelectorAll(".normal-list .note-box-delete");
const deleteButtonsPinned = () =>
  document.querySelectorAll(".pinned-list .note-box-delete");
let search_term = "";

const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const deleteNormal = (i) => {
  let normalNotes = fetchData("notes");
  normalNotes.splice(i, 1);
  saveToDB("notes", normalNotes);
  location.reload();
  initDataOnStartup();
  initEventListeners();
};
const deletePinned = (i) => {
  let pinnedNotes = fetchData("notes-pinned");
  pinnedNotes.splice(i, 1);
  saveToDB("notes-pinned", pinnedNotes);
  location.reload();
  initDataOnStartup();
  initEventListeners();
};

const renderNotes = (notes, listElement) => {
  let noteList = "";
  const todayDate = new Date();
  const formattedCurrentDate = todayDate.toLocaleDateString("en-US", {
    month: "short", // Abbreviated month name (e.g., "Feb")
    day: "numeric", // Numeric day of the month (e.g., "8")
    year: "numeric", // Full year (e.g., "2021")
  });
  notes.forEach((note) => {
    if (note.title.trim() !== "" && note.note.trim() !== "") {
      noteList += `
        <li class="note-box">
          <h3 class="note-box__head">${note.title}</h3>
          <p class="note-box__para">${note.note}</p>
          <div>
            <span class="note-box-date">${formattedCurrentDate}<span> / by ${note.arthor}</span></span>
            <button class="note-box-delete">Delete</button>
          </div>
        </li>
      `;
    }
  });

  listElement.innerHTML = noteList;
  titleInputElement.value = "";
  textareaInputElement.value = "";
  authorInputElement.value = "";
};

const addNote = (e) => {
  e.preventDefault();
  let notes = {
    title: titleInputElement.value,
    arthor: authorInputElement.value,
    note: textareaInputElement.value,
    date: new Date().toLocaleDateString("en-US", {
      month: "short", // Abbreviated month name (e.g., "Feb")
      day: "numeric", // Numeric day of the month (e.g., "8")
      year: "numeric", // Full year (e.g., "2021")
    }),
    pinned: false,
  };

  if (!notes.title) {
    titleInputElement.setAttribute("id", "border");
    return;
  } else {
    titleInputElement.removeAttribute("id");
  }

  if (!notes.arthor) {
    authorInputElement.setAttribute("id", "border");
    return;
  } else {
    authorInputElement.removeAttribute("id");
  }
  if (!notes.note) {
    textareaInputElement.setAttribute("id", "border");
    return;
  } else {
    textareaInputElement.removeAttribute("id");
  }

  let allNotes = fetchData("notes") || [];
  allNotes.push(notes);
  saveToDB("notes", allNotes);
  renderNotes(allNotes, normalListElement);
  // initEventListeners();
  // initDataOnStartup();
};

const addPinnedNote = (e) => {
  e.preventDefault();

  let notes = {
    title: titleInputElement.value,
    arthor: authorInputElement.value,
    note: textareaInputElement.value,
    date: new Date().toLocaleDateString("en-US", {
      month: "short", // Abbreviated month name (e.g., "Feb")
      day: "numeric", // Numeric day of the month (e.g., "8")
      year: "numeric", // Full year (e.g., "2021")
    }),
    pinned: true,
  };
  if (!notes.title) {
    titleInputElement.setAttribute("id", "border");
    return;
  } else {
    titleInputElement.removeAttribute("id");
  }

  if (!notes.arthor) {
    authorInputElement.setAttribute("id", "border");
    return;
  } else {
    authorInputElement.removeAttribute("id");
  }
  if (!notes.note) {
    textareaInputElement.setAttribute("id", "border");
    return;
  } else {
    textareaInputElement.removeAttribute("id");
  }

  let allNotes = fetchData("notes-pinned") || [];
  allNotes.push(notes);
  saveToDB("notes-pinned", allNotes);
  renderNotes(allNotes, pinnedListElement);
  // initEventListeners();

  // initDataOnStartup();
};
const showList = () => {
  let data = fetchData("notes");
  const final = data.filter((item) => {
    return item.title.toLowerCase().includes(search_term);
  });

  final.forEach((item) => {
    liHeadingElement().forEach((element) => {
      let matched = true;
      for (let i = 0; i < search_term.length; i++) {
        if (item.title[i] !== element.textContent[i]) {
          matched = false;
          break;
        }
      }
      if (matched) {
        element.parentElement.classList.add("background");
      } else {
        element.parentElement.classList.remove("background");
      }
      if (!search_term) {
        element.parentElement.classList.remove("background");
      }
    });
  });
};

const saveToDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const initDataOnStartup = () => {
  renderNotes(fetchData("notes"), normalListElement);
  renderNotes(fetchData("notes-pinned"), pinnedListElement);
};
initDataOnStartup();

const initEventListeners = () => {
  searchButton.addEventListener("click", () => {
    menu.classList.toggle("search--isActive");

    container.classList.remove("second-page");
  });
  menuButton.addEventListener("click", () => {
    container.classList.toggle("menu--isActive");
  });
  crossButton.addEventListener("click", () => {
    container.classList.remove("menu--isActive");
  });
  notesLink.addEventListener("click", () => {
    container.classList.remove("second-page");
    container.classList.remove("all-notes-slide");
  });
  addNotesLink.addEventListener("click", () => {
    container.classList.add("second-page");
    container.classList.remove("all-notes-slide");
  });
  plusButton.addEventListener("click", () => {
    container.classList.add("second-page");
    container.classList.remove("all-notes-slide");
  });

  arrowButton.addEventListener("click", () => {
    container.classList.toggle("all-notes-slide");
  });

  displayNoteCross.addEventListener("click", () => {
    container.classList.remove("display-notes-on");
  });

  searchInputElement.addEventListener("input", (e) => {
    search_term = e.target.value.toLowerCase();
    showList();
    initEventListeners();
  });
  noteBoxElements().forEach((note) => {
    note.addEventListener("click", () => {
      displayNoteH3.textContent = note.children[0].textContent;
      displayNoteSpan.textContent = note.children[2].children[0].textContent;
      displayNoteP.textContent = note.children[1].textContent;
    });
    note.children[0].addEventListener("click", () => {
      container.classList.add("display-notes-on");
    });
  });
  deleteButtonsNormal().forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteNormal(index);
    });
  });
  deleteButtonsPinned().forEach((button, index) => {
    button.addEventListener("click", () => {
      deletePinned(index);
    });
  });
};
initEventListeners();
normalSubmit.addEventListener("click", addNote);
pinnedSubmit.addEventListener("click", addPinnedNote);
