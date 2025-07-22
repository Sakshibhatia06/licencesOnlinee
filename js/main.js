(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top shadow-sm').css('top', '0px');
        } else {
            $('.nav-bar').removeClass('sticky-top shadow-sm').css('top', '-100px');
        }
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });



    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="fa fa-arrow-right"></i>',
            '<i class="fa fa-arrow-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);

   document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".faq-question");

    questions.forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        question.classList.toggle("active");
        answer.classList.toggle("open");
      });
    });
  });
    const menuData = {
      business: {
        "Licenses & Registrations": [
          { label: "FSSAI [Food License]", link: "/fssai-registration.html" },
          { label: "IEC [Import/Export Code]", link: "/import-export-code.html" },
          { label: "Digital Signature Certificate", link: "/dsc-registration.html" },
          { label: "Udyam/MSME Registration", link: "/UdyamRegistration.html" },
          { label: "ISO Certification", link: "/ISOCertification.html" }
        ],
        "Web Development": [
          { label: "Web/E-Commerce Website Development", link: "/web-ecommerce-development.html" },
        ],
         "Sale on Marketplace": [
          { label: "Sale on Amazon", link: "/Sales-RegistrationAmazon.html" },
           { label: "Sale on Flipkart", link: "/Sales-RegistrationFilpkart.html" },
        ],
      },
      tax: {
        "GST and Other Indirect Tax": [
          { label: "GST Registration", link: "/GstRegistration.html" },
          { label: "GST Filing", link: "/GstFilling.html" },
          { label: "GST Cancellation and Revocation", link: "/GstRevocation.html" },
          { label: "GST Cancellation", link: "/GstCancellation.html" },
        ],
      },
      others: {
        "About Us": [
          { label: "Our Company", link: "/about.html" },
          { label: "Contact Us", link: "/contact.html" }
        ],
      }
    };

    const navItems = document.querySelectorAll('.nav-item');
    const flyoutWrapper = document.getElementById('flyoutWrapper');
    const leftMenu = document.getElementById('leftMenu');
    const rightMenu = document.getElementById('rightMenu');

    let currentTop = null;

    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        currentTop = item.dataset.flyout;
        renderFlyout(currentTop);
        flyoutWrapper.classList.add('show');
      });
    });

    flyoutWrapper.addEventListener('mouseleave', () => {
      flyoutWrapper.classList.remove('show');
      navItems.forEach(i => i.classList.remove('active'));
    });

    function renderFlyout(mainKey) {
      const section = menuData[mainKey];
      leftMenu.innerHTML = '';
      rightMenu.innerHTML = '';
      let first = true;

      for (let key in section) {
        const div = document.createElement('div');
        div.textContent = key;
        div.dataset.key = key;
        if (first) div.classList.add('active');
        leftMenu.appendChild(div);

        div.addEventListener('mouseenter', () => {
          leftMenu.querySelectorAll('div').forEach(d => d.classList.remove('active'));
          div.classList.add('active');
          renderRight(mainKey, key);
        });

        if (first) renderRight(mainKey, key);
        first = false;
      }
    }

    function renderRight(mainKey, subKey) {
      const items = menuData[mainKey][subKey];
      rightMenu.innerHTML = `<h3>${subKey}</h3>`;
      const ul = document.createElement('ul');
      items.forEach(i => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${i.link}">${i.label}</a>`;
        ul.appendChild(li);
      });
      rightMenu.appendChild(ul);
    }

      function toggleMobile() {
  const menu = document.getElementById("mobileMenu");
  const tabNav = document.querySelector(".tab-nav11");

  const isActive = menu.classList.contains("active");

  // Toggle menu visibility
  menu.style.display = isActive ? "none" : "flex";
  menu.classList.toggle("active");

  // Hide or show tab nav menu based on mobile menu state
  if (!isActive) {
    tabNav.style.display = "none";
  } else {
    tabNav.style.display = "block";
  }
}

    let currentPage = 'mainMenu';

    function openSubMenu(menuId) {
      document.getElementById(currentPage).classList.remove('active');
      document.getElementById(menuId).classList.add('active');
      currentPage = menuId;
    }

    function goBack() {
      document.getElementById(currentPage).classList.remove('active');
      document.getElementById('mainMenu').classList.add('active');
      currentPage = 'mainMenu';
    }

    function buildMobileMenu() {
      const wrapper = document.getElementById("mobileMenu");
      wrapper.innerHTML = `<div class="menu-page active" id="mainMenu"></div>`;
      const mainMenu = document.getElementById("mainMenu");

      for (let mainKey in menuData) {
        const item = document.createElement("div");
        item.classList.add("menu-item");
        item.innerHTML = `<span>${getIcon(mainKey)} ${formatTitle(mainKey)}</span><span>›</span>`;
        item.onclick = () => openSubMenu(mainKey);
        mainMenu.appendChild(item);

        // Create submenu page
        const subMenu = document.createElement("div");
        subMenu.classList.add("menu-page");
        subMenu.id = mainKey;

        const backBtn = document.createElement("div");
        backBtn.classList.add("back-btn");
        backBtn.textContent = `← ${formatTitle(mainKey)}`;
        backBtn.onclick = goBack;
        subMenu.appendChild(backBtn);

        for (let subHeading in menuData[mainKey]) {
          const links = menuData[mainKey][subHeading];
          links.forEach(link => {
            const a = document.createElement("a");
            a.href = link.link;
            a.classList.add("menu-link");
            a.textContent = link.label;
            subMenu.appendChild(a);
          });
        }

        wrapper.appendChild(subMenu);
      }
    }

    function formatTitle(str) {
      return str.replace(/(?:^|\s|-)\w/g, c => c.toUpperCase()).replace(/&/g, '&');
    }

    function getIcon(key) {
      const icons = {
        business: "📁",
        tax: "💼",
        trademark: "📄"
      };
      return icons[key] || "📌";
    }

    document.addEventListener("DOMContentLoaded", () => {
      buildMobileMenu();
    });
    // Highlight active tab on scroll
    const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".tab-nav1 a");
const tabNav = document.querySelector(".tab-nav1");
const footer = document.querySelector("footer"); // Replace with actual footer class/id if different

window.addEventListener("scroll", () => {
  let current = "";
  let footerTop = footer.getBoundingClientRect().top;

  // Highlight the active tab
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  // ✅ Toggle sticky behavior when footer enters view
  if (footerTop <= window.innerHeight) {
    tabNav.style.position = "static";
  } else {
    tabNav.style.position = "sticky";
  }
});



