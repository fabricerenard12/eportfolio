import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { EffectComposer } from "jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "jsm/postprocessing/UnrealBloomPass.js";

const intro = document.getElementById('intro');
const startButton = document.getElementById('startButton');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const closeButton = document.getElementById('closeButton');
const audio = new Audio('assets/audio/theme.mp3');

let isPopupOpen = false;

startButton.addEventListener('click', () => {
  intro.style.display = 'none';
  init();
});

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const closePopup = () => {
  popup.style.display = 'none';
  isPopupOpen = false;
};

closeButton.addEventListener('click', debounce(closePopup, 10));

audio.addEventListener('ended', () => {
  audio.currentTime = 0;
  audio.play();
});

const descriptions = {
  cpp_logo: {
    title: "C++ Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "Atari 2600 Emulator", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  java_logo: {
    title: "Java Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "Atari 2600 Emulator", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  rust_logo: {
    title: "Rust Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "E-Portfolio", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  go_logo: {
    title: "Go Projects", projects: [
      {
        title: "E-Commerce platform", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "CHIP-8 Emulator", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  python_logo: {
    title: "Python Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "E-Portfolio", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  js_logo: {
    title: "JavaScript Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "E-Portfolio", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  react_logo: {
    title: "React Projects", projects: [
      {
        title: "2048 Solver", link: "https://github.com/fabricerenard12/2048-Solver-but-better", description: [
          "Implemented the 2048 game and a Monte Carlo based algorithm to solve it, achieving an average success rate of 85% in reaching the 2048 tile in under 30 seconds",
          "Designed and implemented a thread pool to parallelize the solving algorithm, effectively reducing its execution time by over 90%"
        ]
      },
      {
        title: "Atari 2600 Emulator", link: "https://github.com/fabricerenard12/atari2600-emu", description: [
          "Developed a cycle-accurate emulator for the Atari 2600, faithfully replicating the behavior of the original hardware",
          "Implemented support for a variety of Atari 2600 games, ensuring compatibility and smooth performance across different game titles"
        ]
      },
    ]
  },
  heka_logo: {
    title: "Engineering club: Heka PolyMTL", projects: [
      {
        title: "Member of the computer engineering team (Jan. 2023 - Present)", link: "https://heka.polymtl.ca/", description: [
          "Collaborated with a multi-disciplinary team to develop a robotic arm designed to assist individuals with motor disorders",
          "Developed a Java-based data transmission tool facilitating communication between a computer and the arm's microcontroller via UART",
          "Integrated a vocal interface into the robotic arm control system using Python, enabling hands-free operation for users through advanced speech recognition"
        ]
      },
    ]
  },
  audiokinetic_logo: {
    title: "Co-op #1: Audiokinetic SIE", projects: [
      {
        title: "Software Developer Intern (Sept. 2023 - Dec. 2023)", link: "https://www.audiokinetic.com/en/", description: [
          "Participated in various projects related to spatial audio within the Wwise middleware, including tool improvement, testing, user interface improvement and user experience improvement",
          "Redesigned and implemented components of the Wwise user interface for spatial audio in C++, enhancing usability and aesthetics for over 100 000 users",
          "Wrote over 50 unit tests in lua to ensure seamless backward compatibility for legacy Wwise projects with newly introduced features"
        ]
      },
    ]
  },
  dormakaba_logo: {
    title: "Co-op #2: Dormakaba Canada", projects: [
      {
        title: "Firmware Developer Intern (May. 2024 - Aug. 2024)", link: "https://www.dormakaba.com/ca-en", description: [
          "Collaborated in the development and debugging of firmware for microcontrollers in embedded systems in C, effectively improving device performance",
          "Developed and implemented a comprehensive firmware test system using Python, enhancing the efficiency and accuracy of firmware validation processes"
        ]
      },
    ]
  },
};

function init() {
  audio.play();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.035);
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = 100;
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  const renderScene = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 1.5, 0.4, 100);
  bloomPass.threshold = 0;
  bloomPass.strength = 0;
  bloomPass.radius = 0;
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
  composer.addPass(bloomPass);

  const textureLoader = new THREE.TextureLoader();
  const texturePaths = [
    'cpp_logo.png',
    'java_logo.png',
    'rust_logo.png',
    'go_logo.png',
    'python_logo.png',
    'js_logo.png',
    'react_logo.png',
    'heka_logo.png',
    'audiokinetic_logo.png',
    'dormakaba_logo.png'
  ];

  const textures = [];

  function loadTextures(paths) {
    return Promise.all(paths.map(path => {
      return new Promise((resolve, reject) => {
        textureLoader.load(
          "assets/img/" + path,
          (texture) => resolve({ path, texture }),
          undefined,
          (err) => reject(err)
        );
      });
    }));
  }

  loadTextures(texturePaths).then(loadedTextures => {
    textures.push(...loadedTextures);
    createScene();
  }).catch((error) => {
    console.error('Error loading textures:', error);
  });

  function getRandomSpherePoint({ radius = 10 }) {
    const minRadius = radius * 0.25;
    const maxRadius = radius - minRadius;
    const range = Math.random() * maxRadius + minRadius;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    return {
      x: range * Math.sin(phi) * Math.cos(theta),
      y: range * Math.sin(phi) * Math.sin(theta),
      z: range * Math.cos(phi),
    };
  }

  function getBox() {
    const randomIndex = Math.floor(Math.random() * textures.length);
    const randomTextureData = textures[randomIndex];
    if (!randomTextureData) {
      console.error(`Texture data is undefined at index ${randomIndex}`);
      return null;
    }
    const material = new THREE.MeshBasicMaterial({ map: randomTextureData.texture });
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const box = new THREE.Mesh(geo, material);
    box.userData.textureName = randomTextureData.path.split('/').pop().split('.')[0];
    return box;
  }

  function createScene() {
    const boxGroup = new THREE.Group();
    boxGroup.userData.update = (timeStamp) => {
      boxGroup.rotation.x = timeStamp * 0.0001;
      boxGroup.rotation.y = timeStamp * 0.0001;
    };
    scene.add(boxGroup);

    const numBoxes = 1000;
    const radius = 45;
    for (let i = 0; i < numBoxes; i++) {
      const box = getBox();
      if (box) {
        const { x, y, z } = getRandomSpherePoint({ radius });
        box.position.set(x, y, z);
        box.rotation.set(x, y, z);
        boxGroup.add(box);
      }
    }

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    scene.add(hemiLight);

    const keys = { w: false, a: false, s: false, d: false, ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false };
    const moveSpeed = 0.2;
    const minDistance = 1;

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'w':
          keys.w = true;
          break;
        case 'a':
          keys.a = true;
          break;
        case 's':
          keys.s = true;
          break;
        case 'd':
          keys.d = true;
          break;
        case 'ArrowUp':
          keys.ArrowUp = true;
          break;
        case 'ArrowLeft':
          keys.ArrowLeft = true;
          break;
        case 'ArrowDown':
          keys.ArrowDown = true;
          break;
        case 'ArrowRight':
          keys.ArrowRight = true;
          break;
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.key) {
        case 'w':
          keys.w = false;
          break;
        case 'a':
          keys.a = false;
          break;
        case 's':
          keys.s = false;
          break;
        case 'd':
          keys.d = false;
          break;
        case 'ArrowUp':
          keys.ArrowUp = false;
          break;
        case 'ArrowLeft':
          keys.ArrowLeft = false;
          break;
        case 'ArrowDown':
          keys.ArrowDown = false;
          break;
        case 'ArrowRight':
          keys.ArrowRight = false;
          break;
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('click', (event) => {
      if (isPopupOpen) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(boxGroup.children);

      if (intersects.length > 0) {
        const intersectedBox = intersects[0].object;
        const textureName = intersectedBox.userData.textureName;
        const description = descriptions[textureName];
        if (description) {
          setPopupContent(description);
          popup.style.display = 'block';
          isPopupOpen = true;
        }
      }
    });

    function setPopupContent(description) {
      popupContent.textContent = '';


      const title = document.createElement('h2');
      title.textContent = description.title;
      popupContent.appendChild(title);

      description.projects.forEach(project => {
        const projectLink = document.createElement('a');
        projectLink.href = project.link;
        projectLink.target = '_blank';
        projectLink.textContent = 'Link';
        projectLink.style.color = 'white';

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;

        popupContent.appendChild(projectTitle);
        popupContent.appendChild(projectLink);

        const unorderedList = document.createElement('ul');
        project.description.forEach(desc => {
          const descPoint = document.createElement('li');
          descPoint.textContent = desc;
          descPoint.classList.add('popup-description');
          unorderedList.appendChild(descPoint);
        });

        popupContent.appendChild(unorderedList);
      });
    }

    let initialAnimationDone = false;

    function animate(timeStamp = 0) {
      requestAnimationFrame(animate);

      if (!initialAnimationDone) {
        camera.position.z -= 0.2;
        if (camera.position.z <= 30) {
          camera.position.z = 30;
          initialAnimationDone = true;
        }
      }

      if (keys.ArrowUp) bloomPass.strength += 0.1;
      if (keys.ArrowRight) bloomPass.radius += 0.1;

      if (bloomPass.strength > 0) {
        if (keys.ArrowDown) bloomPass.strength -= 0.1;
      }

      if (bloomPass.radius > 0) {
        if (keys.ArrowLeft) bloomPass.radius -= 0.1;
      }

      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);

      if (keys.w) camera.position.add(forward.multiplyScalar(moveSpeed));
      if (keys.s) camera.position.add(forward.multiplyScalar(-moveSpeed));
      if (keys.a) camera.position.add(right.multiplyScalar(-moveSpeed));
      if (keys.d) camera.position.add(right.multiplyScalar(moveSpeed));

      if (camera.position.length() < minDistance) {
        camera.position.setLength(minDistance);
      }

      boxGroup.userData.update(timeStamp);
      composer.render(scene, camera);
      controls.update();
    }

    animate();

    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleWindowResize, false);
  }
}
