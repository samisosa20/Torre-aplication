#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from api.v1.views import app_views
import requests
import json
from flask import request, abort, jsonify, make_response, request


@app_views.route('/opportunities', methods=['POST'], strict_slashes=False)
def get_oppor():
    """ Retrieves an user """
    dataOppor = {}
    dataOppor = requests.post(
        'https://search.torre.co/opportunities/_search/')
    if not dataOppor:
        abort(404)

    return json.loads(dataOppor.text)


@app_views.route('/people', methods=['POST'], strict_slashes=False)
def get_people():
    """ Retrieves an user """
    dataPeople = {}
    post = request.get_json()

    if post is None or type(post) != dict:
        return jsonify({'error': 'Not a JSON'}), 400

    if post.get('name'):
        dataPeople = requests.post(
            'https://search.torre.co/people/_search/', json={"name": {"term": post.get('name')}})

    if not dataPeople:
        abort(404)

    return json.loads(dataPeople.text)
