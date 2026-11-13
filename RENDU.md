POST, GET

- Le POST renvoie 201 Created avec la citation créée, et le GET après redémarrage renvoie 200 OK avec la citation conservée.

Survie au redémarrage

- Les données sont enregistrées sur les serveurs distants de MongoDB Atlas plutôt que dans la mémoire vive temporaire de Node.js.

ID invalide vs absent

- isObjectIdOrHexString vérifie le format et renvoie 400 s'il est mauvais, tandis que findById renvoie 404 si le document est introuvable.
