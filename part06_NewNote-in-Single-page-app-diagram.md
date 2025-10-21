```mermaid
sequenceDiagram
  participant user
  participant browser
  participant server

  user->>browser: submit form
  activate browser
  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server

  server->>browser: HTTP 201 {"message":"note created"}
  deactivate server
  browser->>user: UI updated
  deactivate browser
```
  
  
  
