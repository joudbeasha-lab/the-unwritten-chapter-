
import * as THREE from "three";

const $ = (id) => document.getElementById(id);

const loadingScreen = $("loadingScreen");
const galleryScreen = $("galleryScreen");
const museumScreen = $("museumScreen");
const threeContainer = $("threeContainer");
const museumTitle = $("museumTitle");
const museumKicker = $("museumKicker");
const museumCounter = $("museumCounter");
const startButton = $("startExploring");
const backButton = $("backButton");
const modal = $("exhibitModal");
const closeModalButton = $("closeModal");
const continueButton = $("continueButton");

const worlds = {
  roots: {
    title: "الجذور",
    kicker: "أرشيف البدايات والذاكرة",
    palette: {
      wall: 0x38252b,
      wall2: 0x4a3034,
      floor: 0x302328,
      trim: 0xb38b55,
      accent: 0xe0bd7f,
      glow: 0xffd89b,
      metal: 0x8b6846
    },
    exhibits: [
      {
        title: "بدايات الحكاية",
        category: "وثيقة تاريخية",
        description: "تبدأ حكاية المؤسسة من عام 1944، حين تأسست الجمعية الثقافية الإسلامية. تمثّل هذه المحطة بداية مسار تعليمي وثقافي امتدّ عبر الأجيال.",
        type: "document"
      },
      {
        title: "خطوة نحو التعليم",
        category: "محطة زمنية",
        description: "في عام 1947 بدأت مدارس الكلية الإسلامية مسيرتها التعليمية. تروي هذه المحطة جانباً من تطوّر المؤسسة ورسالتها التعليمية.",
        type: "book"
      },
      {
        title: "مدرسة البنات",
        category: "محطة زمنية",
        description: "شهد عام 1950 انطلاق مدرسة البنات في جبل عمّان. ومن تلك البدايات تشكّلت مساحة للتعلّم والطموح وصناعة الفرص.",
        type: "building"
      },
      {
        title: "ذاكرة المكان",
        category: "أرشيف بصري",
        description: "تحمل الصور والوثائق القديمة تفاصيل الحياة المدرسية: الوجوه، والصفوف، واللحظات الصغيرة التي أصبحت جزءاً من ذاكرة المكان.",
        type: "photo"
      },
      {
        title: "دفتر من الماضي",
        category: "أثر تعليمي",
        description: "لم تكن الدفاتر مجرّد صفحات للكتابة، بل كانت شاهدة على الأسئلة الأولى والمحاولات والأحلام التي بدأت داخل الصفوف.",
        type: "notebook"
      }
    ]
  },

  identity: {
    title: "الهوية",
    kicker: "ملامح الثقافة والانتماء",
    palette: {
      wall: 0x9a713e,
      wall2: 0xb58a4d,
      floor: 0x80603b,
      trim: 0xe8c779,
      accent: 0xffdfa0,
      glow: 0xffe9b7,
      metal: 0x9b5b37
    },
    exhibits: [
      {
        title: "العلم الأردني",
        category: "رمز وطني",
        description: "يتكوّن العلم الأردني من ثلاثة أشرطة أفقية: الأسود في الأعلى، والأبيض في الوسط، والأخضر في الأسفل، مع مثلث أحمر عند السارية تتوسطه نجمة بيضاء سباعية.",
        type: "flag"
      },
      {
        title: "خيوط تحكي",
        category: "تراث أردني",
        description: "يحمل التطريز الأردني زخارف وألواناً ارتبطت بالمناطق والملابس التقليدية. وتحوّلت الغرز إلى لغة بصرية تحفظ الذاكرة وتنقلها.",
        type: "embroidery"
      },
      {
        title: "جمال الحرف العربي",
        category: "فن وثقافة",
        description: "يجمع الخط العربي بين اللغة والفن. تتنوّع مدارسه وأشكاله، وتمنح الحروف الكلمات إيقاعاً بصرياً يتجاوز وظيفتها في الكتابة.",
        type: "calligraphy"
      },
      {
        title: "عمارة من المكان",
        category: "تراث معماري",
        description: "تُعرف عمارة عمّان التقليدية باستخدام الحجر ذي الألوان الدافئة، والتفاصيل البسيطة، والأقواس والأبواب التي تمنح المباني طابعها المميّز.",
        type: "arch"
      },
      {
        title: "صنعة الأيدي",
        category: "حرف تقليدية",
        description: "تعكس الحرف اليدوية مهارات تناقلتها الأجيال، من تشكيل الفخار إلى الزخرفة وصناعة القطع اليومية. إنها تفاصيل صغيرة تحمل قيمة ثقافية كبيرة.",
        type: "pottery"
      }
    ]
  },

  innovation: {
    title: "الابتكار",
    kicker: "مختبر الأفكار والإمكانات",
    palette: {
      wall: 0x101e31,
      wall2: 0x172c42,
      floor: 0x0b1422,
      trim: 0x26d9ee,
      accent: 0x75f3ff,
      glow: 0x29dff5,
      metal: 0x718b9d
    },
    exhibits: [
      {
        title: "الروبوتات الذكية",
        category: "هندسة وروبوتات",
        description: "تجمع الروبوتات بين التصميم الميكانيكي والبرمجة وأجهزة الاستشعار. ويمكن توظيفها لتنفيذ مهام متكررة أو دقيقة، ومساعدة الإنسان في بيئات مختلفة.",
        type: "robot"
      },
      {
        title: "الذكاء الاصطناعي",
        category: "تحليل البيانات",
        description: "تتعلم أنظمة الذكاء الاصطناعي من الأنماط الموجودة في البيانات لتقديم تنبؤات أو اقتراحات. وتعتمد جودة النتائج على البيانات وطريقة تصميم النظام.",
        type: "ai"
      },
      {
        title: "من التصميم إلى الطباعة",
        category: "تصنيع رقمي",
        description: "تسمح الطباعة ثلاثية الأبعاد بتحويل نموذج رقمي إلى مجسّم مادي، عبر بناء طبقات متتابعة من المادة. وتُستخدم في النماذج الأولية والتعليم والتصميم.",
        type: "printer"
      },
      {
        title: "تقنية تراقب المؤشرات",
        category: "تكنولوجيا طبية",
        description: "تستطيع المستشعرات القابلة للارتداء التقاط إشارات مثل معدل ضربات القلب. ثم تُعرض القراءات رقمياً لمتابعتها، مع ضرورة تفسيرها ضمن سياق صحي مناسب.",
        type: "medical"
      },
      {
        title: "طاقة للمستقبل",
        category: "استدامة وطاقة",
        description: "تحوّل الألواح الشمسية ضوء الشمس إلى طاقة كهربائية. ويساعد تطوير تقنيات الطاقة المتجددة على تنويع مصادر الطاقة وتقليل الاعتماد على الوقود التقليدي.",
        type: "solar"
      }
    ]
  }
};

let scene, camera, renderer, raycaster;
let currentWorld = null;

// These now contain actual exhibit model groups, not invisible rectangles.
let activeExhibits = [];

let isLocked = false;
let isModalOpen = false;
let yaw = 0;
let pitch = 0;
let currentExhibitIndex = 0;
let animationFrameId = null;

const keys = new Set();
const clock = new THREE.Clock();
const playerVelocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const rayCenter = new THREE.Vector2(0, 0);

function showScreen(screen) {
  [loadingScreen, galleryScreen, museumScreen].forEach((element) => {
    element.classList.add("hidden");
  });

  screen.classList.remove("hidden");
}

function makeMaterial(color, roughness = 0.8, metalness = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness
  });
}

function addBox(parent, name, x, y, z, sx, sy, sz, material, rotationY = 0) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    material
  );

  mesh.name = name;
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotationY;
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  parent.add(mesh);
  return mesh;
}

function makeTextTexture(title, subtitle, palette) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#10151c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = `#${palette.trim.toString(16).padStart(6, "0")}`;
  ctx.lineWidth = 8;
  ctx.strokeRect(18, 18, 988, 476);

  ctx.fillStyle = "#f5ead8";
  ctx.textAlign = "center";
  ctx.direction = "rtl";
  ctx.font = "bold 76px 'IBM Plex Sans Arabic', sans-serif";
  ctx.fillText(title, 512, 230, 900);

  ctx.fillStyle = "#c9bda9";
  ctx.font = "36px 'IBM Plex Sans Arabic', sans-serif";
  ctx.fillText(subtitle, 512, 315, 900);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function makeFlagTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 540;

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 900, 180);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 180, 900, 180);

  ctx.fillStyle = "#007a3d";
  ctx.fillRect(0, 360, 900, 180);

  ctx.fillStyle = "#ce1126";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(430, 270);
  ctx.lineTo(0, 540);
  ctx.closePath();
  ctx.fill();

  const cx = 145;
  const cy = 270;
  const outer = 47;
  const inner = 20;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();

  for (let i = 0; i < 14; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = -Math.PI / 2 + i * Math.PI / 7;

    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function addRoom(world) {
  const p = world.palette;

  const floorMat = makeMaterial(p.floor, 0.92);
  const wallMat = makeMaterial(p.wall, 0.9);
  const wallMat2 = makeMaterial(p.wall2, 0.85);
  const trimMat = makeMaterial(p.trim, 0.38, 0.45);

  addBox(scene, "floor", 0, -0.18, 0, 24, 0.35, 18, floorMat);
  addBox(scene, "ceiling", 0, 5.6, 0, 24, 0.25, 18, wallMat);

  addBox(scene, "back-wall", 0, 2.7, -9, 24, 5.5, 0.35, wallMat);
  addBox(scene, "left-wall", -12, 2.7, 0, 0.35, 5.5, 18, wallMat2);
  addBox(scene, "right-wall", 12, 2.7, 0, 0.35, 5.5, 18, wallMat2);

  addBox(scene, "front-left", -8.2, 2.7, 9, 7.6, 5.5, 0.35, wallMat);
  addBox(scene, "front-right", 8.2, 2.7, 9, 7.6, 5.5, 0.35, wallMat);

  for (const x of [-11.5, 0, 11.5]) {
    addBox(scene, "ceiling-beam", x, 5.25, 0, 0.16, 0.18, 17.5, trimMat);
  }

  for (const z of [-8.5, -4.5, 0, 4.5, 8.5]) {
    addBox(scene, "floor-inlay", 0, 0.005, z, 23, 0.025, 0.045, trimMat);
  }

  for (const x of [-11.6, 11.6]) {
    for (const z of [-7, -2.5, 2.5, 7]) {
      addBox(scene, "wall-pillar", x, 2.6, z, 0.42, 5.2, 0.42, trimMat);
    }
  }

  const medallion = new THREE.Mesh(
    new THREE.CylinderGeometry(2.1, 2.1, 0.05, 64),
    makeMaterial(p.wall2, 0.65, 0.15)
  );

  medallion.position.set(0, 0.03, 0);
  scene.add(medallion);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.75, 0.035, 8, 80),
    trimMat
  );

  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.08;
  scene.add(ring);

  const lightColor = p.glow;

  for (const x of [-7, -2.5, 2.5, 7]) {
    for (const z of [-6.5, 0, 6.5]) {
      const lamp = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.07, 0.22),
        new THREE.MeshStandardMaterial({
          color: lightColor,
          emissive: lightColor,
          emissiveIntensity: world === worlds.innovation ? 1.6 : 0.45
        })
      );

      lamp.position.set(x, 5.38, z);
      scene.add(lamp);

      const light = new THREE.PointLight(
        lightColor,
        world === worlds.innovation ? 1.4 : 0.7,
        8
      );

      light.position.set(x, 4.95, z);
      scene.add(light);
    }
  }

  if (world === worlds.innovation) {
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x1abbd5,
      transparent: true,
      opacity: 0.34
    });

    for (let x = -11; x <= 11; x += 1) {
      addBox(scene, "neon-floor-line", x, 0.015, 0, 0.018, 0.018, 17, gridMat);
    }

    for (let z = -8; z <= 8; z += 1) {
      addBox(scene, "neon-floor-line", 0, 0.016, z, 23, 0.018, 0.018, gridMat);
    }

    for (const side of [-1, 1]) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.08, 16),
        new THREE.MeshBasicMaterial({ color: 0x27dfff })
      );

      strip.position.set(side * 11.72, 4.8, 0);
      scene.add(strip);
    }
  }

  if (world === worlds.roots) {
    for (const z of [-7.8, -3.9, 0, 3.9, 7.8]) {
      addBox(scene, "archive-wall-frame", -11.76, 2.6, z, 0.08, 3.4, 2.2, trimMat);
      addBox(scene, "archive-wall-frame", 11.76, 2.6, z, 0.08, 3.4, 2.2, trimMat);
    }
  }

  if (world === worlds.identity) {
    for (const z of [-6, 0, 6]) {
      const arch = new THREE.Mesh(
        new THREE.TorusGeometry(1.15, 0.13, 12, 48, Math.PI),
        trimMat
      );

      arch.position.set(0, 3.25, z);
      arch.rotation.z = Math.PI;
      scene.add(arch);
    }
  }
}

function addExhibitModel(type, group, palette) {
  const dark = makeMaterial(0x1b2028, 0.48, 0.3);
  const metal = makeMaterial(palette.metal, 0.32, 0.65);

  const accent = new THREE.MeshStandardMaterial({
    color: palette.accent,
    emissive: palette.accent,
    emissiveIntensity: 0.28,
    metalness: 0.25,
    roughness: 0.35
  });

  if (type === "document" || type === "photo" || type === "calligraphy") {
    addBox(group, "display-frame", 0, 1.85, 0, 1.65, 1.65, 0.14, metal);

    addBox(
      group,
      "display-paper",
      0,
      1.85,
      0.09,
      1.42,
      1.42,
      0.04,
      makeMaterial(type === "photo" ? 0x8c8170 : 0xe5d5b5, 0.95)
    );

    if (type === "calligraphy") {
      const ink = addBox(
        group,
        "calligraphy-ink",
        0,
        1.85,
        0.13,
        0.8,
        0.08,
        0.025,
        dark
      );

      ink.rotation.z = -0.3;
    }

    return;
  }

  if (type === "book" || type === "notebook") {
    const book = addBox(
      group,
      "book",
      0,
      1.45,
      0,
      1.15,
      0.18,
      0.8,
      metal
    );

    book.rotation.z = -0.12;

    addBox(
      group,
      "book-pages",
      0.03,
      1.56,
      0.02,
      1.02,
      0.05,
      0.73,
      makeMaterial(0xe7d9bf)
    );

    addBox(
      group,
      "book-spine",
      -0.55,
      1.45,
      0,
      0.08,
      0.2,
      0.82,
      accent
    );

    return;
  }

  if (type === "building" || type === "arch") {
    addBox(
      group,
      "building-body",
      0,
      1.55,
      0,
      1.55,
      1.3,
      0.95,
      makeMaterial(type === "arch" ? 0xc49b68 : 0x9d8265)
    );

    addBox(group, "building-roof", 0, 2.25, 0, 1.8, 0.12, 1.15, metal);

    for (const x of [-0.45, 0, 0.45]) {
      addBox(
        group,
        "building-window",
        x,
        1.7,
        0.49,
        0.18,
        0.45,
        0.04,
        dark
      );
    }

    addBox(group, "building-door", 0, 1.3, 0.5, 0.28, 0.75, 0.04, dark);
    return;
  }

  if (type === "flag") {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 2.9, 12),
      metal
    );

    pole.position.set(-0.72, 2.15, 0);
    group.add(pole);

    const flagTexture = makeFlagTexture();

    const flag = new THREE.Mesh(
      new THREE.PlaneGeometry(1.65, 0.99),
      new THREE.MeshStandardMaterial({
        map: flagTexture,
        side: THREE.DoubleSide
      })
    );

    flag.position.set(0.12, 2.65, 0.02);
    group.add(flag);

    return;
  }

  if (type === "embroidery") {
    addBox(
      group,
      "embroidered-cloth",
      0,
      1.8,
      0,
      1.45,
      1.45,
      0.08,
      makeMaterial(0xeee0c8)
    );

    for (let i = -3; i <= 3; i++) {
      const line = addBox(
        group,
        "embroidery-line",
        i * 0.16,
        1.8,
        0.07,
        0.045,
        1.2,
        0.025,
        accent
      );

      line.rotation.z = i % 2 === 0 ? 0.18 : -0.18;
    }

    return;
  }

  if (type === "pottery") {
    const vase = new THREE.Mesh(
      new THREE.LatheGeometry([
        new THREE.Vector2(0.15, 0),
        new THREE.Vector2(0.35, 0.18),
        new THREE.Vector2(0.48, 0.65),
        new THREE.Vector2(0.32, 1.15),
        new THREE.Vector2(0.18, 1.28)
      ], 32),
      makeMaterial(0xa65e3e, 0.72)
    );

    vase.position.y = 1.05;
    group.add(vase);

    return;
  }

  if (type === "robot") {
    addBox(group, "robot-base", 0, 1.2, 0, 0.95, 0.22, 0.75, dark);

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.9, 0.55),
      metal
    );

    torso.position.set(0, 1.85, 0);
    group.add(torso);

    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.58, 0.48, 0.48),
      dark
    );

    head.position.set(0, 2.55, 0);
    group.add(head);

    const eye1 = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 16, 16),
      accent
    );

    eye1.position.set(-0.14, 2.58, 0.25);
    group.add(eye1);

    const eye2 = eye1.clone();
    eye2.position.x = 0.14;
    group.add(eye2);

    const arm1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.85, 0.18),
      metal
    );

    arm1.position.set(-0.58, 1.95, 0);
    arm1.rotation.z = -0.4;
    group.add(arm1);

    const arm2 = arm1.clone();
    arm2.position.x = 0.58;
    arm2.rotation.z = 0.4;
    group.add(arm2);

    return;
  }

  if (type === "ai") {
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 1.2, 0.12),
      dark
    );

    screen.position.set(0, 2.05, 0);
    group.add(screen);

    const screenFace = new THREE.Mesh(
      new THREE.PlaneGeometry(1.35, 0.95),
      new THREE.MeshBasicMaterial({ color: 0x092b40 })
    );

    screenFace.position.set(0, 2.05, 0.071);
    group.add(screenFace);

    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 12),
        accent
      );

      node.position.set(
        -0.48 + (i % 4) * 0.32,
        1.75 + Math.floor(i / 4) * 0.55,
        0.1
      );

      group.add(node);
    }

    return;
  }

  if (type === "printer") {
    addBox(group, "printer-frame", 0, 1.9, 0, 1.45, 1.65, 1.1, metal);
    addBox(group, "printer-opening", 0, 1.85, 0.57, 1.05, 1.05, 0.04, dark);
    addBox(group, "printer-bed", 0, 1.35, 0.3, 0.9, 0.06, 0.72, accent);

    addBox(
      group,
      "printed-object",
      0,
      1.62,
      0.3,
      0.35,
      0.48,
      0.35,
      makeMaterial(0x48cbd5, 0.45)
    );

    return;
  }

  if (type === "medical") {
    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 1.25, 0.16),
      dark
    );

    screen.position.set(0, 1.95, 0);
    group.add(screen);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.08, 1.02),
      new THREE.MeshBasicMaterial({ color: 0x071c29 })
    );

    face.position.set(0, 1.95, 0.09);
    group.add(face);

    const points = [];

    for (let i = 0; i < 18; i++) {
      points.push(
        new THREE.Vector3(
          -0.48 + i * 0.056,
          1.95 + Math.sin(i * 1.3) * 0.16,
          0.12
        )
      );
    }

    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x48f2cc })
    );

    group.add(line);

    const band = new THREE.Mesh(
      new THREE.TorusGeometry(0.38, 0.07, 10, 32),
      accent
    );

    band.position.set(0, 1.1, 0.15);
    group.add(band);

    return;
  }

  if (type === "solar") {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 0.12, 1.05),
      new THREE.MeshStandardMaterial({
        color: 0x123e66,
        metalness: 0.65,
        roughness: 0.28,
        emissive: 0x08223a,
        emissiveIntensity: 0.5
      })
    );

    panel.position.set(0, 1.9, 0);
    panel.rotation.x = -0.18;
    group.add(panel);

    for (let x = -0.5; x <= 0.5; x += 0.25) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.13, 1.04),
        accent
      );

      line.position.set(x, 1.97, 0);
      line.rotation.x = -0.18;
      group.add(line);
    }

    return;
  }
}

function createExhibit(exhibit, index, position, rotationY, palette) {
  const group = new THREE.Group();

  group.position.set(position.x, 0, position.z);
  group.rotation.y = rotationY;

  scene.add(group);

  const baseMat = makeMaterial(palette.metal, 0.4, 0.45);
  const topMat = makeMaterial(palette.wall2, 0.55, 0.2);

  const glowMat = new THREE.MeshStandardMaterial({
    color: palette.accent,
    emissive: palette.accent,
    emissiveIntensity: 0.35
  });

  // Display stand remains part of the physical museum.
  addBox(group, "display-plinth", 0, 0.45, 0, 2.3, 0.9, 1.7, baseMat);
  addBox(group, "display-top", 0, 0.94, 0, 2.42, 0.08, 1.82, topMat);
  addBox(group, "plinth-light", 0, 0.12, 0.86, 1.8, 0.045, 0.025, glowMat);

  // Separate group containing ONLY the actual exhibit model.
  // This is what the visitor can click.
  const modelGroup = new THREE.Group();
  modelGroup.name = `exhibit-model-${index}`;
  group.add(modelGroup);

  addExhibitModel(exhibit.type, modelGroup, palette);

  // Attach exhibit information to the real model group.
  modelGroup.userData.exhibit = exhibit;
  modelGroup.userData.exhibitIndex = index;

  // Store the actual model group instead of an invisible BoxGeometry.
  activeExhibits.push(modelGroup);

  // Information label is separate from the clickable exhibit.
  const labelTexture = makeTextTexture(
    exhibit.title,
    exhibit.category,
    palette
  );

  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(2.15, 0.82),
    new THREE.MeshBasicMaterial({
      map: labelTexture,
      side: THREE.DoubleSide
    })
  );

  label.position.set(0, 3.55, 0.1);
  group.add(label);

  // Small spot light above every display.
  const spot = new THREE.SpotLight(
    palette.glow,
    currentWorld === worlds.innovation ? 2.2 : 1.3,
    8,
    Math.PI / 5,
    0.5
  );

  spot.position.set(position.x, 4.7, position.z);
  spot.target.position.set(position.x, 1.6, position.z);

  scene.add(spot, spot.target);

  return group;
}

function addBenches(palette) {
  const benchMat = makeMaterial(palette.metal, 0.5, 0.35);

  for (const z of [-1.7, 2.2]) {
    const bench = new THREE.Group();

    bench.position.set(0, 0, z);
    scene.add(bench);

    addBox(bench, "bench-seat", 0, 0.55, 0, 2.3, 0.16, 0.62, benchMat);
    addBox(bench, "bench-back", 0, 1.05, -0.24, 2.3, 0.85, 0.14, benchMat);

    for (const x of [-0.85, 0.85]) {
      addBox(bench, "bench-leg", x, 0.25, 0, 0.12, 0.5, 0.45, benchMat);
    }
  }
}

function addWorldSign(world) {
  const texture = makeTextTexture(
    world.title,
    "من جذورنا، نصنع المستقبل",
    world.palette
  );

  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 1.7),
    new THREE.MeshBasicMaterial({ map: texture, transparent: false })
  );

  sign.position.set(0, 4.2, -8.72);
  scene.add(sign);
}

function buildMuseum(worldKey) {
  const world = worlds[worldKey];

  if (!world) return;

  // Reset the previous museum state.
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }

  currentWorld = world;
  activeExhibits = [];
  isLocked = false;
  isModalOpen = false;
  keys.clear();
  clock.start();

  scene = new THREE.Scene();

  scene.background = new THREE.Color(
    worldKey === "innovation" ? 0x081321 :
    worldKey === "identity" ? 0x8a6339 : 0x21171c
  );

  scene.fog = new THREE.Fog(scene.background, 18, 42);

  camera = new THREE.PerspectiveCamera(
    72,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );

  camera.position.set(0, 1.65, 7.2);

  yaw = 0;
  pitch = 0;

  camera.rotation.order = "YXZ";
  camera.rotation.set(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  threeContainer.innerHTML = "";
  threeContainer.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();

  const ambient = new THREE.HemisphereLight(
    0xffffff,
    world.palette.wall,
    worldKey === "innovation" ? 1.0 : 1.5
  );

  scene.add(ambient);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);

  mainLight.position.set(2, 8, 5);
  mainLight.castShadow = true;

  scene.add(mainLight);

  addRoom(world);
  addBenches(world.palette);
  addWorldSign(world);

  const placements = [
    { x: -8.1, z: -5.2, rotation: Math.PI / 2 },
    { x: 8.1, z: -5.2, rotation: -Math.PI / 2 },
    { x: -8.1, z: 0.8, rotation: Math.PI / 2 },
    { x: 8.1, z: 0.8, rotation: -Math.PI / 2 },
    { x: 0, z: -6.8, rotation: 0 }
  ];

  world.exhibits.forEach((exhibit, index) => {
    const pos = placements[index];

    createExhibit(
      exhibit,
      index,
      { x: pos.x, z: pos.z },
      pos.rotation,
      world.palette
    );
  });

  museumTitle.textContent = world.title;
  museumKicker.textContent = world.kicker;

  museumCounter.textContent =
    `01 / ${String(world.exhibits.length).padStart(2, "0")}`;

  showScreen(museumScreen);

  startButton.classList.remove("hidden");
  $("instructions").classList.remove("hidden");

  $("museumHint").textContent =
    "انقري على أي معروض لاستكشاف حكايته";

  $("crosshair").classList.add("hidden");

  animate();
}

function animate() {
  if (!renderer || !scene || !camera) return;

  animationFrameId = requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.05);

  if (isLocked && !isModalOpen) {
    const speed = 5.2;

    direction.set(0, 0, 0);

    if (keys.has("KeyW")) direction.z -= 1;
    if (keys.has("KeyS")) direction.z += 1;
    if (keys.has("KeyA")) direction.x -= 1;
    if (keys.has("KeyD")) direction.x += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();

      const forward = new THREE.Vector3(
        -Math.sin(yaw),
        0,
        -Math.cos(yaw)
      );

      const right = new THREE.Vector3(
        Math.cos(yaw),
        0,
        -Math.sin(yaw)
      );

      const movement = new THREE.Vector3();

      movement.addScaledVector(forward, -direction.z);
      movement.addScaledVector(right, direction.x);
      movement.normalize().multiplyScalar(speed * delta);

      const nextX = camera.position.x + movement.x;
      const nextZ = camera.position.z + movement.z;

      camera.position.x = THREE.MathUtils.clamp(nextX, -10.9, 10.9);
      camera.position.z = THREE.MathUtils.clamp(nextZ, -8.1, 8.1);
    }

    camera.rotation.set(pitch, yaw, 0);
  }

  renderer.render(scene, camera);
}

function openExhibit(exhibit, index) {
  isModalOpen = true;
  currentExhibitIndex = index;

  $("exhibitCategory").textContent = exhibit.category;
  $("exhibitTitle").textContent = exhibit.title;
  $("exhibitDescription").textContent = exhibit.description;

  $("exhibitIndex").textContent =
    `${String(index + 1).padStart(2, "0")} / ${String(currentWorld.exhibits.length).padStart(2, "0")}`;

  modal.classList.remove("hidden");

  document.exitPointerLock?.();
}

function closeExhibit(shouldResume = true) {
  modal.classList.add("hidden");
  isModalOpen = false;

  if (shouldResume && renderer) {
    renderer.domElement.requestPointerLock?.();
  }
}

function onCanvasClick() {
  if (!isLocked || isModalOpen || !raycaster || !camera) return;

  raycaster.setFromCamera(rayCenter, camera);

  // Raycast against the actual 3D exhibit models.
  // No invisible rectangular click-targets are used.
  const hits = raycaster.intersectObjects(activeExhibits, true);

  for (const hit of hits) {
    let node = hit.object;

    // Find the parent model group carrying the exhibit information.
    while (node && !node.userData.exhibit) {
      node = node.parent;
    }

    if (node && node.userData.exhibit) {
      openExhibit(
        node.userData.exhibit,
        node.userData.exhibitIndex
      );

      return;
    }
  }
}

function startExploring() {
  startButton.classList.add("hidden");
  $("instructions").classList.add("hidden");
  $("crosshair").classList.remove("hidden");

  renderer?.domElement.requestPointerLock?.();
}

function onPointerLockChange() {
  isLocked = document.pointerLockElement === renderer?.domElement;

  if (!isLocked && !isModalOpen && !startButton.classList.contains("hidden")) {
    return;
  }

  if (!isLocked && !isModalOpen) {
    startButton.classList.remove("hidden");
    $("instructions").classList.remove("hidden");
    $("crosshair").classList.add("hidden");
  } else if (isLocked) {
    startButton.classList.add("hidden");
    $("instructions").classList.add("hidden");
    $("crosshair").classList.remove("hidden");
  }
}

function onMouseMove(event) {
  if (!isLocked || isModalOpen) return;

  const sensitivity = 0.0022;

  yaw -= event.movementX * sensitivity;
  pitch -= event.movementY * sensitivity;

  pitch = THREE.MathUtils.clamp(pitch, -1.25, 1.25);
}

function onKeyDown(event) {
  if (["KeyW", "KeyA", "KeyS", "KeyD"].includes(event.code)) {
    event.preventDefault();
    keys.add(event.code);
  }
}

function onKeyUp(event) {
  keys.delete(event.code);
}

function resize() {
  if (!camera || !renderer) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

document.querySelectorAll(".door-card").forEach((card) => {
  card.addEventListener("click", () => {
    buildMuseum(card.dataset.world);
  });
});

startButton.addEventListener("click", startExploring);

backButton.addEventListener("click", () => {
  document.exitPointerLock?.();

  isLocked = false;
  isModalOpen = false;

  keys.clear();

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  if (renderer) {
    renderer.dispose();
    renderer.domElement.remove();
    renderer = null;
  }

  scene = null;
  camera = null;
  currentWorld = null;
  activeExhibits = [];

  modal.classList.add("hidden");

  showScreen(galleryScreen);
});

closeModalButton.addEventListener("click", () => closeExhibit(true));

continueButton.addEventListener("click", () => closeExhibit(true));

document.addEventListener("pointerlockchange", onPointerLockChange);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);

window.addEventListener("resize", resize);

threeContainer.addEventListener("click", onCanvasClick);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeExhibit(true);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) keys.clear();
});

showScreen(galleryScreen);
