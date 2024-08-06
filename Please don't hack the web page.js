
(function() {
    // 언어에 따른 메시지 설정
    const localeStrings = {
        en: {
            devToolsOpen: 'Developer tools are open. Please close them.',
        },
        ko: {
            devToolsOpen: '개발자 도구가 열려 있습니다. 닫아주세요.',
        }
    };

    // 현재 언어 설정 (예: 'en' 또는 'ko')
 

    // 모바일 환경 감지
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    // 개발자 도구 열기 방지
    const isDevToolsOpen = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        return widthThreshold || heightThreshold || (window.outerWidth < window.innerWidth) || (window.outerHeight < window.innerHeight);
    };

    // 알림 표시
    const showDevToolsAlert = () => {
        alert(localeStrings[currentLanguage].devToolsOpen);
    };

    // 페이지 비활성화
    const disablePage = () => {
        document.body.innerHTML = `<h1>${localeStrings[currentLanguage].devToolsOpen}</h1>`;
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        document.body.style.textAlign = 'center';
        document.body.style.paddingTop = '20%';
    };

    // 개발자 도구 상태 체크
    const checkDevTools = () => {
        if (isDevToolsOpen()) {
            disablePage();
            showDevToolsAlert();
            setTimeout(() => {
                window.location.reload();
            }, 1000); // 1초 후 새로 고침
        }
    };

    // 개발자 도구 감지 및 방지 시작
    if (!isMobile) {
        setInterval(checkDevTools, 1000); // 1초마다 체크
    }

    // 우클릭 방지
    document.addEventListener('contextmenu', e => {
        e.preventDefault(); // 우클릭 방지
    });

    // 터치 이벤트로 우클릭 방지
    document.addEventListener('touchstart', e => {
        e.preventDefault(); // 터치 이벤트 방지
    });

    // 키보드 단축키 방지 (데스크톱 환경)
    document.addEventListener('keydown', e => {
        const forbiddenKeys = [
            { keyCode: 123 }, // F12
            { ctrlKey: true, shiftKey: true, keyCode: 73 }, // Ctrl+Shift+I
            { ctrlKey: true, shiftKey: true, keyCode: 74 }, // Ctrl+Shift+J
            { ctrlKey: true, keyCode: 85 }, // Ctrl+U
            { ctrlKey: true, shiftKey: true, keyCode: 67 }, // Ctrl+Shift+C
            { metaKey: true, altKey: true, keyCode: 73 } // Command+Option+I (Safari)
        ];

        forbiddenKeys.forEach(shortcut => {
            const isForbidden = Object.keys(shortcut).every(key => e[key] === shortcut[key]);
            if (isForbidden) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    // 콘솔 로그 방지
    ['log', 'warn', 'error', 'info'].forEach(method => {
        console[method] = function() {};
    });

    // Window resize 이벤트 핸들러 추가
    window.addEventListener('resize', checkDevTools);

    // 비디오 배경 상호작용 방지
    const videoBackground = document.querySelector('.video-background video');
    if (videoBackground) {
        videoBackground.style.pointerEvents = 'none';
    }

    // 숨겨진 요소로 개발자 도구 감지
    const detectDevTools = () => {
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                disablePage();
                showDevToolsAlert();
                setTimeout(() => {
                    window.location.reload();
                }, 1000); // 1초 후 새로 고침
            }
        });
        console.log('%c', element);
    };

    if (!isMobile) {
        setInterval(detectDevTools, 1000); // 1초마다 체크
    }

    // 콘솔 열기 감지 및 방지
    const detectConsoleOpen = () => {
        const element = new Image();
        let devtoolsOpen = false;
        Object.defineProperty(element, 'id', {
            get: function() {
                devtoolsOpen = true;
                disablePage();
                showDevToolsAlert();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        });
        console.log('%c', element);
        if (devtoolsOpen) {
            devtoolsOpen = false;
        }
    };

    if (!isMobile) {
        setInterval(detectConsoleOpen, 1000);
    }

    // 콘솔 클리어 방지
    const clearConsole = () => {
        console.clear = function() {
            disablePage();
            showDevToolsAlert();
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        };
    };

    if (!isMobile) {
        setInterval(clearConsole, 1000);
    }

    // 개발자 도구 네트워크 패널 감지 및 방지
    const detectNetworkPanel = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/dummy-url', true);
        xhr.send();
        xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader('Content-Type').includes('javascript')) {
                    disablePage();
                    showDevToolsAlert();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            }
        };
    };

    if (!isMobile) {
        setInterval(detectNetworkPanel, 1000);
    }

    // Cross-Origin Resource Sharing (CORS) 정책 설정
    const setCORSHeaders = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/', true);
        xhr.setRequestHeader('X-Content-Type-Options', 'nosniff');
        xhr.setRequestHeader('X-XSS-Protection', '1; mode=block');
        xhr.setRequestHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        xhr.setRequestHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; object-src 'none';");
        xhr.send();
    };

    setCORSHeaders();

    // Clickjacking 방지
    const preventClickjacking = () => {
        document.body.style.mozTransform = 'scale(1)';
        document.body.style.msTransform = 'scale(1)';
        document.body.style.transform = 'scale(1)';
        document.body.style.position = 'relative';
    };

    preventClickjacking();

    // CSS Injection 방지
    const preventCSSInjection = () => {
        const style = document.createElement('style');
        style.textContent = `body { background: #000 !important; color: #fff !important; }`;
        document.head.appendChild(style);
    };

    preventCSSInjection();

    // 스크립트 외부 로딩 방지
    const preventExternalScripts = () => {
        const scriptElements = document.querySelectorAll('script');
        scriptElements.forEach(script => {
            if (script.src) {
                script.src = ''; // 외부 스크립트 제거
            }
        });
    };

    preventExternalScripts();
})();