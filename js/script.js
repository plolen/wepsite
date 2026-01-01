window.addEventListener("load", function() {

    const sections = document.querySelectorAll(".main > section");

    const navItems = document.querySelectorAll(".nav-item");

    let curSIdx = 0;

    let isScrolling = false;



    // 1. 통합 스크롤 기능 (버튼 & 휠)

    window.doScroll = function(idx) {

        if (isScrolling) return;

        idx = Math.max(0, Math.min(idx, sections.length - 1));

        curSIdx = idx;



        isScrolling = true;

        sections[curSIdx].scrollIntoView({ behavior: "smooth" });



        navItems.forEach((item, i) => {

            item.classList.toggle("active", i === idx);

        });



        setTimeout(() => { isScrolling = false; }, 800);

    };



    window.addEventListener("wheel", (e) => {

        if (isScrolling) return;

        if (e.deltaY > 0) doScroll(curSIdx + 1);

        else doScroll(curSIdx - 1);

    }, { passive: false });



    // 2. 캐릭터 리소스 데이터

    const charData = {

        hera: { name: "헤라", color: "#6e42c1", img: "hera.png" },

        miho: { name: "미호", color: "#e84118", img: "miho.png" },

        cheong: { name: "청령", color: "#2ecc71", img: "cheong.png" },

        meisa: { name: "메이사", color: "#3498db", img: "meisa.png" },

        mk1: { name: "M-k1", color: "#1abc9c", img: "mk1.png" }

    };



    // 3. 캐릭터 이미지 전환 시점

    window.changeRace = function(key) {

        const display = document.getElementById('character-display');

        const data = charData[key];



        display.classList.add('fade');



        setTimeout(() => {

            document.getElementById('char-name').innerText = data.name;

            document.getElementById('bg-slope').style.backgroundColor = data.color;

            // 이미지 삽입 시점

            document.getElementById('char-img').src = data.img;



            display.classList.remove('fade');



            document.querySelectorAll('.race-menu li').forEach(li => li.classList.remove('active'));

            document.getElementById('btn-' + key).classList.add('active');

        }, 300);

    };

});