#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
from models import User, Room, Booking
import ipdb
from datetime import date

#Global functions
def parse_date(datestring):
    return date(int(datestring[:4]),int(datestring[5:7]),int(datestring[8:]))

# Views go here!
class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        email = request_json.get('email')
        username = request_json.get('username')
        password = request_json.get('password')

        user = User(
            email=email,
            username=username
        )

        # the setter will encrypt this
        user.password_hash = password


        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            # session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')
            
            return {'error': 'unable to add user'}, 422

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': 'Incorrect username or password'}, 401

class CheckSession(Resource):
    
    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()
            if user:
                return user.to_dict(), 200

            
        
        return {'error': 'User not logged in'}, 401
        
        


class Logout(Resource):
    
    def delete(self):
        
        if session.get('user_id'):
            
            session['user_id'] = None
            
            return {}, 204
        
        return {'error': '401 Unauthorized'}, 401

class SeeRooms(Resource):
    def get(self):
            rooms = Room.query.all()
            rooms =[r.to_dict() for r in rooms]

            print(rooms)
            return rooms, 200
            
class Book(Resource):
    
    def post(self):
        
        # try:
            new_booking = Booking(
                people = request.json["people"],
                check_in =  parse_date(request.json["check_in"]),
                check_out = parse_date(request.json["check_out"]),
                room_id = request.json["room_id"]
            )
            
            db.session.add(new_booking)
            db.session.commit()
            
            # new_booking.user_id = session.get('user_id')
            # print (new_booking.user_id)
            if new_booking.user is None:
                db.session.delete(new_booking)
                db.session.commit()
                return {"ERROR": "User not logged in!"}

            #calculate total_price
            new_booking.num_nights = (new_booking.check_out - new_booking.check_in).days
            
            new_booking.total_price = new_booking.room.price_per_night * new_booking.num_nights
            db.session.commit()

            #validate check_out is after check_in
            if new_booking.num_nights < 1:
                db.session.delete(new_booking)
                db.session.commit()
                return {'Hold up!': "Checkout must be later date than checkin!"}, 400

            #validate people fit in room
            if new_booking.people > new_booking.room.sleeps:
                db.session.delete(new_booking)
                db.session.commit()
                return {'Hold up!': "Too many people! Please select larger room!"}, 400

            #validate room is available
            #query all PREVIOUS bookings of this room
            room_bookings = Booking.query.filter_by(room_id=new_booking.room_id).all()[:-1]

            #delete new_booking if dates overlap with any others, or dates surround those of a previous booking
            for booking in room_bookings: 
                invalid_checkin = new_booking.check_in >= booking.check_in and new_booking.check_in < booking.check_out  
                invalid_checkout = new_booking.check_out > booking.check_in and new_booking.check_out <= booking.check_out
                surrounds_prev_booking = new_booking.check_in <= booking.check_in and new_booking.check_out >= booking.check_out
                print(invalid_checkin)
                print(invalid_checkout)
                if invalid_checkin or invalid_checkout or surrounds_prev_booking:
                    db.session.delete(new_booking)
                    db.session.commit()
                    #after deleting, return error indicating dates for which room already booked
                    dates_already_booked = []
                    updated_bookings = Booking.query.filter_by(room_id=new_booking.room_id).all()
                    for booking in updated_bookings: 
                        dates_already_booked.append(f"{booking.check_in} - {booking.check_out}")
                    return {'Hold up!':f"This room is already booked for the following dates:{dates_already_booked} Please alter your date range or select a different room!"}, 400


            return new_booking.to_dict(), 201
        
        # except:
            return {'Error': "Invalid input"}, 400

    
    def patch(self, id):
        booking = Booking.query.filter_by(id=id).first()
        data = request_json.get()
        for attr in data:
            setattr(booking, attr, data[attr])
            
        db.session.add(booking)
        db.session.commit()

        return booking.to_dict(), 200

    def delete(self, id):
        try:
            booking = Booking.query.filter_by(id=id).first()
            
            db.session.delete(delete)
            db.session.commit()

            return None
        except:
            {"error": "Booking not found"}
    


api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(SeeRooms, '/see_rooms', endpoint='see_rooms')
api.add_resource(Book, '/book', endpoint='book')


if __name__ == '__main__':
    app.run(port=5555, debug=True)