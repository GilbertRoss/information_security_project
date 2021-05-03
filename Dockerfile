FROM python:3

ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt /backend/


RUN pip install -r requirements.txt


COPY . /backend/



CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]