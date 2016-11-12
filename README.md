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
      + A főoldalon talál egy leírást arról, hogy mit hogyan kell használni
      + A Notes oldalon látja az összes felvett jegyzetét és ezeket tudja törölni vagy szerkeszteni
      + Az "+ Add Notes" menüpont fel tud venni úgy jegyzetet
      + Az "+ Add Todos" menüpont alatt új teendőt tud felvenni és még nem létező kategória esetén kategóriákat tud készíteni és a teendőt valamelyikhez hozzá tudja relndelni
      + A Todos oldalon meglévő elemeket kategóriákhoz rendelheti és kategóriák szerint megjelenítheti, valamint teendőket törölhet, szerkeszthet
         
###### Nem funkcionális követelmények:
  + **Könnyű áttekinthetőség:** Használjuk olyan színeket, melyek nem zavarók a felhasználóra nézve, legyen olvasható minden szöveg, a feliratok legyenek egyértelműek
  + **Használhatóság:** Könnyű áttekinthetőség, ésszerű elrendezés, könnyű kezelhetőség, minden nagyjából egy kattinstásra legyen
  + **Megbízhatóság:** jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
  + **Megbízhatóság:** Jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
  + **Karbantarthatóság:** könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt
  
#### 1.2. Szakterületi fogalomjegyzék
  + **Note:** Jegyzet, rendelkezik névvel és tartalommal
  + **Todo:** Elvégzendő feladat, csak névvel rendelkezik
  + **Add Todo:** Elvégzendő feladat hozzáadása
  + **Add Note:** Jegyzet hozzáadása
  + **Category:** Kategória, minden elvégzendő feladat egy adott kategóriához van hozzárendelve
  + **Edit:** Szerkesztés
  
#### 1.3. Használatieset-modell, funkcionális követelmények
**Vendég:** Csak a publikus oldalakat éri el

   + Bejelentkezés / Regisztráció
  
**Bejelentkezett felhasználó:** A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.
  
  + **Főoldal (Home):** Ez az oldal tartalmaz egy leírást arról, hogy milyen menüpontok alatt mit talál, és hogy hogyan tud felvenni új jegyzetet, illetve teendőt.
  + Jegyzetek (Notes)
  + Teendők (Todos)
  + Új jegyzet felvétele (Add Note)
  + Új teendő felvétele (Add Todo)
  + Meglévő jegyzet törlése
  + Meglévő kategória törlése
  + Meglévő teendő törlése kategóriából
  + Meglévő jegyzet szerkesztése
  + Meglévő teendő szerkesztése
  
![Doit usecase diagram](/docs/images/Doit_usecase.JPG)

**Egy folyamat leírása**
  + **Meglévő jegyzet szerkesztése:**
   1. A felhasználó az oldalra érkezve bejelentkezik vagy regisztrál
   2. Regisztráció után megtekintheti a jegyzeteit listázó oldalt, ahol kiválaszthatja a szerkeszteni kívánt jegyzetet.
   3. Rákattint az "Edit" gombra
   4. Az "Edit" oldalon megadja az új adatokat (Név (name), Tartalom (content))
   5. A "Save (mentés)" gombra kattintva elmenti a változtatásokat

![Doit action diagram](/docs/images/action_diagram.png)

### 2. Tervezés
#### 2.1 Architektúra terv
###### 2.1.1 Komponensdiagram

![Doit component diagram](/docs/images/component_diagram.png)

###### 2.1.2. Oldaltérkép:
**Publikus**
  + Bejelentkezés / Regisztráció
**Bejelentkezett**
  + Főoldal
  + Jegyzetek
    + Új jegyzet felvétele
    + Jegyzet törlése
    + Jegyzet szerkesztése
  + Teendők
    + Új teendő felvétele
    + Teendő szerkesztése
    + Teendő törlése
    + Kategória törlése (hozzátartozó teendőkkel együtt)
    + Kategória nevének megváltoztatása
    + Adott kategóriához teendő felvétele
   
###### 2.1.3 Végpontok
  + GET / : főoldal
  + GET /notes : jegyzetek oldal
  + GET /todos : teendők oldal
  + GET /loginSignUp : bejelentkező / regisztrációs oldal
  + POST /login : bejelentkező adatok felküldése
  + POST /register : regisztrációs adatok felküldése
  + GET /logout : kijelentkezés (átirányítás a bejelentkező oldalra)
  + GET /createNote : új jegyzet készítése
  + POST /createNote : új jegyzet felvételéhez szükséges adatok felküldése
  + GET /editNote/:id : jegyzet módosítása (oldal megjelenítése az adatokkal)
  + GET /deleteNote/:id : jegyzet törlése
  + POST /editNote/:id : jegyzet tényleges módosítása a beadott adatok felküldésével
  + POST /addCategory : kategória hozzáadása az adatok felküldésével
  + GET /createTodo : úgy teendő készítése (oldal megjelenítése)
  + POST /createTodo : új teendő felvételéhez szükséges adatok felküldése
  + GET /editTodo/:id : teendő modósítása (oldal megjelenítése)
  + POST /editTodo/:id : teendő tényleges modósítása a bevitt adatok felküldésével
  + POST /editCategory/:id : kategória módosítása a bevitt adatok elküldésével
  + GET /deleteTodo/:id : teendő törlése
  + GET /deleteCategory/:id : kategória törlése (törli a hozzá tartozó teendőket is)
  
#### 2.2. Felhasználói-felület modell
###### 2.2.1 Oldalvázlatok:

**Bejelentkezés / Regisztráció**
![Doit Login/ Sign up](docs/images/LoginSignUp_mockup.jpg)

**Főoldal**

![Doit Homepage](docs/images/Home_mockup.jpg)

**Jegyzetek (Notes)**
![Doit Notes mockup](docs/images/Notes_mockup.jpg)

**Jegyzet felvétele (Add note)**
![Doit Add Note mockup](docs/images/Add_Note_mockup.jpg)

**Jegyzet szerkesztése (Edit note)**
![Doit Edit Note mockup](docs/images/Edit_Note_mockup.jpg)

**Teendők (Todos)**
![Doit Todos mockup](docs/images/Todos_mockup.jpg)

**Teendő felvétele**
![Doit Add Todo mockup](docs/images/Add_Todo_mockup.jpg)

**Teendő szerkesztése**
![Doit Edit Todo mockup](docs/images/Edit_Todo_mockup.jpg)

#### 2.2.2.Designtervek (végső megvalósítás kinézete):

**Bejelentkezés / Regisztráció**
![Doit Login/ Sign up design](docs/images/LoginSignUp_design.jpg)

**Sikeres regisztráció**
![Doit reg. success design](docs/images/Registration_ success_design.JPG)

**Rossz jelszó**
![Doit Incorrect password design](docs/images/Incorrect_password_design.JPG)

**Főoldal**
![Doit Welcome page design](docs/images/Welcomepage_design.JPG)

**Jegyzetek (Notes)**
![Doit Notes design](docs/images/Notes_design.JPG)

**Jegyzet felvétele menüpont**
![Doit Add Note option design](docs/images/Add_Note_option_design.JPG)

**Jegyzet felvétele (Add note)**
![Doit Add Note design](docs/images/New_Note_design.JPG)

**Jegyzet szerkesztése (Edit note)**
![Doit Edit Note design](docs/images/Edit_Note_design.JPG)

**Teendők (Todos)**
![Doit Todos design](docs/images/Todos_design.jpg)

**Teendő felvétele menüpont**

![Doit Add Todo option design](docs/images/Add_Todo_option_design.JPG)

**Teendő felvétele**
![Doit Add Todo design](docs/images/New_Todo_design.JPG)

**Teendő felvétele adott kategóriához**

![Doit Add Todo from category panel design](docs/images/New_Todo_from category_panel_designl.JPG)

**Teendő szerkesztése**
![Doit Edit Todo design](docs/images/Edit_Todo_design.JPG)

**Kategória nevének szerkesztése**

![Doit Edit Category Name design](docs/images/Change_Category_Name_design.JPG)

**Kijelentkezés opció**

![Doit Logout Design](docs/images/Logout_design.JPG)

#### 2.2.3. Osztálymodell
**Adatmodell**

![Doit Database diagram](docs/images/database_diagram.png)

#### 2.2.4. Dinamikus működés
**Szekvencia diagram**

Vegyük példának a regisztrációt, majd egy új elem felvételét, szerkesztését, törlését, mindezt szekvenciadiagrammon.

![Doit sequence diagram](docs/images/sequence_diagram.JPG)

#### 3. Implementáció
###### Fejlesztőkörnyezet

Visual Studio Code + Adonis.js + Node.js + Express Admin
  
  + Telepítsük a Node.js-t (töltsük le a legfrisebb változatot)
  + Github account szükséges, további információk itt találhatók a git konfigurálásához:
    + [Github config ] (https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
  + Githubon létrehozunk egy új repositoryt
  + A saját gépünkön tetszőleges helyen létrehozunk egy mappát
  + Command line megnyitása, majd lépjünk be ebbe a mappába
  + Adjuk ki ezt a parancsot: git config --global url."https://".insteadOf git://
  + Majd ezt: npm i adonis-cli hogy telepítsük az adonist
  + Majd: git clone https://github.com/username/reponame.git
  + Majd állítsuk be a git repót, ahova dolgozni fogunk: git remote add origin https://github.com/user/repo.git
  + Miután leklónoztuk a repositoryt, nyissuk meg visual studio code-ban
  + A command line-ban írjuk be ezt a parancsot, hogy locálban fusson a serverünk: npm run dev
  + Majd ugyan ebbe a mappába telepítsük az adatbázis kezelőnket is: npm i --save sqlite3
  + Majd config/database.js beállítása
  + Majd User tábla létrehozása: node ace auth:setup
  + Majd ugyan ebbe a mappába telepítjük az express-admint: npm install express-admin
  + Konfig mappa: mkdir config\express-admin
  + Indítás: node_modules\.bin\admin config\express-admin
  + Böngésző: Localhost:4444 (ezen fut az express-admin) és localhost:3333 (ezen fut a node.js server)
  
  
