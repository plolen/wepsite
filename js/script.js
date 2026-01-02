window.addEventListener("load", function() {
    const sections = document.querySelectorAll(".main > section");
    const navItems = document.querySelectorAll(".nav-item");
    let curSIdx = 0;
    let isScrolling = false;

    // 1. 통합 스크롤 기능
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

    // 2. 캐릭터 데이터
    const charData = {
        hera: {
            color: "#6e42c1",
            fullImg: "hera_full.png",
            infoAll: "hera_info_all.png",
            iconOn: "hera_icon_on.png",
            iconOff: "hera_icon_off.png",
            scale: "1.1",
            offsetX: "0px",
            offsetY: "0px"
        },
        miho: {
            color: "#e84118",
            fullImg: "miho_full.png",
            infoAll: "miho_info_all.png",
            iconOn: "miho_icon_on.png",
            iconOff: "miho_icon_off.png",
            scale: "1.05",
            infoScale: "1.2", // [추가] 청령의 정보창만 80% 크기로 축소    
            offsetX: "0px",
            offsetY: "10px"
        },
        cheong: {
            color: "#2ecc71",
            fullImg: "cheong_full.png",
            infoAll: "cheong_info_all.png",
            iconOn: "cheong_icon_on.png",
            iconOff: "cheong_icon_off.png",
            scale: "0.9",
            infoScale: "0.1", // [추가] 청령의 정보창만 80% 크기로 축소
            offsetX: "0px",
            offsetY: "0px"
        },
        meisa: {
            color: "#3498db",
            fullImg: "meisa_full.png",
            infoAll: "meisa_info_all.png",
            iconOn: "meisa_icon_on.png",
            iconOff: "meisa_icon_off.png",
            scale: "0.95",
            infoScale: "1.1",
            offsetX: "0px",
            offsetY: "0px"
        },
        mk1: {
            color: "#7f8c8d",
            fullImg: "mk1_full.png",
            infoAll: "mk1_info_all.png",
            iconOn: "mk1_icon_on.png",
            iconOff: "mk1_icon_off.png",
            scale: "1.0",
            infoScale: "1.1",
            offsetX: "0px",
            offsetY: "0px"
        }
    };

    // 3. 캐릭터 전환 기능
    window.changeRace = function(key) {
        const data = charData[key];
        if (!data) return;

        const display = document.getElementById('character-display');
        if (display) display.classList.add('fade');

        setTimeout(() => {
            // 1) 메인 비주얼 교체
            const fullVisualEl = document.getElementById('char-visual-full');
            if (fullVisualEl && data.fullImg) {
                fullVisualEl.src = data.fullImg;
                fullVisualEl.style.transform = `scale(${data.scale || '1'}) translate(${data.offsetX || '0px'}, ${data.offsetY || '0px'})`;
            }

            // 2) 통합 정보 이미지 교체
            const infoCombinedEl = document.getElementById('char-info-combined');
            if (infoCombinedEl && data.infoAll) {
                infoCombinedEl.src = data.infoAll;
            }
            if (display) display.classList.remove('fade');

            // 3) 메뉴 아이콘 활성화
            document.querySelectorAll('.race-menu li').forEach(li => {
                const liKey = li.id.replace('btn-', '');
                const iconImg = li.querySelector('.menu-icon');
                if (iconImg && charData[liKey]) {
                    if (liKey === key) {
                        li.classList.add('active');
                        iconImg.src = charData[liKey].iconOn;
                    } else {
                        li.classList.remove('active');
                        iconImg.src = charData[liKey].iconOff;
                    }
                }
            });
        }, 300);
    };
}); // 전체를 닫는 이 괄호가 정확히 한 번만 있어야 합니다.