


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
    // objCanvas.width = window.innerWidth;
    // objCanvas.height = window.innerHeight;
    objContexte = objCanvas.getContext("2d");

    objContexte.fillStyle = "black";  // Fond 
    objContexte.fillRect(0,0,objCanvas.width, objCanvas.height);
    initNiveau();
    dessinerNiveau(); 
    dessinerLingots();

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
                case 5:
                    objCellule.type = "lingots";
                    objCellule.binDisponible = false;
                    break;
            }
            tabObjCellules.push(objCellule);
        }
    }
}

const dessinerNiveau = () => {
dessinerLingots()
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
                objContexte.save();
                objContexte.save();
                
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

const dessinerLingots = () => {
    /* PARCOURIR L'ARRAY DE CELLULES: SI LA CELLULE EST DE TYPE BETON ET LA CELLULE DE DESSUS 
    EST DU TYPE VIDE, ON PEU DONC PLACER UN LINGOT */
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
        celluleChoisie.binDisponible = false;
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

const transformerCellule = (intLigne, intColonne, strType) => {
    let li = intLigne ;
    let col = intColonne ;
    for(cellule of tabObjCellules){
        if(cellule.ligne == li && cellule.colonne == col){
            cellule.type = strType;
        }
    }
}