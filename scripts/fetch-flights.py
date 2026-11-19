"""Print Google Flights results as CSV rows in the data-src/flights schema.

Usage: python scripts/fetch-flights.py HND LHR 2026-12-31 > out.csv
"""
import csv, io, json, re, sys

# SOCS only pre-accepts the EU/UK consent banner. It never bypasses a CAPTCHA or bot check.
SOCS = "CAISHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmVuIAEaBgiAo_CmBg"
HEADER = "Airline,Flight Number,Departing Station,Arrival Station,Departure Date and time,Arrival Date and Time"


def stamp(date, time):
    h, m = ([*(time or []), None, None] + [0])[:2]
    return f"{date[0]}-{date[1]:02d}-{date[2]:02d} {h or 0:02d}:{m or 0:02d}"


def parse_payload(payload):
    best = (payload[2] if len(payload) > 2 and isinstance(payload[2], list) else None) or [[]]
    other = (payload[3] if len(payload) > 3 and isinstance(payload[3], list) else None) or [[]]
    buf = io.StringIO()
    writer = csv.writer(buf, lineterminator="\n")
    for k in (best[0] or []) + (other[0] or []):  # [2] = "best", [3] = "other" flights
        if not (k and k[0] and len(k[0]) > 2 and k[0][2]):
            continue
        for sf in k[0][2]:
            if not (len(sf) > 22 and sf[22]):
                continue
            code, num, _, name = sf[22]  # operating carrier; codeshare numbers sit in sf[15]
            writer.writerow([name, f"{code}{num}", sf[3], sf[6], stamp(sf[20], sf[8]), stamp(sf[21], sf[10])])
    rows = buf.getvalue().splitlines()
    assert rows, "no flights found"
    assert all(re.search(r"\d{4}-\d\d-\d\d \d\d:\d\d,\d{4}-\d\d-\d\d \d\d:\d\d$", r) for r in rows)
    return rows


def fetch(origin, dest, date):
    import primp
    from fast_flights import FlightQuery, Passengers, create_query
    from selectolax.lexbor import LexborHTMLParser

    q = create_query(flights=[FlightQuery(date=date, from_airport=origin, to_airport=dest)],
                     trip="one-way", seat="economy", passengers=Passengers(adults=1))
    client = primp.Client(impersonate="chrome_145", impersonate_os="macos", referer=True)
    html = client.get("https://www.google.com/travel/flights", params=q.params(), cookies={"SOCS": SOCS}).text
    script = LexborHTMLParser(html).css_first(r"script.ds\:1")
    assert script, "no flight data in page: consent/CAPTCHA block or Google changed the page; use the browser fallback"
    # shortcut: relies on Google's unofficial array indices, upgrade to SerpApi if it breaks.
    payload = json.loads(script.text().split("data:", 1)[1].rsplit(",", 1)[0])
    return parse_payload(payload)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python scripts/fetch-flights.py <FROM> <TO> <yyyy-mm-dd>", file=sys.stderr)
        sys.exit(2)
    print(HEADER)
    print("\n".join(fetch(*sys.argv[1:4])))
