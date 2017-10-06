## Comment build l'app mobile

### Step 1 : Installer le matos

Première chose : avoir node et npm d'installés sur son ordi. Un petit lien pour les download ici: https://nodejs.org/en/download/
(npm est le gestionnaire de packets inclus avec l'install de node)
Pour vérifier l'install, utilise les commandes :
```bash
npm -v
node -v
```

Ensuite, télécharge Ionic 3 et cordova avec la commande :
```bash
npm install -g ionic cordova
```


### Step 2 : Tester l'app sur l'ordi

L'étape facile pendant laquelle y a rarement des problèmes. cd dans la racine de l'app (au niveau de ce README)
```bash
ionic serve
```

L'app se lance dans ton navigateur par défaut, plus qu'à le régler pour avoir un aperçu mobile. (portrait, en paysage c'est pas prévu ni testé)

### Step 3 : Build l'app sur un portable

Je note android|ios pour choisissez l'un ou l'autre.

D'abord ajouter la platforme ciblée sur son ordi:
```bash
ionic cordova platform add android|ios
```
Puis la préparer
```bash
ionic cordova prepare android|ios
```
Et enfin build
```bash
ionic cordova build android|ios --prod|--debug|
```

Pour android, il suffit de se brancher et d'executer la commande suivante pour que l'appli se lance sur le portable :
```bash
ionic cordova run android --device --prod|--debug|
```

Sur Mac et iOS il faut avoir Xcode, et ouvrir le fichier workspace dans le dossier platform/ios pour le lancer via Xcode. Après ça, rien de compliqué, donc je ne m'attarde pas.

### Step 4 : Enjoy the app !

Faut vraiment que je fasse un desin ?
