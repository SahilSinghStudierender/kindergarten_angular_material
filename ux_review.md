# Ux Review - Gefundene Fehler

## 1. Form wird nicht gecleared wenn Kind erfasst wird (fixed)

Nach Erfassung des Kindes sollten die Felder gecleared & resetted werden.

## 2. Es können sich Kinder mit dem Alter von -1 angemeldet werden (fixed)

Form braucht weitere Validation, wo Kinder ab 2-3 Jahren angemeldet werden dürfen, derzeit können auch Kinder mit Alter von 0 oder -1 angemeldet werden.

## 3. Kind mit nur 1 Buchstabe im Namen können angemeldet werden (fixed)

Hier braucht man ebenfalls eine Validation, Name sollte mind. 3 Buchstaben beinhalten

## Inkonsistenz mit Sprache (fixed)

Form Felder & Fehlermeldungen im Form sind auf Englisch, sonst ist alles auf Deutsch

## Text im Select Box zu lang

Wenn Text in Select Box zu lang, wird es mit "..." gekürzt, hier könnte man einen Tooltip einbauen und wenn man drüber hovert sieht man den ganzen Namen

## Keine Success Meldung wenn Kind abgemeldet

Wenn Kind abgemeldet wird, wird keine Success Nachricht angezeigt, Kind wird einfach nur entfernt. User braucht eine Verification

## Bessere Form Validation (fixed)

Wenn Form invalid ist und auf "erfasst" geklickt wird, passiert nichts (die Fehlermeldungen unter Textbox/Select Box werden aber angezeigt, mehr nicht) --> Hier könnte man den "Erfassen" Button disablen bis der Form valide ist.

