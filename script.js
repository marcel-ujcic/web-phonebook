var id =0;
var array=[]
var idForEdit;
function domaddContact(contact) {
    const table = document.querySelector("#phoneBook");
    const tr = document.createElement("tr");
   

    table.appendChild(tr);
    //tr.addEventListener("dblclick",domRemoveParticipant);
    tr.setAttribute("id",id);
    for (const key in contact){
        const td = document.createElement("td");
        td.innerText=contact[key];
        tr.appendChild(td);
    }
    const td = document.createElement("td");
    tr.appendChild(td);
    const btnDel = document.createElement("button");
    const btnEdit = document.createElement("button");
    btnDel.innerText ="Delete";
    btnEdit.innerText="Edit";
    btnEdit.setAttribute("onclick","editContact(this.id)");
    btnDel.setAttribute("onclick","deleteContact(this.id)");
    btnEdit.setAttribute("id",id);
    btnEdit.setAttribute("class","edit");
    btnDel.setAttribute("id",id);
    td.appendChild(btnDel);
    td.appendChild(btnEdit);
}

function addContact(event) {
    
    const first = document.querySelector("#first").value;
    const last = document.querySelector("#last").value;
    const number = Number(document.querySelector("#number").value);
    console.log(Number.isSafeInteger(number));

    if (number.toString().length>15){
        alert("Phone number in longer that 15 digits");
        return;
    }
        
    
    if(first.trim() !="" && last.trim() !="" && number!=0 &&  Number.isSafeInteger(number)){
        console.log(array); // dodajanje v seznam in kasneje kot string v shrambo
    array.push({"first":first,"last":last,"number":number,"id":id});
    localStorage.setItem("contacts", JSON.stringify(array));
    document.querySelector("#first").value="";
    document.querySelector("#last").value="";
    document.querySelector("#number").value="";

    // Create participant object
    const contact = {
        first: first,
        last: last,
        number: number
    };

    // Add participant to the HTML
    domaddContact(contact)

    // Move cursor to the first name input field
    document.getElementById("first").focus();
    id++;
    } 
    else{
        alert("All inputs must not be empty or Phone number is not a number"); 
    } 
    
}

document.addEventListener("DOMContentLoaded", () => {
    try{  //izpis po osvezitvi
        var objeti =JSON.parse(localStorage.contacts);
    for(var e in objeti){
        const table = document.querySelector("#phoneBook");
        const tr = document.createElement("tr");
        table.appendChild(tr);
        if(e !==null)
            array.push(objeti[e]);
        for( var ele in objeti[e]){
            if(ele == "id"){tr.setAttribute("id",objeti[e][ele]); id=objeti[e][ele]} // pošče zadnji id in tudi dodeli tr star id
            if(ele != "id"){
                const td = document.createElement("td");
                td.innerText=objeti[e][ele];
                tr.appendChild(td);
            }
        }
       
        if(objeti[e] !=null ||objeti[e] != undefined){
            const td = document.createElement("td");
            tr.appendChild(td);
            const btnDel = document.createElement("button");
            const btnEdit = document.createElement("button");
            btnDel.innerText ="Delete";
            btnEdit.innerText="Edit";
    
            btnEdit.setAttribute("onclick","editContact(this.id)");
            btnEdit.setAttribute("id",id);
            btnEdit.setAttribute("class","edit");

            btnDel.setAttribute("onclick","deleteContact(this.id)");
            btnDel.setAttribute("id",id);
            td.appendChild(btnDel);
            td.appendChild(btnEdit);   
        }
       
    } 
    id++;
    }catch(err ){console.log("empty localStorage");}
    document.getElementById("addNew").onclick = addContact;
})

function deleteContact(event){
    document.getElementById("myForm").style.display = "none";
   var  row = document.getElementById(event);
    //row.remove();
    console.log(event)
    var conts =JSON.parse(localStorage.contacts);
    for( var e in conts){     // isanje iemna in ustrezneg ideja ki ga potem poiščem v blob in izbrišem
        for (var ele in conts[e]){
            if (conts[e][ele] == event){
                var msg = event;
            
                var name = conts[e]["first"];
            }
            else {var msg = event;}
        }
    }
    var confbt=confirm("Are you want do delte this contact " + name);

    if(confbt){
        var row = document.getElementById(msg);   // če uporabnik potrdi brisanje poišče ustrezen id in izbire objekt v skupini objektov blob
         blob = JSON.parse(localStorage.contacts);
        delete blob[msg];
        for (var element in blob){
            for( var i in blob[element]){
                if ( blob[element][i]==msg)
                delete blob[element];
            }
            if(blob[element] === null || blob[element] === undefined)
            delete blob[element];
            
        }
       
        
        //blob[msg]=blob[msg+1];
        array.splice(msg,1);
        var arry=[]
        for(var i=0; i<array.length;i++){ //brisanje null elemntov
            if (array[i]=null){
                array[i]=array[i-1];
            }
        }
        array=arry;
        console.log(blob[msg]+ "blob");
        localStorage.setItem("contacts",JSON.stringify(blob));
        //localStorage.removeItem(event);
        row.remove();
       
    }
}



function editContact(event) {
    idForEdit=event;
    document.getElementById("myForm").style.display = "inline-block";
    var  row = document.getElementById(event);
    //row.remove();
    console.log(event)
    var conts =JSON.parse(localStorage.contacts);
    for( var e in conts){     // isanje iemna in ustrezneg ideja ki ga potem poiščem v blob in izbrišem
        for (var ele in conts[e]){
            if (conts[e][ele] == event){
                var msg = event;
            
                var name = conts[e]["first"];
                var surname = conts[e]["last"];
            
            }
            else {var msg = event;}
        }
    }
    document.getElementById("btn");
    document.getElementById("nameID").innerHTML="Name "+name;
    document.getElementById("surnameID").innerHTML ="Surname "+surname;
   
  }
  function saveNewValues(){
        console.log("Saved "+ idForEdit);
        var row = document.getElementById(idForEdit);   // če uporabnik potrdi urejanje poišče ustrezen id in izbire objekt v skupini objektov blob
        blob = JSON.parse(localStorage.contacts);
        var newName = document.getElementById("newName").value;
        var newSurname = document.getElementById("newSurname").value;
        var newPhone = Number(document.getElementById("newPhone").value);
        if(Number.isSafeInteger(newPhone) && number.toString().trim().length>15){
            console.log("new name "+newName)
            for (var element in blob){
                for( var i in blob[element]){
                    if(blob[element][i] == idForEdit){
                     blob[element]["first"] = newName;
                     blob[element]["last"] = newSurname;
                     blob[element]["number"] = newPhone;
                    }
                }
                if(blob[element] === null || blob[element] === undefined)
                delete blob[element];
            }
            localStorage.setItem("contacts",JSON.stringify(blob));
        }
        else{
            alert("All inputs must NOT be empty or Phone number is not a number or phone number holds more than 15 digits"); 
        }
        
   }
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  } 

  function sort(event){
        people = JSON.parse(localStorage.contacts);
        var temp;
        var which2sort;
        var how =false;
        console.log("people "+JSON.stringify(people));
        for(var i=0; i<people.length;i++){
            for(var j=0; j<people.length;j++){
                try{
                    if (String(event).includes("AZ"))
                        how =true;
                    if (event =="NameAZ" ||event=="NameZA")
                        which2sort="first";
                    else
                        which2sort="last";
                    if(how){
                        console.log("res je ");
                        if(String(people[i][which2sort]).toLowerCase()<String(people[j][which2sort]).toLowerCase()){
                        temp = people[i];
                        people[i]=people[j];
                        people[j]=temp;
                        }   
                    }else{
                        if(String(people[i][which2sort]).toLowerCase()>String(people[j][which2sort]).toLowerCase()){
                            temp = people[i];
                            people[i]=people[j];
                            people[j]=temp;
                        }
                    }
                }catch(err ){console.log("null");} 
            }
        }
        console.log("new people "+JSON.stringify(people));
        localStorage.setItem("contacts",JSON.stringify(people));
        location.reload();
       
  }