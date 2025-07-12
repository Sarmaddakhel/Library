const myLibrary=[];

function Book(book_title,author,pages,read){
    this.book_title=book_title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.id = crypto.randomUUID();
    this.info=function(){
        let CheckReadStatus=read==="true"||read===true ? "this book was read ":"this book is not read yet";
        return `book title =${book_title},author name is: ${author},number of pages:${pages},and ${CheckReadStatus}`;
    };
};

function addBookToLibrary(book_title,author,pages,read){
    const addnewbook=new Book(book_title,author,pages,read);
    myLibrary.push(addnewbook);
}
function array_loop(){    

    const container=document.getElementById("libraryContainer");
    container.innerHTML="";
    myLibrary.forEach((book)=>{   
        const card=document.createElement("div");
        card.classList.add("book-card");
        card.innerHTML=`
        <h3>${book.book_title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <span class="badge ${book.read ? 'read' : 'not-read'}">
        ${book.read ? 'Read' : 'Not Read'}
        </span>
        `;
        container.appendChild(card);
        const btn=document.createElement("button");
        btn.classList.add("card-btn");
        card.appendChild(btn);
        btn.textContent = "Remove";
        btn.addEventListener("click",()=>{
            const index = myLibrary.findIndex(b => b.id === book.id); 
            if (index !== -1) {
                myLibrary.splice(index, 1); 
                array_loop(); 
            }
        })

        const badge = card.querySelector(".badge");
        badge.addEventListener("click",()=>{
            book.read=!book.read;
            array_loop();
        })
    });
}
const dialog = document.getElementById("dialog");

document.getElementById("new-book").addEventListener("click",(e)=>{
    e.preventDefault();
    dialog.showModal();
});
document.getElementById("dialogCancel").addEventListener("click",(e)=>{
    e.preventDefault();
    dialog.close();
    document.getElementById("dialogForm").reset(); 
});

    document.getElementById("dialogForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.getElementById("dialog-title").value;
        const author = document.getElementById("dialog-author").value;
        const pages = document.getElementById("dialog-pages").value;
        const read = document.getElementById("dialog-read").checked;

        addBookToLibrary(title, author, pages, read);
        array_loop();

        this.reset(); 
        dialog.close();
    });


