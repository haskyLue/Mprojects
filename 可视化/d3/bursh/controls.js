function switcher() {
    var s = document.getElementsByTagName("select")[0].selectedIndex;
    switch (s + 1) {
    case 1:
        hidepath(1);
        break;
    case 2:
        hidepath(2);
        break;
    case 3:
        hidepath(3);
        break;
    case 4:
        hidepath(4);
        break;
    }
}
function hidepath(s) {
    var p = "path_" + s;
    var a = document.getElementsByTagName("path");
    for (i in a) {
        if (i == a.length - 1) break;
        if (a[i].attributes.class.value === "domain") continue;
        a[i].style.display = "none";
    }
    document.getElementsByClassName(p)[0].style.display = "block";
    document.getElementsByClassName(p)[1].style.display = "block";
}
function showall() {
    for (i in document.getElementsByTagName("path")) {
        document.getElementsByTagName("path")[i].style.display = "block";
    }
}