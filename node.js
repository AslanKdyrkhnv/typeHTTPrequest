const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
const input = document.querySelector('#title');



const getTodos =() => {
    fetch(apiUrl +'?_limit=5')
    .then((data) => data.json())
    .then((res) => { 
        // console.log(res);
        res.forEach(element => {
            addToDoDOM(element);
        });
    })
}

function addToDoDOM(element) {
    const div = document.createElement('div')
    div.classList.add('todo')
    div.appendChild(document.createTextNode(element.title + " cant server conntection 500"));
    if (element.completed){
        div.classList.add('done')
    }
    div.setAttribute('data-id', element.id)
    document.querySelector('#todo-list').appendChild(div)
    
    input.value = ''
}

const createTodo = (e) => {
    e.preventDefault();
    
    if(e.target.firstElementChild.value !== "") {
        const newTodo = {
            title: e.target.firstElementChild.value, 
            completed: false,
        }  
    } else {
        alert('enter the input')
        return;
    }

    const newTodo = {
        title: e.target.firstElementChild.value, 
        completed: false,
    }    

    fetch(apiUrl, {
        method: 'POST', 
        body: JSON.stringify(newTodo),
        headers: {
            'Content-Type' : 'application/json',
        }
    })
}

      
const UpdateCompleted = (e) => {
    if (e.target.classList.contains('todo')) {
      e.target.classList.toggle('done');
        
      updateTodo(e.target.dataset.id, e.target.classList.contains('done'));
    }
};


const updateTodo = (id, completed) => {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT', 
        body: JSON.stringify({completed}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => data.json())
    .then(rs => console.log(rs))
}



const deleteTodo = (e) => {
    if(e.target.classList.contains('todo')) {
        const id =e.target.dataset.id; 
        fetch(`${apiUrl}/${id}`, {
        method: 'DELETE', 
        }).then((res)=> res.json())      
        .then(()=> e.target.remove())
    }
}


const init = () => {
    document.addEventListener('DOMContentLoaded', getTodos);
}


getTodos()


document.querySelector('#todo-list').addEventListener('click', UpdateCompleted)

document.querySelector('#todo-list').addEventListener('dblclick', deleteTodo)

document.querySelector('#todo-form').addEventListener('submit', createTodo)
