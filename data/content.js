// Usari — site içeriği (tek kaynak). Her metin alanı { tr, en } biçiminde iki dillidir.
// TUR 2: Bu site Usari'nin KURUMSAL şirket sitesidir (5 sayfa: Anasayfa · Hizmetler ·
// Grande AI · Hakkında · İletişim). Grande AI HENÜZ ÇIKMADI — tüm Grande AI metinleri
// gelecek/geliştirme kipindedir; "deneyin/başlayın" dili kullanılmaz.
// İletişim: grande26ai@gmail.com · Instagram: kunitu24
// Bu dosyayı kodlama-agenti okuyup DOM'a basar; alan adları sabittir, mantıklı tutulmuştur.

const CONTENT = {
  brand: {
    name: "Usari",
    product: { tr: "Grande AI", en: "Grande AI" },
    slogan: {
      tr: "Öğretmenin yanında, kendi sunucunuzda çalışacak yapay zekâ.",
      en: "AI built to stand beside the teacher and run on your own server."
    }
  },

  nav: {
    home:     { tr: "Anasayfa",  en: "Home" },
    services: { tr: "Hizmetler", en: "Services" },
    grande:   { tr: "Grande AI", en: "Grande AI" },
    features: { tr: "Grande AI", en: "Grande AI" },
    about:    { tr: "Hakkında",  en: "About" },
    contact:  { tr: "İletişim",  en: "Contact" }
  },

  // Küçük dil düğmesi etiketleri (kod tarafı için)
  ui: {
    langTr: { tr: "TR", en: "TR" },
    langEn: { tr: "EN", en: "EN" },
    menu:   { tr: "Menü", en: "Menu" },
    mainNav: { tr: "Ana menü", en: "Main menu" },
    skipToContent: { tr: "İçeriğe atla", en: "Skip to content" },
    close:  { tr: "Kapat", en: "Close" },
    backToTop: { tr: "Başa dön", en: "Back to top" }
  },

  // Giriş animasyonu (intro video overlay)
  intro: {
    skip: { tr: "Geç", en: "Skip" }
  },

  home: {
    heroEyebrow: {
      tr: "Usari — Yazılım & Yapay Zekâ",
      en: "Usari — Software & AI"
    },
    heroTitle: {
      tr: "Yazılım geliştiriyoruz. Eğitim için yapay zekâ inşa ediyoruz.",
      en: "We build software. And we're building AI for education."
    },
    heroSubtitle: {
      tr: "Usari; size özel uygulamalar geliştiren, kurumsal web siteleri kuran ve seçtiğiniz seste konuşan yapay zekâ telefon sekreterleri kuran bir yazılım şirketidir. Aynı zamanda amiral gemisi projemiz Grande AI'ı — öğretmenler için kendi sunucusunda çalışacak yapay zekâ asistanını — geliştiriyoruz.",
      en: "Usari is a software company that builds custom applications, corporate websites, and AI phone assistants that speak in the voice you choose. Alongside our client work, we are developing our flagship project, Grande AI — an AI assistant for teachers, built to run on your own server."
    },
    heroCta:       { tr: "Hizmetlerimiz",      en: "Our services" },
    heroCtaSecond: { tr: "Grande AI'ı tanıyın", en: "Meet Grande AI" },

    trustChips: [
      { tr: "Kendi sunucunuzda çalışır", en: "Runs on your own server" },
      { tr: "Veri yerelde kalır",        en: "Your data stays local" },
      { tr: "İşlem başına 0 maliyet",    en: "Zero per-task cost" },
      { tr: "4 dilde anında",            en: "Instant in four languages" }
    ],

    statsTitle: { tr: "Hedeflenen kapsam", en: "Planned scope" },
    stats: [
      { value: "4",  label: { tr: "Dil",             en: "Languages" } },
      { value: "13", label: { tr: "Öğretmen aracı",  en: "Teacher tools" } },
      { value: "6",  label: { tr: "Öğrenci aracı",   en: "Student tools" } },
      { value: "0₺", label: { tr: "İşlem maliyeti",  en: "Cost per task" } }
    ],

    valueTitle: {
      tr: "Nasıl çalışırız",
      en: "How we work"
    },
    valueSubtitle: {
      tr: "Hem müşteri projelerimizde hem Grande AI'da aynı ilkelerle çalışıyoruz:",
      en: "The same principles guide our client work and Grande AI:"
    },
    valueProps: [
      {
        icon: "server",
        title: { tr: "Kendi sunucunuzda", en: "On your own server" },
        desc: {
          tr: "Veri yerelliği bizim için bir özellik değil, ilke. Mümkün olan her çözümü, veri sahibinde kalacak biçimde kurarız. Grande AI'ı da buluta değil, kurumun kendi sunucusuna göre geliştiriyoruz.",
          en: "Data locality is a principle for us, not a feature. Wherever possible, we build solutions where the data stays with its owner. Grande AI, too, is being developed for the institution's own server, not the cloud."
        }
      },
      {
        icon: "infinity",
        title: { tr: "Sınırsız üretim", en: "Unlimited output" },
        desc: {
          tr: "İşlem başına sayaç işleten modelleri sevmiyoruz. Grande AI'ı, bir sınav da üretseniz yirmi sınav da üretseniz ek maliyet doğurmayacak biçimde tasarlıyoruz.",
          en: "We're not fans of per-task meters. We're designing Grande AI so that producing one exam or twenty adds no extra cost."
        }
      },
      {
        icon: "globe",
        title: { tr: "Çok dilli düşünürüz", en: "Multilingual by design" },
        desc: {
          tr: "Çok dillilik sonradan eklenen bir özellik değil, baştan verilen bir karar. Grande AI, Türkçe, İngilizce, İspanyolca ve Fransızcayı birlikte destekleyecek.",
          en: "Multilingual isn't an afterthought; it's a decision made at the start. Grande AI will support Turkish, English, Spanish and French side by side."
        }
      },
      {
        icon: "sliders",
        title: { tr: "İhtiyaca göre", en: "Built around the need" },
        desc: {
          tr: "Hazır kalıp satmayız. Müşteri projelerinde de Grande AI'da da işe ihtiyacı dinleyerek başlar, çözümü ona göre biçimlendiririz.",
          en: "We don't sell canned templates. In client work and in Grande AI alike, we start by listening to the need and shape the solution around it."
        }
      }
    ],

    howTitle:    { tr: "Nasıl çalışacak?", en: "How it will work" },
    howSubtitle: {
      tr: "Hedef: üç adımda, dakikalar içinde derse hazır içerik.",
      en: "The goal: class-ready content in three steps, in minutes."
    },
    howSteps: [
      {
        step: "1",
        title: { tr: "Ne istediğinizi söyleyin", en: "Tell it what you need" },
        desc: {
          tr: "Konuyu, sınıf seviyesini ve amacı yazmanız yetecek; örneğin \"7. sınıf fen, hücre konusu, çözümlü ödev\".",
          en: "Entering the topic, grade level and goal will be enough; for example \"grade 7 science, the cell, homework with solutions\"."
        }
      },
      {
        step: "2",
        title: { tr: "Grande AI hazırlayacak", en: "Grande AI will draft it" },
        desc: {
          tr: "Aracı seçeceksiniz; sunu, sınav, deney kartı ya da veli notu saniyeler içinde taslak olarak gelecek.",
          en: "You'll pick a tool; a deck, an exam, a lab card or a parent note will arrive as a draft in seconds."
        }
      },
      {
        step: "3",
        title: { tr: "Gözden geçirin, kullanın", en: "Review and use it" },
        desc: {
          tr: "Taslağı düzenleyecek, dilini değiştirecek ya da olduğu gibi kullanacaksınız. Son söz her zaman öğretmende olacak.",
          en: "You'll edit the draft, change its language, or use it as is. The final word will always stay with the teacher."
        }
      }
    ],

    ctaBandTitle: {
      tr: "Projeniz mi var, Grande AI'ı mı merak ediyorsunuz?",
      en: "Have a project in mind — or curious about Grande AI?"
    },
    ctaBandText: {
      tr: "Bir uygulama, web sitesi ya da telefon sekreteri için görüşmek isterseniz bize yazın. Grande AI'daki gelişmelerden haberdar olmak içinse bir e-posta yeter.",
      en: "Write to us to talk about an app, a website or a phone assistant. And if you'd like to hear about Grande AI as it develops, a single email is enough."
    },
    ctaBandButton:  { tr: "Projenizi konuşalım", en: "Let's talk about your project" },
    ctaBandButton2: { tr: "Haberdar olun",       en: "Get notified" }
  },

  // YENİ — Hizmetler sayfası (hizmetler.html). Usari'nin 3 aktif hizmeti.
  services: {
    title: {
      tr: "Fikirden çalışan ürüne.",
      en: "From idea to working product."
    },
    intro: {
      tr: "Usari üç alanda uçtan uca hizmet verir: size özel uygulama geliştirme, kurumsal web sitesi yapımı ve seçtiğiniz seste konuşan yapay zekâ telefon sekreteri. Her projede aynı yaklaşım: dinle, netleştir, geliştir, teslim et.",
      en: "Usari offers end-to-end services in three areas: custom application development, corporate website building, and an AI phone assistant that speaks in the voice you choose. Every project follows the same approach: listen, define, build, deliver."
    },

    items: [
      {
        id: "uygulama",
        no: "01",
        icon: "smartphone",
        title: { tr: "Uygulama yazılımı", en: "Application development" },
        desc: {
          tr: "İşinize özel mobil ya da masaüstü uygulamayı fikirden yayına kadar birlikte geliştiririz. İşinizi hazır bir kalıba sığdırmayız; akışınıza, kullanıcınıza ve hedefinize göre tasarlanmış bir ürün teslim ederiz.",
          en: "We take your custom mobile or desktop application from idea to launch, together. We don't squeeze your work into a template; we deliver a product designed around your flow, your users and your goal."
        },
        deliverables: [
          { tr: "İhtiyaç analizi ve kapsam belgesi",            en: "Needs analysis and scope document" },
          { tr: "Arayüz tasarımı ve prototip",                  en: "Interface design and prototype" },
          { tr: "Mobil / masaüstü uygulama geliştirme",         en: "Mobile / desktop application development" },
          { tr: "Yayına alma ve bakım desteği",                 en: "Launch and maintenance support" }
        ],
        cta: { tr: "Projenizi konuşalım", en: "Let's talk about your project" }
      },
      {
        id: "web",
        no: "02",
        icon: "globe",
        title: { tr: "Web sitesi yapımı", en: "Website development" },
        desc: {
          tr: "Kurumunuzu doğru anlatan, hızlı ve çok dilli web siteleri kurarız. Tanıtım sayfasından kurumsal siteye; içerik yapısını, tasarımı ve teknik kurulumu tek elden yürütürüz.",
          en: "We build fast, multilingual websites that tell your organisation's story properly. From a landing page to a full corporate site, we handle content structure, design and technical setup in one place."
        },
        deliverables: [
          { tr: "Kurumsal / tanıtım sitesi tasarımı ve geliştirme", en: "Corporate / showcase site design and development" },
          { tr: "Çok dilli içerik yapısı (TR/EN)",                  en: "Multilingual content structure (TR/EN)" },
          { tr: "Mobil uyumluluk ve hız optimizasyonu",             en: "Mobile responsiveness and speed optimisation" },
          { tr: "Alan adı ve yayına alma kurulumu",                 en: "Domain and go-live setup" }
        ],
        cta: { tr: "Projenizi konuşalım", en: "Let's talk about your project" }
      },
      {
        id: "sekreter",
        no: "03",
        icon: "mic",
        title: { tr: "Kişisel telefon sekreteri", en: "Personal phone assistant" },
        desc: {
          tr: "Telefonunuzu, sizin seçtiğiniz seste konuşan bir yapay zekâ asistanı karşılar: aramaları yanıtlar, mesaj alır, randevu düzenler. Sesin tonunu ve konuşma tarzını birlikte belirleriz; asistan, işletmenizi tam istediğiniz gibi temsil eder — siz meşgulken ya da mesai dışında bile telefonunuz yanıtsız kalmaz.",
          en: "An AI assistant answers your phone in the voice you choose: it takes calls, records messages and arranges appointments. We define the tone and speaking style together, so the assistant represents your business exactly the way you want — and your phone goes unanswered no more, even when you're busy or off the clock."
        },
        deliverables: [
          { tr: "Size özel ses seçimi ve konuşma tarzı ayarı",  en: "A voice and speaking style chosen with you" },
          { tr: "Arama yanıtlama ve mesaj alma",                en: "Call answering and message taking" },
          { tr: "Randevu ve geri arama düzenleme",              en: "Appointment and callback handling" },
          { tr: "Kurulum, deneme süreci ve destek",             en: "Setup, trial period and support" }
        ],
        cta: { tr: "Projenizi konuşalım", en: "Let's talk about your project" },
        voiceTag: { tr: "SİZİN SEÇTİĞİNİZ SES", en: "THE VOICE YOU CHOOSE" }
      }
    ],

    processTitle: { tr: "Nasıl ilerliyoruz?", en: "How we run a project" },
    processSteps: [
      {
        step: "1",
        title: { tr: "Görüşme", en: "Conversation" },
        desc: {
          tr: "İhtiyacınızı dinliyoruz: neyi, kim için, hangi hedefle yapmak istiyorsunuz? İlk görüşme bir taahhüt değil, tanışmadır.",
          en: "We listen to your need: what do you want to build, for whom, and to what end? The first conversation is an introduction, not a commitment."
        }
      },
      {
        step: "2",
        title: { tr: "Kapsam & öneri", en: "Scope & proposal" },
        desc: {
          tr: "Görüşmenin ardından kapsamı, yaklaşımı ve takvimi içeren net bir öneri sunuyoruz; ne alacağınızı baştan bilirsiniz.",
          en: "After the conversation we present a clear proposal covering scope, approach and timeline, so you know from the start exactly what you'll get."
        }
      },
      {
        step: "3",
        title: { tr: "Geliştirme & düzenli gösterim", en: "Build & regular demos" },
        desc: {
          tr: "Geliştirme boyunca çalışan sürümü düzenli aralıklarla gösterir, geri bildiriminizle yönü birlikte ayarlarız.",
          en: "Throughout development we show you the working version at regular intervals and adjust course together with your feedback."
        }
      },
      {
        step: "4",
        title: { tr: "Teslim & destek", en: "Delivery & support" },
        desc: {
          tr: "Ürünü çalışır hâlde teslim eder, kullanımını aktarır ve sonrasında destek için yanınızda kalırız.",
          en: "We hand over the product in working order, walk you through it, and stay available for support afterwards."
        }
      }
    ],

    whyTitle: { tr: "Neden Usari?", en: "Why Usari?" },
    whyItems: [
      {
        title: { tr: "Tek muhatap", en: "One point of contact" },
        desc: {
          tr: "Tasarımdan teslimata aynı ekiple çalışırsınız; arada aktarma katmanı yoktur.",
          en: "From design to delivery you work with the same team; there are no middle layers."
        }
      },
      {
        title: { tr: "Uçtan uca geliştirme", en: "End-to-end development" },
        desc: {
          tr: "Fikir, tasarım, kod, yayın ve destek — sürecin tamamını biz yürütürüz.",
          en: "Idea, design, code, launch and support — we carry the whole process."
        }
      },
      {
        title: { tr: "Yapay zekâ uzmanlığı", en: "AI expertise" },
        desc: {
          tr: "Kendi yapay zekâ ürünümüzü geliştiren bir ekibiz; bu birikimi projenize taşırız.",
          en: "We are a team building its own AI product, and we bring that experience to your project."
        }
      }
    ]
  },

  // Grande AI sayfası (grande-ai.html, eski "Özellikler") — geliştirilmekte olan amiral gemisi proje.
  features: {
    eyebrow: { tr: "Amiral gemisi proje", en: "Flagship project" },
    statusPill: { tr: "GELİŞTİRME AŞAMASINDA · 2026", en: "IN DEVELOPMENT · 2026" },
    title: { tr: "Grande AI", en: "Grande AI" },
    intro: {
      tr: "Grande AI, Usari'nin geliştirmekte olduğu amiral gemisi proje: öğretmenin hazırlık yükünü azaltacak araçlarla öğrencinin kendi başına çalışmasını destekleyecek araçları bir arada sunmayı hedefliyoruz. Tamamını kendi sunucunuzda çalışacak, kişiselleştirilebilir ve çok dilli olacak biçimde tasarlıyoruz.",
      en: "Grande AI is the flagship project Usari is developing: our goal is to bring together tools that will lighten the teacher's prep load and tools that will help students study on their own. We are designing all of it to run on your own server, personalizable and multilingual."
    },
    notifyCta: { tr: "Haberdar olun",          en: "Get notified" },
    followCta: { tr: "Yolculuğu takip edin",   en: "Follow the journey" },

    teacherTitle: { tr: "Öğretmen yetenekleri", en: "Teacher capabilities" },
    teacherIntro: {
      tr: "Planlamadan değerlendirmeye, dersin her aşamasını destekleyecek biçimde tasarlanıyor.",
      en: "Being designed to support every stage of the lesson, from planning to assessment."
    },
    teacherTools: [
      {
        icon: "presentation",
        title: { tr: "Sunu / Slaytlar", en: "Slides & Decks" },
        desc: {
          tr: "Seviyeye ve müfredata göre ders sunusu üretecek; akışı, başlıkları ve örnekleri hazır getirecek.",
          en: "Will build a lesson deck matched to level and curriculum, with flow, headings and examples ready to go."
        }
      },
      {
        icon: "clipboard",
        title: { tr: "Ödev", en: "Homework" },
        desc: {
          tr: "Seviyeye uygun ödevler hazırlayacak; isterseniz adım adım çözümleriyle birlikte.",
          en: "Will prepare level-appropriate homework, with step-by-step solutions when you want them."
        }
      },
      {
        icon: "check-square",
        title: { tr: "Sınav", en: "Exam" },
        desc: {
          tr: "Çoktan seçmeli, açık uçlu ya da karma sınav soruları oluşturacak; zorluk dengesini gözetecek.",
          en: "Will generate multiple-choice, open-ended or mixed exam questions with a balanced level of difficulty."
        }
      },
      {
        icon: "layout",
        title: { tr: "Şablon Sınav (Blueprint)", en: "Blueprint Exam" },
        desc: {
          tr: "Verdiğiniz şablona (bölüm, soru tipi, yüzde dağılımı) birebir uyan sınavı cevap anahtarıyla üretecek.",
          en: "Will produce an exam that matches your blueprint exactly (sections, question types, weightings) with an answer key."
        }
      },
      {
        icon: "layers",
        title: { tr: "Farklılaştırma", en: "Differentiation" },
        desc: {
          tr: "Aynı konuyu üç seviyede hazırlayacak: destek, hedef ve zenginleştirme. Her öğrenciye uygun yol.",
          en: "Will prepare one topic at three levels: support, target and enrichment. A path that fits every student."
        }
      },
      {
        icon: "alert-circle",
        title: { tr: "Kavram Yanılgıları", en: "Misconceptions" },
        desc: {
          tr: "Konuya özgü klasik yanılgıları, düzeltmelerini ve öğrenciyi düşündüren kaliteli çeldiricileri listeleyecek.",
          en: "Will list common misconceptions for the topic, their corrections and strong distractors that make students think."
        }
      },
      {
        icon: "mail",
        title: { tr: "Veli Notu", en: "Parent Note" },
        desc: {
          tr: "İki satırlık notunuzu sıcak, saygılı ve yapıcı bir veli mesajına dönüştürecek; istediğiniz dilde.",
          en: "Will turn your two-line note into a warm, respectful and constructive parent message, in the language you choose."
        }
      },
      {
        icon: "check-circle",
        title: { tr: "Rubrikle Değerlendirme", en: "Rubric Grading" },
        desc: {
          tr: "Öğrenci cevabını sizin rubriğinize göre kriter kriter puanlayacak; her puanın gerekçesini açıklayacak.",
          en: "Will score a student answer against your rubric, criterion by criterion, with a reason for every point."
        }
      },
      {
        icon: "list-ordered",
        title: { tr: "Adım Adım Çözüm", en: "Step-by-Step Solution" },
        desc: {
          tr: "Problemi numaralı adımlarla çözecek ve her adımda \"neden\" notuyla mantığı görünür kılacak.",
          en: "Will solve a problem in numbered steps and make the reasoning visible with a \"why\" note at each step."
        }
      },
      {
        icon: "flask",
        title: { tr: "Deney Kartı", en: "Lab Card" },
        desc: {
          tr: "Konu ve malzemeden tek sayfalık laboratuvar kartı çıkaracak: amaç, adımlar, güvenlik ve gözlem alanı.",
          en: "Will create a one-page lab card from a topic and materials: aim, steps, safety notes and an observation space."
        }
      },
      {
        icon: "book-open",
        title: { tr: "Müfredat Uygunluğu", en: "Curriculum Check" },
        desc: {
          tr: "Ders planınızı ülke müfredatına göre denetleyecek; kapsamı, boşlukları ve önerilen düzeltmeleri gösterecek.",
          en: "Will check your lesson plan against the national curriculum, showing coverage, gaps and suggested fixes."
        }
      },
      {
        icon: "file-text",
        title: { tr: "Makaleden Soru", en: "Questions from a Text" },
        desc: {
          tr: "Verdiğiniz metinden özet ve yalnızca o metne dayalı anlama soruları çıkaracak; dışarıdan bilgi katmayacak.",
          en: "Will extract a summary and comprehension questions drawn only from the text you provide, adding nothing from outside."
        }
      },
      {
        icon: "activity",
        title: { tr: "Kazanım Takibi", en: "Outcome Tracking" },
        desc: {
          tr: "Sonuçlardan kazanım ısı haritası ve risk altındaki öğrenci radarı çıkaracak; veri kendi sunucunuzda kalacak.",
          en: "Will turn results into an outcome heat map and an at-risk student radar; the data will stay on your own server."
        }
      }
    ],

    studentTitle: { tr: "Öğrenci yetenekleri", en: "Student capabilities" },
    studentIntro: {
      tr: "Öğrencinin kendi başına, kendi hızında çalışmasını destekleyecek araçlar.",
      en: "Tools that will help students study on their own, at their own pace."
    },
    studentTools: [
      {
        icon: "repeat",
        title: { tr: "Benzer Test", en: "Similar Test" },
        desc: {
          tr: "Çözülen soruya benzer yeni sorular üretecek; aynı kazanımı farklı örneklerle pekiştirecek.",
          en: "Will generate new questions like the one just solved, reinforcing the same outcome with fresh examples."
        }
      },
      {
        icon: "help-circle",
        title: { tr: "Quiz", en: "Quiz" },
        desc: {
          tr: "Kısa quizlerle bilgiyi anında sınayacak; öğrenci nerede olduğunu hemen görecek.",
          en: "Will test knowledge on the spot with short quizzes, so students can see right away where they stand."
        }
      },
      {
        icon: "copy",
        title: { tr: "Bilgi Kartları", en: "Flashcards" },
        desc: {
          tr: "Konunun anahtar kavramlarını çift taraflı bilgi kartlarına dökecek; tekrar için ideal.",
          en: "Will turn a topic's key concepts into two-sided flashcards, ideal for review."
        }
      },
      {
        icon: "clock",
        title: { tr: "Konu Özeti", en: "Topic Summary" },
        desc: {
          tr: "\"10 dakikada konu\": bir konunun özünü kısa, anlaşılır bir özetle verecek.",
          en: "\"A topic in 10 minutes\": will deliver the essence of a topic in a short, clear summary."
        }
      },
      {
        icon: "book",
        title: { tr: "Makaleden Çalış", en: "Study from a Text" },
        desc: {
          tr: "Bir metni öğrenme materyaline çevirecek: özet, anahtar noktalar ve çalışma soruları.",
          en: "Will turn a text into study material: a summary, key points and practice questions."
        }
      },
      {
        icon: "award",
        title: { tr: "Oyunlaştırma", en: "Gamification" },
        desc: {
          tr: "Puan ve rozetlerle çalışmayı motive edecek; ilerlemeyi görünür ve keyifli kılacak.",
          en: "Will motivate study with points and badges, making progress visible and enjoyable."
        }
      }
    ]
  },

  about: {
    title: { tr: "Hakkında", en: "About" },
    lead: {
      tr: "Usari, iki işi bir arada yürüten bir teknoloji şirketidir: müşterileri için uygulama, web sitesi ve yapay zekâ telefon sekreteri geliştiren bir yazılım evi; ve öğretmenler için yapay zekâ asistanı Grande AI'ı geliştiren bir ar-ge ekibi.",
      en: "Usari is a technology company doing two things at once: a software house building applications, websites and AI phone assistants for its clients — and an R&D team developing Grande AI, an AI assistant for teachers."
    },
    mission: {
      tr: "Misyonumuz: Öğretmeni hazırlık yükünden kurtarıp asıl işine, yani öğrenciyle kurduğu bağa zaman açmak. Yapay zekâyı öğretmenin yerine değil, yanına koymak.",
      en: "Our mission: to free teachers from prep overload and open up time for what matters most, the bond with their students. To put AI beside the teacher, never in their place."
    },
    vision: {
      tr: "Vizyonumuz: Her okulun, verisi kendinde kalan, uygun maliyetli ve çok dilli bir yapay zekâ yardımcısına sahip olduğu bir eğitim ortamı.",
      en: "Our vision: an education where every school has an affordable, multilingual AI helper whose data stays with the school itself."
    },

    // Şirket durum şeridi — bilinçli olarak TARİHSİZ (yıl/ay kullanıcı tarafından doğrulanmadı).
    statusTitle: { tr: "Bugün neredeyiz?", en: "Where we are today" },
    status: [
      {
        title: { tr: "Usari kuruldu", en: "Usari founded" },
        desc: {
          tr: "Yazılım ve yapay zekâ odağıyla yola çıktık.",
          en: "We set out with a focus on software and AI."
        }
      },
      {
        title: { tr: "Hizmetler veriliyor", en: "Services running" },
        desc: {
          tr: "Uygulama, web sitesi ve telefon sekreteri hizmetlerimiz aktif; projeler görüşmeye açık.",
          en: "Our application, website and phone-assistant services are active and open for new projects."
        }
      },
      {
        title: { tr: "Grande AI geliştirmede", en: "Grande AI in development" },
        desc: {
          tr: "Amiral gemisi projemiz geliştirme aşamasında; hazır olduğunda önce takipçilerimize duyuracağız.",
          en: "Our flagship project is in development; when it's ready, our followers will hear it first."
        }
      }
    ],

    pointsTitle: { tr: "Bizi farklı kılan", en: "What sets us apart" },
    points: [
      {
        icon: "shield",
        title: { tr: "Kendi sunucunuzda çalışacak", en: "Will run on your own server" },
        desc: {
          tr: "Grande AI yerelde çalışacak. İçerik ve öğrenci verisi kurumunuzun dışına çıkmayacak; gizlilik, tasarımın merkezinde.",
          en: "Grande AI will run locally. Content and student data will never leave your institution; privacy is at the core of the design."
        }
      },
      {
        icon: "globe",
        title: { tr: "4 dilde", en: "Four languages" },
        desc: {
          tr: "Türkçe, İngilizce, İspanyolca ve Fransızca. Aynı içeriği farklı dillerde, tek tıkla hazırlayabileceksiniz.",
          en: "Turkish, English, Spanish and French. You'll prepare the same content in different languages with one click."
        }
      },
      {
        icon: "coins",
        title: { tr: "İşlem başına 0 maliyet", en: "Zero cost per task" },
        desc: {
          tr: "Bulut API ücreti yok. Bir kez kurulacak, sınırsız kullanılacak; her yeni sınav ya da sunu bütçenizi büyütmeyecek.",
          en: "No cloud API fees. Set up once, used without limit; every new exam or deck will leave your budget untouched."
        }
      },
      {
        icon: "user-check",
        title: { tr: "Öğretmen kontrolünde", en: "The teacher stays in control" },
        desc: {
          tr: "Grande AI taslak üretecek; kararı, düzeltmeyi ve son sözü her zaman öğretmen verecek. Amaç desteklemek, yerine geçmek değil.",
          en: "Grande AI will produce drafts; the decision, the edit and the final word will always belong to the teacher. It supports, it does not replace."
        }
      },
      {
        icon: "heart",
        title: { tr: "Pedagojik doğruluk", en: "Pedagogical soundness" },
        desc: {
          tr: "Her araç, yapıcı ve suçlayıcı olmayan bir dille, öğrenmeyi merkeze alan ilkelerle tasarlanıyor.",
          en: "Every tool is being designed with constructive, non-blaming language and principles that keep learning at the centre."
        }
      },
      {
        icon: "sliders",
        title: { tr: "Kişiselleştirilebilir", en: "Personalizable" },
        desc: {
          tr: "Seviye, müfredat ve öğrencinin ihtiyacına göre uyarlanacak. Sınıfınız neyse, içerik ona göre şekillenecek.",
          en: "It will adapt to level, curriculum and student need. Whatever your class is, the content will take its shape."
        }
      }
    ]
  },

  contact: {
    title: { tr: "İletişim", en: "Contact" },
    blurb: {
      tr: "Bir proje görüşmesi başlatmak, soru sormak ya da Grande AI'dan haberdar olmak için bize yazın. En kısa sürede dönüş yapıyoruz.",
      en: "Write to us to start a project conversation, ask a question, or hear about Grande AI. We reply as soon as we can."
    },
    emailLabel:     { tr: "E-posta", en: "Email" },
    email: "grande26ai@gmail.com",
    instagramLabel: { tr: "Instagram", en: "Instagram" },
    instagram: "kunitu24",
    note: {
      tr: "Proje görüşmeleri için e-posta en hızlı yol. Güncel gelişmeler için bizi Instagram'dan da takip edebilirsiniz.",
      en: "For project conversations, email is the fastest route. You can also follow us on Instagram for the latest updates."
    },

    // Hızlı-konu çipleri (kodlama mailto subject'lerine bağlar)
    topicsTitle: { tr: "Hızlı başlangıç", en: "Quick start" },
    topics: [
      { tr: "Uygulama projesi",  en: "App project" },
      { tr: "Web sitesi",        en: "Website" },
      { tr: "Telefon sekreteri", en: "Phone assistant" }
    ],

    // "Grande AI'dan haberdar olun" mini paneli
    grandeNotifyTitle: { tr: "Grande AI'dan haberdar olun", en: "Hear about Grande AI" },
    grandeNotify: {
      tr: "Grande AI henüz yayında değil; geliştirme aşamasında. Bize kısa bir e-posta bırakın, ilk sürüm hazır olduğunda önce size haber verelim.",
      en: "Grande AI isn't out yet; it's in development. Leave us a short email and you'll be the first to hear when the first release is ready."
    },

    formName:     { tr: "Adınız", en: "Your name" },
    formEmail:    { tr: "E-posta adresiniz", en: "Your email" },
    formMessage:  { tr: "Mesajınız", en: "Your message" },
    formSend:     { tr: "Gönder", en: "Send" },
    formNote: {
      tr: "Formu göndererek mesajınızın grande26ai@gmail.com adresine ulaşmasını sağlarsınız.",
      en: "By sending this form, your message reaches grande26ai@gmail.com."
    }
  },

  footer: {
    tagline: {
      tr: "Usari — yazılım geliştiren, eğitim için yapay zekâ inşa eden teknoloji şirketi.",
      en: "Usari — a technology company that builds software and is building AI for education."
    },
    product: { tr: "Grande AI", en: "Grande AI" },

    // 4 sütunlu footer yapısı (S1 = marka; S2–S4 aşağıda). Linkleri kodlama bağlar:
    // pages → nav'daki 5 sayfa; services → services.items başlıkları (ankrajlı);
    // company → aşağıdaki links dizisi.
    columns: {
      pages:    { title: { tr: "Sayfalar",  en: "Pages" } },
      services: { title: { tr: "Hizmetler", en: "Services" } },
      company: {
        title: { tr: "Şirket", en: "Company" },
        links: [
          { tr: "Hakkımızda",   en: "About us" },
          { tr: "İlkelerimiz",  en: "Our principles" },
          { tr: "Grande AI",    en: "Grande AI" }
        ]
      }
    },
    badge: {
      tr: "Grande AI · geliştirme aşamasında · 2026",
      en: "Grande AI · in development · 2026"
    },

    rights: {
      tr: "© 2026 Usari. Tüm hakları saklıdır.",
      en: "© 2026 Usari. All rights reserved."
    },
    madeWith: {
      tr: "Eğitim için sevgiyle geliştirildi.",
      en: "Made with care for education."
    }
  }
};

if (typeof module !== "undefined") module.exports = CONTENT;
