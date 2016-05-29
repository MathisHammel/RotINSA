# Projet Rot'INSA

## But :

Le but est d'offrir un jeu a boire sous forme de jeu de carte à ceux qui veulent se rôtir et passer du bon temps en soirée.

## Architechture :

Les decks de cartes sont chargés par `roti.html?deck=nomDuDeck.json`. Ils doivent être placés dans le dossier decks.

Les fichiers de decks ont la forme suivante :

	{
		"info":{
			"nom":"Hardcore"
		},
		"cards":[
		{
			"type":"question",
			"content":"Ceux qui ont perdu au Jeu boivent {b2-4}"
		}
		...

	}

`cards` contient la liste des cartes du deck. Chaque carte possède 2 attributs :

`type` correspond au type de la carte, c'est à dire la couleur et l'action attribué à celle-ci. Il en existe 5 types pour le moment :

 - `spin` : Pour toutes les cartes qui implique de faire tourner quelque chose parmi les participants, comme donner la liste des acteurs de Game Of Throne, et qui implique que celui qui n'arrive plus à faire tourner doit boire.
 - `question` : Pour toutes les cartes qui font boire les gens qui remplissent une condition, comme par exemple faire boire ceux dont l'age est pair.
 - `action` : Pour les cartes qui font faire une action à celui qui la tire, que ce soit boire un nombre de coups, distribuer des coups ou jouer a un mini-jeu avec un autre joueur pour boire.
 - `role` : Pour les cartes qui donnent un bonus, malus ou pouvoir à celui qui la tire jusqu’à la fin du deck. Des exemples sont faire boire moins ou plus de verres, ou pouvoir rediriger une partie de ses verres vers une autre personne.
 - `regle` : Pour les cartes qui changent le cours de la partie jusqu'à la fin du deck. Cela peut inclure doubler le nombre de verres ou empêcher de dire un mot sous peine de boisson.

`content` : correspond au texte de la carte. Il peut contennir des balises HTML et des templates spéciaux dont voici la liste :

 - `{b}` (DEPRECATED, utilisez plutôt `{b3-3}` pour afficher 3 bières) : Place un symbole 'boisson'. Il correspond au fait que le joueur doit boire un coup.
 - `{b1-3}` : Place un nombre aléatoire de symboles 'boisson', choisi entre le premier nombre (ici 1) et le 2ème nombre (ici 3). Utilisez aussi ce template pour afficher un nombre de bière fixe, car elles seront formatés correctement.  
 - `{j1}` : Remplace ce template par le nom d'un joueur tiré aléatoirement. Il peut y avoir jusqu'à 3 joueurs sur une même carte, en utilisant respectivement `{j1}`, `{j2}` ou `{j3}`. Chaque balise aura toujours la même valeur sur la carte, donc on peut réutiliser `{j1}` pour afficher plusieurs fois le même nom de joueur sur la carte.
 - `{nom1|nom2|nom3}` : Choisis un terme au hasard parmi plusieurs (séparés par des `|`).

Exemple : `"content":"Les {roux|chatains|bruns|blonds|chauves} n'ont pas d'âme et boivent {b1-10}."` -> La carte choisira au hazard parmis {roux|chatains|bruns|blonds|chauves} pour la couleur de cheveux, et entre 1 et 10 coups à boire à afficher sur la carte.

`count` : Opptionnel, correspond au nombre de fois que la carte apparaîtra dans un deck (Utile pour les cartes génériques). Exemple : `"count":3` -> La carte apparaîtra 3 fois dans la partie. Si non défini, la carte n’apparaîtra qu'une fois.