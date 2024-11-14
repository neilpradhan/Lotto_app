#!/bin/bash

VENV_NAME=env-python

if [ ! -d "$VENV_NAME" ]; then
    python3 -m venv $VENV_NAME
    echo "Created environment $VENV_NAME"

    source $VENV_NAME/bin/activate
    echo "Virtual environment $VENV_NAME is activated."

    pip install -r requirements.txt
    echo "Finished installing the requirements"

    python app.py
    echo "The backend is running"
else
    source $VENV_NAME/bin/activate
    echo "Virtual environment $VENV_NAME is activated."

    python app.py
    echo "The backend is running"
fi
