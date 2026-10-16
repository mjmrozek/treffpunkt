// Türschild und Hervorhebung des heutigen Tages – gerechnet in deutscher Zeit,
// egal in welcher Zeitzone der Besucher ist.
(function () {
    // Wochentag (0 = Sonntag) → [öffnet, schließt] in Minuten, null = Ruhetag
    var HOURS = {
        0: [10 * 60, 22 * 60],
        1: [14 * 60, 23 * 60],
        2: null,
        3: [14 * 60, 23 * 60],
        4: [14 * 60, 23 * 60],
        5: [14 * 60, 23 * 60],
        6: [14 * 60, 23 * 60]
    };
    var DAYS = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    var BREAKFAST_END = 12 * 60;

    function berlinNow() {
        var parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/Berlin",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }).formatToParts(new Date());
        var get = function (type) {
            return parts.filter(function (p) { return p.type === type; })[0].value;
        };
        var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
        return { day: day, minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10) };
    }

    function fmt(minutes) {
        var h = Math.floor(minutes / 60);
        var m = minutes % 60;
        return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + " Uhr";
    }

    function nextOpening(day) {
        for (var i = 1; i <= 7; i++) {
            var d = (day + i) % 7;
            if (HOURS[d]) {
                var when = i === 1 ? "Morgen" : DAYS[d];
                return when + " ab " + fmt(HOURS[d][0]);
            }
        }
        return "";
    }

    function status(now) {
        var today = HOURS[now.day];
        if (!today) {
            return { state: "closed", text: "Ruhetag", detail: nextOpening(now.day) };
        }
        if (now.minutes < today[0]) {
            return { state: "closed", text: "Noch geschlossen", detail: "Heute ab " + fmt(today[0]) };
        }
        if (now.minutes < today[1]) {
            var detail = "Bis " + fmt(today[1]);
            if (now.day === 0 && now.minutes < BREAKFAST_END) {
                detail = "Frühstück bis " + fmt(BREAKFAST_END);
            }
            return { state: "open", text: "Geöffnet", detail: detail };
        }
        return { state: "closed", text: "Geschlossen", detail: nextOpening(now.day) };
    }

    var now;
    try {
        now = berlinNow();
    } catch (e) {
        return; // sehr alter Browser: statischer Text bleibt stehen
    }

    var row = document.querySelector('#hours [data-day="' + now.day + '"]');
    if (row) row.classList.add("today");

    var sign = document.getElementById("doorsign");
    if (!sign) return;
    var s = status(now);
    sign.setAttribute("data-state", s.state);
    document.getElementById("doorsign-label").textContent = s.state === "open" ? "Jetzt" : "Heute";
    document.getElementById("doorsign-status").textContent = s.text;
    document.getElementById("doorsign-detail").textContent = s.detail;
})();
