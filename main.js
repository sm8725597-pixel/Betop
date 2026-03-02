import { createIcons, Home, Wallet, User, ArrowRight, Upload, Lock, Phone, CircleUser, MapPin, Globe, Play } from 'lucide';

// Application State
const state = {
  view: 'login', // login, register, home, deposit, profile, processing
  user: {
    name: 'مستخدم تجريبي',
    phone: '01000000000',
    country: 'مصر',
    city: 'القاهرة'
  },
  balance: 0,
  depositMethod: 'vodafone'
};

// Games Data
const games = [
  { id: 'aviator', name: 'الطيارة', icon: '✈️', color: 'from-blue-500 to-blue-700' },
  { id: 'cups', name: 'الكوبيات', icon: '🥤', color: 'from-purple-500 to-purple-700' },
  { id: 'apple', name: 'التفاحة', icon: '🍎', color: 'from-red-500 to-red-700' },
  { id: 'dice', name: 'النرد', icon: '🎲', color: 'from-green-500 to-green-700' },
  { id: 'chicken', name: 'الفرخة الجبانة', icon: '🐔', color: 'from-yellow-500 to-yellow-700' },
];

// Main Render Function
function render() {
  const app = document.getElementById('app');
  
  if (state.view === 'processing') {
    app.innerHTML = renderProcessing();
  } else if (state.view === 'login' || state.view === 'register') {
    app.innerHTML = state.view === 'login' ? renderLogin() : renderRegister();
  } else {
    app.innerHTML = `
      ${renderHeader()}
      <main class="flex-1 overflow-y-auto p-4 pb-24">
        ${getViewContent()}
      </main>
      ${renderBottomNav()}
    `;
  }
  
  attachEventListeners();
  createIcons({ icons: { Home, Wallet, User, ArrowRight, Upload, Lock, Phone, CircleUser, MapPin, Globe, Play } });
}

function getViewContent() {
  switch (state.view) {
    case 'home': return renderHome();
    case 'deposit': return renderDeposit();
    case 'profile': return renderProfile();
    default: return renderHome();
  }
}

// --- Views ---

function renderProcessing() {
  return `
    <div class="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <h1 class="text-white text-3xl font-bold">تم إنشاء الطلب بنجاح</h1>
    </div>
  `;
}

function renderLogin() {
  return `
    <div class="flex-1 flex flex-col justify-center p-6">
      <div class="text-center mb-10">
        <h1 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-winter-400 to-white mb-2">Be Top</h1>
        <p class="text-winter-400">العب واربح الآن</p>
      </div>
      <form id="login-form" class="space-y-4">
        <input type="tel" placeholder="رقم الموبايل" class="input-field" required>
        <input type="text" placeholder="الاسم" class="input-field" required>
        <input type="password" placeholder="كلمة السر" class="input-field" required>
        <div class="flex justify-end">
          <a href="#" class="text-sm text-winter-400">نسيت كلمة السر؟</a>
        </div>
        <button type="submit" class="btn-primary mt-4">تسجيل الدخول</button>
      </form>
      <div class="mt-8 text-center">
        <p class="text-gray-400">لو مش عامل حساب؟ <a href="#" id="go-register" class="text-winter-400 font-bold">أنشئ حساب</a></p>
      </div>
    </div>
  `;
}

function renderRegister() {
  return `
    <div class="flex-1 flex flex-col justify-center p-6">
      <h2 class="text-3xl font-bold mb-6 text-center">إنشاء حساب جديد</h2>
      <form id="register-form" class="space-y-4">
        <input type="text" id="reg-name" placeholder="الاسم الكامل" class="input-field" required>
        <input type="tel" id="reg-phone" placeholder="رقم الموبايل" class="input-field" required>
        <input type="text" id="reg-country" placeholder="البلد" class="input-field" required>
        <input type="text" id="reg-city" placeholder="المدينة" class="input-field" required>
        <input type="password" placeholder="كلمة السر" class="input-field" required>
        <button type="submit" class="btn-primary mt-4">إنشاء الحساب</button>
      </form>
      <div class="mt-6 text-center">
        <p class="text-gray-400">لديك حساب؟ <a href="#" id="go-login" class="text-winter-400 font-bold">تسجيل الدخول</a></p>
      </div>
    </div>
  `;
}

function renderHeader() {
  return `
    <header class="bg-winter-800 p-4 shadow-md flex justify-between items-center z-10">
      <div>
        <h1 class="text-xl font-black text-winter-400">Be Top</h1>
        <p class="text-xs text-gray-400">مرحباً، ${state.user.name}</p>
      </div>
      <div class="bg-winter-900 border border-winter-700 rounded-lg px-3 py-1 flex items-center gap-1">
        <span class="text-white font-bold">${state.balance}</span>
        <span class="text-xs text-winter-400">ج.م</span>
      </div>
    </header>
  `;
}

function renderHome() {
  const gamesHtml = games.map(game => `
    <div class="bg-gradient-to-br ${game.color} rounded-2xl p-1 cursor-pointer transform transition hover:scale-105 active:scale-95">
      <div class="bg-winter-900/60 backdrop-blur-sm w-full h-full rounded-xl p-4 flex flex-col items-center justify-center gap-2">
        <span class="text-4xl">${game.icon}</span>
        <h3 class="font-bold text-white text-sm">${game.name}</h3>
      </div>
    </div>
  `).join('');

  return `
    <div class="space-y-6">
      <div class="bg-winter-800 rounded-2xl p-4 border border-winter-700 flex justify-between items-center">
        <div>
          <h3 class="text-gray-400 text-xs mb-1">الرصيد المتاح</h3>
          <div class="text-2xl font-bold">${state.balance} <span class="text-sm text-winter-400">ج.م</span></div>
        </div>
        <button id="btn-quick-deposit" class="bg-winter-500 text-white px-4 py-2 rounded-lg font-bold text-sm">إيداع الآن</button>
      </div>
      <div>
        <h2 class="text-lg font-bold mb-3 flex items-center gap-2">الألعاب المتاحة</h2>
        <div class="grid grid-cols-2 gap-3">
          ${gamesHtml}
        </div>
      </div>
    </div>
  `;
}

function renderDeposit() {
  const isVodafone = state.depositMethod === 'vodafone';
  
  return `
    <div class="space-y-5">
      <h2 class="text-xl font-bold text-center">إيداع الأموال</h2>
      <p class="text-center text-xs text-gray-400">الحد الأدنى للسحب: 50 ج.م | الحد الأدنى للإيداع: 10 ج.م</p>
      
      <div class="flex gap-3">
        <button id="method-vodafone" class="flex-1 py-3 rounded-xl font-bold border-2 transition-all ${isVodafone ? 'border-vodafone bg-vodafone/20 text-white' : 'border-winter-700 text-gray-400'}">
          فودافون كاش
        </button>
        <button id="method-etisalat" class="flex-1 py-3 rounded-xl font-bold border-2 transition-all ${!isVodafone ? 'border-etisalat bg-etisalat/20 text-white' : 'border-winter-700 text-gray-400'}">
          اتصالات كاش
        </button>
      </div>

      <div class="bg-winter-800 rounded-2xl p-5 border border-winter-700">
        <div class="text-center mb-5">
          <p class="text-sm text-gray-400 mb-2">رقم التحويل:</p>
          <div class="text-2xl font-black tracking-widest ${isVodafone ? 'text-vodafone' : 'text-etisalat'} select-all" dir="ltr">
            ${isVodafone ? '01068743927' : '01112075371'}
          </div>
        </div>

        <form id="deposit-form" class="space-y-4">
          <input type="number" id="dep-amount" min="10" placeholder="المبلغ (ج.م)" class="input-field" required>
          <input type="tel" id="dep-phone" placeholder="رقم المحفظة المحول منها" class="input-field" required>
          
          <div>
            <label class="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-winter-600 rounded-xl cursor-pointer bg-winter-900/50">
              <span class="text-sm text-winter-400 font-bold">رفع سكرين شوت للتأكيد</span>
              <input type="file" class="hidden" accept="image/*" required />
            </label>
          </div>

          <button type="submit" class="w-full py-3 rounded-xl font-bold text-white shadow-lg ${isVodafone ? 'bg-vodafone shadow-vodafone/30' : 'bg-etisalat shadow-etisalat/30'}">
            تأكيد الإيداع
          </button>
        </form>
      </div>
    </div>
  `;
}

function renderProfile() {
  return `
    <div class="space-y-4">
      <h2 class="text-xl font-bold text-center mb-4">الملف الشخصي</h2>
      <div class="bg-winter-800 rounded-2xl p-6 border border-winter-700 text-center">
        <div class="w-20 h-20 bg-winter-700 rounded-full mx-auto mb-3 flex items-center justify-center">
          <i data-lucide="user" class="w-10 h-10 text-winter-400"></i>
        </div>
        <h3 class="text-xl font-bold text-white">${state.user.name}</h3>
      </div>
      <div class="bg-winter-800 rounded-2xl p-4 border border-winter-700 space-y-4">
        <div class="flex justify-between border-b border-winter-700 pb-2">
          <span class="text-gray-400">رقم الموبايل</span>
          <span class="font-bold" dir="ltr">${state.user.phone}</span>
        </div>
        <div class="flex justify-between border-b border-winter-700 pb-2">
          <span class="text-gray-400">البلد</span>
          <span class="font-bold">${state.user.country}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-400">المدينة</span>
          <span class="font-bold">${state.user.city}</span>
        </div>
      </div>
      <button id="btn-logout" class="w-full py-3 text-red-400 font-bold bg-red-400/10 rounded-xl mt-4">تسجيل الخروج</button>
    </div>
  `;
}

function renderBottomNav() {
  return `
    <nav class="absolute bottom-0 left-0 w-full bg-winter-800 border-t border-winter-700 h-16 z-40">
      <div class="flex justify-around items-center h-full">
        <button class="flex flex-col items-center justify-center w-full h-full ${state.view === 'home' ? 'text-winter-400' : 'text-gray-400'}" data-nav="home">
          <i data-lucide="home" class="w-6 h-6 mb-1"></i>
          <span class="text-[10px] font-bold">الرئيسية</span>
        </button>
        <button class="flex flex-col items-center justify-center w-full h-full ${state.view === 'deposit' ? 'text-winter-400' : 'text-gray-400'}" data-nav="deposit">
          <i data-lucide="wallet" class="w-6 h-6 mb-1"></i>
          <span class="text-[10px] font-bold">إيداع</span>
        </button>
        <button class="flex flex-col items-center justify-center w-full h-full ${state.view === 'profile' ? 'text-winter-400' : 'text-gray-400'}" data-nav="profile">
          <i data-lucide="user" class="w-6 h-6 mb-1"></i>
          <span class="text-[10px] font-bold">حسابي</span>
        </button>
      </div>
    </nav>
  `;
}

// --- Event Listeners ---

function attachEventListeners() {
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.view = e.currentTarget.dataset.nav;
      render();
    });
  });

  const goRegister = document.getElementById('go-register');
  if (goRegister) goRegister.addEventListener('click', (e) => { e.preventDefault(); state.view = 'register'; render(); });
  
  const goLogin = document.getElementById('go-login');
  if (goLogin) goLogin.addEventListener('click', (e) => { e.preventDefault(); state.view = 'login'; render(); });

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', (e) => { e.preventDefault(); state.view = 'home'; render(); });

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.user.name = document.getElementById('reg-name').value;
      state.user.phone = document.getElementById('reg-phone').value;
      state.user.country = document.getElementById('reg-country').value;
      state.user.city = document.getElementById('reg-city').value;
      state.view = 'home';
      render();
    });
  }

  const btnQuickDeposit = document.getElementById('btn-quick-deposit');
  if (btnQuickDeposit) btnQuickDeposit.addEventListener('click', () => { state.view = 'deposit'; render(); });

  const methodVodafone = document.getElementById('method-vodafone');
  const methodEtisalat = document.getElementById('method-etisalat');
  if (methodVodafone) methodVodafone.addEventListener('click', () => { state.depositMethod = 'vodafone'; render(); });
  if (methodEtisalat) methodEtisalat.addEventListener('click', () => { state.depositMethod = 'etisalat'; render(); });

  const depositForm = document.getElementById('deposit-form');
  if (depositForm) {
    depositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('dep-amount').value);
      if (amount < 10) {
        alert('الحد الأدنى للإيداع هو 10 جنيهاً');
        return;
      }
      
      // 21 Seconds Black Screen Logic
      state.view = 'processing';
      render();

      setTimeout(() => {
        state.balance += amount;
        state.view = 'home';
        render();
      }, 21000); // Exactly 21 seconds
    });
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) btnLogout.addEventListener('click', () => { state.view = 'login'; state.balance = 0; render(); });
}

// Initial Render
render();
