window.addEventListener('DOMContentLoaded',() => {
    const bodyOfhtml = document.querySelector('body');
    const worksListul = document.querySelector('.person-works_container__list'),
            skillsList = document.querySelector('.skills_list');

           
    async function fetchDataCards(){
        fetch('db.json')
            .then(res => res.json())
            .then(res => createElementsList(res[0],res[1]));
    }
    fetchDataCards();

    function createElementsList(arr, arrTextSkills){
        arrTextSkills.forEach(elem => {
            skillsList.innerHTML += `
                <li class="skills_list-item black-text-color">${elem.name}<span class="skills_list-item-info">${elem.name}: ${elem.about}</span>,&nbsp</li>
            `;
        });
        skillsList.addEventListener('mouseover',(e) => {
            e.preventDefault();
            if(e.target && e.target.classList.contains('skills_list-item')){
                document.querySelectorAll('.modal').forEach(items => {
                    items.classList.remove('modal');
                });
                e.target.children[0].classList.add('modal');
            } 

        });
        document.body.addEventListener('click',(e) =>{
            if(!e.target.classList.contains('modal')){
                document.querySelectorAll('.modal').forEach(items => {
                    items.classList.remove('modal');
                });
            }
        });
        let timeSwitcher = 6;
//btn for more wiev works
        function createBtnForMoreWiev(){
            const worksItems = document.querySelectorAll('.person-works_container__list-item');

            let newBtn = document.createElement('button');
            newBtn.classList.add('person-works_container-btn');
            newBtn.textContent = `More / Less`;
            worksListul.append(newBtn);
            let count = 6;

            newBtn.addEventListener('click', (e) => {
                
                if(timeSwitcher >= arr.length){
                    timeSwitcher = timeSwitcher - count;
                }else{
                    timeSwitcher += count;
                }
                worksItems.forEach(item => {
                    item.remove();
                });
                e.target.remove();
    
                render();
            });
        }

//btn for more wiev works
        function render(){
            arr.forEach((elem,id) => {
                if(id < timeSwitcher){
                    worksListul.innerHTML += `
                    <li class="person-works_container__list-item showed">
                        <a target="blank" href=${elem.link} class="shadow">
                            <div class="person-works__btn-named">${elem.preloadText}</div>
                        </a>
                        <img src=${elem.img} alt="image">
                    </li>`;
                }
            });
            createBtnForMoreWiev();
        }
        render();
    }

    const checkbox = document.querySelector('#toggle_checkbox[type=checkbox]'),
            rightSide = document.querySelector('.right-side');

    function colorized(){
        localStorage.setItem('night', true);
        let listBtns = document.querySelectorAll('.black-text-color');
        let listBtnsWhite = document.querySelectorAll('.white-text-color');
        
        bodyOfhtml.classList.remove('newbg');
        rightSide.classList.remove('black');
        
            if (checkbox.checked) {
                bodyOfhtml.classList.add('newbg');
                rightSide.classList.add('black');
                listBtns.forEach(item =>{
                    item.classList.remove('black-text-color');
                    item.classList.add('white-text-color');
                });
            }else if(!checkbox.checked){
                localStorage.removeItem('night');

                listBtnsWhite.forEach( item => {
                    item.classList.add('black-text-color');
                });

            }
    }
    checkbox.addEventListener('click', colorized);

    if(localStorage.getItem('night')){
        checkbox.checked = true;
        colorized();
    }else{
        checkbox.checked = false;
    }
    
    //createElementsList(arrayOfWorks,skillsListItems);
});