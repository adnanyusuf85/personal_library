var myLibrary = [];


reading_list=document.getElementById("reading-list");
add_book_button = document.getElementById('add-book-button');
add_book_button.addEventListener('click',(e)=>openBookAdditionForm(e));

const book_valid = {
    valid : true
};

class Book{
    #title;
    #author;
    #year;
    #read;
    constructor(_title, _author, _year){
        this.bookId = crypto.randomUUID();
        this.#title = _title;
        this.#author = _author;
        this.#year = _year;   
        this.#read = false;
    }

    get title(){
        return this.#title;
    }

    set title(_title){
        this.#title = _title;
    }

    get author(){
        return this.#author;
    }

    set author(_author){
        this.#author = _author;
    }

    get year(){
        return this.#year;
    }

    set year(_year){
        this.#year = _year;
    }

    get isRead(){
        return this.#read;
    }

    set isRead(flag){
        this.#read = flag;
    }

    ToggleRead(){
        this.isRead(!this.#read);
    }
};



function addBookToLibrary(book){
    if (book instanceof Book)
        myLibrary.push(book);
    renderLibrary();
}

function addBookToLibraryFromForm(e,form_name)
{
    //e.preventDefault();
    var form = document.getElementById(form_name);
    var title = form.elements["title"].value;
    var author = form.elements["author"].value;
    var pubyear = form.elements["pubyear"].value;
    addBookToLibrary(new Book(title,author,pubyear));
    event.cancelBubble = true;
}

function removeBookFromLibrary(bookId){
    myLibrary = myLibrary.filter(book => book.bookId !== bookId);
    renderLibrary();
}

function mark_read(bookId){
    var the_book = myLibrary.filter(book => book.bookId == bookId)[0];
    the_book.read = true;
    renderLibrary();
}

function mark_unread(bookId){
    var the_book = myLibrary.filter(book => book.bookId == bookId)[0];
    the_book.read = false;
    renderLibrary();
}


function renderAddBookDiv(){
    var form = document.createElement('form');
    form.classList.add("app_form");
    form.id = "add-book-form"
    var form_heading = document.createElement('h2');
    form_heading.innerHTML = "Add Book";
    var form_subtitle = document.createElement('p');
    form_subtitle.innerHTML = "Fill in the details to add a new book";
    var form_book_title_label = document.createElement('label');
    form_book_title_label.innerHTML = "Title";
    var form_book_title_inputbox = document.createElement('input');
    form_book_title_inputbox.setAttribute('name', 'title'); // Add name attribute

    form_book_title_inputbox.setAttribute('placeholder','Book Title');
    var form_book_author_label = document.createElement('label');
    form_book_author_label.innerHTML = "Author";
    
    var form_book_author_inputbox = document.createElement('input');
    form_book_author_inputbox.setAttribute('name', 'author');
    form_book_author_inputbox.setAttribute('placeholder','Book Author Name');
    var form_book_pubyear_label = document.createElement('label');
    form_book_pubyear_label.innerHTML = "Publication Year";

    var form_book_pubyear_inputbox = document.createElement('input');
    form_book_pubyear_inputbox.setAttribute('name', 'pubyear');
    form_book_pubyear_inputbox.setAttribute("placeholder", "Year of Publication");
    var form_submit_button = document.createElement('button');
    form_submit_button.innerHTML = "Add Book";
    form_submit_button.onclick = (e)=>addBookToLibraryFromForm(e,form.id);
    form_submit_button.type = "button";
    

    form.appendChild(form_heading);
    form.appendChild(form_subtitle);
    form.appendChild(form_book_title_label);
    form.appendChild(form_book_title_inputbox);
    form.appendChild(form_book_author_label);
    form.appendChild(form_book_author_inputbox);
    form.appendChild(form_book_pubyear_label);
    form.appendChild(form_book_pubyear_inputbox);
    form.appendChild(form_submit_button);
    
    return form;
}

function openBookAdditionForm(e){
    var mydiv = document.getElementById('editor-bg');
    var inner_div = document.getElementById('editor');
    var book_add_form = renderAddBookDiv();
    book_add_form.id = "book_add_form";
    inner_div.appendChild(book_add_form);
    mydiv.style.display = 'block';
    e.cancelBubble = true;
}

function closeBookAdditionForm(){
    var mydiv = document.getElementById('editor-bg');
    var inner_div = document.getElementById('editor');
    var remove_div = document.getElementById('book_add_form');
    inner_div.removeChild(remove_div);
    mydiv.style.display = 'none';
}

function renderLibrary(){
    reading_list.innerHTML = "";
    myLibrary.forEach(book =>{
        var li = document.createElement('li');
        li.classList.add('book-list-item');

        var div = document.createElement('div');
        div.classList.add('book-card');
        
        var book_title = document.createElement('p');
        book_title.className = 'book-title';
        book_title.innerHTML = book.title;
        
        var author_name = document.createElement('p');
        author_name.classList.add('book-author');
        author_name.innerHTML = book.author;

        var year = document.createElement('p');
        year.classList.add('pub-year');
        year.innerHTML = `Pub: ${book.year}`;

        var remove_book_button = document.createElement('button');
        remove_book_button.classList.add('remove-book-button');
        remove_book_button.classList.add('square-button');
        remove_book_button.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        remove_book_button.onclick = () => {
            removeBookFromLibrary(book.bookId)};

        var edit_book_button = document.createElement('button');
        edit_book_button.classList.add('edit-book-button');
        edit_book_button.classList.add('square-button');
        edit_book_button.innerHTML = '<i class="fa fa-pencil-square-o" aria-hidden="true"></i>';

        var toggle_status_button = document.createElement('button');
        toggle_status_button.classList.add('toggle-status-button');
        toggle_status_button.innerHTML = book.read ? 'Read' : 'Not Read';
        
        
        var read_status_div = document.createElement('div');
        read_status_div.classList.add('read-status-div');
        var div_read = document.createElement('div');
        div_read.innerHTML = "Read";
        div_read.classList.add('div-read');
        div_read.addEventListener('click',()=>{
            mark_read(book.bookId);
        });
        var div_not_read = document.createElement('div');
        div_not_read.innerHTML = "Not Read";
        div_not_read.classList.add('div-not-read');
        div_not_read.addEventListener('click',()=>{
            mark_unread(book.bookId);
        });
        if (book.read)
            div_read.classList.add('active-selector');
        else
            div_not_read.classList.add('active-selector');
        read_status_div.appendChild(div_read);
        read_status_div.appendChild(div_not_read);

        var modifier_div = document.createElement('div');
        modifier_div.classList.add('modifier-div');

        div.appendChild(book_title);
        div.appendChild(author_name);
        div.appendChild(year);
        modifier_div.appendChild(remove_book_button);
        modifier_div.appendChild(edit_book_button);
        div.appendChild(read_status_div);
        div.appendChild(modifier_div);
        
        li.appendChild(div);
        reading_list.appendChild(li);
    });
}

function checkClick(b,e){
    e.cancelBubble = true;
    console.log('cancelled');
}

function doNothing(){
    console.log("hello");
    stopPro
}

addBookToLibrary(new Book("1984", "George Orwell", 1949));
addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 1960));
addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925));
addBookToLibrary(new Book("Moby-Dick", "Herman Melville", 1851));
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 1813));
addBookToLibrary(new Book("The Catcher in the Rye", "J.D. Salinger", 1951));
addBookToLibrary(new Book("Brave New World", "Aldous Huxley", 1932));
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 1937));


