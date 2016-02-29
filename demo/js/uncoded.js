var users=[];

window.addEventListener("DOMContentLoaded", function () {
    var x = 0;
    var outputOneHtml = function (users) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = users.image;
        div.appendChild(img);

        var h2 = document.createElement("h2");
        h2.innerText = users.firstName;
        var a = document.createElement("a");
        a.href = "mailto:" + users.email;
        a.innerText = users.email;
        div.appendChild(h2);
        div.appendChild(a);
        return div.innerHTML;
    };

    var outputTwoHtml = function (users) {
        console.log("part2");
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = users.thumbnail;
        div.appendChild(img);
        var h2 = document.createElement("a");
        h2.innerText = users.firstName;
        h2.href = "mailto:" + users.email;
        div.appendChild(h2);
        return div;
    };

    var outputTwo = function () {
        document.querySelector(output1.innerHTML = outputOneHtml(users));
        x++;
        if ( x > 0 ) {
            document.querySelector(showBtn.innerText = "ShowNext");
            if ( users[x - 2] ) {
                var oldData = 0;
                if ( oldData >= 3 ) {
                    document.querySelector(output2.removeChild(document.querySelector(oldData)));
                };
                var div2 = document.createElement("div");
                div2.classList.add("oldData");
                div2.appendChild(outputTwoHtml(users[x-2]));
                document.querySelector(output2.appendChild(div2));
                oldData++;
            }
        }
    }

    /* var fullName = function ( users ) {
        var firstNameCap = users.firstName.substring(0,1).toUpperCase() + users.firstName.substring(1);
        var lastNameCap = users.lastName.substring(0,1).toUpperCase() + users.lastName.substring(1);
        return firstNameCap + " " + lastNameCap;
    }; */

    var outputOne = function() {
        this.classList.remove("enabled");
        this.classList.add("disabled");
        this.removeEventListener("click",outputOne);
        var req = new XMLHttpRequest();
        req.open('GET','http://localhost:3000/demo/users.json',false);
        req.onload=function() {
            if(req.status===200) {
                users=JSON.parse(req.responseText);
                document.querySelector(showBtn.classList.remove("disabled"));
                document.querySelector(showBtn.classList.add("enabled"));
                document.querySelector(showBtn.addEventListener("click",outputTwo));
            }
        };
        req.send();
    };
    document.querySelector(loadBtn.addEventListener("click",outputOne));
});