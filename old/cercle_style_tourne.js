let random_cellule, random_couche,fill_col,fill_col_random,theta_start_random,theta_end_random;

let liste_random_restant;
let liste_random = []; 

let ampoule = 0; // Nombre de cellules allumées
let ampoule_supp_couche, ampoule_supp_cellule

let theta_avance_start = 0; // rotation actuelle des cercles

let decalage;

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
  const n_cellule = 20; // Nombre de cellule par couche
  const n_couleur = n_cellule; // Nombre de couleur différentes

  const couche_tourne = [0,1,2,3,4,5,6,7,8,9]; // liste des couches qui tournent
  const theta_avance = 0.000; // vitesse de rotation
  const theta_aceleration = 5; // Coefficient d'acceleration entre les couches

  const glow_up = 1; // Intensité de la lumière
  const frequence = 2; 

  // paramètres non modifiables
  const cx = width * 0.5;
  const cy = height * 0.5;
  const pas_couleur = (Math.PI*2) / n_couleur;
  const theta = (Math.PI*2) / n_cellule;

  translate(cx, cy);

  // on trace couche par couche le cercle (une epaisseur à la fois)
  for (let couche = 0; couche < n_couche; couche++) {
    // if (couche_tourne.includes(couche)){
    //   decalage = theta_avance_start;
    //   theta_avance_start += theta_avance;
    // } else {
    //   decalage = 0;
    // }

    if (couche%2 == 0){
      decalage = theta_avance_start*(theta_aceleration*couche/n_couche);
    } else {
      decalage = -theta_avance_start*(theta_aceleration*couche/n_couche);
    }
    theta_avance_start += theta_avance;
    // décalage servant à décaler entre les couches la couleur
    decalage = decalage + theta / 2 * couche;
    // const decalage = (theta / 2*couche) % theta;
    // const decalage = 0;


    // On trace ensuite les cellules une par une.
    for (let cellule = 0; cellule < n_cellule; cellule++) {
      fill_col = cellule % n_couleur * pas_couleur;
      const theta_start = theta * cellule + decalage;
      const theta_end = theta_start + theta;

      push();
        stroke(fill_col, 100, 50);
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