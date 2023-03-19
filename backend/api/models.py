
from datetime import datetime
from sqlalchemy.sql import text
import json
import re

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.Text())
    jwt_auth_active = db.Column(db.Boolean())
    date_joined = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"User {self.username}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email(self, new_email):
        self.email = new_email

    def update_username(self, new_username):
        self.username = new_username

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['username'] = self.username
        cls_dict['email'] = self.email

        return cls_dict

    def toJSON(self):

        return self.toDICT()


class JWTTokenBlocklist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    jwt_token = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)

    def __repr__(self):
        return f"Expired Token: {self.jwt_token}"

    def save(self):
        db.session.add(self)
        db.session.commit()


def generate_filter(letters_states):
    WRONG = 0
    PARTIAL_MATCH = 1
    FULL_MATCH = 2
    PENDING = 3
    regex_pattern = ['[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]', '[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]',
                     '[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]', '[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]',
                     '[абвгґдеєжзиіїйклмнопрстуфхцчшщьюя]']
    letters_must_contain = []

    def remove_letter(letter_to_remove, index):
        new_regex = regex_pattern[index].replace(letter_to_remove, "")
        regex_pattern[index] = new_regex

    for one_try in letters_states:
        for i in range(len(one_try["letters"])):
            if one_try["letters"][i]["state"] == WRONG:
                if one_try["letters"][i]["text"] not in letters_must_contain:
                    for x in range(len(regex_pattern)):
                        remove_letter(one_try["letters"][i]["text"], x)
            elif one_try["letters"][i]["state"] == PARTIAL_MATCH:
                letters_must_contain.append(one_try["letters"][i]["text"])
                remove_letter(one_try["letters"][i]["text"], i)
            elif one_try["letters"][i]["state"] == FULL_MATCH:
                letters_must_contain.append(one_try["letters"][i]["text"])
                regex_pattern[i] = one_try["letters"][i]["text"]
    return regex_pattern, letters_must_contain


class VocUTF(db.Model):
    Id = db.Column(db.Integer(), primary_key=True)
    Word = db.Column(db.String(), nullable=False)

    @classmethod
    def get_all_five_letter_words(cls):
        data = []
        rows = db.session.execute(text("SELECT * FROM VocUTF WHERE LENGTH(Word) = 5")).fetchall()
        for row in rows:
            data.append({'id': row[0],
                         'value': row[1]})
        return data

    @classmethod
    def get_filtered_words(cls, letters_states):
        words = cls.get_all_five_letter_words()
        words_filter = generate_filter(letters_states)

        rg_pattern = ''
        for char_pattern in words_filter[0]:
            rg_pattern += char_pattern

        letters_must_contain = words_filter[1]
        result = []
        for word in words:
            if all(x in word["value"] for x in letters_must_contain):
                if re.search(rg_pattern, word["value"]):
                    result.append(word)

        return result








    def save(self):
        db.session.add(self)
        db.session.commit()




