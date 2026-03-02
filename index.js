


var objCanvas = null;
var objContexte = null;

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

const init = ()=>{
    objCanvas = document.getElementById("canvasJeu");
    objContexte = objCanvas.getContext("2d");

    objContexte.fillStyle = "black";  // Fond 
    objContexte.fillRect(0,0,objCanvas.width, objCanvas.height);
    initNiveau();
    dessinerNiveau(); 
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
                    objCellule.binDisponible = true;
                    break;
                case 3: 
                    objCellule.type = "barre";
                    objCellule.binDisponible = true;
                    break;
                case 4:
                    objCellule.type = "brique";
                    objCellule.binDisponible = false;
                    break;
            }
            tabObjCellules.push(objCellule);
        }
    }
}

const dessinerNiveau = () => {
    for(cellule of tabObjCellules){
        switch(cellule.type){
            case "beton":
                let debutCellule_X = cellule.positionX;
                let debutCellule_Y = cellule.positionY;
                let longeurCellule = cellule.longeur;
                let hauteurCellule = cellule.hauteur;
                let ecartEntreBetons = hauteurCellule/10;
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
        }
    }

}

const obtenirTypeCellule = (intLigne, intColonne) => {
    let li = intLigne ;
    let col = intColonne ;
    for(cellule of tabObjCellules){
        if(cellule.ligne == li && cellule.colonne == col){
            return cellule.type;
        }
    }
}