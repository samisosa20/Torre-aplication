#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from api.v1.views import app_views
import requests
import json
from flask import request, abort, jsonify, make_response, request


@app_views.route('/people/<username>', methods=['GET'], strict_slashes=False)
def get_user(username):
    """ Retrieves an user """
    dataUsers = {}
    user = []
    dataUsers = requests.get(
        'https://torre.bio/api/bios/{}'.format(username))
    if not dataUsers:
        abort(404)

    user.append(dataUsers.text)
    return json.loads(dataUsers.text)
