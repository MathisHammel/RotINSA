$(document).ready(function(){

	$('.modal-trigger').leanModal();
	document.getElementById("close1").addEventListener("click", supprJoueur);
	document.getElementById("close2").addEventListener("click", supprJoueur);
	document.getElementById("close3").addEventListener("click", supprJoueur);
	desactiverSuppr();
	
	document.getElementById("letsgobtn").addEventListener("click", letsGo);
});

$(function () {
	var parent = $("#shuffle");
	var divs = parent.children();
	while (divs.length) {
		parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
	}
}); //shuffle des familles

function letsGo()
{
	var players=document.getElementsByClassName("player");
	
	var playerValues=[];
	var i;
	var ok=true;
	for(i=0;i<players.length;i++)
	{
		if(players[i].children[0].children[0].value==="")
		{
			ok=false;
			players[i].children[0].children[0].className="inputjoueur invalid";
		}
		else
		{
			playerValues.push(players[i].children[0].children[0].value);
			players[i].children[0].children[0].className="inputjoueur";
		}
	}
	if(ok)
	{
		localStorage.setItem('joueurs',JSON.stringify(playerValues));
		window.location.replace("roti.html");
	}
}

function desactiverSuppr()
{
	var remBtns=document.getElementsByClassName("removebtn");
	var it;
	for(it=0;it<remBtns.length;it++)
	{
		remBtns[it].style.visibility = "hidden";
	}
}

function activerSuppr()
{
	var remBtns=document.getElementsByClassName("removebtn");
	var it;
	for(it=0;it<remBtns.length;it++)
	{
		remBtns[it].style.visibility = "visible";
	}
}

var compteurJoueurs=3;
var iterIdJoueur=3;
function addJoueur()
{
	activerSuppr();
	
	
	compteurJoueurs++;
	iterIdJoueur++;

	var players='<div class="input-field col s11">';
	players+='<input placeholder="Joueur" class="inputjoueur" id="j'+iterIdJoueur+'" type="text">';
	players+='</div>';
	players+='<div class="input-field col s1 removebtn" id="close'+iterIdJoueur+'">';
	players+='<i class="material-icons">close</i>';
	players+='</div>';
	
	var newDiv=document.createElement('div');
	newDiv.className="player";
	newDiv.setAttribute("id",''+iterIdJoueur);
	newDiv.innerHTML=players;
	
	document.getElementById("players").appendChild(newDiv);
	
	document.getElementById("close"+iterIdJoueur).addEventListener("click", supprJoueur);
	document.getElementById("j"+iterIdJoueur).addEventListener("select", function(){alert(123);});
	
	if(compteurJoueurs>=20)
	{
		this.style.visibility = "hidden";
	}
	
	$("#modalInscription").scrollTop($("#modalInscription")[0].scrollHeight);
}
document.getElementById("add").addEventListener("click", addJoueur);

function supprJoueur()
{

	this.parentNode.parentNode.removeChild(this.parentNode);
	compteurJoueurs--;
	document.getElementById("add").style.visibility="visible";
	
	if(compteurJoueurs<=3)
	{
		desactiverSuppr();
	}
}

function setBizuth(){
	localStorage.setItem('deck','bizuth.json');
	$('#modalInscription').openModal();
}
document.getElementById("bizuthB").addEventListener("click", setBizuth);

function setHardcore(){
	localStorage.setItem('deck','hardcore.json');
	$('#modalInscription').openModal();
}
document.getElementById("hardcoreB").addEventListener("click", setHardcore);

function setIf(){
	localStorage.setItem('deck','if.json');
	$('#modalInscription').openModal();
}
document.getElementById("ifB").addEventListener("click", setIf);

function setRoti(){
	localStorage.setItem('deck','rotistandard.json');
	$('#modalInscription').openModal();
}
document.getElementById("rotiB").addEventListener("click", setRoti);

function setJenaijamais(){
	localStorage.setItem('deck','jenaijamais.json');
	$('#modalInscription').openModal();
}
document.getElementById("jenaijamaisB").addEventListener("click", setJenaijamais);

function setCitations()){
	localStorage.setItem('deck','citations.json');
	$('#modalInscription').openModal();
}
document.getElementById("citationsB").addEventListener("click", setCitations);
