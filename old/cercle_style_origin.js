function setup() {
  createCanvas(1080, 1080);
  background(255);
  // angleMode(DEGREES);
  colorMode(HSL, Math.PI * 2, 100, 100, 1);
  strokeCap(SQUARE);
}

function draw() {
  // paramètres modifiables
  const n_couche = 10; // Nombre de couche de cercle
  const epaisseur = 40; // Epaisseur de chaque couche
  const n_cellule = 20; // Nombre de cellule par couche
  const n_couleur = n_cellule; // Nombre de couleur différentes

  // paramètres non modifiables
  const cx = width * 0.5;
  const cy = height * 0.5;
  const pas_couleur = (Math.PI*2) / n_couleur;
  const theta = (Math.PI*2) / n_cellule;

  translate(cx, cy);

  // on trace couche par couche le cercle (une epaisseur à la fois)
  for (let couche = 0; couche < n_couche; couche++) {
    // décalage servant à décaler entre les couches la couleur
    const decalage = theta / 2 * couche;
    // const decalage = (theta / 2*couche) % theta;
    // const decalage = 0;


    // On trace ensuite les cellules une par une.
    for (let cellule = 0; cellule < n_cellule; cellule++) {
      const fill_col = cellule % n_couleur;
      const theta_start = theta * cellule + decalage;
      const theta_end = theta_start + theta;

      push();
      stroke(fill_col * pas_couleur, 100, 50);
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

}