//<div id="PopUp" class="d-none"><div id="ClosePopUpElement" onclick="ClosePopUp()"></div></div>
const PopUp = document.getElementById("PopUp");
const ClosePopUpElement = `<div id="ClosePopUpElement" onclick="ClosePopUp()"></div>`
function ClosePopUp()
{
    PopUp.classList.add('d-none')
    PopUp.innerHTML =``;
}

function ShowPopUp() {
    PopUp.innerHTML +=ClosePopUpElement;
    PopUp.classList.remove('d-none')
}