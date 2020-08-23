let myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  renderLibrary(myLibrary);
}

function deleteBookFromLibrary(index) {
  index = parseInt(index);
  myLibrary.splice(index, 1);
  document.getElementById(index).remove();
}

function renderLibrary(library) {
  let output = "";
  let index = 0;
  library.forEach((book) => {
    if (book.read === true) {
      output += `
        <div class="card col-sm-4" id="${index}">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
                <ul>
                    <li>${book.pages} pages</li>
                    <li>Finished reading</li>
                </ul>
                <a href="#" onclick="toggleRead(${index})" class="text-decoration-none btn-sm btn-secondary text-white">I've not finished reading</a>
                <a href="#" onclick="deleteBookFromLibrary(${index})" class="text-decoration-none btn-sm btn-danger text-white">Delete</a>
            </div>
        </div>
      `;
    }
    if (book.read === false) {
      output += `
        <div class="card col-sm-4" id="${index}" >
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
                <ul>
                    <li>${book.pages} pages</li>
                    <li>Not yet finished reading</li>
                </ul>
                <a href="#" onclick="toggleRead(${index})" class="text-decoration-none btn-sm btn-secondary text-white">I've finished reading</a>
                <a href="#" onclick="deleteBookFromLibrary(${index})" class="text-decoration-none btn-sm btn-danger text-white">Delete</a>
            </div>
        </div>
      `;
      index++;
    }
  });
  document.getElementById("books").innerHTML = output;
}

renderLibrary(myLibrary);

const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let book = new Book(title.value, author.value, pages.value, read.checked);
  addBookToLibrary(book);
  renderLibrary(myLibrary);
});
