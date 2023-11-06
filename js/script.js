//Inicializar
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.defaults({ease:'none', duration: 2});

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

// ----------- Cursor -----------
const cursor = select('.cursor');
document.addEventListener("mousemove", (e) => {
    if (e.pageX === 0 || e.pageY === 0) {
        cursor.style.opacity = 0;
    } else {
        cursor.style.opacity = 1;
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

function addHoverCursor(elements, size = 'small'){
    for(var i=0;i<elements.length;i++){
        elements[i].addEventListener("mouseover", (e) => {
            size==="big" ? changeCursor("in", size) : changeCursor("in")
        });
        elements[i].addEventListener("mouseout", (e) => {
            changeCursor("out")
        });
    }
};

function changeCursor(action, size = "small") {
    switch (size) {
    case "big":
        sizeNum = 6;
        break;
    case "small":
        sizeNum = 3.5;
        break;
    }
    if (action === "in") {
        cursor.style.width = sizeNum + "rem";
        cursor.style.height = sizeNum + "rem";
    } else {
        cursor.style.width = 1.25 + "rem";
        cursor.style.height = 1.25 + "rem";
    }
};

const pElements=document.getElementsByTagName("p");
addHoverCursor(pElements);
const spanElements=document.getElementsByTagName("span");
addHoverCursor(spanElements);
const aElements=document.getElementsByTagName("a");
addHoverCursor(aElements);
const textElements=document.getElementsByClassName("home__title");
addHoverCursor(textElements, "big");
const experienceElements=document.getElementsByClassName("experience__number");
addHoverCursor(experienceElements, "big");
const titleMarquee=document.getElementsByClassName("title__marquee");
addHoverCursor(titleMarquee, "big");
const formElements=document.getElementsByClassName("input-box");
addHoverCursor(formElements);
const titlePortfolioElements=document.getElementsByClassName("rg__textTitle");
addHoverCursor(titlePortfolioElements);
const submitFormElements=document.getElementsByClassName("form__button");
addHoverCursor(submitFormElements);
const titleFormElements=document.getElementsByClassName("contact__title");
addHoverCursor(titleFormElements, "big");

/* document.addEventListener( "DOMContentLoaded", function(){ */
window.addEventListener( "load", function(){
    const counter3 = select('.counter-3')
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
            const div = document.createElement('div');
            div.className = 'num';
            div.textContent = j;
            counter3.appendChild(div);

        }
    }   
    
    const finalDiv = document.createElement('div');
    finalDiv.className = 'num';
    finalDiv.textContent = '0';
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0){
        const numHeight = counter.querySelector('.num').clientHeight;
        const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;

        gsap.to(counter, {y: -totalDistance, duration: duration, delay: delay, ease: 'power2.inOut'})    
    }

    animate(counter3, 5);
    animate(select('.counter-2'), 6);
    animate(select('.counter-1'), 2, 4);

    gsap.to('.digit', {top: '-150px', stagger: {amount: 0.25}, delay: 6, duration: 1, ease: 'power4.inOut'})

    gsap.from('.loader-1', {width: 0, duration:6, ease: 'power2.inOut'})

    /* gsap.from('.loader-2', {width: 0, duration:2, delay: 1.9, ease: 'power2.inOut'}) */

    gsap.to('.loader', {background: 'none', duration: 0.1, delay: 6})

    gsap.to('.loader-1', {rotate: 90, y: 0, duration: 0.5, delay: 6})

    /* gsap.to('.loader-2', {x: -100, y: -50, duration: 0.5}, '<') */

    gsap.to('.loader', {scale: 40, duration: 1, delay: 7, ease: 'power2.inOut'})

    gsap.to('.loader', {rotate: 45, y:500, x:0, duration: 1, delay: 7, ease: 'power2.inOut'})

    gsap.to('.loading-screen', {opacity: 0, duration: 0.5, delay: 7.5, ease: 'power1.inOut', onComplete: () => initContent()})
});

// All animations functions
function initContent(){
    select('body').classList.remove('is-loading');
    initFirstScrollAnimation()
    initSphereCloud()
    initPortfolioAnimation()
    initSpaceAnimation()
    initSecondScrollAnimation()
    initNavMenu()
};

// Controladores modelos 3D
const modelViewerTransformSunglasses = select("#Sunglasses");
let rollSunglasses = 1, pitchSunglasses = 1, yawSunglasses = 90;

const updateOrientation = (modelViewerTransform,roll,pitch,yaw) => {
    modelViewerTransform.orientation = `${roll}deg ${pitch}deg ${yaw}deg`;
};

// ----------- Scroll GSAP animations -----------
const tl = gsap.timeline()

function initFirstScrollAnimation(){

    function changePropertyContainerInicial() {
        const container = document.querySelector(".container__initial");
        container.style.zIndex = "1";
    };

    function changePropertyContainerFinal() {
        const container = document.querySelector(".container__initial");
        container.style.zIndex = "0";
    };

    const exposure1 = '1',
        orbit1 = '90deg 90deg 100%',
        orbit2 = '90deg 90deg -50%';
        /*,
        exposure2 = '0.4',
        orbit2 = '-60deg 90deg 100%'
        ,
        exposure3 = '1',
        orbit3 = '44deg 90deg 100%';*/

    const sunglassesPosition = (exposure, orbit, time) => {
        return (
        {
            duration: time,
            ease: Power4.easeOut,
            attr: {
            ['exposure']: exposure,
            ['camera-orbit']: orbit,
            ['shadow-intensity']: "0"
            },
            onComplete: changePropertyContainerInicial
        }
        );
    };

    const splitTextFirst = new SplitType('.experience__splitText--first', { types: 'words'})
    const chars1 = splitTextFirst.words;

    const splitTextSecond = new SplitType('.experience__splitText--second', { types: 'words'})
    const chars2 = splitTextSecond.words;

    tl.addLabel('initial')
    .to('#Sunglasses', sunglassesPosition(exposure1, orbit1, 1.5))
    .to('#Sunglasses', sunglassesPosition(exposure1, orbit2, 1)) 
    .to('.container__initial',{opacity:0, scale: 3, duration: 1, onComplete: changePropertyContainerFinal }) 
    .from('.container__presentation', {opacity:0}) 
    .from('.home__title', {scale:1.5, duration: .8}, '=-1.5')
    .from('.home__subtitle', {scale:1.5, opacity:0, duration: .8}, '=-1.5')
    .to('.button', {right: '3vw', duration: 1}, '=-1')
    .to('.imageIcon', {left: '3vw', duration: 1}, '=-1')
    .to('.background', {right:'3.5vw', duration: 1}, '=-1')
    .addLabel('home')
    .to('.container__presentation', {scale:3, delay: 1, duration:1.5})
    .to('.home__title', {x:-100, duration:1.5}, '=-1.5')
    .from('.container__experience', {yPercent:150}, '-=2')
    .to('.experience__number--second', {left: '0', duration: 1.5},'-=0.5')  
    .to('.experience__number--third', {left: '0', duration: 1.5}, '-=1.5') 
    .from('.experience__text', {xPercent: 350, duration: 1.5}, '-=1.5')
    .from(chars1, {yPercent: 320, stagger: 0.02,ease: 'back.out', duration:1.5})
    .from(chars2, {yPercent: 420, stagger: 0.02,ease: 'back.out', duration:1.5}, '-=1')
    .addLabel('aboutme')

    ScrollTrigger.create({
        animation: tl,
        trigger: '.section',
        /* markers: true, */
        start: 'top top',
        end: '+=6000',
        pin: true,
        scrub: true
    });
}

// ----------- Particle js Home background -----------
function initSphereCloud(){

    particlesJS("particles-js", 
        {"particles":{
            "number":{"value":123,"density":{"enable":true,"value_area":800}},
            "color":{"value":"#ffffff"},
            "shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},
            "opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},
            "size":{"value":1.5,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},
            "line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},
            "move":{"enable":true,"speed":1.2,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}
            },
        "interactivity":{
            "detect_on":"canvas",
            "events":{"onhover":{"enable":true,"mode":"bubble"},
                    "onclick":{"enable":true,"mode":"repulse"},
                    "resize":true},
            "modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},
                    "bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},
                    "repulse":{"distance":400,"duration":0.4},
                    "push":{"particles_nb":4},
                    "remove":{"particles_nb":2}}
        },"retina_detect":true
    }); 

    // ----------- Sphere Cloud Skills -----------
    const Skills = [
        'HTML', 'CSS', 'JAVASCRIPT',
        'REACT', 'STYLED COMPONENTS', 'GSAP', 'FRAMER MOTION',
        'BOOTSTRAP', 'SASS', 'JSON', 'REDUX',
        'REACT NATIVE', 'EXPO', 'TYPESCRIPT',
        'GIT', 'GITHUB', 'MYSQL', 'MSSQL', 'FIREBASE'
    ];

    const DescriptionSkills = [
        {
            "id":"HTML",
            "desc": "Hyper Text Markup Language, is the standard markup language for creating web pages.<br><br>Is it a language or not? What I know is that it is the basis of web pages."
        },
        {
            "id":"CSS",
            "desc": "Cascading Style Sheets, is used to define styles for your web pages.<br><br>In my view that's where the magic of web pages begins."
        },
        {
            "id":"JAVASCRIPT",
            "desc": "JS is a dynamic programming language used for web development, game development and more.<br><br>It allows you to implement dynamic features that cannot be done with only HTML and CSS."
        },
        {
            "id":"REACT",
            "desc": "Popular open-source JavaScript library.<br><br>Created by Facebook, React contains a collection of reusable JS code snippets used to create user interfaces called components."
        },
        {
            "id":"STYLED COMPONENTS",
            "desc": "Allows you to write CSS code inside a Javascript function, you can create custom styling components.<br><br>It is my favorite for styling with React."
        },
        {
            "id":"GSAP",
            "desc": "Robust Javascript library that allows us to create timeline-based animations with great precision and reliability.<br><br>Professional animations, on another level, with high performance."
        },
        {
            "id":"FRAMER MOTION",
            "desc": "Another animation library, a production-ready motion library for React.<br><br>It provides very good results."
        },
        {
            "id":"BOOTSTRAP",
            "desc": "Cross-platform library or open source toolset for website and web application design.<br><br>It provides us with functionalities using its classes in our HTML."
        },
        {
            "id":"SASS",
            "desc": "It is a CSS preprocessor, a tool that adds features of programming languages to CSS.<br><br>It allows to have a modular organization of styles."
        },
        {
            "id":"JSON",
            "desc": "JavaScript Object Notation. JSON is a lightweight format for storing and transporting data.<br><br>JSON is often used when data is sent from a server to a web page."
        },
        {
            "id":"REDUX",
            "desc": "Open source JavaScript library for application state management, commonly used with React.<br><br>It easily monitors the status of our web applications."
        },
        {
            "id":"REACT NATIVE",
            "desc": "React Native is a React JS-based framework to design mobile apps, both Android and iOS.<br><br>The difference with React is that instead of a web application, what you get is a real native application."
        },
        {
            "id":"EXPO",
            "desc": "Expo is a set of tools, libraries and services you can use to simplify your React Native code.<br><br>It is very useful and recommended."
        },
        {
            "id":"TYPESCRIPT",
            "desc": "Superset of JavaScript that adds optional static typing and advanced features to JavaScript.<br><br>Improves code understanding and highlights errors in the development instance."
        },
        {
            "id":"GIT",
            "desc": "Git is a distributed version control software, designed for applications or web pages with a large number of source code files.<br><br>It also allows you to have a backup copy."
        },
        {
            "id":"GITHUB",
            "desc": "GitHub is a code hosting platform for version control and collaboration using Git.<br><br>It lets you and others work together on projects from anywhere."
        },
        {
            "id":"MYSQL",
            "desc": "MySQL is a relational database management system.<br><br>It is one of the most used, in my case I use it both in my work and in the practices in courses."
        },
        {
            "id":"MSSQL",
            "desc": "Microsoft SQL Server is a relational database management system developed by Microsoft.<br><br>With good features but paid versions."
        },
        {
            "id":"FIREBASE",
            "desc": "Google platform for web and mobile application development.<br><br>It provides complementary backend services, such as real-time database, user authentication, cloud messaging."
        }
    ]


    let tagCloud = TagCloud('.Sphere', Skills, {
        // Sphere radius in px
        radius: 280,

        // animation speed // slow, normal, fast
        maxSpeed: 'normal',
        initSpeed: 'fast',

        // Rolling direction [0 (top) , 90 (left), 135 (right-bottom)] 
        direction: 135,

        // interaction with mouse or not [Default true (decelerate to rolling init speed, and keep rolling with mouse).]
        keep: true
    });

    // Giving color to each text in sphere
    let color = 'white';
    document.querySelector('.Sphere').style.color = color;

    // Action when hover item in sphere

    const skillTitle = select('.space__textTitle');
    const skillText  = select('.space__text');

    let sphereBox = document.querySelector('.sphereBox');
    sphereBox.addEventListener('mouseover', function clickEventHandler(e) {
        if (e.target.className === 'tagcloud--item') {
            tagCloud.pause();
            DescriptionSkills.map((item) =>{
                if (item.id === e.target.innerHTML){
                    console.log(item.desc)
                    skillTitle.innerHTML = item.id
                    skillText.innerHTML = item.desc
                }
            })
        
        }
    }); 

    sphereBox.addEventListener('mouseout', function clickEventHandler(e) {
        if (e.target.className === 'tagcloud--item') {
            tagCloud.resume();
            skillTitle.innerHTML = "Technologies"
            skillText.innerHTML = "Select each one to get more information."
        }
    }); 
}


function initPortfolioAnimation(){
    // Reveal images portfolio
    const sections = selectAll('.rg__column');

    function initHoverReveal(){

        sections.forEach(section =>{
            // get components for animation
            section.imageBlock = section.querySelector('.rg__image');
            /* section.image = section.querySelector('.rg__image img'); */
            section.mask = section.querySelector('.rg__image--mask');        
            section.text = section.querySelector('.rg__text'); 
            section.textCopy = section.querySelector('.rg__text--copy');
            section.textMask = section.querySelector('.rg__text--mask');
            section.heading = section.querySelector('.rg__text--heading');

            // reset the initial position
            gsap.set([section.imageBlock, section.textMask], {yPercent: -101});
            gsap.set(section.mask, {yPercent: 100});
            gsap.set(section.mask, {scale: 1.2});

            // add event listeners to each section on hover
            section.addEventListener('mouseenter', createHoverReveal);
            section.addEventListener('mouseleave', createHoverReveal);
        } );
    }

    const getTextHeight = textCopy => textCopy.clientHeight;

    function createHoverReveal(e){
        
        const {imageBlock, mask, text, textCopy, textMask, heading /* image */} = e.target;

        const tl2 = gsap.timeline({
            defaults: {
                duration: 0.7,
                ease: 'power4.out'
            }    
        })

        if (e.type==='mouseenter'){
            tl2
                .to([imageBlock, textMask, mask], {yPercent:0})
                .to(text, {y: () => -getTextHeight(textCopy)/2}, 0)
                .to(heading, {color:"black"}, 0)
                /* .to(image, {duration: 1.1, scale: 1}, 0) */
        } else if (e.type==='mouseleave'){
            tl2
                .to([imageBlock, textMask], {yPercent: -101})
                .to(mask, {yPercent: 100}, 0)
                .to(text, {y: 0}, 0)
                .to(heading, {color:"white"}, 0)
                /* .to(image, {scale: 1.2}, 0) */
        }

        return tl2;
    }

    // define a breakpoint
    const mq = window.matchMedia('(min-width: 768px)');

    // add change listerner to this breakpoint
    mq.addEventListener("change", (e) => {
        this.handleWidthChange(e);
    }); 

    // first page load
    handleWidthChange(mq);

    function resetProps(elements){
        if (elements.length){
            //stop all tweens
            /* gsap.killTweensOf('*'); */

            elements.forEach(el => {
                el && gsap.set(el, {clearProps: 'all'});
            })
        }
    };

    //  media query change
    function handleWidthChange(mq){
        
        // check if we are on the right breakpoint
        if (mq.matches){
            //setup hover animation
            initHoverReveal();
        } else {
            //width is less than 768px
            console.log('we are on mobile');
            
            //remove event listener for each section
            sections.forEach(section => {

                section.removeEventListener('mouseenter', createHoverReveal);
                section.removeEventListener('mouseleave', createHoverReveal);

                const {imageBlock, mask, text, textCopy, textMask, heading /* image */} = section; 
                resetProps([imageBlock, mask, text, textCopy, textMask, heading /* image */]);
            });
        }
    };
}

// --------- Space text reveal ---------
function initSpaceAnimation(){

    const splitSpaceText   = new SplitType('.space__text', { types: 'words'});
    const splitSpaceTitle  = new SplitType('.space__textTitle', { types: 'words'});
    const wordsSpaceText   = splitSpaceText.words;
    const wordsSpaceTitle  = splitSpaceTitle.words;

    let animSpaceTitle = gsap.to(wordsSpaceTitle, {
        y: 0, stagger: 0.05, delay: 0.2, duration: .1,
        scrollTrigger: {
            trigger: '.space__textTitle .word',
            start: 'top bottom',
            end: 'top 80%',
            scrub: true,
            toggleActions: 'play play reverse reverse'}
    })

    let animSpaceText = gsap.to(wordsSpaceText, {
        y: 0, stagger: 0.05, delay: 0.2, duration: .1,
        scrollTrigger: {
            trigger: '.space__text .word',
            start: 'top bottom',
            end: 'top 80%',
            scrub: true,
            toggleActions: 'play play reverse reverse'}
    })

    // --------- Space 2 change background ---------

    let animSpaceBack = gsap.to('.space--sphere', {
        background: "black", duration: 1,
        scrollTrigger: {
            trigger: '.space--sphere',
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
            toggleActions: 'play play reverse reverse'}
    })

    // --------- Experience change background ---------
    let animExperienceBack = gsap.to('.container__experience', {
        background: "black", duration: 1,
        scrollTrigger: {
            trigger: '.space--sphere',
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
            toggleActions: 'play play reverse reverse'}
    })

    // --------- Experience change color font ---------
    let animExperienceColor = gsap.to('.experience__splitText', {
        color: "white", duration: 1,
        scrollTrigger: {
            trigger: '.space--sphere',
            start: 'top 80%',
            end: 'top 60%',
            scrub: true,
            toggleActions: 'play play reverse reverse'}
    })
}

// --------- Scroll GSAP animation second part ---------

const tl3 = gsap.timeline();

function initSecondScrollAnimation(){
    tl3.addLabel('portfolio')
    .to('.container__portfolio--first', {xPercent:-150}) 
    .from('.container__portfolio--second', {xPercent:150}, '=-2.67') 
    .from('.container__contact', { yPercent:150, duration:0.8})
    .from('.contact__title', { scale:8, xPercent:300, duration:0.8}, '=-0.8') 
    .from('.contact__data', { xPercent:-250, duration:0.8}, '=-0.8')
    .from('.contact__buttonBox', { xPercent:-250, duration:0.8}, '=-0.8')
    .from('.contact__form', { xPercent:300, duration:0.8, opacity: 0}, '=-0.8')
    .addLabel('contact')

    ScrollTrigger.create({
        animation: tl3,
        trigger: '.sectionFinal',
        /* markers: true, */
        start: 'top top',
        end: '+=4000',
        pin: true,
        scrub: true
    });
}

// ----------- Nav menu -----------
function initNavMenu(){

    function proccessDataScroll(section){
        let scrollPosition = {}
        if (section === "Home"){
            scrollPosition = {tl: tl, label: "home"}
        }
        if (section === "About Me"){
            scrollPosition = {tl: tl, label: "aboutme"}
        }
        if (section === "Portfolio"){
            scrollPosition = {tl: tl3, label: "portfolio"}
        }
        if (section === "Contact"){
            scrollPosition = {tl: tl3, label: "contact"}
        }
        return scrollPosition
    }

    const allLinksMenu = selectAll('.nav__link');

    allLinksMenu.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            let scrollPosition = proccessDataScroll(e.target.innerHTML)
            scrollToLabel(0.1, scrollPosition.tl, scrollPosition.label);
            
            let inputNav = select('.checkbox');
            inputNav.checked = false;
        })
    })  

    const imageIcon = select('.imageIcon');

    imageIcon.addEventListener("click", (e) => {
        scrollToLabel(1.2, tl, "initial");
    });

    function scrollToLabel(duration, timeline, label) {   
        
        const yStart = timeline.scrollTrigger.pin ? timeline.scrollTrigger.trigger.parentElement.offsetTop : timeline.scrollTrigger.trigger.offsetTop
            
        const now = timeline.progress() 
        timeline.seek(label) 
        const goToProgress = timeline.progress()   
        timeline.progress(now)   
        
        gsap.to(window, { 
            overwrite: 'auto',
            duration: duration,     
            scrollTo: { 
                autoKill: true,
                y: yStart + ( timeline.scrollTrigger.end - timeline.scrollTrigger.start ) * goToProgress      
            } 
        }); 
    };
}