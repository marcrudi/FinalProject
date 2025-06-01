// src/routes/races/new/+page.server.js

import { fail, redirect } from "@sveltejs/kit";
import { createRace } from "$lib/db.js"; 

/** 
 * Form-Action: erzeugt ein neues Rennen aus den Form-Daten.
 * Wird ausgelöst, wenn das Formular (POST) abgeschickt wird.
 */
export const actions = {
  default: async ({ request }) => {
    // 1) Hole alle Felder aus dem Request-Formular
    const formData = await request.formData();
    const season          = Number(formData.get("season"));
    const round           = Number(formData.get("round"));
    const name            = formData.get("name");
    const date            = formData.get("date");           // im Format "YYYY-MM-DD"
    const circuitName     = formData.get("circuitName");
    const circuitLocation = formData.get("circuitLocation");
    const circuitCountry  = formData.get("circuitCountry");

    // 2) Einfache Validierung: keine Pflichtfelder leer lassen
    if (
      Number.isNaN(season) ||
      Number.isNaN(round)  ||
      !name ||
      !date ||
      !circuitName ||
      !circuitLocation ||
      !circuitCountry
    ) {
      // Fehlermeldung zurückgeben (z.B. für Anzeigen im Formular)
      return fail(400, { error: "Bitte alle Pflichtfelder korrekt ausfüllen" });
    }

    // 3) Neues Race-Objekt zusammenbauen
    const raceData = {
      season,
      round,
      name,
      date,
      circuit: {
        name:     circuitName,
        location: circuitLocation,
        country:  circuitCountry
      }
    };

    // 4) In die DB einfügen
    try {
      await createRace(raceData);
      // 5) Nach erfolgreichem Anlegen zurück zu /races weiterleiten
      throw redirect(303, "/races");
    } catch (err) {
      console.error("createRace-Fehler:", err);
      return fail(500, { error: "Fehler beim Erstellen des Rennens" });
    }
  }
};
