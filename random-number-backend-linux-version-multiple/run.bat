@echo off

set VENV_NAME=env-python

if not exist %VENV_NAME% (
    python -m venv %VENV_NAME%
    echo create environment %VENV_NAME%

    call %VENV_NAME%\Scripts\activate
    echo Virtual environment %VENV_NAME% is activated.

    pip install -r requirements.txt
    echo finish installing the requirements

    python app.py
    echo The backend is running
) else (
    call %VENV_NAME%\Scripts\activate
    echo Virtual environment %VENV_NAME% is activated.

    python app.py
    echo The backend is running
)


