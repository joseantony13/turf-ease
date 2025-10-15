from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3

app = FastAPI()

class Booking(BaseModel):
    turf: str
    slot: str

@app.on_event("startup")
def startup():
    conn = sqlite3.connect("bookings.db")
    conn.execute("CREATE TABLE IF NOT EXISTS bookings (turf TEXT, slot TEXT)")
    conn.close()

@app.post("/book")
def book_slot(data: Booking):
    conn = sqlite3.connect("bookings.db")
    c = conn.cursor()
    c.execute("SELECT * FROM bookings WHERE turf=? AND slot=?", (data.turf, data.slot))
    existing = c.fetchone()
    if existing:
        return {"message": f"{data.turf} is already booked for {data.slot}"}
    c.execute("INSERT INTO bookings VALUES (?, ?)")
    conn.commit()
    conn.close()
    return {"message": f"Booked {data.turf} successfully for {data.slot}"}
