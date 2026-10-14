"""Print Google Flights results as CSV rows in the data-src/flights schema.

Usage: python scripts/fetch-flights.py HND LHR 2026-12-31 > out.csv
"""
import json, re, sys
import primp
from fast_flights import FlightQuery, Passengers, create_query
from selectolax.lexbor import LexborHTMLParser

# SOCS only pre-accepts the EU/UK consent banner. It never bypasses a CAPTCHA or bot check.
SOCS = "CAISHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmVuIAEaBgiAo_CmBg"
HEADER = "Airline,Flight Number,Departing Station,Arrival Station,Departure Date and time,Arrival Date and Time"


def stamp(date, time):
    h, m = ([*(time or []), None, None] + [0])[:2]
    return f"{date[0]}-{date[1]:02d}-{date[2]:02d} {h or 0:02d}:{m or 0:02d}"


def fetch(origin, dest, date):
    q = create_query(flights=[FlightQuery(date=date, from_airport=origin, to_airport=dest)],
                     trip="one-way", seat="economy", passengers=Passengers(adults=1))
    client = primp.Client(impersonate="chrome_145", impersonate_os="macos", referer=True)
    html = client.get("https://www.google.com/travel/flights", params=q.params(), cookies={"SOCS": SOCS}).text
    script = LexborHTMLParser(html).css_first(r"script.ds\:1")
    assert script, "no flight data in page: consent/CAPTCHA block or Google changed the page; use the browser fallback"
    # shortcut: relies on Google's unofficial array indices, upgrade to SerpApi if it breaks.
    payload = json.loads(script.text().split("data:", 1)[1].rsplit(",", 1)[0])
    rows = []
    for k in (payload[2][0] or []) + (payload[3][0] or []):  # [2] = "best", [3] = "other" flights
        for sf in k[0][2]:
            code, num, _, name = sf[22]  # operating carrier; codeshare numbers sit in sf[15]
            rows.append(f"{name},{code}{num},{sf[3]},{sf[6]},{stamp(sf[20], sf[8])},{stamp(sf[21], sf[10])}")
    assert rows, "no flights found"
    assert all(re.search(r"\d{4}-\d\d-\d\d \d\d:\d\d,\d{4}-\d\d-\d\d \d\d:\d\d$", r) for r in rows)
    return rows


if __name__ == "__main__":
    print(HEADER)
    print("\n".join(fetch(*sys.argv[1:4])))
