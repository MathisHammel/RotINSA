$(document).ready(function(){

	$('.modal-trigger').leanModal();
	document.getElementById("close1").addEventListener("click", supprJoueur);
	document.getElementById("close2").addEventListener("click", supprJoueur);
	document.getElementById("close3").addEventListener("click", supprJoueur);
	desactiverSuppr();

	document.getElementById("letsgobtn").addEventListener("click", letsGo);
	var listeDecksFile="decks/listeDecks.json";
		$.getJSON(listeDecksFile, function(data)
				{

					var listeDecks = data.decks;
					for(var i=0;i<listeDecks.length;i++)
					{
						$.getJSON("decks/"+listeDecks[i]+".json",function(data2)
						{
							var infos=data2.info;
							infos.nomImage="images/"+infos.nomImage;
							var containerImage= $("<div/>",{class:"card-image waves-effect waves-block waves-light"});
							$("<img />", {class:"activator", src:infos.nomImage}).appendTo(containerImage);
							var containerName=$("<div/>",{class:"card-content activator waves-effect waves-block waves-light"});
							$("<span />",{class:"card-title activator grey-text text-darken-4",style:"font-size:35px",text:infos.nom}).appendTo(containerName);
							var containerText=$("<div/>", {class:"card-reveal activator"});
							containerText.append($("<span/>",{class:"card-title grey-text text-darken-4 activator",style:"font-size:35px",text:infos.nomEtendu}).append($("<i/>",{class:"material-icons right",text:"close"})));
							containerText.append($("<p/>",{text:infos.description}));
							var button=$("<button/>",{class:"btn waves-effect waves-light",type:"submit",name:"action",id:infos.idDeck+'B',text:"C'est parti!"});
							button.click(function(){
									localStorage.setItem('deck',infos.idDeck+".json");
									$('#modalInscription').openModal();
							})
							button.append($("<i/>",{class:"material-icons right",text:"send"}));
							containerText.append(button);
							var containerLevel=$("<p/>",{style:"font-size:24px",text:"Niveau"});
							for(var i=0;i<infos.stars;i++)
							{
								$("<i/>",{ class:"material-icons", style:"font-size:24px", text:"star"}).appendTo(containerLevel);
							}
							containerLevel.appendTo(containerName);
							var containerEnsemble;
							if(infos.idDeck==="fap")
							{
								containerEnsemble=$("<div />", {class:"col s12 m12 l4",style:"display:none" ,id:"konami"});
							}
							else
							{
								containerEnsemble=$("<div />", {class:"col s12 m12 l4"});
							}

							var sousContainerEnsemble=$("<div />", {class:"card small z-depth-3"});
							sousContainerEnsemble.append(containerImage);
							sousContainerEnsemble.append(containerName);
							sousContainerEnsemble.append(containerText);
							containerEnsemble.append(sousContainerEnsemble);
							containerEnsemble.appendTo('#shuffle');

						});
					}
				});
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
