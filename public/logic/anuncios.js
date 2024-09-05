function putTitle(){
    const tituloOriginal = document.getElementById('TitleOriginal').value
    const output1 = document.getElementById('an-input1')
    const output2 = document.getElementById('an-input2')
    const output3 = document.getElementById('an-input3')

    output1.textContent = tituloOriginal.trim()
    output2.textContent = tituloOriginal.trim()
    output3.textContent = tituloOriginal.trim()
}

function main(){
    const output1 = document.getElementById('an-input1').value
    const output2 = document.getElementById('an-input2').value
    const output3 = document.getElementById('an-input3').value

    function countCaracteres(){
        const showCaracteres1 = document.getElementById('countCaracteres1')
        const showCaracteres2 = document.getElementById('countCaracteres2')
        const showCaracteres3 = document.getElementById('countCaracteres3')
        const caracteres1 = output1.length
        const caracteres2 = output2.length
        const caracteres3 = output3.length
        showCaracteres1.textContent = caracteres1
        showCaracteres2.textContent = caracteres2
        showCaracteres3.textContent = caracteres3
    }

    countCaracteres()
}

document.getElementById('TitleOriginal').addEventListener('input', putTitle)
document.getElementById('an-input1').addEventListener('input', main)
document.getElementById('an-input2').addEventListener('input', main)
document.getElementById('an-input3').addEventListener('input', main)