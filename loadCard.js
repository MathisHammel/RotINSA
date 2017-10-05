
function loadCard(tag, deck, id)
{
				//TODO -> empêcher injections XSS


				// Enlever les classes de la carte du back pour pouvoir les recharger en fonction de ce qu'il y a dans le json
			  	$(tag).removeClass().addClass("card");

			  	// Si la carte à un type, le charger
			  	if (deck[id].type)
			  	{
			  		$(tag).addClass("suit-"+deck[id].type);
			  	}


			  	// Charger le texte de la carte
			  	var txt = deck[id].content;

			  	var joueursTmp = joueurs.slice();
			  	var random = 0;
			  	// Patterns !
			  	// Définition des parterns : {lePattern}
			  	var personne = [];

			  	// Dégager le joueur qui tourne
			  	if (typeof playerTurn == 'undefined')
			  	{
			  		playerTurn = 0;
			  	}
			  	personne[0] = joueurs[playerTurn];
			  	joueursTmp.splice(playerTurn,1);
			  	for(var i =1; i<3; i++)
			  	{
			  		random = Math.floor((Math.random() * (joueursTmp.length)));

			  		personne[i] = joueursTmp[random];
			  		joueursTmp.splice(random,1);
			  	}

			  	txt = txt.replace(/{j1}/g, personne[0]);
			  	txt = txt.replace(/{j2}/g, personne[1]);
			  	txt = txt.replace(/{j3}/g, personne[2]);
			  	txt = txt.replace(/{b}/g, "<span class='beer'>"+String.fromCharCode(0xf0fc)+"</span>");

			  	// Remplacer verres random
				var result = txt.match(/{b\d+-\d+}/g);
				if (result != null)
				{
					for (var m = 0; m<result.length; m++) {
						var data = result[m];

						var n = data.match(/(\d+)/g);
						n[0] = parseInt(n[0]);
						n[1] = parseInt(n[1]);
						random = Math.floor((Math.random() * (n[1]-n[0]+1))+n[0]);

						var beer = "";

						if (random <= 5)
						{
							beer = "<span class='beer'>";
							for (var i = 0; i < random; i++)
							{
								beer = beer + String.fromCharCode(0xf0fc);
							}
							beer = beer + "</span>";
						}
						else
						{
							beer = "<b>" + random + "</b>&nbsp;<span class='beer'>"+String.fromCharCode(0xf0fc)+"</span>";
						}
					    txt = txt.replace(data,beer);
					}
				}

				// Remplacer choix multiple :

				var result = txt.match(/{[^}]*\|[^}]*}/g);
				if (result != null)
				{
					for (var m = 0; m<result.length; m++) {
						var data = result[m];

						var n = data.match(/[^{\|}]+/g)
						random = Math.floor((Math.random() * (n.length)));
					    txt = txt.replace(data,n[random]);
					}
				}


			  	$(tag + " p").html(txt);
}
