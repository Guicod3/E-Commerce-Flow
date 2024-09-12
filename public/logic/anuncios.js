function putTitle(){
    const tituloOriginal = document.getElementById('TitleOriginal').value
    const output1 = document.getElementById('an-input1')

    output1.textContent = tituloOriginal.trim()
}

function main(){
    const output1 = document.getElementById('an-input1').value

    function countCaracteres(){
        const showCaracteres1 = document.getElementById('countCaracteres1')
        const caracteres1 = output1.length
        showCaracteres1.textContent = caracteres1
    }

    countCaracteres()
}

document.getElementById('TitleOriginal').addEventListener('input', putTitle)
document.getElementById('an-input1').addEventListener('input', main)