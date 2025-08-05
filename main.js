document.querySelectorAll(".nav-menu a, .cta-buttons a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor click behavior
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Smooth scroll to the target element
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    } // --> this is if there is no id # at any href if it's heppend by mistake.

    // targetElement.scrollIntoView({
    //   behavior: "smooth",
    // });
  });
});

function sendToGmail() {
  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const subject = document.getElementById("subject")?.value.trim();
  const message = document.getElementById("message")?.value.trim();

  // Validate form fields
  if (!name || !email || !subject || !message) {
    Swal.fire({
      icon: "warning",
      title: translations[currentLang]["alert_fill_title"],
      text: translations[currentLang]["alert_fill_text"],
    });
    return;
  }

  // Show loading alert
  Swal.fire({
    title: translations[currentLang]["sending_title"] || "Sending...",
    text:
      translations[currentLang]["sending_text"] ||
      "Please wait while we send your message.",
    icon: "info",
    allowOutsideClick: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    },
  });

  // Get current timestamp
  const now = new Date();
  const timestamp = now.toLocaleString();

  // Prepare template parameters for EmailJS
  const templateParams = {
    name: name,
    name_initial: name.charAt(0).toUpperCase(), // First letter for avatar
    email: email,
    subject: subject,
    message: message,
    time: timestamp,
  };

  // Send email using EmailJS
  emailjs
    .send("service_9bu3bcf", "template_9ucp4b9", templateParams)
    .then((response) => {
      console.log("Email sent successfully:", response.status, response.text);

      // Success alert
      Swal.fire({
        icon: "success",
        title: translations[currentLang]["alert_success_title"],
        text: translations[currentLang]["alert_success_text"],
        showConfirmButton: true,
        confirmButtonText: translations[currentLang]["ok_button"] || "OK",
        confirmButtonColor: "var(--teal)",
      }).then(() => {
        // Reset form after successful send
        document.getElementById("contactForm").reset();
      });
    })
    .catch((error) => {
      console.error("EmailJS error:", error);

      // Error alert
      Swal.fire({
        icon: "error",
        title: translations[currentLang]["alert_error_title"] || "Error",
        text:
          translations[currentLang]["alert_error_text"] ||
          "Failed to send message. Please try again later.",
        showConfirmButton: true,
        confirmButtonText: translations[currentLang]["ok_button"] || "OK",
        confirmButtonColor: "var(--coral)",
      });
    });
}

// Optional: Add these translations to your translations object if they don't exist
// Add these to your translations object:
/*
const translationsAddition = {
  en: {
    sending_title: "Sending Message...",
    sending_text: "Please wait while we send your message.",
    alert_error_title: "Error",
    alert_error_text: "Failed to send message. Please try again later.",
    ok_button: "OK"
  },
  ar: {
    sending_title: "جاري الإرسال...",
    sending_text: "يرجى الانتظار بينما نرسل رسالتك.",
    alert_error_title: "خطأ",
    alert_error_text: "فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.",
    ok_button: "موافق"
  }
};
*/

// function sendToGmail() {
//   const name = document.getElementById("name")?.value.trim();
//   const email = document.getElementById("email")?.value.trim();
//   const subject = document.getElementById("subject")?.value.trim();
//   const message = document.getElementById("message")?.value.trim();

//   if (!name || !email || !subject || !message) {
//     Swal.fire({
//       icon: "warning",
//       title: translations[currentLang]["alert_fill_title"],
//       text: translations[currentLang]["alert_fill_text"],
//     });
//     return;
//   }

//   const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
//   const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=saiftheprogrammer@gmail.com&su=${encodeURIComponent(
//     subject
//   )}&body=${encodeURIComponent(emailBody)}`;

//   Swal.fire({
//     icon: "success",
//     title: translations[currentLang]["alert_success_title"],
//     text: translations[currentLang]["alert_success_text"],
//     showConfirmButton: false,
//     timer: 3000,
//   }).then(() => {
//     window.open(gmailUrl, "_blank");
//     document.getElementById("contactForm").reset();
//   });
// }

// Smooth scroll transparency effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  const scrollPosition = window.scrollY;
  const maxScroll = 200; // Distance to reach full transparency

  // Define the breakpoint for mobile (matches your CSS @media (max-width: 968 px))
  const mobileBreakpoint = 968;

  // Check if the screen width is greater than the mobile breakpoint
  if (window.innerWidth > mobileBreakpoint) {
    // Apply transparency effect only on larger screens
    const startOpacity = 1.0; // Full color at top
    const endOpacity = 0.5; // 50% transparent when scrolled

    const scrollProgress = Math.min(scrollPosition / maxScroll, 1);
    const currentOpacity =
      startOpacity - scrollProgress * (startOpacity - endOpacity);

    // Apply background with smooth opacity transition
    header.style.background = `linear-gradient(135deg,
      rgba(74, 131, 138, ${currentOpacity}) 0%,
      rgba(58, 106, 112, ${currentOpacity}) 100%)`;

    // Enhanced backdrop filter for better effect
    header.style.backdropFilter = `blur(${10 + scrollProgress * 15}px)`;

    // Box shadow gets lighter as it becomes more transparent
    const shadowOpacity = 0.2 - scrollProgress * 0.15;
    header.style.boxShadow = `0 4px 6px rgba(0, 0, 0, ${shadowOpacity})`;

    // Text shadow for readability
    const textShadow = `0 1px 3px rgba(0, 0, 0, ${
      (10 - scrollProgress) * 0.3
    })`;
    const navLinks = document.querySelectorAll(".nav-menu li a");
    navLinks.forEach((link) => {
      link.style.textShadow = textShadow;
    });
  } else {
    // On small screens, ensure header is always 100% opaque (its default CSS state)
    // Reset inline styles applied by the scroll function
    header.style.background = ""; // Resets to CSS defined background
    header.style.backdropFilter = ""; // Resets to CSS defined backdrop-filter
    header.style.boxShadow = ""; // Resets to CSS defined box-shadow
    const navLinks = document.querySelectorAll(".nav-menu li a");
    navLinks.forEach((link) => {
      link.style.textShadow = ""; // Resets text-shadow
    });
  }
});

// Mobile menu toggle (no changes needed here, it just toggles classes)
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", function () {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_portfolio: "Portfolio",
    nav_experience: "Experience",
    nav_skills: "Skills",
    nav_contact: "Contact",
    about_heading: "My name is...Saif",
    hero_intro:
      "Crafting responsive and interactive web experiences using any technologies!",
    view_work: "View My Work",
    get_in_touch: "Get In Touch",
    contact_heading: "Get In Touch",
    contact_desc:
      "Let’s build great digital experiences together. I’m always open to exciting front-end projects...",
    about_text: "I'm just a programmer with...",
    about_stats1:
      "5+ years of growth through trials, errors, and breakthroughs in the world of web development 🕒",
    about_stats2: "1+ Projects Completed 📂",
    about_stats3: "0+ Happy Clients 😊",
    portfolio_text:
      'Well...this portfolio is my first <span style="color: red">real</span> project',
    experience_item1: "2020 - Present as a Front-end Developer",
    skills_still: "Still",
    contact_heading_main: "Get In Touch",
    contact_email: "Email",
    placeholder_name: "Your Name",
    placeholder_email: "Your Email",
    placeholder_subject: "Subject",
    placeholder_message: "Your Message",
    send_message: "Send Message",
    alert_fill_title: "Oops!",
    alert_fill_text: "Please fill in all fields before sending.",
    sending_title: "Sending...",
    sending_text: "Please wait while we send your message...",
    alert_success_title: "Done",
    footer_text: "&copy; 2025 SaifTheProgrammer. All rights reserved.",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "عنّي",
    nav_portfolio: "أعمالي",
    nav_experience: "الخبرات",
    nav_skills: "المهارات",
    nav_contact: "تواصل",
    about_heading: "إسمي...سيف",
    hero_intro: "بصمم تجارب ويب تفاعلية واستجابة باستخدام أي تقنية!",
    view_work: "شوف شُغلي",
    get_in_touch: "تـواصل مـعي",
    contact_heading: "يلا تشتغل سوا",
    contact_desc:
      "يلا نعمل تجارب ويب جامدة سوا، متاح دايمًا لأي مشروع فرونت إند حماسي...",
    about_text: "أنا فقط مبرمج بــ...",
    about_stats1:
      "خبرة أكتر من 5 سنين في دوشة الويب، وكل يوم بتعلم حاجة جديدة! 🕒",
    about_stats2: "أكتر من مشروع واحد تم إنجازه 📂",
    about_stats3: "لسه مفيش عملاء مبسوطين  😊",
    portfolio_text:
      'بصراحة...البورتفوليو ده أول <span style="color: red">مشروع حقيقي</span> ليا',
    experience_item1: "من 2020 - حتى الآن كمطور واجهة أمامية",
    skills_still: "لسه بتعلم...",
    contact_heading_main: "للتواصل",
    contact_email: "البريد الإلكتروني",
    placeholder_name: "اسمك",
    placeholder_email: "بريدك الإلكتروني",
    placeholder_subject: "الموضوع",
    placeholder_message: "رسالتك",
    send_message: "إرسال رسالة",
    alert_fill_title: "لحظة!",
    alert_fill_text: "محتاج تملأ كل الخانات قبل ما ترسل.",
    sending_title: "جاري الإرسال...",
    sending_text: "لحظة من فضلك، جاري إرسال الرسالة...",
    alert_success_title: "تم بنجاح",
    footer_text: "&copy; 2025 جميع الحقوق محفوظة",
  },
};

let currentLang = "en";

// لما تضغط على زر التبديل
document.getElementById("lang-toggle").addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  updateLanguage();

  // تغيير النص اللي على البوتون نفسه
  document.getElementById("lang-toggle").textContent =
    currentLang === "ar" ? "English" : "العربية";
});

// الوظيفة اللي بتحدث الكلام على الصفحة
function updateLanguage() {
  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    if (translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });

  // Update placeholders
  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-placeholder");
    if (translations[currentLang][key]) {
      el.setAttribute("placeholder", translations[currentLang][key]);
    }
  });

  // تغيير اتجاه الصفحة حسب اللغة
  document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
}
// Update language on initial load
updateLanguage();
