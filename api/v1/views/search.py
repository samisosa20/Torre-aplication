#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from api.v1.views import app_views
import requests
import json
from flask import request, abort, jsonify, make_response, request


@app_views.route('/job', methods=['POST'], strict_slashes=False)
def get_oppor():
    """ Retrieves an user """
    dataOppor = {}
    post = request.get_json()
    if post is None or type(post) != dict:
        return jsonify({'error': 'Not a JSON'}), 400

    if post.get('job'):
        dataOppor = requests.post(
            'https://search.torre.co/opportunities/_search/?aggregate{}'.format(
                post.get('job')))
    if not dataOppor:
        abort(404)

    return json.loads(dataOppor.text)


@ app_views.route('/people', methods=['POST'], strict_slashes=False)
def get_people():
    """ Retrieves an user """
    dataPeople = {}
    post = request.get_json()

    if post is None or type(post) != dict:
        return jsonify({'error': 'Not a JSON'}), 400

    if post.get('people'):
        dataPeople = requests.post(
            'https://search.torre.co/people/_search/', json={"name": {"term": post.get('people')}})

    if not dataPeople:
        abort(404)

    return json.loads(dataPeople.text)
