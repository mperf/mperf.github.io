---
layout: post
title: "Mainstage: a Social Network for Music"
date:   2023-07-22 17:00:58 +0100
categories: [projects, ita]
tags: [bootstrap, mainstage, SNM, website, coding, unimi, Statale di Milano]
author: Perf
---

Questo progetto è stato sviluppato per un esame. Il source code verrà reso pubblico a conclusione del tempo disponibile alla consegna di tutti i progetti del corso. Di seguito una relazione dettagliata su tutti gli aspetti del servizio creato da me.

## Social Network for Music - Mainstage

Mainstage è un web service per la condivisone di playlist, sviluppato con Express.js.
La piattaforma offre funzionalità di ricerca di canzoni e playlist della piattaforma create dagli utenti, nonchè la creazione, gestione e organizzazione di playlist.

## Core functionalities

### Gestione Utenti

Il servizio permette una gestione completa dell'utente: creazione, modifica e cancellazione dalla piattaforma. Di seguito tutte le informazioni del documento mongo della collezione users.

| Tabella: Users      | Descrizione                                                | index |
|---------------------|------------------------------------------------------------|-------|
| Object_id            | id univoco del documento                                     | &#x2713;      |
| name                | Nome dell'utente                                           |       |
| surname             | Cognome dell'utente                                        |       |
| nickname            | Nickname unico                               |  	&#x2713;     |
| generiPreferiti     | Generi musicali preferiti dall'utente                       |       |
| gruppiPreferiti     | Gruppi musicali preferiti dall'utente                       |       |
| mail                | Indirizzo email dell'utente                                |   	&#x2713;    |
| password            | Password dell'utente (hash)                      |       |
| birthdate           | Data di nascita dell'utente                                |       |
| playlistSeguite     | Playlist seguite dall'utente                               |       |

*esempio di documento della collezione users, il nome dei parametri può variare*

### endpoint REST relativi

<center>
<img src="/assets/mainstage/1.png">
</center>
*screenshot dello swagger*

## Playlist

Le playlist sono la funzionalità principale del servizio. Le capacità sono affini alla logica degli utenti, quindi è possibile crearle, modificarle ed eliminarle. Vi è inoltre la possibilità di riordinare le canzoni in modo semplice e immediato.

### Condivisione tra utenti
Il servizio permette la condivisione di playlist: in fase di creazione e modifica verrà chiesto all'utente se desidera rendere la playlist privata, ovvero visibile solo a lui, o pubblica, visibile a tutti gli utenti della piattaforma. Si ha anche la possibilità, tramite la homepage, di **seguire** una playlist, permettendo la visualizzazione rapida, tramite la pagina di playlist, di tutte le playlist seguite.




| Tabella: Playlist   | Descrizione                                                | index |
|---------------------|------------------------------------------------------------|-------|
| Object_id            | id univoco del documento                                     | &#x2713;      |
| name                | Nome della playlist                                        |       |
| descrizione         | Descrizione della playlist                                 |       |
| hashtags            |hashtag associati alla playlist             |       |
| visibility          | Visibilità della playlist (pubblica, privata, condivisa)    |       |
| img                 | riferimento all'immagine associata alla playlist           |       |
| dataCreazione       | Data di creazione della playlist                           |       |
| canzoni             | array di id_canzoni nella playlist                           |       |
| user_id             | ID univoco dell'utente che ha creato la playlist                    |       |

*esempio di documento della collezione users, il nome dei parametri può variare*

### endpoint REST relativi

<center>
<img src="/assets/mainstage/2.png">
</center>
*screenshot dello swagger*
## Songs

Le canzoni, componente principale della piattaforma, non vengono direttamente salvate nel database, bensì ottenute in base al loro **id**. 

<center>
<img src="/assets/mainstage/3.png">
</center>
*screenshot di un documento 'playlist'*

Le informazioni principali mostrate sono:
- Titolo
- Artista/i
- Album
- Durata
- Copertina

## Architettura del servizio
<center>
<img src="/assets/mainstage/4.png">
</center>
*immagine esplicativa dell'architettura del servizio*

## MongoDB & Spotify API

Le basi di dati utilizzate sono due:
- **MongoDB**: database non relazionale in cui sono conservate le collezioni **users** e **playlists**
- **Spotify API**: API proprietarie che forniscono informazioni su brani, artisti e album mostrati in Mainstage

## Express.js 

Express.js è un web framework basato su Node.js che permette di realizzare in modo efficiente API.

## Scelte implementative & Security

**Di seguito i tool più rilevanti utilizzati per la realizzazione del servizio.**

#### JWT
I token JWT, JSON Web Token, sono dei token che permettono l'autenticazione di un'utente in modo **immediato** e **sicuro**.

<center>
<img src="/assets/mainstage/5.png">
</center>

*immagine esemplificativa sul funzionamento dei token JWT*
#### Funzionamento
Il funzionamento dei token JWT si basa su tre componenti principali: l'intestazione (header), il payload (contenuto) e la firma (signature).

L'intestazione contiene informazioni sul tipo di token e l'algoritmo di firma utilizzato. Il payload contiene le informazioni specifiche dell'applicazione o i dati personalizzati che vengono trasmessi insieme al token, come l'identità dell'utente o le autorizzazioni. Entrambe le sezioni sono rappresentate come oggetti JSON e vengono codificate in Base64 per creare una stringa.

La firma viene utilizzata per verificare l'autenticità del token e proteggerne l'integrità. Viene calcolata utilizzando una chiave segreta con un algoritmo di firma specificato nell'intestazione. La firma viene aggiunta al token come terza parte separata da un punto.

<center>
<img src="/assets/mainstage/6.png">
</center>
*screenshot del sito jwt.io, utilizzato per analizzare in modo rapido token*

Quando un client invia una richiesta a un server, include il token JWT nell'intestazione dell'autorizzazione o in un altro campo appropriato. Il server riceve il token e verifica la sua validità. La verifica coinvolge la decodifica del token, il controllo dell'intestazione e della firma e, se necessario, la verifica delle informazioni nel payload.

```javascript=
client=req.cookies.token
  try {
    jwt.verify(client,process.env.JWT_SECRET) 
  } catch (error) {
    console.log("err "+error)
    res.status(401).send({"code":401, "message":"JWT error"})
    return
  }
```
*snippet di codice di Mainstage utilizzato per la verifica del token*

---

#### MongoSanitize

[mongoSanitize](https://www.npmjs.com/package/express-mongo-sanitize) è un middleware node scaricabile che permette l'individuazione e rimozione di eventuali tentativi di *noSQL injection*.

<center>
<img src="/assets/mainstage/7.png">
</center>
*esempio di richiesta con possibile noSQL injection*
<center>
<img src="/assets/mainstage/8.png">
</center>
*input sanitized da Mongosanitize*

---

#### Validator
[validator](https://www.npmjs.com/package/validator) è un middleware node scaricabile che permette di verificare la conformità di vari dati secondo uno **standard**

```javascript=
if(!validator.isEmail(user.mail)){
    response['message']='invalid email'
    
  }
```
*snippet di codice con utilizzo di validator*

---

#### Multer
[Multer](https://www.npmjs.com/package/multer) è un middleware node scaricabile che permette l'upload di file.
- **plus**: facile implementazione di upload di immagini per le copertine delle playlist.
- **malus**: con docker, il path uploads non è persistente. Ciò significa che quando il container viene eliminato, di conseguenza lo saranno pure le immagini.

<center>
<img src="/assets/mainstage/9.png">
</center>
*folder uploads con immagini caricate*

---

#### Dotenv
[dotenv](https://www.npmjs.com/package/dotenv) è un modulo node che permette l'implementazione delle variabili salvate nel file ```.env```. In Mainstage viene implementato in **due modi**:

- **in locale**: con l'utilizzo del file

```js=
# THESE ARE FOR LOCAL SETTINGS, FOR DOCKER REFER TO DOCKER-COMPOSE
PORT="3300"
CLIENT_ID="xxx"
SECRET="xxx"
TOKEN_URL="https://accounts.spotify.com/api/token"
MONGO_URL="mongodb://admin:Mattia2101@10.21.1.21:27017"
JWT_SECRET="xxx"

```
*esempio di file .env*

- **con docker**: implementando le variabili nel ```docker-compose.yaml```

```dockerfile=
env_file: ./mainstage-app/.env
    environment:
      - MONGO_URL=mongodb://admin:Mattia2101@mongodb_snm:27017
      - CLIENT_ID=xxx
      - SECRET=xxx
      - TOKEN_URL=https://accounts.spotify.com/api/token
      - PORT=3300
      - JWT_SECRET=xxx


```
*snippet del file docker-compose.yaml*

---
#### Swagger-ui & autogen

[swagger-UI](https://www.npmjs.com/package/swagger-ui-express) e [autogen](https://www.npmjs.com/package/swagger-autogen) sono moduli node che permettono la realizzazione dello **swagger**.
> Swagger è un insieme di strumenti open-source che facilitano la progettazione, la creazione, la documentazione e il consumo di servizi web basati su API (Application Programming Interface). Fornisce un modo standardizzato per descrivere le API RESTful, inclusi gli endpoint, i parametri, i tipi di dati, le risposte e altre informazioni pertinenti.

<center>
<img src="/assets/mainstage/10.png">
</center>
*parte dello swagger di mainstage, accessibile a /api-docs*

## Front-end

Di seguito tutte le scelte implementative lato Front-end.

#### Bootstrap
Bootstrap è un framework front-end open-source molto popolare per lo sviluppo di siti web e applicazioni web responsive. Componente principale di Mainstage e del suo stile.

#### Mainstage Design

Mainstage segue un design minimalista, pulito e facilmente comprensibile.

<center>
<img src="/assets/mainstage/11.png">
</center>
*screenshot della pagina di login di Mainstage*

#### Core project quests

Di seguito le **quest** richieste per la realizzazione del progetto

- [x] Registrazione e login al sito
- [x] Gestione dati utente
- [x] Aggiunta/modifica/Cancellazione playlist pubbliche e private
- [x] visualizzazione informazioni playlist, brani e utenti
- [x] ricerca e visualizzazione brani

#### Registrazione e Login a Mainstage

<center>
<img src="/assets/mainstage/12.png">
</center>
*pagina di registazione di Mainstage*

La registazione e il login al sito vengono effettuate a **/login**, con un bottone che permette lo switch tramite javascript per la selezione di login e signup.

#### Endpoint REST implementati

- per **login**: Viene implementato l'endpoint POST ```/login``` che, oltre al verificare la correttezza sintattica delle informazioni, verifica che l'utente esista e che *email* e *password* coincidano.
- per **signup**: Vengono implementati diversi endpoint:
    - **/getGenres**, endpoint GET per ottenere da spotify i generi da selezionare come preferiti.
    - **/getArtists/{name}**: endpoint GET per ottenere da spotify un'artista in base alla query effettuata nella searchbar per selezionare gli artisti preferiti.
    - **/signup**, endpoint POST che permette la verifica sintattica delle informazioni inserite, che il *nickname* o la *mail* non siano già presenti e, infine, l'inserimento dell'utente nel database.

#### Extra
Particolare lavoro è stato fatto per la realizzazione della selezione degli artisti preferiti. Permette di cercare e scegliere tutti gli artisti presenti su spotify e, grazie al pratico menu dropdown, si ha la possibilità di selezionare, deselezionare e vedere gli artisti scelti.

<center>
<img src="/assets/mainstage/13.png">
</center>
*screenshot esemplificativo*

#### Gestione dati utente

<center>
<img src="/assets/mainstage/14.png">
</center>
*pagina di gestione utente*

I dati dell'utente, inseriti in fase di signup, sono modificabili interamente nella pagina ```/profile```. Inoltre si ha la possibilità di eseguire logout e l'eliminazione del profilo che, oltre che a cancellare l'utente, cacellerà tutte le playlist create e eliminerà a tutti gli utenti riferimenti a tali playlist se seguite.

```javascript=
//delete user
    var dbUser= await pwmClient.db("pwm").collection('users').deleteOne({"nick" : userJWT.username})
    //delete followed playlist
    //find plist id
    arrayFollowed=await pwmClient.db("pwm").collection('playlists').find({"user_id" : findUser._id},{ projection: {_id: 1 } }).toArray()
    arrayNoObj=[]
    console.log(arrayFollowed)
    //stringify id
    arrayFollowed.forEach(element => {
      arrayNoObj.push(element._id.toString())
    });
    console.log(arrayNoObj)
    //delete references 
    deleteFollowed = await pwmClient.db("pwm").collection('users').updateMany({"followed": {$in : arrayNoObj}}, {$pull : {"followed" :  {$in : arrayNoObj}}} )
    //delete playlist linked to user
    deletePlaylist=  await pwmClient.db("pwm").collection('playlists').deleteMany({"user_id" : findUser._id})
```
*NB: non tutto il codice di eliminazione presente, solo uno snippet*

#### Endpoint REST implementati

Oltre che ai sopracitati **/getGenres** e **/getArtists/{name}**, per la modifica delle preferenze di artisti e generi, abbiamo:

- **/logout**: il token jwt viene revocato, l'utente sarà reindirizzato al login.
- **/user**: richiesta con metodo DELETE, permette la cancellazione totale dell'utente (come spiegato prima).
- **/user**: richiesta con metodo GET, permette di ottenere le informazioni presenti nel db dell'utente.
- **/user**: richiesta con metodo PUT, permette la modifica di tutte le informazioni dell'utente, anche mail, nickname e password che sono indici univoci.

screenshot dello swagger con gli endpoint utente mostrato [in precedenza](#endpoint-REST-relativi)

#### Aggiunta/modifica/Cancellazione playlist pubbliche e private

<center>
<img src="/assets/mainstage/15.png">
</center>
*screenshot della pagina playlist*

Alla pagina ```/playlist``` possiamo eseguire una prima parte delle operazioni riguardanti alle playlist, core feature del servizio. Si possono visualizzare le proprie playlist pubbliche, private e quelle seguite, realizzate dagli altri utenti della piattaforma. Con l'apposito tasto è possibile aprire un menu che permette l'inserimento dei dati di una nuova playlist. Si è scelto di rendere la copertina della playlist caricabile dall'utente per renderle personalizzabili in ogni loro punto.

<center>
<img src="/assets/mainstage/16.png">
</center>
*screenshot menù creazione di playlist*

#### Endpoint REST implementati

- **/playlist**: richiesta con metodo POST per la creazione delle playlist. Vengono usati i ```multipart/form-data```come richiesto da [multer](#Multer).
- **/playlist-yours**: endpoint GET per ottenere i dati delle proprie playlist mostrate.
- **/playlist-followed**: endpoint GET per ottenere i dati delle playlist seguite.

#### Extra
Il tasto di creazione delle playlist è stato disegnato e successivamente sviluppato tramite il programma photoshop.
<center>
<img src="/assets/mainstage/17.png">
</center>
*sketch vs risultato finale*

### Visualizzazione informazioni playlist, brani e utenti
Vediamo ora la pagina di una playlist, situata a ```/playlistPage?p={playlist_id}```.
<center>
<img src="/assets/mainstage/18.png">
</center>
*pagina di playlist*

Qui possiamo trovare tutte le funzioni rimanenti per le playlist, che sono disponibili in base a se si è proprietari o no, ovvero:
- **per i proprietari di playlist:**
    - modifica
    - visualizzazione
    - cancellazione della playlist
    - riordine
    - cancellazione dei singoli brani

- **per gli altri utenti**:
    - visualizzazione
    - possibilità di seguire la playlist

#### Endpoint REST implementati
È già stato [precedentemente mostrato](#endpoint-REST-relativi1) lo swagger relativo, in breve, il funzionamento:

- **/verified/{id}** per verificare che l'utente sia il proprietario della playlist e, nel caso sia privata e non proprietaria, l'invio di un errore.
- **/playlist-song**: con metodo GET per ottenere le canzoni della playlist,
- se lo è:
    - **/playlist**: con i metodi PATCH e DELETE, rispettivamente per riordinare i brani e cancellare la playlist.
    - **/playlist-song**: con metodo DELETE che permette l'eliminazione dei singoli brani.
    - **/playlist-info**: con metodo PUT, permette di modificare i dati della playlist.
- se **non** lo è:
    - **/isfollowed/{id}**: con metodo GET, verifica se l'utente segue la playlist
    - **/follow-playlist**: con metodo POST, permette di seguire un playlist.
    - **/unfollow-playlist**: con metodo POST, permette di smettere di seguire un playlist.


# Extra

La funzione di **riordine** delle canzoni all'interno della playlist è implementato tramite una libreria esterna chiamata [sortable.js](https://github.com/SortableJS/Sortable). Permette facilmente di implementare un ordinamento *drag and drop* intuitivo.

<center>
<img src="/assets/mainstage/19.png">
</center>
*screenshot durante il riordine delle canzoni*

### Ricerca e visualizzazione brani

La ricerca e la visualizzazione dei brani può essere effettuata tramite la pagina ``/search``.
<center>
<img src="/assets/mainstage/20.png">
</center>

In questa pagina è possibile **cercare** qualsiasi brano presente su spotify e le playlist su Mainstage. Si ha la possibilità di cercare in base a:
**brani:**
- titolo canzone
- artista
- genere
- anno

**mentre per le playlist:**
- nome playlist
- hashtags
- brani all'interno

> Vi è data particolare attenzione agli **edge cases** di combinazioni possibili, rendendolo robusto e affidabile.

#### Endpoint REST implementati

L'endpoint principale utilizzato è ```/search```, metodo POST che permette di eseguire la ricerca sia per i brani che per le playlist. Viene poi usato l'endpoint ```/playlist``` con metodo PUT, che permette l'aggiunta dei brani alle proprie playlist.

### Homepage - Extra
<center>
<img src="/assets/mainstage/21.png">
</center>
*screenshot della homepage*

Una volta effettuato l'accesso a Mainstage, la homepage accoglierà l'utente con una selezione di brani da spotify e le playlist pubbliche create dagli utenti della piattaforma. Da desktop, come nelle pagine search e playlists, si hanno a disposizione dei controlli (previous e next) che permettono lo scorrimento orizzontale degli elementi. Vengono utilizzati i due endpoint ```/topFifty```e ```/playlist-public``` che servono rispettivamente ad ottenere i brani top 50 global e ottenere le playlist pubbliche.

## Responsiveness - Mobile view

Particolare attenzione è stata data alla versione mobile, adattata alle esigenze dello schermo di dimensioni ridotte e dell'input **touch**. L'esempio più rilevante è la visualizzazione dei brani nella homepage e delle playlist in tutta la piattaforma, adattate con uno scorrimento touch che sostituiscono i comani *previous* e *next* usati sul desktop.

<center>
<img src="/assets/mainstage/22.jpeg">
</center>
<center>
<img src="/assets/mainstage/23.jpeg">
</center>



## Virtualizzazione & server

Il servizio è stato virtualizzato tramite docker, tramite il file ```docker-compose.yaml```verranno generati due container: mongodb_snm e snm-mainstage_app.
<center>
<img src="/assets/mainstage/24.png">
</center>
*screenshot dei container running sul server*

### Architettura del servizio

Il servizio è reso disponibile dal mio server personale, tramite una *virtual machine*  utilizzando l'OS [unraid](https://unraid.net/). Sulla repository di [github](https://github.com/mperf/SNM-mainstage) si possono trovare le istruzioni su come avviare i container sul proprio server. tramite un Dynamic Domain Name System (DDNS) associo il mio ip ad un dominio intermedio, che verrà a sua volta associato tramite [cloudflare](https://cloudflare.com) al mio personale dominio: mainstage.mattiaperfumo.it 

<center>
<img src="/assets/mainstage/25.png">
</center>

## link utili

- [live test del sito](http://mainstage.mattiaperfumo.it)
- [repo github](http://github.com/mperf/SNM-Mainstage)