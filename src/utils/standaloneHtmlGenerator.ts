export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>글자 수 및 맞춤법 간편 검사기</title>
  <meta name="description" content="실시간 글자 수 세기와 자주 틀리는 한국어 맞춤법 간편 검사 및 자동 교정기">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google / Pretendard Webfont -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
  <style>
    body {
      font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-900 min-h-screen antialiased flex flex-col justify-between">
  <!-- 상단 네비게이션 헤더 (Bento Grid Style) -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          가
        </div>
        <div>
          <h1 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight">글자 수 및 맞춤법 간편 검사기</h1>
          <p class="text-xs text-slate-400 hidden sm:block">실시간 글자 수 세기 & 자주 틀리는 맞춤법 간편 교정</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button id="btn-sample" type="button" class="px-3.5 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs">
          샘플 불러오기
        </button>
        <button id="btn-download-html" type="button" class="px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          <span>HTML 다운로드</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Bento Grid 메인 작업 영역 -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
      <!-- Main Editor Card (col-span-8) -->
      <div class="col-span-12 lg:col-span-7 xl:col-span-8 flex flex-col">
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col flex-1 h-full">
          <!-- 에디터 상단 Bento 헤더 -->
          <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 flex-wrap gap-2.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">텍스트 입력</span>
              <span id="status-badge" class="text-[10px] px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase tracking-wider">Ready</span>
              <span id="char-limit-indicator" class="text-xs text-slate-400 font-medium ml-1"></span>
            </div>
            <div class="flex items-center gap-2">
              <button id="btn-clear" type="button" class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                전체 지우기
              </button>
              <button id="btn-copy" type="button" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                <span>복사하기</span>
              </button>
            </div>
          </div>

          <!-- Textarea -->
          <textarea
            id="main-textarea"
            rows="16"
            placeholder="검사할 텍스트를 이곳에 입력하거나 붙여넣으세요..."
            class="w-full flex-1 resize-none border-none outline-none leading-relaxed text-slate-800 placeholder-slate-300 min-h-[380px] lg:min-h-[460px] text-base"
            spellcheck="false"
          ></textarea>
        </div>
      </div>

      <!-- Right Bento Column (col-span-4) -->
      <div class="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
        <!-- 2x2 Bento Grid -->
        <div class="grid grid-cols-2 gap-3">
          <!-- 1. 공백 포함 (Primary highlight) -->
          <div class="bg-indigo-50/70 border border-indigo-100 p-4 rounded-2xl flex flex-col justify-between">
            <span class="text-xs font-bold text-indigo-500 uppercase tracking-wider">공백 포함</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span id="stat-char-with-spaces" class="text-3xl font-extrabold text-indigo-900 tracking-tight">0</span>
              <span class="text-xs font-semibold text-indigo-400">자</span>
            </div>
          </div>
          <!-- 2. 공백 제외 -->
          <div class="bg-slate-100 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">공백 제외</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span id="stat-char-no-spaces" class="text-3xl font-extrabold text-slate-800 tracking-tight">0</span>
              <span class="text-xs font-semibold text-slate-400">자</span>
            </div>
          </div>
          <!-- 3. 단어 수 -->
          <div class="bg-slate-100 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">단어 수</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span id="stat-word-count" class="text-3xl font-extrabold text-slate-800 tracking-tight">0</span>
              <span class="text-xs font-semibold text-slate-400">개</span>
            </div>
          </div>
          <!-- 4. 줄 바꿈 -->
          <div class="bg-slate-100 border border-slate-200/80 p-4 rounded-2xl flex flex-col justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">줄 바꿈</span>
            <div class="flex items-baseline gap-1 mt-2">
              <span id="stat-line-breaks" class="text-3xl font-extrabold text-slate-800 tracking-tight">0</span>
              <span class="text-xs font-semibold text-slate-400">줄</span>
            </div>
          </div>
        </div>

        <!-- 부가 통계 바 -->
        <div class="bg-white border border-slate-200 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs text-slate-600">
          <span>원고지: <strong id="stat-manuscript" class="text-slate-900">0</strong>매</span>
          <span class="text-slate-300">|</span>
          <span>UTF-8: <strong id="stat-bytes-utf8" class="text-slate-900">0</strong>B</span>
          <span class="text-slate-300">|</span>
          <span>읽기: 약 <strong id="stat-reading-time" class="text-slate-900">0</strong>분</span>
        </div>

        <!-- 맞춤법 도우미 Bento Dark Box -->
        <div class="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col border border-slate-800 shadow-sm flex-1">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <h2 class="text-sm font-bold uppercase tracking-widest text-slate-400">맞춤법 도우미</h2>
            </div>
            <span id="detected-count-badge" class="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full font-bold uppercase">0건</span>
          </div>

          <button id="btn-fix-all" type="button" class="hidden w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs items-center justify-center gap-1.5 mb-3">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>발견된 맞춤법 한 번에 교정</span>
          </button>

          <!-- Dynamic spell results container -->
          <div id="spell-results-container" class="space-y-2 mb-3 max-h-56 overflow-y-auto pr-1"></div>

          <!-- Tip Container (Bento Grid) -->
          <div class="space-y-3 overflow-y-auto pr-1 flex-1">
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p class="text-xs text-amber-400 font-bold mb-1">자주 틀리는 표현</p>
              <p class="text-sm text-slate-300">'안되요'가 아닌 <span class="text-white font-bold">'안돼요'</span>가 올바른 표현입니다.</p>
            </div>
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p class="text-xs text-blue-400 font-bold mb-1">띄어쓰기 팁</p>
              <p class="text-sm text-slate-300">의존 명사(것, 수, 데 등)는 앞 단어와 띄어 써야 합니다.</p>
            </div>
            <div class="p-3 bg-slate-800 rounded-xl border border-slate-700">
              <p class="text-xs text-emerald-400 font-bold mb-1">어휘 선택</p>
              <p class="text-sm text-slate-300">'어이없다'를 '어이업다'로 쓰지 않도록 주의하세요.</p>
            </div>
          </div>

          <div class="mt-auto pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            * 위 내용은 일반적인 맞춤법 가이드입니다.
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 하단 푸터 -->
  <footer class="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
    <p>글자 수 및 맞춤법 간편 검사기 · 순수 HTML/JS 단일 파일로 GitHub Pages에 바로 배포 가능</p>
  </footer>

  <!-- 알림 토스트 (알림 메시지 표시) -->
  <div id="toast" class="fixed bottom-6 right-6 z-50 transform translate-y-20 opacity-0 pointer-events-none transition-all duration-300 bg-slate-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
    <span id="toast-message">복사되었습니다.</span>
  </div>

  <!-- 인라인 자바스크립트 엔진 -->
  <script>
    // 1. 사전 데이터베이스 (자주 틀리는 맞춤법 30여종)
    const SPELL_RULES = [
      { id: 'an-dwae', pattern: /안되(요|서|서요|었|었어|었음|었네|었다)/g, wrong: '안되요', correct: '안돼요', exp: "'되'에 '-어요'가 붙으면 '돼(되어)'가 됩니다. '하/해'를 넣어 '안해요'가 자연스러우므로 '안돼요'가 맞습니다.", tip: "'되'는 '하', '돼'는 '해' 대입: 안하요(X) 안해요(O) -> 안돼요" },
      { id: 'an-dwae-basic', pattern: /안되\\b/g, wrong: '안되', correct: '안돼', exp: "종결형 어미로는 '안되어'의 준말인 '안돼'를 씁니다.", tip: "문장 끝에 홀로 올 때는 '안돼'입니다." },
      { id: 'eoi-eop-seo', pattern: /어의\\s*없/g, wrong: '어의없다', correct: '어이없다', exp: "'일이 너무 뜻밖이어서 기가 막히다'는 '어이없다'가 바른 말입니다.", tip: "궁궐 어의(의사)가 아닌 '어이'입니다." },
      { id: 'myeoch-il', pattern: /몇\\s*일/g, wrong: '몇일', correct: '며칠', exp: "한글 맞춤법에서 '몇 일'이라는 표기는 아예 인정하지 않고 '며칠'로 통일되어 있습니다.", tip: "'몇 일'은 없는 말, 무조건 '며칠'!" },
      { id: 'bwae-yo', pattern: /뵈요\\b/g, wrong: '뵈요', correct: '봬요', exp: "'뵈어요'의 준말은 '봬요'입니다. ('하/해' 대입: 하요(X), 해요(O) -> 봬요)", tip: "내일 봬요가 맞습니다." },
      { id: 'wen-man', pattern: /왠만하/g, wrong: '왠만하면', correct: '웬만하면', exp: "'표준에 가깝다'는 '웬만하다'입니다. '왠'은 '왠지'에만 쓰입니다.", tip: "'왠지' 빼고는 전부 '웬'" },
      { id: 'waen-ji', pattern: /웬지\\b/g, wrong: '웬지', correct: '왠지', exp: "'왜인지'의 준말은 '왠지'입니다.", tip: "왜 그런지 -> 왜인지 -> 왠지" },
      { id: 'eo-tteok-hae', pattern: /어떻해/g, wrong: '어떻해', correct: '어떡해', exp: "'어떻게 해'가 줄어든 말은 '어떡해'입니다.", tip: "어떻게 해? -> 어떡해" },
      { id: 'geum-se', pattern: /금새\\b/g, wrong: '금새', correct: '금세', exp: "'금시에'가 줄어든 말로 '금세'가 표준어입니다.", tip: "금시에 -> 금세" },
      { id: 'hee-han', pattern: /희안하/g, wrong: '희안하다', correct: '희한하다', exp: "드물 희(稀), 드물 한(罕)의 '희한하다'가 맞습니다.", tip: "'희한'으로 기억하세요." },
      { id: 'na-at-da', pattern: /병이\\s*낳/g, wrong: '병이 낳다', correct: '병이 낫다', exp: "병이 완쾌되는 것은 '낫다(나았다)'이고, 출산하는 것은 '낳다'입니다.", tip: "병은 낫다, 아기는 낳다" },
      { id: 'card-pay', pattern: /카드\\s*결재/g, wrong: '카드 결재', correct: '카드 결제', exp: "대금 지불은 '결제(濟)', 서류 승인은 '결재(裁)'입니다.", tip: "돈 계산 = 결제, 부장님 도장 = 결재" },
      { id: 'doc-pay', pattern: /서류\\s*결제/g, wrong: '서류 결제', correct: '서류 결재', exp: "기안서나 공문서 승인은 '결재'가 맞습니다.", tip: "서류 승인 = 결재" },
      { id: 'seol-rem', pattern: /설레임/g, wrong: '설레임', correct: '설렘', exp: "기본형이 '설레다'이므로 명사형은 '설렘'입니다.", tip: "표준어는 '설렘'입니다." },
      { id: 'guji', pattern: /구지\\b/g, wrong: '구지', correct: '굳이', exp: "구개음화로 발음되지만 표기는 어원대로 '굳이'로 적습니다.", tip: "굳다 -> 굳이" },
      { id: 'deu-reo-na-da', pattern: /들어나다/g, wrong: '들어나다', correct: '드러나다', exp: "겉으로 나타나는 것은 '드러나다'입니다.", tip: "드러나다(O)" },
      { id: 'dae-ga', pattern: /댓가\\b/g, wrong: '댓가', correct: '대가', exp: "순수 한자어에는 사이시옷을 받치지 않아 '대가(代價)'로 적습니다.", tip: "대가, 개수, 초점은 사이시옷 없음" },
      { id: 'gae-soo', pattern: /갯수\\b/g, wrong: '갯수', correct: '개수', exp: "한자어 '개수'는 사이시옷을 적지 않습니다.", tip: "개수(O)" },
      { id: 'cho-jeom', pattern: /촛점\\b/g, wrong: '촛점', correct: '초점', exp: "한자어 '초점'은 사이시옷을 적지 않습니다.", tip: "초점(O)" },
      { id: 'hwa-byeong', pattern: /홧병\\b/g, wrong: '홧병', correct: '화병', exp: "한자어 '화병'은 사이시옷을 적지 않습니다.", tip: "화병(O)" },
      { id: 'mu-nan-ha-da', pattern: /문안하/g, wrong: '문안하다', correct: '무난하다', exp: "'별다른 흠이나 어려움이 없다'는 '무난(無難)하다'입니다.", tip: "무난하다(O)" },
      { id: 'jae-jak-nyeon', pattern: /제작년/g, wrong: '제작년', correct: '재작년', exp: "지난해의 전해는 '재작년(再昨年)'입니다.", tip: "재작년(O)" },
      { id: 'o-raen-man', pattern: /오랫만/g, wrong: '오랫만에', correct: '오랜만에', exp: "'오래간만에'의 준말이므로 '오랜만에'가 맞습니다.", tip: "오랜만에(O), 오랫동안(O)" },
      { id: 'i-rae-ra', pattern: /일해라\\s*절해라/g, wrong: '일해라절해라', correct: '이래라저래라', exp: "'이리하여라 저리하여라'의 준말은 '이래라저래라'입니다.", tip: "이래라저래라(O)" },
      { id: 'nae-ro-ra', pattern: /내노라하/g, wrong: '내노라하는', correct: '내로라하는', exp: "'내로라하다'가 표준어입니다.", tip: "내로라하는(O)" },
      { id: 'neol-beu-reo', pattern: /널부러/g, wrong: '널부러지다', correct: '널브러지다', exp: "'널브러지다'가 표준어입니다.", tip: "널브러지다(O)" },
      { id: 'hael-ssuk', pattern: /핼쓱하/g, wrong: '핼쓱하다', correct: '핼쑥하다', exp: "'얼굴이 파리하다'는 '핼쑥하다'가 맞습니다.", tip: "핼쑥하다(O)" },
      { id: 'jjigae', pattern: /찌게\\b/g, wrong: '찌게', correct: '찌개', exp: "'찌개'가 바른 표기입니다.", tip: "된장찌개, 김치찌개(O)" },
      { id: 'be-gae', pattern: /베게\\b/g, wrong: '베게', correct: '베개', exp: "머리를 괴는 침구는 '베개'입니다.", tip: "베개(O)" },
      { id: 'sam-ga', pattern: /삼가하/g, wrong: '삼가하다', correct: '삼가다', exp: "기본형이 '삼가다'이므로 '삼가 주십시오'가 맞습니다.", tip: "삼가다(O)" },
      { id: 'geon-deu-ri', pattern: /건들이/g, wrong: '건들이다', correct: '건드리다', exp: "기본형은 '건드리다'입니다.", tip: "건드리지 마(O)" },
      { id: 'dwi-chi-da', pattern: /뒤치닥거리/g, wrong: '뒤치닥거리', correct: '뒤치다꺼리', exp: "'뒤치다꺼리'가 표준어입니다.", tip: "뒤치다꺼리(O)" }
    ];

    const SAMPLE_TEXT = \`안녕하세요! 자기소개서를 작성하고 있는데 이 문장이 맞는지 안되요.
카드 결재를 마치고 오랫만에 친구를 만나러 나갔습니다.
길에서 웬지 모르게 어의없는 일이 일어났는데, 친구는 병이 다 낳아서 정말 다행이었습니다.
내일 뵈요라고 인사하고 금새 헤어졌는데, 며칠 뒤에 제작년에 샀던 김치찌게 집에 가기로 했어요.
굳이 일해라절해라 간섭하는 사람은 웬만하면 피하고 무난하게 생활하고 싶습니다.\`;

    // DOM 요소 캐싱
    const textarea = document.getElementById('main-textarea');
    const statCharWith = document.getElementById('stat-char-with-spaces');
    const statCharNo = document.getElementById('stat-char-no-spaces');
    const statWord = document.getElementById('stat-word-count');
    const statLineBreaks = document.getElementById('stat-line-breaks');
    const statManuscript = document.getElementById('stat-manuscript');
    const statBytesUtf8 = document.getElementById('stat-bytes-utf8');
    const statBytesEuckr = document.getElementById('stat-bytes-euckr');
    const statReadingTime = document.getElementById('stat-reading-time');
    const spellContainer = document.getElementById('spell-results-container');
    const detectedBadge = document.getElementById('detected-count-badge');
    const btnFixAll = document.getElementById('btn-fix-all');
    const btnClear = document.getElementById('btn-clear');
    const btnCopy = document.getElementById('btn-copy');
    const btnSample = document.getElementById('btn-sample');
    const btnDownloadHtml = document.getElementById('btn-download-html');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    let currentDetections = [];

    // 토스트 알림 표시
    function showToast(message) {
      toastMsg.textContent = message;
      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 2500);
    }

    // 통계 및 맞춤법 분석 실행
    function updateAll() {
      const text = textarea.value;

      // 1. 글자 수 카운팅
      const charWithSpaces = text.length;
      const charWithoutSpaces = text.replace(/\\s/g, '').length;
      const trimmed = text.trim();
      const wordCount = trimmed ? trimmed.split(/\\s+/).length : 0;
      const lineBreaks = (text.match(/\\n/g) || []).length;

      statCharWith.textContent = charWithSpaces.toLocaleString();
      statCharNo.textContent = charWithoutSpaces.toLocaleString();
      statWord.textContent = wordCount.toLocaleString();
      statLineBreaks.textContent = lineBreaks.toLocaleString();

      // 부가 통계
      statManuscript.textContent = (charWithSpaces / 200).toFixed(1);
      
      let utf8Bytes = 0;
      try {
        utf8Bytes = new TextEncoder().encode(text).length;
      } catch (e) {
        utf8Bytes = encodeURI(text).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;
      }
      statBytesUtf8.textContent = utf8Bytes.toLocaleString();

      let euckrBytes = 0;
      for (let i = 0; i < text.length; i++) {
        euckrBytes += text.charCodeAt(i) > 127 ? 2 : 1;
      }
      statBytesEuckr.textContent = euckrBytes.toLocaleString();

      const readingMinutes = (charWithoutSpaces / 450).toFixed(1);
      statReadingTime.textContent = readingMinutes;

      // 2. 맞춤법 검사
      currentDetections = [];
      if (text.length > 0) {
        for (const rule of SPELL_RULES) {
          const regex = new RegExp(rule.pattern.source, rule.pattern.flags || 'g');
          let m;
          while ((m = regex.exec(text)) !== null) {
            const wrongText = m[0];
            if (m.index === regex.lastIndex) regex.lastIndex++;

            let specificCorrect = rule.correct;
            if (rule.id === 'an-dwae') {
              if (wrongText === '안되요') specificCorrect = '안돼요';
              else if (wrongText === '안되서') specificCorrect = '안돼서';
              else if (wrongText === '안되서요') specificCorrect = '안돼서요';
              else if (wrongText === '안되었') specificCorrect = '안됐';
              else if (wrongText === '안되었어') specificCorrect = '안됐어';
              else if (wrongText === '안되었다') specificCorrect = '안됐다';
            }

            currentDetections.push({
              ruleId: rule.id,
              wrong: wrongText,
              correct: specificCorrect,
              exp: rule.exp,
              tip: rule.tip,
              index: m.index,
              length: wrongText.length
            });
          }
        }
      }

      // 인덱스 순 정렬
      currentDetections.sort((a, b) => a.index - b.index);

      // 에디터 상단 상태 뱃지 업데이트
      if (charWithSpaces > 0) {
        statusBadge.textContent = 'Analyzing';
        statusBadge.className = 'text-[10px] px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold uppercase tracking-wider';
        charIndicator.textContent = '(' + charWithSpaces.toLocaleString() + '자)';
      } else {
        statusBadge.textContent = 'Ready';
        statusBadge.className = 'text-[10px] px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full font-bold uppercase tracking-wider';
        charIndicator.textContent = '';
      }

      // UI 렌더링
      renderSpellResults(currentDetections);
    }

    function renderSpellResults(detections) {
      if (detections.length > 0) {
        detectedBadge.textContent = detections.length + '건 감지';
        detectedBadge.className = 'text-[10px] px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full font-bold uppercase tracking-wide';
      } else if (textarea.value.trim()) {
        detectedBadge.textContent = '정상';
        detectedBadge.className = 'text-[10px] px-2 py-0.5 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full font-bold uppercase tracking-wide';
      } else {
        detectedBadge.textContent = '0건';
        detectedBadge.className = 'text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-full font-bold uppercase';
      }

      if (detections.length === 0) {
        btnFixAll.classList.add('hidden');
        btnFixAll.classList.remove('flex');
        
        if (!textarea.value.trim()) {
          spellContainer.innerHTML = '';
        } else {
          spellContainer.innerHTML = \`
            <div class="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              <span>자주 틀리는 맞춤법 오류가 발견되지 않았습니다.</span>
            </div>
          \`;
        }
        return;
      }

      btnFixAll.classList.remove('hidden');
      btnFixAll.classList.add('flex');

      let html = '';
      detections.forEach((d, idx) => {
        html += \`
          <div class="p-3 bg-slate-800 rounded-xl border border-slate-700 flex flex-col gap-1.5">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-2 py-0.5 text-xs font-bold text-rose-300 bg-rose-950/70 border border-rose-800/60 rounded line-through">\${escapeHtml(d.wrong)}</span>
                <span class="text-slate-400 text-xs">➔</span>
                <span class="px-2 py-0.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 rounded">\${escapeHtml(d.correct)}</span>
              </div>
              <button onclick="fixSingle(\${idx})" type="button" class="px-2.5 py-1 text-xs font-semibold text-indigo-200 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/50 rounded-lg transition shrink-0">
                교정
              </button>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">\${escapeHtml(d.exp)}</p>
            \${d.tip ? \`<p class="text-[11px] text-amber-300">💡 \${escapeHtml(d.tip)}</p>\` : ''}
          </div>
        \`;
      });
      spellContainer.innerHTML = html;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }

    // 개별 교정
    window.fixSingle = function(index) {
      const item = currentDetections[index];
      if (!item) return;

      const text = textarea.value;
      const before = text.substring(0, item.index);
      const after = text.substring(item.index + item.length);
      textarea.value = before + item.correct + after;
      updateAll();
      showToast(\`'\${item.wrong}'이(가) '\${item.correct}'(으)로 교정되었습니다.\`);
    };

    // 일괄 교정
    btnFixAll.addEventListener('click', () => {
      if (currentDetections.length === 0) return;
      let text = textarea.value;
      const sorted = [...currentDetections].sort((a, b) => b.index - a.index);
      for (const item of sorted) {
        const before = text.substring(0, item.index);
        const after = text.substring(item.index + item.length);
        text = before + item.correct + after;
      }
      textarea.value = text;
      updateAll();
      showToast(\`\${sorted.length}개 항목이 모두 교정되었습니다.\`);
    });

    // 이벤트 리스너: 실시간 입력 감지
    textarea.addEventListener('input', updateAll);

    // 전체 지우기
    btnClear.addEventListener('click', () => {
      if (!textarea.value) return;
      if (confirm('작성 중인 모든 텍스트를 지우시겠습니까?')) {
        textarea.value = '';
        updateAll();
        showToast('텍스트가 모두 지워졌습니다.');
        textarea.focus();
      }
    });

    // 클립보드 복사
    btnCopy.addEventListener('click', async () => {
      const text = textarea.value;
      if (!text) {
        showToast('복사할 텍스트가 없습니다.');
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        showToast('텍스트가 클립보드에 복사되었습니다.');
      } catch (e) {
        // Fallback
        textarea.select();
        document.execCommand('copy');
        showToast('텍스트가 클립보드에 복사되었습니다.');
      }
    });

    // 샘플 텍스트 로드
    btnSample.addEventListener('click', () => {
      textarea.value = SAMPLE_TEXT;
      updateAll();
      showToast('샘플 텍스트를 불러왔습니다.');
    });

    // index.html 다운로드 기능
    btnDownloadHtml.addEventListener('click', () => {
      const htmlContent = document.documentElement.outerHTML;
      const blob = new Blob(['<!DOCTYPE html>\\n' + htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('index.html 다운로드가 시작되었습니다. GitHub Pages에 바로 업로드할 수 있습니다.');
    });

    // 초기 실행
    updateAll();
  </script>
</body>
</html>`;
}
