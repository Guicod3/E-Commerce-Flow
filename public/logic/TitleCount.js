function countTileAndWordsAndLines (){
    const title = document.getElementById('title-input').value

    function countCaracteres(){
        const showCaracteres= document.getElementById('countCaracteres')
        const caracteres = title.length
        showCaracteres.textContent = caracteres
    }

    function countWords(){
        const showPalavras = document.getElementById('countPalavras')
        const palavras = title.split(/\s+/) 
        const numeroPalavras = palavras.filter(palavra =>{ //Cria um array novo apenas com palavras length > 0 
            return palavra.length > 0;
        }).length;

        showPalavras.textContent = numeroPalavras
    }

    function countLines() {
        if (document.getElementById('title-input').value.length === 0){
            document.getElementById('countLines').textContent = 0
        }else{
            const showLines = document.getElementById('countLines')
            const lines = title.split(/\r?\n/)
            const numeroLinhas = lines.length
            //showLines.textContent = numeroLinhas
            showLines.textContent = numeroLinhas;
        }
    }

    countCaracteres()
    countWords()
    countLines()
}

function getFirstLine(){
    const getinput = document.getElementById('text-input').value
    const firstLine = getinput.split(/\r?\n/)[0]
    document.getElementById('title-input').value = firstLine;
    createButtonTitle()
    countTileAndWordsAndLines()
}

function createButtonTitle(){
    const title = document.getElementById('titulo')
    const img = document.createElement('img')
    const div = document.createElement('div')
    const span = document.createElement('span')
    const hover = document.createElement('img')
    const getTitle = document.getElementById('title-input').value;
    const outputTitle = document.getElementById('title-input')

    if (getTitle === ''){
        if (document.getElementById('button')){
            document.getElementById('button').remove()
        } else{
            document.getElementById('buttonConfirm').remove()
        }
    } else{
        function createButton(){
            img.src = './assets/clipboard-text-white.svg' //Copy Text
            hover.src = './assets/clipboard-text.svg'
            img.alt = 'copyadd'
            img.style = 'width: 20px'
            hover.style = 'width: 20px'
            span.id = 'status'
            img.id = 'img'
            div.id = 'button'
            span.textContent = 'Copiar'
            span.className = 'font-semibold text-sm'
            div.className = 'transition hover:scale-110 hover:-translate-y-1 group flex items-center space-x-1 bg-gray-800 rounded-xl p-1 text-white h-6 hover:text-gray-800 hover:bg-amber-100 hover:shadow-xl cursor-pointer ml-auto max-sm:ml-0 max-sm:mb-1'
            img.className = 'object-cover group-hover:hidden'
            hover.className = 'hidden w-0 object-cover group-hover:block'
            div.appendChild(span)
            div.appendChild(img)
            div.appendChild(hover)
            title.appendChild(div)
        }
        
        if (document.getElementById('button')){ //Don't repeat
            return
        }else{
            createButton()
        }

        //Click icon
        div.addEventListener('click', () => {
            if (document.getElementById('button')){
                img.src = './assets/clipboard-tick-white.svg';
                div.id = 'buttonConfirm'
                span.textContent = 'Copiado'
                hover.src = './assets/clipboard-confirm.svg'
                navigator.clipboard.writeText(outputTitle.value);

                setTimeout(createButton, 3500)
            } else{
                createButton()
            }
        });

        //Return Icon
        if (document.getElementById('buttonConfirm')){ //Start copy again
            document.getElementById('buttonConfirm').remove()
            createButton()
        }
    }

}

document.getElementById('title-input').addEventListener('input', countTileAndWordsAndLines)
document.getElementById('text-input').addEventListener('input', getFirstLine)
document.getElementById('title-input').addEventListener('input', createButtonTitle)