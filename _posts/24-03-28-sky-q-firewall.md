---
layout: post
title: "Sky Q, Sky Q Mini e i firewall"
date:   2024-03-28 18:00:58 +0100
categories: [networking]
tags: [networking, firewall, sky, sky q, sky q mini, iptables, ufw, linux, debian, ubuntu, raspbian, raspberry pi, raspberrypi, connessione asente, connessione]
author: Perf
---

Durante la configurazione del mio nuovo router, un [Mikrotik hEX S](https://www.amazon.it/dp/B07F7HDRKX) con [routerOS](https://help.mikrotik.com/docs/display/ROS/RouterOS), mi sono imbattuto in un problema con la connessione di Sky Q e Sky Q Mini. Data la natura interessante del problema (che vale per qualsiasi router con firewall), ho deciso di scrivere un articolo per aiutare chiunque si trovi nella mia stessa situazione.

## Il problema

Una volta configurato il firewall, ho notato che Sky Q e Sky Q Mini non riuscivano a connettersi a internet: o meglio, si connetteva ma "faceva finta" di non avere connessione!

### Come l'ho capito?

Andando nel menù principale ho potuto notare che in tutte le tab segnalava "Per utilizzare il servizio, il tuo Sky Q deve essere connesso a internet".

![Sky Q - Connessione assente](/assets/sky-q-non-connesso-rete-internet.png)

Però, andando nelle impostazioni di rete, potevo vedere che il dispositivo era connesso alla rete locale e aveva un indirizzo IP assegnato.

Ciò è molto strano, perché se il dispositivo è connesso alla rete, dovrebbe essere in grado di connettersi a internet. Da qui l'idea: provare ad accedere alle App usando i comandi vocali. Ebbene, funzionava! Dicendo "*Hey Sky, apri Netflix*" o "*Hey Sky, apri YouTube*" il dispositivo apriva le App e funzionava correttamente. Riavviando il dispositivo, la connessione sembrava tornare a funzionare, ma dopo qualche secondo il problema si ripresentava.


### Internet

Cercando su internet, non ho trovato molto, tranne questo [articolo](https://forum.fibra.click/d/33520-skyq-platinum-e-mikrotik) che mi ha aiutato a capire il problema.

Il problema è che Sky Q e Sky Q Mini utilizzano un sistema di controllo della connessione molto poco intelligente. In pratica, se non riescono a pingare il gateway, segnalano che non c'è connessione. Questo è un problema perché il router non risponde ai ping.

## Soluzione

Come soluzione, ho creato una regola di firewall per rispondere ai ping solo da Sky Q e Sky Q Mini.

![alt text](/assets/fw-sky-rule.png)

Grazie a questa regola, Sky Q e Sky Q Mini possono pingare il gateway e quindi segnalare correttamente la connessione. 