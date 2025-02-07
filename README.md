Requirements:
    - Node
    - Python
    - Poetry
    - Git

Frontend:
    run:
        - `cd frontend`
        - `npm install`
        - `npm run dev`

Backend:
    run:
        - `poetry shell` (requires a one time execution of: `poetry self add poetry-plugin-shell`)
        - `cd backend`
        - `uvicorn main:app --reload`
    
    nice to have:
        - *SQLiteviewer* extension to view DB