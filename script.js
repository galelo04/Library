const addNewBtn = document.querySelector("#addNewBtn");
const addBookDialog = document.querySelector("#addBookDialog");
const addBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector("#removeBtn");
const bookShelf = document.querySelector(".bookShelf");
const showBookDialog = document.querySelector("#showBookDialog");
const closeBtn = document.querySelector(".close");
const books = new Array(12).fill(null);

function createBook(){
    const dialogInputs = document.querySelectorAll("#addBookDialog input");
    const book = new Book();
    dialogInputs.forEach(element => {
        if(element.id==="bookTitle")
            book.title=element.value;
        else if(element.id==="bookAuthor")
            book.author=element.value;
        else if(element.id==="bookNOPages")
            book.pages=element.value;
        else if(element.id==="bookIsRead")
            book.read=element.checked;
    });
    return book;
}

function addBookToShelf(book){
    let i = 0 ;
    for(;i<12;i++){
        if(books[i]===null)
            break;
    }
    if(i===12){
        alert("No room for the book");
        return;
    }
    books[i]=book;
    const bookContainer = document.querySelector(`#bookContainer${i}`);
    const bookEl = document.createElement("div");
    const removeBtn = document.createElement("button");
    const toggleReadBtn = document.createElement("input")
    const label = document.createElement('label');
    const container = document.createElement('div');
    container.id="togglediv";
    toggleReadBtn.type="checkbox";
    toggleReadBtn.id = `toggleRead${i}`;
    toggleReadBtn.className = `toggleRead`;
    toggleReadBtn.name = 'toggleRead';
    toggleReadBtn.value = 'toggleRead';
    toggleReadBtn.checked = book.read;

    label.htmlFor = `toggleRead${i}`; // Associate the label with the checkbox
    label.textContent = 'Read?'; 
    
    removeBtn.textContent="❌";
    removeBtn.className="removeBtn"
    removeBtn.id=`removeBtn${i}`;
    bookEl.className ="book";
    bookEl.id = `book${i}`;
    bookContainer.appendChild(removeBtn);
    bookContainer.appendChild(bookEl);
    container.appendChild(label);
    container.appendChild(toggleReadBtn);
    bookContainer.appendChild(container);
}

function showBook(bookId){
    const title = document.querySelector("#showTitle");
    const author = document.querySelector("#showAuthor");
    const pages= document.querySelector("#showNOPages");
    const readStatus = document.querySelector("#readStatus");
    title.textContent="Title: "+books[bookId].title;
    author.textContent="Author: "+books[bookId].author;
    pages.textContent="No of Pages: "+books[bookId].pages;
    readStatus.textContent="Read? : ";
    readStatus.textContent+= (books[bookId].read) ? "Yes":"No";

}
function removeBook(bookId){
    books[bookId]=null;
    const bookContainer = document.querySelector(`#bookContainer${bookId}`);
    bookContainer.innerHTML ='';
}




function Book(title, author, pages, read){
    this.title= title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

Book.prototype.toggleRead = function(){
    if(this.read) this.read=false;
    else this.read=true;
}
Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${(read)?"read":"not read yet"}`;
}


for(let i = 0 ; i < 12 ;i++){
    
    const bookContainer = document.createElement("div");
    bookContainer.className = "bookContainer";
    bookContainer.id = `bookContainer${i}`;
    bookShelf.appendChild(bookContainer);
}



bookShelf.addEventListener('click',(e)=>{
    if(e.target.className==="book")
    {
        showBook(+e.target.id.slice(4));
        showBookDialog.showModal();
    }
    else if(e.target.className==="removeBtn"){
        removeBook(+e.target.id.slice(9));
    }
    else if(e.target.className==="toggleRead"){
        books[+e.target.id.slice(10)].toggleRead();
    }
});

addNewBtn.addEventListener("click", () => {
    addBookDialog.showModal();
  });
closeBtn.addEventListener('click',()=>{
    showBookDialog.close();
});

addBtn.addEventListener("click", (event) => {
    const form = document.querySelector("dialog form");
    event.preventDefault();
    if(form.checkValidity()){
        
        addBookToShelf(createBook());
        addBookDialog.close(); 
    }
    else{
        alert('Please fill in all required fields correctly.');
    }
  });