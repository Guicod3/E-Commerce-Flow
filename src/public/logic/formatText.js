function textFormat() {
    const getinput = document.getElementById('text-input').value;
    const textBeforeFormat = getinput.split('\n');
    let textAfterFormat = '';
    const output = document.getElementById('output');
    const outputHTML = document.getElementById('outputHTML')

    const topicsSubtitle = 'acompanha:'
    const importante = '<br><p style="font-weight: bold">Importante:</p><p>A instalação deve ser feita por um profissional especializado.</p><p>Nós não nos responsabilizamos por instalação mal realizada.</p><p>As imagens são meramente ilustradas, pode ocorrer mudança sem prévio aviso, porém as características técnicas são sempre preservadas.</p>';

    if (getinput === ''){
        textAfterFormat += '<p>O Campo de entrada está vazio. Por favor, insira um valor.</p>';
        output.innerHTML = textAfterFormat;
        outputHTML.innerHTML = textAfterFormat;
    } else{
        for (let index = 0; index < textBeforeFormat.length; index++){
            const useLine = textBeforeFormat[index].trim()
            const words = textBeforeFormat[index].split(' '); // Divide a string em palavras
            const lastWord = words[words.length - 1]; // Pega a última palavra
    
            // Verifica se a linha é um título
            if (useLine === ''){
                    const useindex = index + 1
                    textAfterFormat += `<br> <strong><h2 style="font-size: 14pt">${textBeforeFormat[useindex]}</h2></strong>`;
                    index = useindex
            }
    
            // Verifica se é a primeira linha
            else if (index === 0) { 
                textAfterFormat += `<strong><h1 style="font-size: 14pt">${textBeforeFormat[index]}</h1></strong>`;
            } 
    
            // Verifica se é um subtítulo
            else if (lastWord === topicsSubtitle) {
                textAfterFormat += `<p style="font-size: 12pt">${textBeforeFormat[index]}</p>`;
            } 
    
            // Resto do texto
            else{
                textAfterFormat += `<p style="font-size: 12pt">- ${textBeforeFormat[index]}</p>`;
            }
        };

        textAfterFormat += importante;
        output.className = 'w-full shadow-md rounded-xl h-auto bg-white mt-2 p-3 mb-10'
        outputHTML.className = 'w-full shadow-md rounded-xl h-auto bg-white mt-2 p-3 mb-10'
        output.innerHTML = textAfterFormat;
        outputHTML.textContent = textAfterFormat;
    }

}

function buttonCopyText() {
    const output = document.getElementById('output');
    const getinput = document.getElementById('text-input').value;

    if (getinput === ''){
        if (document.getElementById('imgText')){
            document.getElementById('imgText').remove()
        } else{
            document.getElementById('imgTextConfirm').remove()
        }
    } else{
        const title = document.getElementById('title')
        const imgText = document.createElement('img')
    
        //TEXT Only
        if (document.getElementById('imgText')){ //Don't repeat
            return
        }else {
            imgText.src = '../assets/clipboard-text.svg' //Copy Text
            imgText.alt = 'copyadd'
            imgText.style = 'width: 25px'
            imgText.id = 'imgText'
            title.appendChild(imgText)
        }
    
        //Click icon
        imgText.addEventListener('click', () => {
            imgText.src = '../assets/clipboard-confirm.svg';
            imgText.id = 'imgTextConfirm'
            const clipboardItem = new ClipboardItem({
                "text/html": new Blob([output.innerHTML], { type: "text/html" }),
                "text/plain": new Blob([output.innerHTML], { type: "text/plain" })
            });
            navigator.clipboard.write([clipboardItem])
        });
    
        //Return Icon
        if (document.getElementById('imgTextConfirm')){ //Start copy again
            document.getElementById('imgTextConfirm').remove()
            imgText.src = '../assets/clipboard-text.svg'
            imgText.alt = 'copyadd'
            imgText.style = 'width: 25px'
            imgText.id = 'imgText'
            title.appendChild(imgText)
        }
    }
}

function buttonCopyHTML (){
    const outputHTML = document.getElementById('outputHTML')
    const getinput = document.getElementById('text-input').value;

    if (getinput === ''){
        if (document.getElementById('imgHTML')){
            document.getElementById('imgHTML').remove()
        } else{
            document.getElementById('imgHTMLConfirm').remove()
        }
    } else{
        const titleHTML = document.getElementById('titleHTML')
        const imgHTML = document.createElement('img')
    
        //HTML Only
        if (document.getElementById('imgHTML')){ //Don't repeat
            return
        }else {
            imgHTML.src = '../assets/clipboard-text.svg' //Copy Text
            imgHTML.alt = 'copyadd'
            imgHTML.style = 'width: 25px'
            imgHTML.id = 'imgHTML'
            titleHTML.appendChild(imgHTML)
        }
    
        //Click icon
        imgHTML.addEventListener('click', () => {
            imgHTML.src = '../assets/clipboard-confirm.svg';
            imgHTML.id = 'imgHTMLConfirm'
            imgHTML.className = ''
            navigator.clipboard.writeText(outputHTML.textContent)
        });
    
        //Return Icon
        if (document.getElementById('imgHTMLConfirm')){ //Start copy again
            document.getElementById('imgHTMLConfirm').remove()
            imgHTML.src = '../assets/clipboard-text.svg'
            imgHTML.alt = 'copyadd'
            imgHTML.style = 'width: 25px'
            imgHTML.id = 'imgHTML'
            titleHTML.appendChild(imgHTML)
        }
    }
}
    

document.getElementById('text-input').addEventListener('input', textFormat);
document.getElementById('text-input').addEventListener('input', buttonCopyText);
document.getElementById('text-input').addEventListener('input', buttonCopyHTML);

