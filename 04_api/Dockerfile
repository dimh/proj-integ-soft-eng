FROM python:3.9-slim

RUN mkdir -p /opt/model_app/
# ENV PYTHONPATH "${PYTHONPATH}:/opt/model_app/code"

ADD api.py /opt/model_app/api.py
ADD cleaning_people_model.pkl /opt/model_app/model.pkl
ADD requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

WORKDIR /opt/model_app/

CMD python api.py