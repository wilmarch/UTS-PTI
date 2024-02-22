// Select Character
const elmImgSelect = document.querySelector(".img-karakter-select");
const nextSelect = document.querySelector(".next");
const prevSelect = document.querySelector(".prev");
const playButton = document.querySelector(".play");
const watchMinutes = document.querySelector(".minutes");
const watchHour = document.querySelector(".hour");

// Main Game
const elmTimeText = document.querySelector(".time");
const indikatorMakan = document.querySelector(".makan");
const indikatorTidur = document.querySelector(".tidur");
const indikatorMain = document.querySelector(".game");
const indikatorBelajar = document.querySelector(".belajar");
const buttonAction = document.querySelectorAll(".d-flex button");
const pie = document.querySelector(".pie");
const zzz = document.querySelector(".zzz");
const learn = document.querySelector(".learn");
const btPause = document.querySelector("img.pause");

// Default
let karakterSelect = 0;
let hour = Math.floor(Math.random() * 24);
// let hour = 4;
let minutes = 0;
let semester = 1;
let makan = 50;
let tidur = 50;
let main = 50;
let belajar = 0;
let action = false;
let win = false;
let go = false;
let pause = false;

const imgSelectKarakter = [
  "flashy_flash.png",
  "metal_bad.png",
  "metal_knight.png",
  "prisoner.png",
  "sonic.png",
  "zombie-man.png",
];

document.querySelector("#bg").play();

const clickSound = (id) => {
  let sound = document.querySelector("#" + id);
  sound.play();
};

const setBgSound = (path) => {
  let soundElm = document.querySelector(".bgmusic audio source").src;
  soundElm = soundElm.split("/");
  soundElm = soundElm[soundElm.length - 1];

  if (path) {
    newSound = path.split("/");
    newSound = newSound[newSound.length - 1];

    if (!(soundElm == newSound)) {
      let audio = `
    <audio autoplay loop>
      <source src="${path}" />
    </audio>
  `;
      document.querySelector(".bgmusic").innerHTML = audio;
    }
  }
};

prevSelect.addEventListener("click", (e) => {
  clickSound("klik");
  prevSelect.classList.add("click");

  setTimeout(() => {
    prevSelect.classList.remove("click");
  }, 80);

  karakterSelect--;
  if (karakterSelect <= 0) {
    karakterSelect = imgSelectKarakter.length - 1;
  }

  elmImgSelect.src =
    "assets/karakter/karakter_select/" + imgSelectKarakter[karakterSelect];
});

nextSelect.addEventListener("click", (e) => {
  clickSound("klik");
  nextSelect.classList.add("click");

  setTimeout(() => {
    nextSelect.classList.remove("click");
  }, 80);

  karakterSelect++;
  if (karakterSelect > imgSelectKarakter.length - 1) {
    karakterSelect = 0;
  }

  elmImgSelect.src =
    "assets/karakter/karakter_select/" + imgSelectKarakter[karakterSelect];
});

playButton.addEventListener("click", (e) => {
  let playerName = document.querySelector("input.name").value;
  if (playerName == "") {
    alert("Nama Pemain Tidak Boleh Kosong");
  } else {
    clickSound("start");
    setBgSound();
    document.querySelector(".select-karakter").classList.add("d-none");
    document.querySelector(".main").classList.remove("d-none");
    document.querySelector("img.pause").classList.remove("d-none");

    document.querySelector(".playerName").innerHTML = playerName;

    gamePlay();
  }
});

btPause.addEventListener("click", (e) => {
  if (pause == false) {
    pause = true;
    action = true;
    setBgSound("assets/song/pause.mp3");
    btPause.src = "assets/btn-pause.png";
  } else if (pause == true) {
    pause = false;
    action = false;
    cekTime(hour);
    setBackground(hour);
    btPause.src = "assets/btn-play.png";
  }
});

const gamePlay = () => {
  startTime();
  cekTime(hour);
  indicatorSet("makan", makan);
  indicatorSet("tidur", tidur);
  indicatorSet("game", main);
  indicatorSet("belajar", belajar);
  setBackground(hour);
  cekAlert();

  document.querySelector("#bg").remove();

  document.querySelector(".main img").src =
    "assets/karakter/" + imgSelectKarakter[karakterSelect];

  document.querySelector(".main img").alt =
    "Hero " + imgSelectKarakter[karakterSelect];

  const timeStart = setInterval(() => {
    if (win == true) {
      clearInterval(timeStart);
    }

    if (!pause) {
      makan -= 4;
      tidur -= 4;
      main -= 4;
      belajar -= 4;

      if (makan < 0) {
        makan = 0;
        clearInterval(timeStart);
        gameOver("Anda Kalah Karena Kelaparan");
      }
      if (tidur < 0) {
        tidur = 0;
        clearInterval(timeStart);
        gameOver("Anda Kalah Karena Kurang Tidur");
      }
      if (main < 0) {
        main = 0;
      }
      if (belajar < 0) {
        belajar = 0;
        clearInterval(timeStart);
        gameOver("Anda Kalah Karena Kurang Belajar");
      }
      indicatorSet("makan", makan);
      indicatorSet("tidur", tidur);
      indicatorSet("game", main);
      indicatorSet("belajar", belajar);
    }
  }, 60000);
};

const startTime = () => {
  i = 0;

  let timeRun = setInterval(() => {
    // if (win == true) {
    //   clearInterval(timeRun);
    // }

    if (win == true || go == true) {
      clearInterval(timeRun);
    }

    if (!pause) {
      i++;

      if (i > 59) {
        hour++;

        if (!(win == true || go == true)) {
          if (hour == 5) {
            clickSound("berkokok");
          }
        }

        if (hour > 23) {
          hour = 0;
        }

        cekTime(hour);
        setBackground(hour);

        i = 0;
      }

      minutes = i;

      if (minutes < 10) {
        minutes = "0" + i;
      }

      watchHour.innerHTML = hour;
      watchMinutes.innerHTML = minutes;
    }
  }, 1000);
};

const cekTime = (hour) => {
  let time = "";
  if (hour > 2 && hour <= 10) {
    time = "Good Morning";
  } else if (hour > 10 && hour <= 14) {
    time = "Good Afternoon";
  } else if (hour > 14 && hour <= 17) {
    time = "Good Afternoon";
  } else if (hour > 17 && hour <= 23) {
    time = "Good Night";
  } else if (hour == 0) {
    time = "Good Night";
  } else if (hour > 0 && hour <= 2) {
    time = "Good Night";
  }

  elmTimeText.innerHTML = time;
};

const cekAlert = () => {
  const run = setInterval(() => {
    if (win == true || go == true) {
      clearInterval(run);
    }

    if (!pause) {
      if (makan < 25) {
        showMessage("alert-1", "Anda sedang kelaparan cobalah makan!");

        setTimeout(() => hideMessage("alert-1"), 3000);
      }

      if (tidur < 25) {
        showMessage(
          "alert-2",
          "Anda terlalu mengantuk cobalah tidur dan beristirahat!"
        );

        setTimeout(() => hideMessage("alert-2"), 3000);
      }

      if (main < 25) {
        showMessage("alert-3", "Anda terlalu bosan cobalah bermain!");

        setTimeout(() => hideMessage("alert-3"), 3000);
      }

      if (belajar < 25) {
        showMessage(
          "alert-4",
          "Belajar Anda menurun, lakukan belajar agar tidak dikeluarkan dari kampus"
        );

        setTimeout(() => hideMessage("alert-4"), 3000);
      }
    }
  }, 20000);
};

const indicatorSet = (elm, value) => {
  const indicator = document.querySelector("." + elm);
  let cls = "progress-bar progress-bar-striped progress-bar-animated";
  cls += " " + elm;

  if (value > 70) {
    cls += " bg-success";
  } else if (value > 35) {
    cls += " bg-warning";
  } else if (value > 0) {
    cls += " bg-danger";
  }

  indicator.setAttribute("style", "width: " + value + "%");
  indicator.setAttribute("class", cls);
  indicator.innerHTML = value;
};

const clickEffect = (e) => {
  e.classList.add("click");

  setTimeout(() => {
    e.classList.remove("click");
  }, 100);
};

const playerMakan = (e) => {
  if (!action) {
    if (makan < 100) {
      clickSound("makan");
      document.querySelector(".main img").src =
        "assets/karakter/makan/" + imgSelectKarakter[karakterSelect];
    }
    clickEffect(e);

    e.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>`;
    actionLock("makan");

    let sedangMakan = setInterval(() => {
      makan++;

      if (makan > 100) {
        makan = 100;
        clearInterval(sedangMakan);
        clearInterval(tidurBerkurang);
        e.innerHTML = "Makan";
        showMessage("alert-1", "Kekenyangan tidak bisa makan lagi!");

        setTimeout(() => {
          hideMessage("alert-1");
        }, 4000);
      }

      indicatorSet("makan", makan);
    }, 300);

    let tidurBerkurang = setInterval(() => {
      tidur--;
      indicatorSet("tidur", tidur);
    }, 800);

    if (makan < 100) {
      pie.classList.add("show");
      setTimeout(() => pie.classList.remove("show"), 400);
    }

    let animateMakan = setInterval(() => {
      if (makan < 100) {
        pie.classList.add("show");

        setTimeout(() => pie.classList.remove("show"), 400);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(sedangMakan);
      clearInterval(tidurBerkurang);
      clearInterval(animateMakan);
      e.innerHTML = "Makan";
      document.querySelector(".main img").src =
        "assets/karakter/" + imgSelectKarakter[karakterSelect];
      unlockAction();
    }, 4000);
  }
};

const playerTidur = (e) => {
  if (!action) {
    if (tidur < 100) {
      clickSound("tidur");
      document.querySelector(".main img").src =
        "assets/karakter/sleep/" + imgSelectKarakter[karakterSelect];
    }
    clickEffect(e);

    e.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Loading...</span>`;
    actionLock("tidur");

    let sedangTidur = setInterval(() => {
      tidur++;

      if (tidur > 100) {
        tidur = 100;
        clearInterval(sedangTidur);
        e.innerHTML = "Tidur";
        showMessage("alert-2", "Anda terlalu banyak tidur!");

        setTimeout(() => {
          hideMessage("alert-2");
        }, 4000);
      }

      indicatorSet("tidur", tidur);
    }, 600);

    if (tidur < 100) {
      zzz.classList.add("show");
      setTimeout(() => zzz.classList.remove("show"), 400);
    }

    let animateTidur = setInterval(() => {
      if (tidur < 100) {
        zzz.classList.add("show");

        setTimeout(() => zzz.classList.remove("show"), 400);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(sedangTidur);
      clearInterval(animateTidur);
      document.querySelector(".main img").src =
        "assets/karakter/" + imgSelectKarakter[karakterSelect];
      e.innerHTML = "Tidur";
      unlockAction();
    }, 8000);
  }
};

const playerMain = (e) => {
  if (!action) {
    clickEffect(e);
    if (main < 100) {
      clickSound("main");
      e.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span class="visually-hidden">Loading...</span>`;
    }

    actionLock("main");

    let i = 1;

    let sedangMain = setInterval(() => {
      main++;

      if (main > 100) {
        main = 100;
        clearInterval(sedangMain);
        e.innerHTML = "Main";
        showMessage("alert-3", "Anda terlalu banyak bermain!");

        setTimeout(() => {
          hideMessage("alert-3");
        }, 4000);
      }

      indicatorSet("game", main);
    }, 500);

    let character = imgSelectKarakter[karakterSelect].split(".");

    const animateCharac = setInterval(() => {
      if (i > 4) {
        i = 1;
      }

      if (main < 100) {
        document.querySelector(".main img").src =
          "assets/karakter/main/" + character[0] + "/" + i + ".png";
      }

      i++;
    }, 200);

    setTimeout(() => {
      clearInterval(sedangMain);
      clearInterval(animateCharac);
      e.innerHTML = "Main";
      unlockAction();
      document.querySelector(".main img").src =
        "assets/karakter/" + imgSelectKarakter[karakterSelect];
    }, 6300);
  }
};

const playerBelajar = (e) => {
  if (!action) {
    clickEffect(e);
    clickSound("belajar");

    document.querySelector(".main img").src =
      "assets/karakter/learn/" + imgSelectKarakter[karakterSelect];

    e.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Loading...</span>`;
    actionLock("belajar");

    let sedangBelajar = setInterval(() => {
      if (win == true) {
        clearInterval(sedangBelajar);
      }
      belajar++;

      if (belajar > 100) {
        showMessage("alert-1", "Selamat anda naik semester");
        tambahSemester();
        belajar = 0;

        setTimeout(() => hideMessage("alert-1"), 4000);
      }

      indicatorSet("belajar", belajar);
    }, 600);

    let makanBerkurang = setInterval(() => {
      makan--;
      indicatorSet("makan", makan);
    }, 800);

    if (belajar < 100) {
      learn.classList.add("show");
      setTimeout(() => learn.classList.remove("show"), 400);
    }

    let mainBerkurang = setInterval(() => {
      main--;
      if (main < 0) {
        main = 0;
      }
      indicatorSet("game", main);
    }, 900);

    let animatebelajar = setInterval(() => {
      if (belajar < 100) {
        learn.classList.add("show");

        setTimeout(() => learn.classList.remove("show"), 400);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(sedangBelajar);
      clearInterval(makanBerkurang);
      clearInterval(animatebelajar);
      clearInterval(mainBerkurang);
      e.innerHTML = "Belajar";
      document.querySelector(".main img").src =
        "assets/karakter/" + imgSelectKarakter[karakterSelect];
      unlockAction();
    }, 5300);
  }
};

const actionLock = (elm) => {
  action = true;
  buttonAction.forEach((button) => {
    if (!button.classList.contains(elm)) {
      button.classList.add("non");
    }
  });
};

const unlockAction = () => {
  action = false;
  buttonAction.forEach((button) => {
    button.classList.remove("non");
  });
};

const showMessage = (elm, message) => {
  document.querySelector("." + elm).innerHTML = message;
  document.querySelector("." + elm).classList.add("show");
};

const hideMessage = (elm) => {
  document.querySelector("." + elm).classList.remove("show");
};

const setBackground = (hour) => {
  const bg = document.querySelector("body");
  const namePlayer = document.querySelector("h3.name");
  const timePlayer = document.querySelector("h3.clock");
  const exam = document.querySelector(".exam h5");

  let path = "assets/background/";

  if (hour > 2 && hour <= 6) {
    setBgSound("assets/song/night.mp3");
    bg.setAttribute(
      "style",
      `background: url(${path}malam-pagi.jpg); background-size: cover;`
    );
    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
  } else if (hour > 6 && hour <= 10) {
    setBgSound("assets/song/day.mp3");
    bg.setAttribute(
      "style",
      `background: url(${path}pagi.jpg); background-size: cover;`
    );
    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
  } else if (hour > 10 && hour <= 14) {
    setBgSound("assets/song/day.mp3");
    bg.setAttribute(
      "style",
      `background: url(${path}siang.jpg); background-size: cover;`
    );
    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
  } else if (hour > 14 && hour <= 17) {
    setBgSound("assets/song/day.mp3");

    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
    bg.setAttribute(
      "style",
      `background: url(${path}sore.jpg); background-size: cover;`
    );
  } else if (hour > 17 && hour <= 23) {
    setBgSound("assets/song/night.mp3");
    bg.setAttribute(
      "style",
      `background: url(${path}sore-malam.jpg); background-size: cover;`
    );
    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
  } else if (hour >= 0 && hour <= 2) {
    setBgSound("assets/song/night.mp3");
    bg.setAttribute(
      "style",
      `background: url(${path}malam-pagi.jpg); background-size: cover;`
    );
    namePlayer.setAttribute("style", "color: #fff");
    timePlayer.setAttribute("style", "color: #fff");
    exam.setAttribute("style", "color: #fff");
  }
};

const tambahSemester = () => {
  semester++;
  if (semester > 8) {
    clickSound("winner");
    win = true;
    document.querySelector("#berkokok").remove();
    document.querySelector(".winner").classList.add("show");
  } else {
    document.querySelector(".semester").innerHTML = semester;
  }
};

const gameOver = (msg) => {
  clickSound("go");
  document.querySelector(".bgmusic").remove();
  document.querySelector("#berkokok").remove();
  document.querySelector(".go").classList.add("show");
  document.querySelector(".msg").innerHTML = msg;
};

const okeLost = () => {
  window.location.reload();
};
