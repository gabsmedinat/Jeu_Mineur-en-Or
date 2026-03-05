

// Variables globales du Jeu
var objCanvas = null;
var objContexte = null;
var objCycleAnimation = null;
var couleurFondEcran = ["black","#181D31","#2e2f15","#62293d","#502344","#A72703","#44444E"];
var nbrColonnes = 28;
var nbrLignes = 17;
var longeurCellules = null;
var largeurCellules = null;

/* SYSTEME DE JEU */
var nbrVies = null;
// var temps = null;                        // TODO: Implémentation du chronomètre
var niveauActuel = 1;
var tabLingots = null;
var nbrLingotsDebut = null;
var nbrEnnemis = null;

var objNiveau;
var tabObjCellules;
/* Rappel:
    0: vide
    1: beton
    2: échelle
    3: brique    
    * Les lingots d'or seront placés de manière aléatoire
*/
var lstNiveaux = [
    [
    //   1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
    /*1*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*2*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*3*/  [1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*4*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*5*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,1 ,1 ,2 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,1 ],
    /*6*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,1 ,1 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ],
    /*7*/  [0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,1 ,1 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ],
    /*8*/  [1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ],
    /*9*/  [0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*10*/ [0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*11*/ [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*12*/ [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*13*/ [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,3 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ],
    /*14*/ [0 ,0 ,0 ,0 ,2 ,1 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,2 ],
    /*15*/ [0 ,0 ,0 ,0 ,2 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,2 ],
    /*16*/ [1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ],
    /*17*/ [4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ,4 ]                                
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,2,1,1,2,0,0,0,1,1,1,1,1,1,1,2,1,1],
        [0,0,0,0,0,0,0,2,0,0,0,2,1,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,2,1,1,2,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0,0,0,2,3,3,3,3,2,3,3,3,3,3,2,0,0,0,0,0,0,0],
        [1,0,1,1,2,1,1,1,1,1,1,0,0,0,2,0,0,0,0,0,1,1,1,1,1,1,1,2],
        [1,0,0,0,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4] 
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,2,1,1,1,1,1,2,0,0,0,0,0,0,1,1,1,1,1,1,2,1,1,1,1,1],
        [0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
        [0,0,0,2,0,0,1,1,1,2,1,1,1,1,1,1,2,1,1,1,0,0,2,0,0,0,0,0],
        [1,1,1,1,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,2,3,3,3,3,3,3,2,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,2,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,2,1,1,1,1,0,0],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
        [1,1,0,0,2,0,0,3,3,3,3,3,3,1,2,3,3,3,3,0,0,2,0,0,1,1,1,1],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,2,0,0,0,0,0,0],
        [0,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0],
        [1,1,1,2,1,1,1,1,0,0,0,1,1,1,1,0,0,0,1,1,1,1,2,1,1,1,1,1],
        [0,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1],
        [0,0,0,0,0,3,3,3,3,3,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0],
        [0,0,1,1,1,0,0,0,0,0,2,3,3,3,3,3,3,1,1,1,1,1,1,1,1,2,0,0],
        [0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0],
        [0,0,2,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,2,0,0],
        [1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1],
        [0,0,0,0,0,2,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,2,0,0,0,0,2],
        [0,0,0,0,0,2,0,0,0,0,0,0,0,1,2,0,0,0,0,0,0,0,2,0,0,0,0,2],
        [0,1,1,1,1,1,1,1,2,1,1,0,0,1,2,0,0,1,1,2,1,1,1,1,1,1,0,2],
        [0,0,0,0,0,0,0,0,2,0,0,0,0,1,2,0,0,0,0,2,0,0,0,0,0,0,0,2],
        [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,1,0,2],
        [0,0,2,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,2,0,0,2],
        [0,0,2,0,2,1,1,0,0,0,0,0,0,0,0,0,0,0,2,0,1,1,2,0,2,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    ],
    [
        // Niveau 4 a un piège fait exprès (Il faut s'en servir du pouvoir du Mineur pour atteindre les échelles droites)
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0],
        [0,1,1,1,1,3,3,3,3,3,1,1,2,2,1,1,3,3,3,3,1,2,1,1,1,0,0,1],
        [0,0,0,0,2,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,1],
        [1,1,1,1,2,1,1,1,1,0,0,0,1,1,0,0,0,1,1,1,1,2,1,1,1,1,1,1],
        [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2],
        [0,1,1,1,1,1,1,2,1,1,3,3,3,3,3,3,1,1,2,1,1,1,1,1,1,0,0,2],
        [0,0,3,3,3,3,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2],
        [1,1,0,0,0,0,2,1,0,0,1,1,1,1,1,1,0,0,1,2,3,3,3,3,1,1,1,2],
        [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2],
        [1,1,1,1,1,1,2,1,1,1,1,3,3,3,3,1,1,1,1,2,1,1,1,1,1,1,1,2],
        [0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,2],
        [1,0,0,0,0,0,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
        [1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1],
        [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
        [1,1,0,2,0,1,1,0,3,3,3,3,3,2,3,3,3,3,3,3,0,1,1,0,2,0,1,1],
        [0,0,0,2,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,2,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
        [0,0,0,0,0,2,0,1,1,1,1,2,1,1,1,1,2,1,1,1,1,0,2,0,1,1,1,0],
        [0,1,1,1,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0],
        [3,3,3,3,3,2,3,3,1,1,1,2,0,0,0,0,2,1,1,1,3,3,2,3,3,3,3,3],
        [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,2,0,1,1,1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,1,1,1,1,1,1,1,2,0,1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    ],
    [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1],
        [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
        [1,1,0,2,0,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,0,2,0,1,1],
        [0,0,0,2,0,2,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0,0,2,0,2,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0],
        [0,1,1,1,0,2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2,0,1,1,1,0],
        [0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0],
        [3,3,3,3,3,2,3,3,1,1,1,2,0,0,0,0,1,1,1,1,3,3,3,3,3,3,3,3],
        [0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,2,0,1,1,1,1,1,1,1,1,1,1,0,2,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
    ]


]

    /* PERSONNAGES */
    var objMineur;
    var tabObjGardes;





// Début de la logique

const init = ()=>{
    objCanvas = document.getElementById("canvasJeu");
    // objCanvas.width = window.innerWidth;
    // objCanvas.height = window.innerHeight;
    objContexte = objCanvas.getContext("2d");

    window.addEventListener('keydown',ecouter)

    nbrVies = 3;
    tabLingots = initLingots();    
    nbrEnnemis = 3 + niveauActuel;


    initNiveau();
    initMineur();
    dessinerLingots();
    dessinerNiveau(); 
    animer();
}

const initLingots = () => {
    var tabLingots = new Array();
    for(let i = 0; i<(0+niveauActuel); i++){
        var objLingot = new Object();
        objLingot.points = 250;
        objLingot.binDejaPrit = false;
        tabLingots.push(objLingot);
    }
    return tabLingots;
}

const ecouter = () =>{
    switch(event.key){
        case "ArrowUp":
        case "w":
            objMineur.binDeplacement = true;
            monterEchelles();
            break;
        case "ArrowDown":
        case "s":
            objMineur.binDeplacement = true;
            descendreEchelles();
            break;
        case "ArrowRight":
        case "d":
            objMineur.binDeplacement = true;
            objMineur.direction = "droite";
            deplacementHorizontal();
            break;
        case "ArrowLeft":
        case "a":
            objMineur.binDeplacement = true;
            objMineur.direction = "gauche";
            deplacementHorizontal();
            break;
        case "x":
            creuserTrou("droite");
            break;
        case "z":
            creuserTrou("gauche");
            break;
        case "i": // Touches utilisées pour des fins de déboggage
            console.log(`Le Mineur se trouve dans la cellule ${objMineur.celluleActuelle[0]},${objMineur.celluleActuelle[1]}`)
            break;
        case "k":
            console.log(obtenirPositionCelluleDessous(objMineur.celluleActuelle[0],objMineur.celluleActuelle[1]));
            break;
        case "l":
            console.log(obtenirPositionCelluleACote("droite"));
            break;
        case "j":
            console.log(obtenirPositionCelluleACote("gauche"));
            break;
        case "t":
            let v = obtenirPositionCelluleACote(objMineur.direction);
            console.log(v);
            console.log(obtenirTypeCellule(v[1],v[0]))
            break;
        case "h":
            niveauActuel ++;
            init();
            break;
    }
}

const initNiveau = ()=>{
    objNiveau = new Object();
    objNiveau.nom = "Niveau 1";
    objNiveau.tableau = lstNiveaux[niveauActuel-1];
    objNiveau.colonnes = nbrColonnes;
    objNiveau.lignes = nbrLignes;
    objNiveau.binReussi = false;
    
    tabObjCellules = new Array();
    for(let y=0; y<objNiveau.lignes; y++){
        // var ligne = new Array();
        for(let x=0;x<objNiveau.colonnes; x++){
            var objCellule = new Object();
            objCellule.ligne = y+1;
            objCellule.colonne = x+1;
            objCellule.longeur = objCanvas.width/nbrColonnes;
            objCellule.hauteur = objCanvas.height/nbrLignes;
            objCellule.positionX = x*objCellule.longeur;
            objCellule.positionY = y*objCellule.hauteur;
            objCellule.positionFinX = objCellule.positionX + objCellule.longeur;

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
    let longeurCellule = objCanvas.width/nbrColonnes;
    let hauteurCellule = objCanvas.height/nbrLignes;
    let stepX = 2*longeurCellule / nbrColonnes;
    let stepY = 5*hauteurCellule / (3*nbrLignes);
    let couleurMineurCorps = objMineur.couleur[0];
    let couleurMineurChapeau = objMineur.couleur[1]; 
    
    objContexte.save();
    if(objMineur.direction==="droite"){
        objContexte.translate(debutCellule_X,debutCellule_Y)
        objContexte.translate(0, hauteurCellule); 
        objContexte.scale(1.5, -1.5);
    }
    if(objMineur.direction === "gauche"){
        objContexte.translate(debutCellule_X,debutCellule_Y)
        objContexte.translate(0, hauteurCellule); 
        objContexte.scale(1.5, -1.5);
        objContexte.translate(longeurCellule,0)
        objContexte.scale(-1,1);
    }

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
        if(cellule.type ==="vide"){
            for(cel of tabObjCellules){
                if(colonne === cel.colonne && (cel.ligne - 1) === ligne && cel.type === "beton"){
                    tabCelluleDisponible.push(cellule)
                }
            }
        }
    }
    
    for(let i = 0; i<tabLingots.length; i++){
        let indexCelluleChoisie = Math.floor(Math.random()*tabCelluleDisponible.length);
        let celluleChoisie = tabCelluleDisponible[indexCelluleChoisie];
        transformerCellule(celluleChoisie.ligne, celluleChoisie.colonne, "lingots")
    }
}

const collisionAvecLingot = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    for(cel of tabObjCellules){
        if(posActuelle[0] === cel.colonne && posActuelle[1] === (cel.ligne ) && cel.type === "lingots"){
            cel.type = "vide";
            tabLingots.pop();
        }
    }
}

const binLingotsAcquis = () => {
    if(tabLingots.length==0){
        objNiveau.binReussi = true;
        for(let i = 1; i<= 15; i++){
            transformerCellule(i,13+niveauActuel,"echelle");
        }
        if(objMineur.celluleActuelle[0]==13){
            objMineur.positionY --;
            if(objMineur.celluleActuelle[1]==0){
                arreterAnimation();
            }
        }
    }
}

const obtenirTypeCellule = (intLigne, intColonne) => {
    let type = "dehors";
    let li = intLigne;
    let col = intColonne;
    for(cellule of tabObjCellules){
        if(cellule.ligne === li && cellule.colonne === col){
            type =  cellule.type;
        }
    }
    return type;
}

const obtenirCoordonneesCellule = (intLigne, intColonne) => {
    let li = intLigne ;
    let col = intColonne ;
    for(cellule of tabObjCellules){
        if(cellule.ligne === li && cellule.colonne === col){
            return [cellule.positionX,cellule.positionY];
        }
    }
}

const obtenirPositionCellule = (fltPosX, fltPosY) => {
    var colonne = Math.ceil((fltPosX / 20) + 1);
    var ligne = Math.floor((fltPosY / 20) +1);
    return [colonne,ligne];
}

const obtenirPositionCelluleDessous = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let celDessous = [posActuelle[0],posActuelle[1]+1];
    return [celDessous[0],celDessous[1]];
}

const onbtenirPositionCelluleDessus = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let celDessus = [posActuelle[0],posActuelle[1]-1];
    return [celDessus[0],celDessus[1]];
}

const obtenirPositionCelluleACote = (strCote) => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let cote = (strCote === "droite")? 1 : -1;
    let celACote = [posActuelle[0]+cote,posActuelle[1]];
    return [celACote[0],celACote[1]];    
}

const monterEchelles = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let typeCelluleActuelle = obtenirTypeCellule(posActuelle[1],posActuelle[0]);
    let posCelluleDessus = onbtenirPositionCelluleDessus(posActuelle[0],posActuelle[1]);  
    let posCelluleDessous = obtenirPositionCelluleDessous(posActuelle[0],posActuelle[1]);
      
    for(cel of tabObjCellules){
        if(typeCelluleActuelle === "echelle" && posCelluleDessus[0] === cel.colonne && posCelluleDessus[1] === cel.ligne && cel.type != "beton"){
            objMineur.positionY -= objMineur.vitesse*5;
        }

        if(typeCelluleActuelle === "vide" && cel.type === "echelle" && posCelluleDessous[0] === cel.colonne && posCelluleDessous[1] === cel.ligne ){
            objMineur.positionY -= objMineur.vitesse*5;
        }
    }
}

const descendreEchelles = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let typeCelluleActuelle = obtenirTypeCellule(posActuelle[1],posActuelle[0]);
    let posCelluleDessous = obtenirPositionCelluleDessous(posActuelle[0],posActuelle[1]);
    
    for(cel of tabObjCellules){
        if(typeCelluleActuelle === "vide" && cel.type === "echelle" && posCelluleDessous[0] === cel.colonne && posCelluleDessous[1] === cel.ligne ){
            objMineur.positionY += objMineur.vitesse*5;
        }
        
        if(typeCelluleActuelle === "echelle" && posCelluleDessous[0] === cel.colonne && posCelluleDessous[1] === cel.ligne && cel.type != "beton"){
            objMineur.positionY += objMineur.vitesse*5;
        }
    }
}

const deplacementHorizontal = () =>  {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let celluleDevant = obtenirPositionCelluleACote(objMineur.direction);
    let cote = (objMineur.direction === "droite")? 1 : -1;

    for(cel of tabObjCellules){
        if( celluleDevant[0] === cel.colonne+cote && celluleDevant[1] === cel.ligne){
            for(cel of tabObjCellules){
                if(cel.colonne === posActuelle[0] && cel.ligne === posActuelle[1] && cel.type != "beton"){
                    objMineur.positionX += objMineur.vitesse*5*cote;
                }
            }
        }
    }
}

const detectionCollisions = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let typeCelluleActuelle = obtenirTypeCellule(posActuelle[1],posActuelle[0]);
    let cote = (objMineur.direction === "droite")? 1 : -1;

    // Ecouteur de collision
    if(typeCelluleActuelle==="beton"){
        objMineur.positionX -= objMineur.vitesse*5*cote;
    }
    if(typeCelluleActuelle==="dehors"){
        objMineur.positionX -= objMineur.vitesse*5*cote;

    }
}

const transformerCellule = (intLigne, intColonne, strType) => {
    let li = intLigne;
    let col = intColonne;
    for(cellule of tabObjCellules){
        if(cellule.ligne === li && cellule.colonne === col){
            cellule.type = strType;
            (strType!="vide")?cellule.binDisponible=false:cellule.binDisponible = true;
        }
    }
}

/* Fonctionnement: Après d'obtenir la position de la cellule où le Mineur se trouve, si le paramètre recu dans la fonction est "droite", alors je transforme la colonne à droite
        Si strCote ne vaut pas "droite", je transforme la colonne à gauche. */
const creuserTrou = (strCote) => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let cote = (strCote==="droite")? 1 : -1;
    let positionVisee = [posActuelle[0]+cote,posActuelle[1]+1];
    
    for(cel of tabObjCellules){
        if(positionVisee[0] === cel.colonne && positionVisee[1] === cel.ligne && cel.type === "beton"){
            transformerCellule(cel.ligne,cel.colonne,"vide");
        }   
    }
}

/* Fonction qui sera activée à chaque mise à jour afin de déclencher la chute du Mineur ou d'un garde */
const chute = () => {
    let posActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    let typeCelluleActuelle = obtenirTypeCellule(posActuelle[1],posActuelle[0]);
    let posCelluleDessous = obtenirPositionCelluleDessous(posActuelle[0],posActuelle[1]);
    for(cel of tabObjCellules){
        if(posCelluleDessous[0] === cel.colonne && posCelluleDessous[1] === cel.ligne && cel.type != "beton"){
            if(cel.type != "echelle" && typeCelluleActuelle != "barre"){
                objMineur.binDeplacement = true;
                objMineur.positionY += objMineur.vitesse;
            }
        }
    }
}




const effacer = () => {
    /* Au lieu d'utiliser fonction clearRect, je peins tout le canvas en noir afin de faire le fond */
    objContexte.save();
    objContexte.fillStyle = couleurFondEcran[niveauActuel-1];
    objContexte.fillRect(0,0,objCanvas.width,objCanvas.height);
    objContexte.restore();
}

const mettreAJour = () => {
    objMineur.celluleActuelle = obtenirPositionCellule(objMineur.positionX, objMineur.positionY);
    chute();
    collisionAvecLingot();
    detectionCollisions();
}



const animer = () => {
    objCycleAnimation = requestAnimationFrame(animer);
    effacer();
    mettreAJour();
    binLingotsAcquis();
    dessinerNiveau();
    dessinerMineur();
}

const arreterAnimation = () => {
    if(objCycleAnimation != null){
        cancelAnimationFrame(objCycleAnimation);
        objCycleAnimation = null;
        reDemarrer();
    }
}

const reDemarrer = () => {
    if(objNiveau.binReussi){
        alert(`Vous avez reussi le niveau ${niveauActuel}. Appuyez la touche "h" pour le niveau suivant ...`)
    }
}