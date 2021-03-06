const field = document.querySelector('.search__bar--field');
const parent = document.querySelector('.result__wrapper');

const init = () => {
    addFieldListeners();
}

const addFieldListeners = () => {
    field.addEventListener('input' , handleFieldInput)
}

const handleFieldInput = () => {
    initApi(field.value);
}

const initApi = term => {
    fetch(`../assets/data/data/D${term.substring(0 , 1).toUpperCase()}.json`)
        .then(response => {
           return response.json();
        })
        .then(data => processData(data , term));
} 

const processData = (data , term )=> {
    //console.log(data[term.toUpperCase()]);
    let result = data[term.toUpperCase()];
    //console.log(data)
    //console.log(result);
    parent.innerHTML = '';
    if(result && result.MEANINGS != "undefined"){
        let resultElm = document.createElement('section');
        resultElm.innerHTML = `<h2 class='result__title'>${term.toUpperCase()}</h2>
                            <ul class="meanings__list">
                            
                            </ul>
                            <h3 class="result__subtitle">Synonyms</h3>
                            <ul class="synonym__list">
                                
                            </ul>`;

        parent.appendChild(resultElm);

        let synList = document.querySelector('.synonym__list');
        let meaningsList = document.querySelector('.meanings__list')
        result.SYNONYMS.forEach(syn => {
            let elm = document.createElement('li');
            elm.className = 'synonym';
            elm.textContent = syn;
            elm.addEventListener('click' , function(){handleSysLink(syn)});
            synList.appendChild(elm)
        })

        result.MEANINGS = Object.values(result.MEANINGS);

        result.MEANINGS.forEach(mng =>{
            let elm = document.createElement('li');
            elm.ClassName = 'meaning__wrapper'
            if(result.MEANINGS.indexOf(mng) == 0){   
                elm.innerHTML = `<h3 class="result__subtitle">Primary Definition:</h3>
                <p class="meaning__content">${mng}</p>`;
            } else {
                elm.innerHTML = `<h3 class="result__subtitle">Additional definition nr. ${result.MEANINGS.indexOf(mng)}</h3>
                <p class="meaning__content">${mng}</p>`;
            }
            meaningsList.appendChild(elm);
        })
        
        document.querySelector('.result__wrapper').style.height = 'auto';
    }

    const handleSysLink = syn => {
        field.value = syn;
        handleFieldInput()
    }

    
}

init();