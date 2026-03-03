

// Variables globales du Jeu
var objCanvas = null;
var objContexte = null;
var objCycleAnimation = null;


var objNiveau;
var tabObjCellules;
/* Rappel:
    0: vide
    1: beton
    2: échelle
    3: brique    
    * Les lingots d'or seront placés de manière aléatoire
*/
var niveau = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,1,1,1,1,1,1,1,2,1,1],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [1,1,2,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0,0],
        [0,0,0,0,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]                                
    ]

var objMineur;
var tabObjGardes;


// Début de la logique

const init = ()=>{
    objCanvas = document.getElementById("canvasJeu");
    // objCanvas.width = window.innerWidth;
    // objCanvas.height = window.innerHeight;
    objContexte = objCanvas.getContext("2d");

    window.addEventListener('keydown',ecouter)

    initNiveau();
    initMineur();
    dessinerLingots();
    dessinerNiveau(); 
    animer();
}

const ecouter = () =>{
    switch(event.key){
        case "ArrowUp":
        case "w":
            objMineur.binDeplacement = true;
            objMineur.positionY -= objMineur.vitesse;
            break;
        case "ArrowDown":
        case "s":
            objMineur.binDeplacement = true;
            objMineur.positionY += objMineur.vitesse;
            break;
        case "ArrowRight":
        case "d":
            objMineur.binDeplacement = true;
            objMineur.positionX += objMineur.vitesse;
            break;
        case "ArrowLeft":
        case "a":
            objMineur.binDeplacement = true;
            objMineur.positionX -= objMineur.vitesse;
            break;
        case "x":
            creuserTrou("droite");
            break;
        case "z":
            creuserTrou("gauche");
            break;
        case "o": // Cette touche m'aide juste à connaître la position actuelle du Mineur pour des fins de déboggage
            console.log(`Le Mineur se trouve dans la cellule ${objMineur.celluleActuelle[0]},${objMineur.celluleActuelle[1]}`)
            break;
    }
}





const initNiveau = ()=>{
    objNiveau = new Object();
    objNiveau.nom = "Niveau 1";
    objNiveau.tableau = niveau;
    objNiveau.colonnes = 28;
    objNiveau.lignes = 17;
    
    tabObjCellules = new Array();
    for(let y=0; y<objNiveau.lignes; y++){
        // var ligne = new Array();
        for(let x=0;x<objNiveau.colonnes; x++){
            var objCellule = new Object();
            objCellule.ligne = y+1;
            objCellule.colonne = x+1;
            objCellule.longeur = objCanvas.width/28;
            objCellule.hauteur = objCanvas.height/17;
            objCellule.positionX = x*objCellule.longeur;
            objCellule.positionY = y*objCellule.hauteur;

            typeCellule = objNiveau.tableau[y][x];
            switch(typeCellule){
                case 0:
                    objCellule.type = "vide";
                    objCellule.binDisponible = true;
                    break;
                case 1:
                    objCellule.type = "beton";
                    objCellule.binDisponible = false;
                    break;
                case 2:
                    objCellule.type = "echelle";
                    objCellule.binDisponible = false;
                    break;
                case 3: 
                    objCellule.type = "barre";
                    objCellule.binDisponible = false;
                    break;
                case 4:
                    objCellule.type = "brique";
                    objCellule.binDisponible = false;
                    break;
                case 5:
                    objCellule.type = "lingots";
                    objCellule.binDisponible = false;
                    break;
            }
            tabObjCellules.push(objCellule);
        }
    }
}

const initMineur = () =>  {
    let coordonneesInitiales = obtenirCoordonneesCellule(10,13);    // Coordonnées de cellule (13,10)

    objMineur = new Object();
    objMineur.positionX = coordonneesInitiales[0];
    objMineur.positionY = coordonneesInitiales[1];

    objMineur.vitesse = 1;                                          // TODO: À ajuster une fois en fonction
    objMineur.couleur = ["#FFFFFF","#0AC4E0"];
    objMineur.binChute = false;
    objMineur.binDeplacement = false;                   // TODO: À s'en servir pour l'animation
    objMineur.binObjetDevant = false;                   // TODO: À utiliser pour collision
    objMineur.binVivant = true;                         // TODO: À utiliser pour la fin du jeu
    objMineur.direction = "droite";                     // TODDO: "droite" sera position par défaut scale(1,1), donc pas de scale. "gauche"=scale(-1,1)
}



const dessinerNiveau = () => {
    for(cellule of tabObjCellules){
        let debutCellule_X = cellule.positionX;
        let debutCellule_Y = cellule.positionY;
        let longeurCellule = cellule.longeur;
        let hauteurCellule = cellule.hauteur;
        let ecartEntreBetons = hauteurCellule/10;
        switch(cellule.type){
            case "beton":
                objContexte.save();
                objContexte.translate(debutCellule_X,debutCellule_Y);
                
                objContexte.fillStyle = "gray";
                objContexte.fillRect(0,0,longeurCellule,hauteurCellule);

                objContexte.fillStyle = "orange";
                objContexte.fillRect(0,ecartEntreBetons,7*longeurCellule/10,hauteurCellule/3);
                objContexte.fillRect(7*longeurCellule/10+ecartEntreBetons,ecartEntreBetons,longeurCellule-7*longeurCellule/10-ecartEntreBetons,hauteurCellule/3);
                objContexte.fillRect(0,2*ecartEntreBetons+hauteurCellule/3,2*longeurCellule/10,hauteurCellule/3);
                objContexte.fillRect(2*longeurCellule/10+ecartEntreBetons,2*ecartEntreBetons+hauteurCellule/3,7*longeurCellule/10,hauteurCellule/3);

                objContexte.restore();
                break;
            case "echelle":
                objContexte.save();
                objContexte.translate(debutCellule_X,debutCellule_Y);
                objContexte.fillStyle = "#8A7650";
                objContexte.fillRect(0,0,longeurCellule/7,hauteurCellule);
                objContexte.fillRect(6*longeurCellule/7,0,longeurCellule/7,hauteurCellule);
                for(let i=0;i<4;i++){
                    objContexte.fillRect(0,i*hauteurCellule/4+ecartEntreBetons,longeurCellule,hauteurCellule/20);
                }
                objContexte.restore();  
                break;
            case "barre":
                objContexte.save();
                objContexte.translate(debutCellule_X,debutCellule_Y);
                objContexte.fillStyle = "#8A7650";
                objContexte.fillRect(0,hauteurCellule/30+ecartEntreBetons,longeurCellule,hauteurCellule/20);
                objContexte.restore();  
                break;
            case "brique":
                objContexte.save();
                objContexte.translate(debutCellule_X,debutCellule_Y);
                objContexte.fillStyle = "gray";
                objContexte.fillRect(0,0,longeurCellule,hauteurCellule);
                objContexte.fillStyle = "#57595B";
                objContexte.fillRect(ecartEntreBetons,ecartEntreBetons,longeurCellule-2*ecartEntreBetons,hauteurCellule-3*ecartEntreBetons);
                objContexte.restore();
                break;
            case "lingots":               
                let stepX = longeurCellule / 14;
                let stepY = hauteurCellule / 10;
                let couleur_OrClair = "#FFF985";
                let couleur_OrMoyen = "#FFEC27";
                let couleur_OrFonce = "#FFD300";
                let couleur_OrTFonce = "#FFA300";
                
                objContexte.save();
                objContexte.translate(debutCellule_X,debutCellule_Y)
                objContexte.translate(0, hauteurCellule); 
                objContexte.scale(1, -1);

                objContexte.fillStyle = couleur_OrClair;
                objContexte.fillRect(0,0,stepX,stepY);
                objContexte.fillRect(2*stepX,0,stepX,stepY);
                objContexte.fillRect(stepX,0+stepY,stepX,stepY);
                objContexte.fillRect(2*stepX,0+stepY,stepX,stepY);
                objContexte.fillRect(2*stepX,0+2*stepY,stepX,stepY);
                objContexte.fillRect(3*stepX,0+2*stepY,stepX,stepY);
                objContexte.fillRect(3*stepX,0+3*stepY,stepX,stepY);
                objContexte.fillRect(4*stepX,0+3*stepY,stepX,stepY);
                objContexte.fillRect(4*stepX,0+4*stepY,stepX,stepY);
                objContexte.fillRect(5*stepX,0+4*stepY,stepX,stepY);
                objContexte.fillRect(5*stepX,0+5*stepY,stepX,stepY);


                objContexte.fillStyle = couleur_OrMoyen;
                objContexte.fillRect(0+stepX,0,stepX,stepY);
                objContexte.fillRect(0+3*stepX,0,2*stepX,stepY);
                objContexte.fillRect(0+6*stepX,0,stepX,stepY);
                objContexte.fillRect(0+3*stepX,0+stepY,stepX,stepY);
                objContexte.fillRect(0+5*stepX,0+stepY,stepX,stepY);
                objContexte.fillRect(0+6*stepX,0+2*stepY,stepX,stepY);
                objContexte.fillRect(0+5*stepX,0+3*stepY,3*stepX,stepY);

                
                objContexte.fillStyle = couleur_OrFonce;
                objContexte.fillRect(0+5*stepX,0,stepX,stepY);
                objContexte.fillRect(0+7*stepX,0,stepX,stepY);
                objContexte.fillRect(0+4*stepX,0+stepY,stepX,stepY);
                objContexte.fillRect(0+4*stepX,0+2*stepY,stepX,stepY);
                objContexte.fillRect(0+6*stepX,0+stepY,5*stepX,stepY);
                objContexte.fillRect(0+7*stepX,0+2*stepY,3*stepX,stepY);
                objContexte.fillRect(0+6*stepX,0+4*stepY,stepX,stepY);
                objContexte.fillRect(0+7*stepX,0+4*stepY,stepX,stepY);
                objContexte.fillRect(0+8*stepX,0+3*stepY,stepX,stepY);

                objContexte.fillRect(0+5*stepX,0+2*stepY,stepX,stepY);
                objContexte.fillRect(0+6*stepX,0+5*stepY,stepX,stepY);


                objContexte.fillStyle = couleur_OrTFonce;
                objContexte.fillRect(0+8*stepX,0,4*stepX,stepY);

                objContexte.restore();
                break;
        }
    }


   
}

const dessinerMineur = () => {
    let debutCellule_X = objMineur.positionX;
    let debutCellule_Y = objMineur.positionY;
    let longeurCellule = objCanvas.width/28;
    let hauteurCellule = objCanvas.height/17;
    let stepX = longeurCellule / 14;
    let stepY = hauteurCellule / 10;
    let couleurMineurCorps = objMineur.couleur[0];
    let couleurMineurChapeau = objMineur.couleur[1]; 
    
    objContexte.save();
    objContexte.translate(debutCellule_X,debutCellule_Y)
    objContexte.translate(0, hauteurCellule); 
    objContexte.scale(1.5, -1.5);

    // Direction Gauche
    // objContexte.translate(longeurCellule,0)
    // objContexte.scale(-1,1);

    objContexte.fillStyle = couleurMineurCorps;
    
    objContexte.fillRect(7*stepX,0,stepX,stepY);
    objContexte.fillRect(7*stepX,stepY,stepX,stepY);
    objContexte.fillRect(7*stepX,2*stepY,stepX/2,stepY/2);
    objContexte.fillRect(6*stepX,2*stepY,stepX,stepY/2);
    objContexte.fillRect(18*stepX/4,6*stepY/4,2*stepX,stepY/2);
    objContexte.fillRect(6*stepX,2*stepY,stepX,2*stepY);
    objContexte.fillRect(6*stepX+stepX/2,4*stepY,3*stepX/2,stepY/2);
    objContexte.fillRect(8*stepX,3*stepY+stepY/2,stepX,stepY/2);
    objContexte.fillRect(6*stepX,4*stepY+stepY/2,3*stepX/2,stepY/2);
    objContexte.fillRect(6*stepX+stepX/2,5*stepY,3*stepX/2,stepY+stepY/3);
    objContexte.fillRect(5*stepX,4*stepY,stepX,stepY/2);
    objContexte.fillRect(4*stepX+stepX/2,3*stepY+stepY/2,stepX,stepY/2);
    
    objContexte.fillStyle = couleurMineurChapeau;
    objContexte.fillRect(7*stepX,6*stepY+stepY/3,stepX/2,stepY/2);

    objContexte.restore();
}

const dessinerLingots = () => {
    let tabCelluleDisponible = new Array();
    for(cellule of tabObjCellules){
        let colonne = cellule.colonne;
        let ligne = cellule.ligne;
        if(cellule.type =="vide"){
            for(cel of tabObjCellules){
                if(colonne == cel.colonne && (cel.ligne - 1) == ligne && cel.type == "beton"){
                    tabCelluleDisponible.push(cellule)
                }
            }
        }
    }
    
    for(let i = 0; i<7; i++){
        let indexCelluleChoisie = Math.floor(Math.random()*tabCelluleDisponible.length);
        let celluleChoisie = tabCelluleDisponible[indexCelluleChoisie];
        transformerCellule(celluleChoisie.ligne, celluleChoisie.colonne, "lingots")
    }
}



const obtenirTypeCellule = (intLigne, intColonne) => {
    let li = intLigne;
    let col = intColonne;
    for(cellule of tabObjCellules){
        if(cellule.ligne == li && cellule.colonne == col){
            return cellule.type;
        }
    }
}

/* Cette fonction retourn un tableau avec les coordonnés X et Y */
const obtenirCoordonneesCellule = (intLigne, intColonne) => {
    let li = intLigne ;
    let col = intColonne ;
    for(cellule of tabObjCellules){
        if(cellule.ligne == li && cellule.colonne == col){
            return [cellule.positionX,cellule.positionY];
        }
    }
}

/* Cette fonction retourne la ligne et la colonne actuelle de l'objet qui applique la méthode */
const obtenirPositionCellule = (fltPosX, fltPosY) => {
    var colonne = Math.ceil(fltPosX / 20) +1 ;
    var ligne = Math.ceil(fltPosY / 20) +1;
    return [ligne,colonne];
}

const transformerCellule = (intLigne, intColonne, strType) => {
    let li = intLigne ;
    let col = intColonne ;
    for(cellule of tabObjCellules){
        if(cellule.ligne == li && cellule.colonne == col){
            cellule.type = strType;
            (strType!="vide")?cellule.binDisponible=false:cellule.binDisponible = true;
        }
    }
}

/* Fonctionnement: Après d'obtenir la position de la cellule où le Mineur se trouve, si le paramètre recu dans la fonction est "droite", alors je transforme la colonne à droite
        Si strCote ne vaut pas "droite", je transforme la colonne à gauche. */
const creuserTrou = (strCote) => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let cote = (strCote=="droite")? 1 : -1;
    
    for(cel of tabObjCellules){
        if(posActuelle[1] == cel.colonne && (cel.ligne - 1) == posActuelle[0] && cel.type == "beton"){
            
            transformerCellule(cel.ligne,cel.colonne+cote,"vide")
        }
    }
}



const effacer = () => {
    /* Au lieu d'utiliser fonction clearRect, je peins tout le canvas en noir afin de faire le fond */
    objContexte.save();
    objContexte.fillStyle = "black";  
    objContexte.fillRect(0,0,objCanvas.width,objCanvas.height);
    objContexte.restore();
}

const mettreAJour = () => {
    objMineur.celluleActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);

}

const animer = () => {
    objCycleAnimation = requestAnimationFrame(animer);
    effacer();
    mettreAJour();
    dessinerNiveau();
    dessinerMineur();

}