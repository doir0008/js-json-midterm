document.addEventListener("DOMContentLoaded", function () {
    
    // setup our variables - not all need to be global, just like the clean look
    var req = new XMLHttpRequest(),
        loadBtn = document.getElementById("loadBtn"),
        showBtn = document.getElementById("showBtn"),
        output1 = document.getElementById("output1"),
        output2 = document.getElementById("output2"),
        img,
        i = 0,
        x = 0,
        name,
        email,
        div,
        oldData,
        first,
        last,
        firstLtrFirstName,
        firstLeeterLastName,
        firstName,
        lastName,
        fullName,
        data;
    
    // grab the JSON data
    function loadData() {
        req.open('GET', 'http://localhost:3000/users.json', false);
            req.onreadystatechange = function() {
                if(req.readyState == 4){
                    if(req.status == 200){
                        data = JSON.parse(req.responseText);
                        document.querySelector(loadBtn.className = "btn disabled");
                        document.querySelector(showBtn.className = "btn enabled" );
                        loadBtn.removeEventListener("click", loadData);
                        showBtn.addEventListener("click", displayData);
                    }
                }
            }
        req.send(null);
    }
    
    // correct the case in the first and last names
    function correctCase(i) {
    /*    first = data[i].firstName;
        last = data[i].lastName;
        firstLtrFirstName = first.slice(0,1);
        firstLtrLastName = last.slice(0,1);
        firstLtrFirstName = firstLtrFirstName.toUpperCase();
        firstLtrLastName = firstLtrLastName.toUpperCase();
        firstName = first.replace(first.substr(0,1) , firstLtrFirstName);
        lastName = last.replace(last.substr(0,1) , firstLtrLastName);
        fullName = firstName + " " + lastName; 
        return fullName; */
        
        // recognize this code? ;)
        var firstNameCap = data[i].firstName.substring(0,1).toUpperCase() + data[i].firstName.substring(1);
        var lastNameCap = data[i].lastName.substring(0,1).toUpperCase() + data[i].lastName.substring(1);
        return firstNameCap + " " + lastNameCap;
    }
    
    // display data in output1
    function displayData() {
        if (i < data.length) {
            if (i == 0) {
                img = document.createElement("img");
                img.src = data[i].image;
                output1.appendChild(img);
                name = document.createElement("h2");
                name.innerHTML = correctCase(i);
                output1.appendChild(name);
                email = document.createElement("a");
                email.href = "mailto:" + data[i].email;
                email.innerText = data[i].email;
                output1.appendChild(email);                
            } else {
                document.getElementById("output1").removeChild(document.getElementById("output1").lastChild);
                document.getElementById("output1").removeChild(document.getElementById("output1").lastChild);
                document.getElementById("output1").removeChild(document.getElementById("output1").lastChild);
                img = document.createElement("img");
                img.src = data[i].image;
                document.getElementById("output1").appendChild(img);
                name = document.createElement("h2");
                name.innerHTML = correctCase(i);
                document.getElementById("output1").appendChild(name);
                email = document.createElement("a");
                email.href = "mailto:" + data[i].email;
                email.innerText = data[i].email;
                output1.appendChild(email);
            }
            document.querySelector(showBtn.innerHTML = "ShowNext"); 
            i++;
            history();
        }
    }
    
    // display data in output2 - history of last three viewed
    function history() {
        if (x > 0) {
            div = document.createElement("div");
            div.classList.add("oldData");
            img = document.createElement("img");
            img.src = data[x - 1].thumbnail;
            name = document.createElement("a");
            name.href = "mailto:" + data[x - 1].email;
            name.innerText = correctCase(x - 1);
            div.appendChild(img);
            div.appendChild(name);
            document.getElementById("output2").appendChild(div);
            if (i > 1) {
                document.getElementById("output2").removeChild(document.getElementById("output2").firstChild);  
            }  
        }
        x++;
    }
    loadBtn.addEventListener("click", loadData);
});