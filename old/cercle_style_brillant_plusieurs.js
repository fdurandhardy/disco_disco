let random_cellule, random_couche,fill_col,fill_col_random,theta_start_random,theta_end_random;

let liste_random_restant;
let liste_random = []; 

let ampoule = 0; // Nombre de cellules allumées
let ampoule_supp_couche, ampoule_supp_cellule

function setup() {
  createCanvas(1080, 1080);
  background(0, 0, 0, 100);
  colorMode(HSB, Math.PI * 2, 100, 100, 100);
  strokeCap(SQUARE);

  frameRate(24);
  // createLoop({duration:3, gif:true, download:true,open:true});
}

function draw() {
  // paramètres modifiables
  const n_couche = 10; // Nombre de couche de cercle
  const epaisseur = 40; // Epaisseur de chaque couche
  const n_cellule = 10; // Nombre de cellule par couche
  const n_couleur = n_cellule; // Nombre de couleur différentes

  const glow_up = 1; // Intensité de la lumière
  const frequence = 2; 

  // paramètres non modifiables
  const cx = width * 0.5;
  const cy = height * 0.5;
  const pas_couleur = (Math.PI*2) / n_couleur;
  const theta = (Math.PI*2) / n_cellule;

  translate(cx, cy);

  if (frameCount == 1){
    liste_random_restant = Array(n_couche*n_cellule).fill(1);
  }

  if (frameCount%frequence == 0 & ampoule < liste_random_restant.length){
    // On ajoute une case qui s'allume à chaque frequence
    ampoule = ampoule + 1
    
    // On conserve la couche et la cellule sur laquelle c'est tombé afin de créer l'objet une fois qu'on aura tous les attributs
    random_ampoule_supp = random_pick(liste_random_restant, 1);
    liste_random_restant[random_ampoule_supp] = 0;

    ampoule_supp_couche = floor(random_ampoule_supp/n_couche);
    ampoule_supp_cellule = random_ampoule_supp%n_couche;
  }

    if (random_couche != n_couche){
      background(0, 0, 0, 100);
    }

  // on trace couche par couche le cercle (une epaisseur à la fois)
  for (let couche = 0; couche < n_couche; couche++) {
    // décalage servant à décaler entre les couches la couleur
    const decalage = theta / 2 * couche;
    // const decalage = (theta / 2*couche) % theta;
    // const decalage = 0;

    // On filtre la liste des cellules qui s'allument en ne conservant que celles qui sont sur la bonne couche
    let liste_cellule = liste_random.filter(ampoule => ampoule.couche === couche).map(couche_brille => couche_brille.cellule);
    // console.log(liste_cellule);


    // On trace ensuite les cellules une par une.
    for (let cellule = 0; cellule < n_cellule; cellule++) {
      fill_col = cellule % n_couleur * pas_couleur;
      const theta_start = theta * cellule + decalage;
      const theta_end = theta_start + theta;

      // On ajoute les coordonnées de la cellule qui s'allume UNE SEULE FOIS
      if(ampoule_supp_couche == couche & ampoule_supp_cellule == cellule){

        liste_random.push({
          couche : ampoule_supp_couche,
          cellule : ampoule_supp_cellule,
          fill : fill_col,
          theta_start : theta_start,
          theta_end : theta_end
        });
        ampoule_supp_couche = -1;
        ampoule_supp_cellule = -1;
      }

      push();
      if(liste_cellule.includes(cellule)){

        // stroke(fill_col, 90, 50,100);
        stroke("white");
      } else {
        stroke(fill_col, 100, 50);
        
      }
      strokeWeight(epaisseur/2);
        noFill();
        arc(0, 0, epaisseur * (couche + 1/2), epaisseur * (couche + 1/2), theta_start, theta_end);
      pop();
      
      // Quadrillage (ligne verticale séparant les cellule sur la même couche)
      push();
      stroke('#222222');
      strokeWeight(1);
      noFill();
      line(1/2*epaisseur*couche*Math.cos(theta_start),1/2*epaisseur*couche*Math.sin(theta_start),
      1/2*epaisseur*(couche + 1)*Math.cos(theta_start),1/2*epaisseur*(couche + 1)*Math.sin(theta_start));
      pop();
    }

    // Quadrillage (contour de chaque cercle)
    push();
    stroke('#222222');
    strokeWeight(1);
    noFill();
    arc(0,0,epaisseur * (couche), epaisseur * (couche), 0, Math.PI*2);

    // Le cercle extérieur n'est tracé que sur la dernière couche
    if (couche == n_couche-1){
    arc(0,0,epaisseur * (couche + 1), epaisseur * (couche + 1), 0, Math.PI*2);
    pop();
    }
  }

  // On rajoute l'effet lumineux seulement à la fin
//   liste_random.forEach(ampoule => {
//     push();
//     strokeCap(ROUND);
//     blendMode(ADD);
//     for (let glow = 0.5; glow < 1; glow += 0.05){
//       strokeWeight(glow*epaisseur*7/8);
//       stroke(ampoule.fill, 90, 5,100);
//       noFill();
//       arc(0, 0, epaisseur * (ampoule.couche + 1/2), epaisseur * (ampoule.couche + 1/2), ampoule.theta_start, ampoule.theta_end);
//     }
//     blendMode(BLEND);
//     pop();
    
//   });


}

function random_pick(liste, search_value) {
  
  if (!liste.includes(search_value)){
    return(null);
  }
  
  let indexes = [];
  for (let i = 0; i < liste.length; i++) {
    if (liste[i] === search_value) {
      indexes.push(i);
    }
  }
  
  random_lvl1 = Math.floor(Math.random()*indexes.length);
  
  return indexes[random_lvl1];
}