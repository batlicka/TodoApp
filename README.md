# Todo App
## Základní info
server běží na: https://localhost:7132/
- databáze SqlLite v souboru TodoDatabase.db
client běží na: http://localhost:4200/

## Jak spustit server:
1) Ve Visual Studio spustit server pomocí tlačítka ![image](https://github.com/user-attachments/assets/98afd407-d019-428f-af42-bfcfd6187341)
2) Na adrese https://localhost:7132/ se objeví zpráva "Api server is running!" 

## Jak spustit client:
1) Otevřít cmd a přejít do ToDoApp\client\todo-client
2) Spustit příkaz `npm install`
3) `ng build`
4) `ng serve`

## Popis funkcionality
- v horní liště jsou 2 položky menu s odkazy na dvě stránky "Todos" a "Completed Todos"
![image](https://github.com/user-attachments/assets/713ba9cc-8c49-4a2f-9af4-e044662981ba)

### "Todos" 
- po kliknutí na "Todos" se načte přehled všech úkolů ve stavu isComplete == false
- úkol je možné smazat kliknutím na tlačíto "Delete"
- descrtiption úkolu je možné editovat pomocí tlačítka "Edit"
### "Completed Todos" 
- po kliknutí na "Completed Todos" je uživatel přesměrován na stránku s úkoly ve stavu isComplete == true. Pomocí kliknutí
- po kliknutí na tlačítko "Undo Completed" je možné úkol opět označit jako isComplete == false
