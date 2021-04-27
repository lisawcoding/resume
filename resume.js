// var navHeight=window.getComputedStyle(document.querySelector('nav')).getPropertyValue('height')

let navHeight=75;

if((navigator.language || navigator.browserLanguage).toLowerCase()!="zh-tw"){
	lan="en";
} else {
	lan="zh";
}
function translate(){
	const url="resume.json";
	fetch(url)
	.then(function(res){
		if(!res.ok) {
			throw Error(res.status);
		}
		return res.json();
	})
	.then(function(data){
		document.querySelectorAll("*[data-lan").forEach(function(elm){
			elm.innerText=eval(`data.${elm.dataset.lan}.${lan}`);
		})
		document.querySelector("*[data-lan='submit']").value=eval(`data.submit.${lan}`);
		document.querySelectorAll("*[data-list]").forEach(function(elm){
			elm.innerHTML="";
			for(var i=0; i<eval(`data.${elm.dataset.list}.${lan}`).length; i++){
				var node=elm.appendChild(document.createElement("li"));
				node.innerText=eval(`data.${elm.dataset.list}.${lan}[i]`);
			}
		})

		// for(var i=0; i<data.projects.length; i++){
		// 	var yearCln=document.querySelector(".year").cloneNode(true);
		// 	yearCln.setAttribute("class", "year");
		// 	yearCln.setAttribute("data-no", i);
		// 	document.querySelector(".projects .container").insertBefore(yearCln, document.querySelector(".year.clone"));
		// 	document.querySelector(".projects-div").insertBefore(yearCln, document.querySelector(".year.clone"));
		// 	document.querySelectorAll(".year:not(.clone)")[i].querySelector("h3").innerText=eval(`data.projects[i].year.${lan}`);
		// }

		// console.log(data.projects)

		data.projects.map(p=>{
				console.log(p)
				p.cards.forEach(function(card){
				console.log(p);
				var cardCln=document.querySelector('.projects .clone').cloneNode(true);
				const cardsDiv=document.querySelector('.cards-div');
				cardCln.setAttribute('class', 'card');
				cardsDiv.insertBefore(cardCln, cardsDiv.childNodes[0]);

				// cardsDiv.querySelector('.card .year').innerText=eval(`p.year.${lan}`);
				cardsDiv.querySelector('.card .viewsite').href=card.link;
				cardsDiv.querySelector('.card .viewcode').href=card.github;
				cardsDiv.querySelector('.card .overlay .viewsite').href=card.link;
				cardsDiv.querySelector('.card .overlay .viewcode').href=card.github;
				cardsDiv.querySelector('.project-img').src=card.img;
				cardsDiv.querySelector('.project-img').alt=eval(`card.${lan}.title`);
				cardsDiv.querySelector('.card .title').innerText=eval(`card.${lan}.title`)

				eval(`card.${lan}.des`).map(d=>{
					var node=document.createElement("li");
					var nodetext=document.createTextNode(d);
					node.appendChild(nodetext);	
					cardsDiv.querySelector(".card .description").appendChild(node);
				})
				eval(`card.${lan}.skillUsed`).map(d=>{
					var node=document.createElement("li");
					var nodetext=document.createTextNode(d);
					node.appendChild(nodetext);	
					cardsDiv.querySelector(".card .skill-used").appendChild(node);
				})
			})
		})
		// document.querySelector('.projects .clone').remove();

		// document.querySelectorAll(".year:not(.clone)").forEach(function(y){
		// 	var n=Number(y.getAttribute("data-no"));
		// 	for(var i=0; i<data.projects[n].cards.length; i++){
		// 		var cardCln=y.querySelector(".clone").cloneNode(true);
		// 		cardCln.setAttribute("class", "card");
		// 		y.querySelector(".cards").insertBefore(cardCln, y.querySelector(".clone"))

		// 		y.querySelectorAll("a")[i].href=data.projects[n].cards[i].link;
		// 		y.querySelectorAll("img")[i].src=data.projects[n].cards[i].img;
		// 		y.querySelectorAll("img")[i].alt=eval(`data.projects[n].cards[i].${lan}.title`)+"image";
		// 		y.querySelectorAll(".title")[i].innerText=eval(`data.projects[n].cards[i].${lan}.title`);

		// 		var number=(eval(`data.projects[n].cards[i].${lan}.des`).length);
		// 		for(var a=0; a<number; a++){
		// 			var node=document.createElement("li");
		// 			var nodetext=document.createTextNode((eval(`data.projects[n].cards[i].${lan}.des[a]`)));
		// 			node.appendChild(nodetext);
		// 			y.querySelectorAll(".description")[i].appendChild(node);
		// 		}
		// 	}
		// 	y.querySelector(".card.clone").remove();
		// })
		// document.querySelectorAll("*[class='description'] li").forEach(function(li){
		// 	var div=document.createElement("i");
		// 	var parent=li.parentNode;
		// 	parent.replaceChild(div, li);
		// 	div.appendChild(li);

		// 	div.setAttribute("class", "fas fa-paw");
		// })
	})
	.catch(function(err) {
		console.log(err);
	})	
}
translate();

//navbar***********************************************************************************
//language switch
let hamburger=document.querySelector(".hamburger");
let navbar=document.querySelector(".navbar");
let navItemContainer=document.querySelector(".navItem-container");

document.querySelector(`#${lan}`).classList.add("active");
function runProject(){
	// document.querySelectorAll(".year:not(.clone)").forEach(function(y){
	// 	y.remove();
	// })
	document.querySelectorAll('.cards-div .card').forEach(function(card){
		card.remove();
	})
	translate();
}
document.querySelectorAll(".language-container li:not([class*=hamburger])").forEach(function(li){
	li.addEventListener("click", function(){
		for(let sibling of this.parentNode.children){
			console.log(this.parentNode.children);
			sibling.classList.remove("active");
			
		}
		this.classList.add("active");
		lan=this.id;
		runProject();
	})
})


//navbar active seleted
let navItems=document.querySelectorAll(".navItem");
// let navItems=document.querySelectorAll(".navItem-container li");
let sections=document.querySelectorAll("section");

function removeActive(){
	for(var i=0; i<navItems.length; i++){
		navItems[i].classList.remove("active");
	}
}

// navItem active on scroll
window.addEventListener("scroll",function(){
	// document.querySelector(".language-container .lan").innerText=window.pageYOffset.toFixed(0);
	for(var i=0; i<sections.length; i++){
		if(window.pageYOffset==0){
			removeActive();
			navItems[0].classList.add("active");
		} else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
			removeActive();
			navItems[sections.length-1].classList.add("active");
		}
		if(window.pageYOffset>=sections[i].offsetTop+sections[i].offsetHeight-navbar.offsetHeight){
			removeActive();
			navItems[i+1].classList.add('active');
		}
	}
})


//navItem active on click	
document.querySelectorAll('.navItem').forEach((item, i)=>{
	item.addEventListener('click', ()=>{
		window.scrollTo(0, sections[i].offsetTop-navHeight);
		document.querySelector('.game').play()

		if(window.getComputedStyle(hamburger).getPropertyValue('display')==='flex'){
			navItemContainer.classList.remove('drop-down');
			hamburger.classList.remove('change')
		}
	})
})

// function clickNav(n){
// 	// window.scrollTo(0, sections[n].offsetTop-navbar.offsetHeight+1);

// 	window.scrollTo(0, sections[n].offsetTop-26);
// 	document.querySelector(".game").play();
	
// 	if(window.getComputedStyle(hamburger).getPropertyValue("display")=="flex"){
// 		navItemContainer.classList.remove("drop-down");
// 		hamburger.classList.remove("change");
// 	}
// 	removeActive();
// 	navItems[n].classList.add("active");
// }

// document.querySelector(".seeProjects").addEventListener("click", function(){
// 	clickNav(2)
// })

//remove drop-down menu
hamburger.addEventListener("click", function(){
	navItemContainer.classList.toggle("drop-down");
	this.classList.toggle("change");
})
document.querySelector(".pimg1").addEventListener("click", ()=>{
	navItemContainer.classList.remove("drop-down");
	hamburger.classList.remove('change')
})

//id photo slider*************************************************************************
// var imgs=document.querySelectorAll(".slide-inner img");
// var slideInner=document.querySelector(".slide-inner");
// var current=0;
// var slide=true;

// async function imgLoop(){
// 		imgs[current].classList.add("slideout");
// 		if(current<imgs.length-1){
// 			current++;
// 		} else {
// 			current=0;
// 		}	                                                                             

// 		var firstImg=document.querySelector(".slide-inner img:nth-of-type(1)");
// 		var ml=getComputedStyle(firstImg, null).getPropertyValue("margin-left");
// 		var width=getComputedStyle(firstImg, null).getPropertyValue("width");
// 		if(Math.abs(parseFloat(ml))>=parseFloat(width)){
			
// 			const slideOut= await firstImg.classList.remove("slideout");
// 			const slideInner= await slideInner.appendChild(firstImg);
// 			slideOut();
// 			slideInner();
// 		}
// 	t=setTimeout("imgLoop()",1000);
// }
// window.addEventListener("load", function(){
// 	setTimeout("imgLoop()",3000);
// })
// // slider autoplay stop when hover
// slideInner.addEventListener("mouseover", function(){
// 	clearTimeout();
// })
// slideInner.addEventListener("mouseleave", function(){
// 	imgLoop();
// })

// let dots=document.querySelectorAll(".dot");
// let next=document.querySelector(".next");
// let prev=document.querySelector(".prev");
// var slides=document.querySelectorAll(".id-photo img");
// let current=0;

// let n=0;
// function reset(){
//     for(var i=0; i<dots.length; i++){
//         dots[i].classList.remove("dot-active");
//         slides[i].classList.remove("slide-active");
//     }
// }
// function runSlides(){
// 	if(current<dots.length-1){
// 		current++;
// 	} else {
// 		current=0;
// 	}    
// 	reset();
// 	dots[current].classList.add("dot-active");  
// 	slideAction();  
// }
// setInterval(function(){
// 	runSlides();
// }, 3200)
// function slideAction(){
//     for(var i=0; i<dots.length; i++){
//         if(dots[i].classList.contains("dot-active")){
//             slides[i].classList.add("slide-active");
//             current=i;
//         }
//     }   
// }
// dots.forEach(function(dot){
//     dot.addEventListener("click", function(){
//         reset();
//         this.classList.add("dot-active");
//         slideAction();
//     })
// })
// next.addEventListener("click", function(){
// 	runSlides();
// })
// prev.addEventListener("click", function(){
//     if(current<=0){
//         current=dots.length-1;
//     } else {
//         current--;
//     }    
//     reset();
//     dots[current].classList.add("dot-active");    
//     slideAction();
// })
// hero slider
// var idSwiper = new Swiper('.id-photo', {
// 	speed: 600,
// 	spaceBetween: 0,
// 	autoplay: {
// 	  delay: 2000,
// 	  // disableOnInteraction: false,
// 	},
// 	loop: true,
// 	grabCursor: true,
// 	navigation: {
// 	  nextEl: '.id-photo .swiper-button-next',
// 	  prevEl: '.id-photo .swiper-button-prev',
// 	},
// 	pagination: {
// 	  el: '.id-photo .swiper-pagination',
// 	  clickable: true,
// 	},
//   });
//   const swiperContainer=document.querySelector(".swiper-container");
//   swiperContainer.addEventListener("mouseover", function(){
// 	idSwiper.autoplay.stop();
//   })
//   swiperContainer.addEventListener("mouseout", function(){
// 	idSwiper.autoplay.start();
//   })

// form sumbmit^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//initialize Firebase
 var config = {
    apiKey: "AIzaSyDiCsaX3HCEqJbtCHYrPDIdtrw9LTYEIek",
    authDomain: "contactform-c2a0c.firebaseapp.com",
    databaseURL: "https://contactform-c2a0c.firebaseio.com",
    projectId: "contactform-c2a0c",
    storageBucket: "contactform-c2a0c.appspot.com",
    messagingSenderId: "205647187411"
  };
   firebase.initializeApp(config);
   
//reference messages collection
var messagesRef=firebase.database().ref("messages");

//raddom number checking
var a=Math.floor(Math.random()*10+1);
var b=Math.floor(Math.random()*10+1);
var sum=document.querySelector(".sum");
document.querySelector(".a").innerHTML=a;
document.querySelector(".b").innerHTML=b;

// document.querySelector(".Submit").disabled = true;
var answer;
sum.addEventListener("keyup", function(){
	console.log(1);
	if(Number(document.querySelector(".sum").value)==a+b){
	console.log("correct");
	document.querySelector("input[type*='submit']").classList.add("submit");
	answer=true;
} else {
	answer=false;
}
})



// function to get form value
let ok=document.querySelector(".alert-ok");
let ng=document.querySelector(".alert-ng");

document.querySelector("form").addEventListener("submit",function(e){
	e.preventDefault();//sent to html page by default
	if(answer==true){
				var name=document.querySelector("form *[name*='name']");
		var phone=document.querySelector("form *[name*='phone']");
		var message=document.querySelector("form *[name*='message']");
		
		saveMessage(name, phone, message)
		ok.classList.add("alert-active");
		this.reset();		
	} else {
		ng.classList.add("alert-active");
	}
	setTimeout(function(){
		ok.classList.remove("alert-active");
		ng.classList.remove("alert-active");
	},3000)
})
function saveMessage(name, phone, message){
	var newMessageRef=messagesRef.push();
	newMessageRef.set({
		name:name.value,
		phone:phone.value,
		message:message.value,
	})
}

// //go to Top Btn^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
window.addEventListener('scroll', function(){
    if (document.body.scrollTop > navHeight || document.documentElement.scrollTop > navHeight) {
        topBtn.style.display = "block";
    } else{
        topBtn.style.display = "none";
	}		
}) 

document.querySelector("#topBtn").addEventListener('click',()=>{
	document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
})