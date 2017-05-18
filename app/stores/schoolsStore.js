var dispatcher = require("../dispatcher");

function SchoolStore() {
    var listeners = [];
    var path = "./images/";
    var ext = ".png";

    var image1name = 1234567;
    var image2name = 1234567;

    var image1src = path + image1name + ext;
    var image2src = path + image2name + ext;


    var schools = [
        { image: "Image-1", src:image1src },
        { image: "Image-2", src:image2src }, 
    ];

    function getSchools() {
        return schools;
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function addSchool(school) {
        schools.push(school)
        triggerListeners();
    }

    function deleteSchool(school) {
        var _index;
        schools.map(function (s, index) {
            if (s.image === school.image) {
                _index = index;
            }
        });
        schools.splice(_index, 1);
        triggerListeners();
    }

    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(schools);
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(":");
        if (split[0] === "school") {
            switch (split[1]) {
                case "addSchool":
                    addSchool(payload.school);
                    break;
                case "deleteSchool":
                    deleteSchool(payload.school);
                    break;
            }
        }
    });

    return {
        getSchools: getSchools,
        onChange: onChange
    }
}

module.exports = SchoolStore();