### 1. Követelményanalízis
#### 1.1. A Program Célja
  
 - Az alkalmazás lényegében véve egy TODO alkalmazás, melynek segítségével fel tudjuk jegyezni azokat a számunkra fontos dolgokat, amiket nem szeretnénk elfelejteni és fontos, hogy időben megcsináljuk őket. Ezen alkalmazás segítségével készíthetünk sima jegyzeteket, vagy akár ketogorizálva is felvehetjük az éppen aktuális tennivalóinkat, legyen az bevásárlás, takarítás vagy netán kertészkedés. Itt mindent egy helyen tudunk tárolni és gyorsan elérhető.
 + Az alkalmazás lényegében véve egy TODO alkalmazás, melynek segítségével fel tudjuk jegyezni azokat a számunkra fontos dolgokat, amiket nem szeretnénk elfelejteni és fontos, hogy időben megcsináljuk őket. Ezen alkalmazás segítségével készíthetünk sima jegyzeteket, vagy akár kategorizálva is felvehetjük az éppen aktuális tennivalóinkat, legyen az bevásárlás, takarítás vagy netán kertészkedés. Itt mindent egy helyen tudunk tárolni és gyorsan elérhető.
  
  Természetesen ezen jegyzetek csak a bejelentkezett felhasználók részére érhetőek el, aki vendégként érkezik az oldalra, az regisztráció után be tud jelentkezni és máris használhatja a felületet.
###### Funkcionális követelmények:
 + Regisztráció
   + A regisztráció során a felhasználónak meg kell adnia:
     + Felhasználónév (ellenőrizve lesz, hogy foglalt-e)
     + E-mail
     + Jelszó (kis-nagy betű, spec karakter, legalább 8 karakter)
 + Bejelentkezés
   + Azonosítás:
     + felhasználónév + jelszó megadása
   + Bejelentlezett felhasználók részére:
      + A főoldalon fel tud venni úgy jegyzetet, vagy a meglévőeket tudja kitörölni
      + A TODO menüpont alatt kategóriákat tud készíteni
      + Kategóriákhoz hozzá tud adni elemeket, melyek utána megjelennek egymás alatt az adott kategóriánál.
      + Új és meglévő elemeket kategóriákhoz rendelhet és kategóriák szerint megjeleníthet
      + A még el nem végzett elemeket ki lehet törölni, vagy meg lehet őket jelölni (done).
    
###### Nem funkcionális követelmények:
  + **Könnyű áttekinthetőség:** Használjuk olyan színeket, melyek nem zavarók a felhasználóra nézve, legyen olvasható minden szöveg, a feliratok legyenek egyértelműek
  + **Használhatóság:** Könnyű áttekinthetőség, ésszerű elrendezés, könnyű kezelhetőség, minden nagyjából egy kattinstásra legyen
  + **Megbízhatóság:** jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
  + **Megbízhatóság:** Jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
  + **Karbantarthatóság:** könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt
  
#### 1.2. Szakterületi fogalomjegyzék
  + **Note** : Jegyzet, rendelkezik névvel és tartalommal
  + **Todo** : Elvégzendő feladat, csak névvel rendelkezik
  + **Add Todo** : Elvégzendő feladat hozzáadása
  + **Add Note** : Jegyzet hozzáadása
  + **Category** : Kategória, minden elvégzendő feladat egy adott kategóriához van hozzárendelve
  + **Edit** : Szerkesztés
### 1.3. Használatieset-modell, funkcionális követelmények
**Vendég** : Csak a publikus oldalakat éri el
  + **Bejelentkezés / Regisztráció**
