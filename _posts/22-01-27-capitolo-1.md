---
layout: post
title: "capitolo 1"
date:   2022-01-27 17:16:58 +0100
categories: tests
author: perf
---
in questo articolo introdurrò il libro "linux basics for hackers"

## termini da sapere

+ **Binaries**: questo termine si riferisce a file che possono essere eseguiti, come gli eseguibili di windows. Essi risiedono generalmente nelle cartelle *usr/bin* o *user/sbin* (esempi: ps, cat, ls e ifconfig, google...).
+ **Linux è case sensitive**: *desktop* e diverso da *Desktop*
+ **Home**: ogni utente possiede una cartella home
+ **Root**: privilegi di amministratore
+ **Shell**: un ambiente e interprete  per runnare comandi in linux. La più utilizzata si chiama *bash*

## Linux Filesystem

---
 (/) la *root* del filesystem è in cima all'albero e le seguenti sono le più importanti sottocartelle da conoscere:
+ **/root**: la home dir del root user
+ **/etc**: generalmente contiene i file di configurazione di linux
+ **/home**: la home directory dell'utente
+ **/mnt**: dove gli altri filesystem vengono collegati o montati nel filesystem
+ **/media**: dove CD e USB vengono montate nel filesystem
+ **/bin**: dove risiedono i binaries
+ **/lib**: dove si possono trovare le librerie (programmi condivisi simili  ai DDL di windows)

## comandi utili

- pwd: (*print working directory*)
+ whoami
+ cd
+ ls
+ man
+ locate (file da cercare)
