#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from api.v1.views import app_views
import requests
import json
from flask import request, abort, jsonify, make_response, request


@app_views.route('/job/<id_job>', methods=['GET'], strict_slashes=False)
def get_job(id_job):
    """ Retrieves an user """
    dataJob = {}
    dataJob = requests.get(
        'https://torre.co/api/opportunities/{}'.format(id_job))
    if not dataJob:
        abort(404)

    return json.loads(dataJob.text)
