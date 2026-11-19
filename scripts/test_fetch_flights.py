import importlib.util
import pathlib
import subprocess
import sys
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
SPEC = importlib.util.spec_from_file_location("fetch_flights", ROOT / "scripts" / "fetch-flights.py")
MOD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MOD)


class TestFetchFlights(unittest.TestCase):
    def test_stamp_formats_dates_and_missing_minutes(self):
        self.assertEqual(MOD.stamp([2026, 12, 24], [9, 5]), "2026-12-24 09:05")
        self.assertEqual(MOD.stamp([2027, 1, 1], [0]), "2027-01-01 00:00")
        self.assertEqual(MOD.stamp([2027, 1, 1], None), "2027-01-01 00:00")

    def test_parse_payload_handles_missing_other_and_missing_carrier_and_commas(self):
        def make_seg(from_ap, to_ap, dep_d, dep_t, arr_d, arr_t, carrier):
            sf = [None] * 23
            sf[3] = from_ap
            sf[6] = to_ap
            sf[8] = dep_t
            sf[10] = arr_t
            sf[20] = dep_d
            sf[21] = arr_d
            sf[22] = carrier
            return sf

        seg_ok = make_seg("LHR", "HND", [2026, 12, 24], [9, 10], [2026, 12, 25], [7, 35], ["BA", "7", None, "British Airways, Ltd."])
        seg_no_carrier = make_seg("EDI", "LHR", [2026, 12, 24], [6, 50], [2026, 12, 24], [8, 30], None)
        payload = [None, None, [[[[None, None, [seg_ok, seg_no_carrier]]]]], None]

        rows = MOD.parse_payload(payload)
        self.assertEqual(rows, ['"British Airways, Ltd.",BA7,LHR,HND,2026-12-24 09:10,2026-12-25 07:35'])

    def test_cli_missing_args_exits_nonzero(self):
        res = subprocess.run([sys.executable, str(ROOT / "scripts" / "fetch-flights.py"), "LHR"], capture_output=True, text=True)
        self.assertEqual(res.returncode, 2)
        self.assertIn("Usage:", res.stderr)


if __name__ == "__main__":
    unittest.main()
