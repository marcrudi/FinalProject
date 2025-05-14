Für den Zugriff auf deine MongoDB musst du im obersten Projektordner (= der Ordner, in dem sich package.json befindet), eine Datei mit dem Namen .env (inklusive . am Anfang) und der folgenden Zeile als Inhalt erstellen:

DB_URI=<MongoDB Connection String>

Anmerkungen:
- Ersetze <MongoDB Connection String> durch deine Zugangsdaten, ohne die Spitzen Klammern < >. Der Inhalt von .env sieht dann ungefähr wie folgt aus: 
  DB_URI=mongodb+srv://admin:supersecret@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
- Im Ordner MusicDB-collections findest du Beispieldaten, die du in deine MongoDB importieren kannst.
- Weitere Erläuterungen: Siehe Vorlesungsunterlagen Woche 12
