// navabr Button
let all_Btn = document.getElementById('all');
let complete_Btn = document.getElementById('completed');
let pending_Btn = document.getElementById('pending');

// main todo input and btn
let add_Input = document.getElementById('main_Input');
let add_Btn = document.getElementById('button');

// ul lists parent 
let ul_list = document.getElementById('all_List');


let new_list;

add_Btn.addEventListener('click', () => {

    let Input_value = add_Input.value;
    if (Input_value == "") {
        return
    }

    new_list = document.createElement('li');

    new_list.setAttribute('class', 'hell')
    new_list.innerHTML = `
    <input type="checkbox"> 
    <span class="check">${Input_value}</span>
    <button class="dlt">delete</button>
    `;

    ul_list.appendChild(new_list);
    add_Input.value = "";

    let dlt_Btn = new_list.querySelector('.dlt');
    dlt_Btn.addEventListener('click', () => {
        new_list.remove();
    });

    const checkbox = new_list.querySelector('input[type="checkbox"]');
    const textSpan = new_list.querySelector('.check');
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.color = '#888';
        } else {
            textSpan.style.textDecoration = 'none';
            textSpan.style.color = '';
        }
    });

});



complete_Btn.addEventListener('click', () => {

    const allTasks = document.querySelectorAll('li');
    let li = Array.from(allTasks);


    li.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        if (checkbox.checked) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

});

pending_Btn.addEventListener('click', () => {

    const allTasks = document.querySelectorAll('li');
    let li = Array.from(allTasks);


    li.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        if (checkbox.checked) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    });

});

all_Btn.addEventListener('click', () => {

    const allTasks = document.querySelectorAll('li');
    let li = Array.from(allTasks);


    li.forEach((item) => {
        const checkbox = item.querySelector('input[type="checkbox"]');

        if (checkbox.checked || !checkbox.checked) {
            item.style.display = 'block';
        }
    });

});
