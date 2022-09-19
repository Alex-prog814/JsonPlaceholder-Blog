// https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10

let page = 1;

function render(){
    let container = document.querySelector('.container');
    container.innerHTML = '';
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
        .then(result => result.json())
        .then(data => data.forEach(item => {
            container.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <b>Post id:${item.id}</b>
                    <b>${item.title}</b>
                </div> 
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>${item.body}</p>
                    </blockquote>
                    <button class="btn btn-dark user-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="authorId-${item.userId}">About author</button>
                </div>
            </div>`;
        }))
        addModalEvent();
};
render();

function writeAuthorObj(id){
    let modal = document.querySelector('.modal-body');
    modal.innerHTML = `
        <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Загрузка...</span>
        </div>
    `;
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(result => result.json())
        .then(data => {
            setTimeout(() => {
                modal.innerHTML = '';
                modal.innerHTML += `
                    <p><b>Author id:</b> ${data.id}</p>
                    <p><b>Email</b>: ${data.email}</p>
                    <p><b>Name</b>: ${data.name}</p>
                    <p><b>Username</b>: ${data.username}</p>
                `;
            }, 1000);
        })
};

function getPostAuthor(e){
    let authorId = e.target.id.split('-')[1];
    writeAuthorObj(authorId);
};

function addModalEvent(){
    setTimeout(() => {
        let authorBtns = document.querySelectorAll('.user-btn');
        authorBtns.forEach(item => {
            item.addEventListener('click', getPostAuthor);
        });
    }, 2000);
};

