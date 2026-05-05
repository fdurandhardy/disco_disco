let random_cellule, random_couche, fill_col, fill_col_random, theta_start_random, theta_end_random;
let n_couche = 10; 
let n_cellule = 10; 
let Couche_displayCount, Cell_displayCount;
let avecDecalage = true;
let decalage;

function setup() {
  createCanvas(1080, 1080);

  // --- INTERFACE FORCÉE EN HAUT ---
  let menu = createDiv();
  // On fixe le menu en haut à gauche de l'écran
  menu.style('position', 'fixed');
  menu.style('top', '10px');
  menu.style('left', '10px');
  menu.style('z-index', '9999'); // S'assure qu'il est au-dessus du canvas
  menu.style('background-color', 'rgba(255, 255, 255, 0.8)'); // Fond semi-transparent pour lire
  menu.style('padding', '10px');
  menu.style('border-radius', '5px');
  menu.style('font-family', 'sans-serif');

  // Bouton Couche
  let div1 = createDiv('Nombre de couches : ');
  div1.parent(menu);
  let Couche_btnLess = createButton('-');
  Couche_btnLess.parent(div1);
  Couche_btnLess.mousePressed(() => { if (n_couche > 1) n_couche--; });

  let Couche_btnMore = createButton('+');
  Couche_btnMore.parent(div1);
  Couche_btnMore.style('margin-left', '10px');
  Couche_btnMore.mousePressed(() => { n_couche++; });

  Couche_displayCount = createSpan();
  Couche_displayCount.parent(div1);
  Couche_displayCount.style('margin-left', '15px');
  Couche_displayCount.style('font-weight', 'bold');

  // Bouton Cellule
  let div2 = createDiv('Nombre de cellules par couche : ');
  div2.parent(menu);
  let Cell_btnLess = createButton('-');
  Cell_btnLess.parent(div2);
  Cell_btnLess.mousePressed(() => { if (n_cellule > 1) n_cellule--; });

  let Cell_btnMore = createButton('+');
  Cell_btnMore.parent(div2);
  Cell_btnMore.style('margin-left', '10px');
  Cell_btnMore.mousePressed(() => { n_cellule++; });

  Cell_displayCount = createSpan();
  Cell_displayCount.parent(div2);
  Cell_displayCount.style('margin-left', '15px');
  Cell_displayCount.style('font-weight', 'bold');
  // Bouton Décalage
  
  let div3 = createDiv('Décaler les cellules : ');
  div3.parent(menu);
  Decalage_btn = createButton(avecDecalage ? 'OUI' : 'NON');
  Decalage_btn.parent(div3);
  Decalage_btn.mousePressed(() => {
    avecDecalage = !avecDecalage;
    Decalage_btn.html(avecDecalage ? 'OUI' : 'NON');
  });

  // ------------------------------

  colorMode(HSB, Math.PI * 2, 100, 100, 1);
  strokeCap(SQUARE);
}

function draw() {
  // Mise à jour du compteur
  Couche_displayCount.html(n_couche);
  Cell_displayCount.html(n_cellule);

  const epaisseur = 40; 
  const n_couleur = n_cellule; 
  const frequence = 50; 

  const cx = width * 0.5;
  const cy = height * 0.5;
  const pas_couleur = TWO_PI / n_couleur;
  const theta = TWO_PI / n_cellule;

  background(0, 0, 100);
  translate(cx, cy);

  if (frameCount % frequence == 0) {
    random_couche = floor(random(0, n_couche));
    random_cellule = floor(random(0, n_cellule));
  }

  if (random_couche != n_couche) {
    background(0, 0, 0, 100);
  }

  for (let couche = 0; couche < n_couche; couche++) {
    if (avecDecalage){
      decalage = (theta / 2) * couche;
    } else {
      decalage = 0;
    }

    for (let cellule = 0; cellule < n_cellule; cellule++) {
      fill_col = (cellule % n_couleur) * pas_couleur;
      const theta_start = theta * cellule + decalage;
      const theta_end = theta_start + theta;

      push();
      if (cellule == random_cellule && couche == random_couche) {
        fill_col_random = fill_col;
        theta_start_random = theta_start;
        theta_end_random = theta_end;
        stroke(fill_col_random, 90, 50, 100);
      } else {
        stroke(fill_col, 100, 50);
      }
      strokeWeight(epaisseur / 2);
      noFill();
      arc(0, 0, epaisseur * (couche + 0.5), epaisseur * (couche + 0.5), theta_start, theta_end);
      pop();

      // Quadrillage vertical
      push();
      stroke('#222222');
      strokeWeight(1);
      line(
        0.5 * epaisseur * couche * Math.cos(theta_start), 0.5 * epaisseur * couche * Math.sin(theta_start),
        0.5 * epaisseur * (couche + 1) * Math.cos(theta_start), 0.5 * epaisseur * (couche + 1) * Math.sin(theta_start)
      );
      pop();
    }

    // Quadrillage cercles
    push();
    stroke('#222222');
    strokeWeight(1);
    noFill();
    arc(0, 0, epaisseur * couche, epaisseur * couche, 0, Math.PI * 2);
    if (couche == n_couche - 1) {
      arc(0, 0, epaisseur * (couche + 1), epaisseur * (couche + 1), 0, Math.PI * 2);
    }
    pop();
  }

  // Effet lumineux
  if (theta_start_random !== undefined) {
    push();
    strokeCap(ROUND);
    blendMode(ADD);
    for (let glow = 0.5; glow < 1; glow += 0.05) {
      strokeWeight(glow * epaisseur * 0.875);
      stroke(fill_col_random, 90, 5, 1);
      noFill();
      arc(0, 0, epaisseur * (random_couche + 0.5), epaisseur * (random_couche + 0.5), theta_start_random, theta_end_random);
    }
    pop();
  }
}