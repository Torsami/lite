/*const toggleMenu = (elementId)=> {
    let menuBox = document.getElementById(elementId);    
    
	menuBox.style.animation-name: gal;
	menuBox.style.animation-timing-function: ease-in-out;
	menuBox.style.animation-duration: 30s;
	menuBox.style.animation-direction: alternate;	
}
*/
   




  function swap (fade, show) {
    let fade = document.getElementById(fade); 
    let show = document.getElementById(show); 

    fade.style.display = "none";
    show.style.display = "block";

}



	
	// if(menuBox.style.display == "block"
	
	
	
	
	
	// ) {
      // menuBox.style.display = "none";
    // }
    // else { 
      // menuBox.style.display = "block";
    // }
  // }


const validateForm=()=> {
    const x = document.forms["myForm"]["textCheck"].value;
    if (x.replace(/^\s+|\s+$/, "") == "") {
        alert("Enter a vaid input ");
        return false;
    }
}

