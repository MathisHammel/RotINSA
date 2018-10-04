# Projet Rot'INSA

## But :

Le but est d'offrir un jeu à boire sous forme de jeu de carte à ceux qui veulent se rôtir et passer du bon temps en soirée.

## Architecture d'un deck :

Lors de l'ajout d'un deck, il est important d'ajouter le deck dans le dossier decks ainsi que son nom, sans extension, dans listeDecks.json, au format Json.

Les fichiers de decks ont la forme suivante :

	{
		"info":{
			"nom":"Je n'ai jamais...",
			"stars":4,
			"nomEtendu":"Je n'ai jamais.../J'ai déjà...",
			"description":"Découvrez des dossiers sur vos amis de manière très conviviale",
			"nomImage":"ribery.jpg",
			"idDeck":"jenaijamais"
		},
		"cards":[
		{
			"type":"question",
			"content":"Ceux qui ont perdu au Jeu boivent {b2-4}"
		}
		...

	}
`infos` contient les metadonnées du deck
 - `nom` : Le nom du deck tel qu'affiché dans l'interface
 - `stars` : Le nombre d'étoiles du deck
 - `nomEtendu` : Le nom du deck tel qu'il doit s'afficher sur un espace plus grand (quand on clique sur le deck)
 - `description` : Description du deck
 - `nomImage` : Le nom de l'image du deck, avec extension, contenu dans le dossier 'images'
 - `idDeck` : Le nom du fichier dans lequel le deck est enregistré, sans l'extension .json, dans le dossier decks


`cards` contient la liste des cartes du deck. Chaque carte possède 2 attributs :

`type` correspond au type de la carte, c'est à dire la couleur et l'action attribué à celle-ci. Il en existe 5 types pour le moment :

 - `spin` : Pour toutes les cartes qui implique de faire tourner quelque chose parmi les participants, comme donner la liste des acteurs de Game Of Thrones, et qui implique que celui qui n'arrive plus à trouver (ou répète un élément déjà dit) doit boire.
 - `question` : Pour toutes les cartes qui font boire les gens qui remplissent une condition, comme par exemple faire boire ceux dont l'âge est pair.
 - `action` : Pour les cartes qui font faire une action à celui qui la tire, que ce soit boire un nombre de coups, distribuer des coups ou jouer à un mini-jeu avec un autre joueur pour boire.
 - `role` : Pour les cartes qui donnent un bonus, malus ou pouvoir à celui qui la tire jusqu’à la fin du deck. Des exemples sont faire boire moins ou plus de verres, ou pouvoir rediriger une partie de ses verres vers une autre personne.
 - `regle` : Pour les cartes qui changent le cours de la partie jusqu'à la fin du deck. Cela peut inclure doubler le nombre de verres ou empêcher de dire un mot sous peine de boisson.

`content` : correspond au texte de la carte. Il peut contennir des balises HTML et des templates spéciaux dont voici la liste :

 - `{b}` (DEPRECATED, utilisez plutôt `{b3-3}` pour afficher 3 bières) : Place un symbole 'boisson'. Il correspond au fait que le joueur doit boire un coup.
 - `{b1-3}` : Place un nombre aléatoire de symboles 'boisson', choisi entre le premier nombre (ici 1) et le 2ème nombre (ici 3). Utilisez aussi ce template pour afficher un nombre de bière fixe, car elles seront formatés correctement.  
 - `{j1}` : Remplace ce template par le nom d'un joueur dont c'est le tour. Il peut y avoir jusqu'à 3 joueurs sur une même carte, en utilisant respectivement `{j1}`, `{j2}` ou `{j3}`. `{j2}` et `{j3}` tirent eux un joueur aléatoire parmis les autres joueurs dans la partie. Chaque balise aura toujours la même valeur sur la carte, donc on peut réutiliser `{j1}` pour afficher plusieurs fois le même nom de joueur sur la carte.
 - `{nom1|nom2|nom3}` : Choisit un terme au hasard parmi plusieurs (séparés par des `|`).

Exemple : `"content":"Les {roux|chatains|bruns|blonds|chauves} n'ont pas d'âme et boivent {b1-10}."` -> La carte choisira au hasard parmi {roux|chatains|bruns|blonds|chauves} pour la couleur de cheveux, et entre 1 et 10 coups à boire à afficher sur la carte.

`count` : Optionnel, correspond au nombre de fois que la carte apparaîtra dans un deck (Utile pour les cartes génériques). Exemple : `"count":3` -> La carte apparaîtra 3 fois dans la partie. Si non défini, la carte n’apparaîtra qu'une fois.

`skipTurn` : Optionnel, qui sera le prochain joueur dans la liste du tour. 1 est la valeur par défaut (utilisée si il n'y a pas le paramètre), 0 ne change pas le joueur, et 2 saute le prochain joueur. Utile pour les cartes qui font sauter des tours ou re-piocher. (Pratique pour la carte "Ame des cartes").

## Version en ligne du jeu :

Les decks de cartes sont chargés par `roti.html?deck=nomDuDeck.json` ou dans l'item de localStorage 'deck'. Ils doivent être placés dans le dossier decks.

## Version application mobile du jeu :

L'appli utilise une architecture logiciel un peu différente (et l'easter egg a une autre technique pour être trouvé ! ;) )
Les decks sont tous chargés localement dans l'appli, peut-être que sur le long terme, il sera possible d'utiliser des decks récupérés en lignes ? Up to you.
