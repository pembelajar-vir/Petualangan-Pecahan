import { QUESTIONS } from '../data/questions';

export function downloadStandaloneHtml() {
  const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Petualangan Pecahan Kelas 6 - Aplikasi Pembelajaran Interaktif</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
    body { background-color: #F8FAFC; color: #1E293B; line-height: 1.5; min-height: 100vh; display: flex; flex-direction: column; }
    .container { max-width: 900px; margin: 0 auto; padding: 20px; width: 100%; }
    .card { background: #FFFFFF; border-radius: 24px; padding: 28px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.02); border: 1px solid #E2E8F0; margin-bottom: 20px; }
    .btn { display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px; border-radius: 16px; font-weight: 700; font-size: 14px; cursor: pointer; border: none; transition: all 0.2s ease; gap: 8px; text-decoration: none; }
    .btn-primary { background: #2563EB; color: #FFFFFF; box-shadow: 0 4px 14px 0 rgba(37,99,235,0.3); }
    .btn-primary:hover { background: #1D4ED8; transform: translateY(-1px); }
    .btn-success { background: #059669; color: #FFFFFF; }
    .btn-outline { background: #FFFFFF; color: #334155; border: 1.5px solid #CBD5E1; }
    .btn-outline:hover { background: #F1F5F9; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-easy { background: #ECFDF5; color: #047857; border: 1px solid #A7F3D0; }
    .badge-med { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }
    .badge-hard { background: #FFF1F2; color: #BE123C; border: 1px solid #FECDD3; }
    .progress-bar { width: 100%; height: 10px; background: #E2E8F0; border-radius: 999px; overflow: hidden; margin: 16px 0; }
    .progress-fill { height: 100%; background: #2563EB; transition: width 0.3s ease; }
    .option-btn { width: 100%; text-align: left; padding: 16px 20px; border-radius: 16px; border: 2px solid #E2E8F0; background: #FFFFFF; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
    .option-btn:hover { border-color: #3B82F6; background: #F8FAFC; }
    .option-btn.correct { background: #ECFDF5; border-color: #10B981; color: #065F46; }
    .option-btn.wrong { background: #FEF2F2; border-color: #EF4444; color: #991B1B; }
    .opt-letter { width: 32px; height: 32px; border-radius: 10px; background: #F1F5F9; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; color: #475569; }
    .correct .opt-letter { background: #10B981; color: white; }
    .wrong .opt-letter { background: #EF4444; color: white; }
    .feedback-box { border-radius: 20px; padding: 20px; margin-top: 20px; }
    .feedback-success { background: #ECFDF5; border: 1px solid #A7F3D0; color: #065F46; }
    .feedback-danger { background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; }
    .hide { display: none !important; }
    .dev-box { display: flex; align-items: center; gap: 20px; padding: 20px; background: #F8FAFC; border-radius: 20px; border: 1px solid #E2E8F0; text-align: left; }
    .dev-img { width: 105px; height: 140px; border-radius: 16px; object-fit: cover; object-position: top; border: 3px solid white; box-shadow: 0 6px 14px rgba(0,0,0,0.12); flex-shrink: 0; }
    .avatar-chip { width: 44px; height: 44px; font-size: 22px; border-radius: 14px; border: 2px solid #E2E8F0; background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .avatar-chip.active { border-color: #2563EB; background: #EFF6FF; transform: scale(1.1); box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25); }
    .student-card { background: linear-gradient(135deg, #F0FDF4 0%, #EFF6FF 100%); border: 2px solid #BFDBFE; border-radius: 24px; padding: 24px; margin-bottom: 24px; text-align: left; }
    .table-leaderboard { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
    .table-leaderboard tr { background: #F8FAFC; border-radius: 12px; }
    .table-leaderboard td { padding: 12px 14px; }
    .rank-badge { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; }
    .rank-1 { background: #FEF08A; color: #854D0E; }
    .rank-2 { background: #E2E8F0; color: #334155; }
    .rank-3 { background: #FED7AA; color: #9A3412; }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header style="background: white; border-bottom: 1px solid #E2E8F0; padding: 14px 20px;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 0;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span id="navAvatar" style="font-size: 24px;">🦊</span>
        <div>
          <h1 style="font-size: 16px; font-weight: 800; color: #0F172A;">Petualangan Pecahan Kelas 6</h1>
          <p style="font-size: 11px; color: #64748B;">Kurikulum Merdeka • SD Negeri 2 Kebondalem</p>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button onclick="toggleFullscreen()" id="btnFullscreen" class="btn btn-outline" style="padding: 8px 14px; font-size: 12px; background: #EEF2FF; border-color: #C7D2FE; color: #3730A3;">⛶ Layar Penuh</button>
        <button onclick="showScreen('screenLeaderboard')" class="btn" style="background: #FEF3C7; border: 1px solid #FCD34D; color: #78350F; padding: 8px 14px; font-size: 12px; font-weight: 700;">🏆 Peringkat</button>
        <button id="btnSoundToggle" class="btn btn-outline" style="padding: 8px 14px; font-size: 12px;">🔊 Suara</button>
      </div>
    </div>
  </header>

  <main class="container" style="flex: 1; padding-top: 30px;">
    
    <!-- SCREEN 1: HOME -->
    <div id="screenHome" class="card">
      <div style="text-align: center; max-width: 650px; margin: 0 auto; padding: 10px 0;">
        <div style="font-size: 52px; margin-bottom: 8px;">🎯</div>
        <span class="badge badge-easy" style="margin-bottom: 10px;">Matematika Kelas 6 SD • Fase C</span>
        <h2 style="font-size: 26px; font-weight: 800; color: #0F172A; margin-bottom: 8px;">
          Petualangan Mengubah Bentuk Pecahan
        </h2>
        <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">
          Kuasai 100 soal leveling pecahan biasa, pecahan campuran, hingga pecahan desimal dengan visual interaktif dan umpan balik konsep langsung!
        </p>

        <!-- STUDENT PROFILE CARD -->
        <div class="student-card">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 14px;">
            <div id="selectedAvatarPreview" style="font-size: 32px; background: white; width: 56px; height: 56px; border-radius: 18px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 2px solid #93C5FD;">🦊</div>
            <div>
              <div style="font-size: 11px; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.5px;">🌟 Profil Petualang Cilik</div>
              <div style="font-size: 15px; font-weight: 800; color: #0F172A;">Siapakah Namamu Hari Ini?</div>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 6px;">Ketik Nama Panggilan / Nama Lengkap:</label>
            <input id="inputStudentName" type="text" placeholder="Contoh: Rian, Nabila, Ahmad..." style="width: 100%; padding: 12px 16px; border-radius: 14px; border: 2px solid #CBD5E1; font-size: 15px; font-weight: 600; outline: none;" oninput="saveStudentProfile()" />
          </div>

          <div>
            <label style="display: block; font-size: 12px; font-weight: 700; color: #334155; margin-bottom: 8px;">Pilih Maskot Favoritmu:</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="avatarListContainer">
              <!-- avatars injected by JS -->
            </div>
          </div>
        </div>
        
        <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 24px;">
          <button onclick="startQuiz(1)" class="btn btn-primary" style="font-size: 15px; padding: 14px 26px;">
            🚀 Mulai Petualangan (Level 1)
          </button>
          <button onclick="showScreen('screenLeaderboard')" class="btn" style="background: #FEF3C7; border: 1px solid #FCD34D; color: #78350F; font-size: 15px; padding: 14px 22px; font-weight: 700;">
            🏆 Papan Peringkat
          </button>
          <button onclick="showScreen('screenMaterial')" class="btn btn-outline">
            📖 Ringkasan Materi
          </button>
        </div>

        <div class="dev-box">
          <div style="flex-shrink: 0; user-select: none;">
            <img src="https://i.ibb.co.com/KjLLKX1K/Chat-GPT-Image-20-Sep-2026-20-20-42.png" alt="Foto Pengembang Robiyanto, S.Pd." class="dev-img" style="pointer-events: none;" />
          </div>
          <div>
            <div style="display: inline-block; font-size: 11px; font-weight: 800; color: #1D4ED8; background: #DBEAFE; padding: 3px 8px; border-radius: 6px; margin-bottom: 5px; text-transform: uppercase;">PENGEMBANG & GURU KELAS:</div>
            <div style="font-size: 18px; font-weight: 800; color: #0F172A; margin-bottom: 4px; letter-spacing: -0.3px;">Robiyanto, S.Pd.</div>
            <div style="font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 3px;"><strong style="color: #0F172A;">NIP:</strong> 19930720 201902 1 005 • SD Negeri 2 Kebondalem</div>
            <div style="font-size: 12px; color: #2563EB; font-weight: 600;">Kabupaten Banjarnegara • robiyantospd07@guru.sd.belajar.id</div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCREEN 2: MATERIAL -->
    <div id="screenMaterial" class="card hide">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2 style="font-size: 22px; font-weight: 800;">📖 Rangkuman Rumus & Konsep Pecahan</h2>
        <button onclick="showScreen('screenHome')" class="btn btn-outline">Kembali</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px;">
        <div style="background: #F8FAFC; padding: 16px; border-radius: 16px; border: 1px solid #E2E8F0;">
          <h3 style="font-size: 15px; font-weight: 700; color: #1D4ED8; margin-bottom: 6px;">1. Campuran ke Biasa</h3>
          <p style="font-size: 13px; color: #475569; margin-bottom: 8px;">Rumus: <strong>a b/c = (a × c + b) / c</strong></p>
          <div style="font-size: 12px; background: white; padding: 8px; border-radius: 8px;">Contoh: 2 1/4 = (2×4+1)/4 = <strong>9/4</strong></div>
        </div>

        <div style="background: #F8FAFC; padding: 16px; border-radius: 16px; border: 1px solid #E2E8F0;">
          <h3 style="font-size: 15px; font-weight: 700; color: #047857; margin-bottom: 6px;">2. Biasa ke Desimal</h3>
          <p style="font-size: 13px; color: #475569; margin-bottom: 8px;">Jadikan penyebut 10, 100, atau bagi porogapit.</p>
          <div style="font-size: 12px; background: white; padding: 8px; border-radius: 8px;">Contoh: 3/4 = 75/100 = <strong>0,75</strong></div>
        </div>

        <div style="background: #F8FAFC; padding: 16px; border-radius: 16px; border: 1px solid #E2E8F0;">
          <h3 style="font-size: 15px; font-weight: 700; color: #B45309; margin-bottom: 6px;">3. Campuran ke Desimal</h3>
          <p style="font-size: 13px; color: #475569; margin-bottom: 8px;">Bulat tetap + desimal pecahan.</p>
          <div style="font-size: 12px; background: white; padding: 8px; border-radius: 8px;">Contoh: 1 1/2 = 1 + 0,5 = <strong>1,5</strong></div>
        </div>
      </div>

      <button onclick="startQuiz(1)" class="btn btn-primary" style="width: 100%;">Mulai Kerjakan Soal Sekarang</button>
    </div>

    <!-- SCREEN: LEADERBOARD -->
    <div id="screenLeaderboard" class="card hide">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 28px; background: #FEF3C7; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1px solid #FCD34D;">🏆</div>
          <div>
            <h2 style="font-size: 20px; font-weight: 800; color: #0F172A; margin: 0;">Papan Peringkat Juara</h2>
            <p style="font-size: 12px; color: #64748B; margin: 0;">Daftar Skor Terbaik Petualang Pecahan SD</p>
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button onclick="clearLeaderboard()" class="btn" style="background: #FEE2E2; border: 1px solid #FCA5A5; color: #991B1B; font-size: 12px; font-weight: 700; padding: 8px 14px;">🗑️ Kosongkan / Reset</button>
          <button onclick="showScreen('screenHome')" class="btn btn-outline">Kembali</button>
        </div>
      </div>

      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 16px; padding: 14px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span id="lbCurrentAvatar" style="font-size: 24px;">🦊</span>
          <div>
            <div style="font-size: 11px; font-weight: 700; color: #1D4ED8;">PROFIL AKTIF KAMU:</div>
            <div id="lbCurrentName" style="font-size: 14px; font-weight: 800; color: #0F172A;">Petualang Cilik</div>
          </div>
        </div>
        <button onclick="startQuiz(1)" class="btn btn-primary" style="padding: 8px 16px; font-size: 13px;">🚀 Main Sekarang</button>
      </div>

      <div style="overflow-x: auto; margin-bottom: 20px;">
        <table class="table-leaderboard">
          <thead>
            <tr style="background: #F1F5F9; font-size: 12px; font-weight: 700; color: #475569; text-align: left;">
              <td style="width: 50px; text-align: center;">Pos</td>
              <td>Nama & Maskot</td>
              <td style="text-align: center;">Level</td>
              <td style="text-align: right;">Skor</td>
              <td style="text-align: right;">Akurasi</td>
            </tr>
          </thead>
          <tbody id="leaderboardTbody">
            <!-- Populated by JS -->
          </tbody>
        </table>
      </div>

      <button onclick="showScreen('screenHome')" class="btn btn-outline" style="width: 100%;">Kembali ke Beranda</button>
    </div>

    <!-- SCREEN 3: QUIZ -->
    <div id="screenQuiz" class="card hide">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 6px; padding: 4px 10px; background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 10px; font-size: 12px; font-weight: 700; color: #3730A3;">
            <span id="quizPlayerAvatar">🦊</span>
            <span id="quizPlayerName">Petualang</span>
          </div>
          <span id="quizBadge" class="badge badge-easy">Level 1 • Mudah</span>
        </div>
        <div style="font-size: 14px; font-weight: 700;">Skor: <span id="quizScore" style="color: #2563EB;">0</span></div>
      </div>

      <div class="progress-bar">
        <div id="quizProgress" class="progress-fill" style="width: 10%;"></div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748B; margin-bottom: 12px;">
        <span id="quizCounter">Soal 1 dari 10</span>
        <span id="quizStreak">Streak: 0 🔥</span>
      </div>

      <h2 id="quizQuestionText" style="font-size: 18px; font-weight: 800; color: #0F172A; margin-bottom: 20px;">
        Pertanyaan kuis
      </h2>

      <div id="quizOptionsContainer"></div>

      <!-- Feedback Area -->
      <div id="quizFeedback" class="feedback-box hide">
        <div id="feedbackTitle" style="font-weight: 800; font-size: 16px; margin-bottom: 4px;"></div>
        <div id="feedbackText" style="font-size: 13px; line-height: 1.5; margin-bottom: 14px;"></div>
        <button id="btnNextQuestion" class="btn btn-primary" onclick="nextQuestion()">Lanjut Soal Berikutnya ➔</button>
      </div>
    </div>

    <!-- SCREEN 4: RESULT -->
    <div id="screenResult" class="card hide" style="text-align: center; padding: 40px 24px;">
      <div id="resultEmoji" style="font-size: 64px; margin-bottom: 10px;">🏆</div>
      <h2 id="resultTitle" style="font-size: 24px; font-weight: 800; color: #0F172A;">Level Selesai!</h2>
      <p id="resultSubtitle" style="color: #64748B; font-size: 14px; margin-bottom: 20px;">Kamu telah menyelesaikan babak ini.</p>

      <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 28px;">
        <div style="background: #F8FAFC; padding: 14px 24px; border-radius: 16px; border: 1px solid #E2E8F0;">
          <div style="font-size: 12px; color: #64748B;">Nilai Akhir</div>
          <div id="resultScore" style="font-size: 28px; font-weight: 800; color: #2563EB;">100</div>
        </div>
        <div style="background: #F8FAFC; padding: 14px 24px; border-radius: 16px; border: 1px solid #E2E8F0;">
          <div style="font-size: 12px; color: #64748B;">Akurasi</div>
          <div id="resultAccuracy" style="font-size: 28px; font-weight: 800; color: #059669;">100%</div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
        <button onclick="showScreen('screenLeaderboard')" class="btn" style="background: #FEF3C7; border: 1px solid #FCD34D; color: #78350F; font-weight: 700;">🏆 Papan Peringkat</button>
        <button onclick="startQuiz(currentLevel)" class="btn btn-outline">Ulangi Level Ini</button>
        <button id="btnNextLevel" onclick="startNextLevel()" class="btn btn-primary">Lanjut Level Berikutnya ➔</button>
        <button onclick="showScreen('screenHome')" class="btn btn-outline">Kembali ke Beranda</button>
      </div>
    </div>

  </main>

  <script>
    const QUESTIONS_DATA = ${JSON.stringify(QUESTIONS)};

    let currentLevel = 1;
    let currentQuestions = [];
    let currentQIndex = 0;
    let score = 0;
    let correctCount = 0;
    let streak = 0;
    let isSoundOn = true;
    let answered = false;

    // Student Profile State
    const AVATARS = ['🦊', '🦉', '🦁', '🐼', '🚀', '🐬', '🦄', '🐯'];
    let studentName = localStorage.getItem('math_student_name') || '';
    let studentAvatar = localStorage.getItem('math_student_avatar') || '🦊';

    // Default Leaderboard
    const DEFAULT_LEADERBOARD = [
      { name: 'Ahmad Fauzi', avatar: '🦊', score: 180, accuracy: 100, level: 'Master (1-10)' },
      { name: 'Nabila Putri', avatar: '🦉', score: 165, accuracy: 95, level: 'Level 10' },
      { name: 'Rian Hidayat', avatar: '🦁', score: 150, accuracy: 90, level: 'Level 8' },
      { name: 'Siti Rahmawati', avatar: '🐼', score: 140, accuracy: 88, level: 'Level 7' },
      { name: 'Budi Santoso', avatar: '🚀', score: 125, accuracy: 85, level: 'Level 6' },
      { name: 'Dewi Lestari', avatar: '🐬', score: 110, accuracy: 80, level: 'Level 5' },
    ];

    function getLeaderboardData() {
      const saved = localStorage.getItem('math_leaderboard_data');
      if (saved !== null) {
        try {
          const parsed = JSON.parse(saved);
          return Array.isArray(parsed) ? parsed : [];
        } catch(e) {
          return [];
        }
      }
      return DEFAULT_LEADERBOARD;
    }

    function clearLeaderboard() {
      if (confirm('Apakah kamu ingin MENGHAPUS & BERSIHKAN semua data peringkat?\\n\\nPapan peringkat akan bersih dari awal sehingga siswa dapat mencatatkan rekor baru.')) {
        localStorage.setItem('math_leaderboard_data', JSON.stringify([]));
        renderLeaderboard();
      }
    }

    function restoreDemoLeaderboard() {
      localStorage.setItem('math_leaderboard_data', JSON.stringify(DEFAULT_LEADERBOARD));
      renderLeaderboard();
    }

    function renderLeaderboard() {
      const data = getLeaderboardData();
      const tbody = document.getElementById('leaderboardTbody');
      tbody.innerHTML = '';

      document.getElementById('lbCurrentAvatar').textContent = studentAvatar;
      document.getElementById('lbCurrentName').textContent = studentName || 'Petualang Cilik';

      if (data.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="5" style="text-align: center; padding: 36px 16px; background: #F8FAFC; border-radius: 16px;">
              <div style="font-size: 36px; margin-bottom: 8px;">🏆</div>
              <div style="font-weight: 800; font-size: 15px; color: #0F172A; margin-bottom: 4px;">Papan Peringkat Bersih</div>
              <div style="font-size: 12px; color: #64748B; margin-bottom: 14px;">Seluruh peringkat telah dikosongkan agar mulai dari awal lagi. Ayo selesaikan kuis untuk menjadi Juara 1!</div>
              <button onclick="startQuiz(1)" class="btn btn-primary" style="padding: 8px 18px; font-size: 13px;">🚀 Mulai Main Kuis</button>
              <button onclick="restoreDemoLeaderboard()" class="btn btn-outline" style="padding: 8px 14px; font-size: 12px; margin-left: 8px;">Muat Data Contoh</button>
            </td>
          </tr>
        \`;
        return;
      }

      data.forEach((entry, idx) => {
        const tr = document.createElement('tr');
        const isUser = entry.isCurrentUser || entry.name === studentName;
        if (isUser) {
          tr.style.background = '#EFF6FF';
          tr.style.border = '2px solid #3B82F6';
        }

        const rankClass = idx === 0 ? 'rank-badge rank-1' : idx === 1 ? 'rank-badge rank-2' : idx === 2 ? 'rank-badge rank-3' : 'rank-badge';
        const rankText = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : (idx + 1);

        tr.innerHTML = \`
          <td style="text-align: center;"><div class="\${rankClass}" style="margin: 0 auto;">\${rankText}</div></td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">\${entry.avatar || '🦊'}</span>
              <div>
                <div style="font-weight: 800; color: #0F172A; font-size: 14px;">
                  \${entry.name} \${isUser ? '<span style="font-size: 10px; background: #2563EB; color: white; padding: 2px 6px; border-radius: 6px; margin-left: 4px;">KAMU</span>' : ''}
                </div>
              </div>
            </div>
          </td>
          <td style="text-align: center; font-size: 12px; color: #64748B; font-weight: 600;">\${entry.level || 'Level 1'}</td>
          <td style="text-align: right; font-weight: 800; color: #2563EB; font-size: 15px;">\${entry.score}</td>
          <td style="text-align: right; font-weight: 700; color: #059669; font-size: 13px;">\${entry.accuracy || 100}%</td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function initProfileUI() {
      const nameInput = document.getElementById('inputStudentName');
      if (nameInput) nameInput.value = studentName;
      document.getElementById('navAvatar').textContent = studentAvatar;
      document.getElementById('selectedAvatarPreview').textContent = studentAvatar;

      const container = document.getElementById('avatarListContainer');
      container.innerHTML = '';
      AVATARS.forEach(av => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'avatar-chip' + (av === studentAvatar ? ' active' : '');
        btn.textContent = av;
        btn.onclick = () => {
          studentAvatar = av;
          localStorage.setItem('math_student_avatar', av);
          document.getElementById('selectedAvatarPreview').textContent = av;
          document.getElementById('navAvatar').textContent = av;
          document.querySelectorAll('.avatar-chip').forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          playSound('correct');
        };
        container.appendChild(btn);
      });
    }

    function saveStudentProfile() {
      const input = document.getElementById('inputStudentName');
      studentName = input.value.trim();
      localStorage.setItem('math_student_name', studentName);
    }

    // Web Audio Synthesizer
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playSound(type) {
      if (!isSoundOn) return;
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'correct') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        } else if (type === 'wrong') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(300, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2);
          gain.gain.setValueAtTime(0.2, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        }
      } catch(e) {}
    }

    document.getElementById('btnSoundToggle').addEventListener('click', function() {
      isSoundOn = !isSoundOn;
      this.textContent = isSoundOn ? '🔊 Suara: Nyala' : '🔇 Suara: Mati';
    });

    function showScreen(screenId) {
      ['screenHome', 'screenMaterial', 'screenLeaderboard', 'screenQuiz', 'screenResult'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hide');
      });
      const target = document.getElementById(screenId);
      if (target) target.classList.remove('hide');

      if (screenId === 'screenLeaderboard') {
        renderLeaderboard();
      }
    }

    function startQuiz(lvl) {
      currentLevel = lvl;
      currentQuestions = QUESTIONS_DATA.filter(q => q.level === lvl);
      currentQIndex = 0;
      score = 0;
      correctCount = 0;
      streak = 0;
      
      document.getElementById('quizPlayerAvatar').textContent = studentAvatar;
      document.getElementById('quizPlayerName').textContent = studentName || 'Petualang Cilik';

      showScreen('screenQuiz');
      renderQuestion();
    }

    function renderQuestion() {
      answered = false;
      const q = currentQuestions[currentQIndex];
      document.getElementById('quizBadge').textContent = 'Level ' + q.level + ' • ' + q.tier;
      document.getElementById('quizBadge').className = 'badge ' + (q.tier === 'Mudah' ? 'badge-easy' : q.tier === 'Sedang' ? 'badge-med' : 'badge-hard');
      document.getElementById('quizScore').textContent = score;
      document.getElementById('quizCounter').textContent = 'Soal ' + (currentQIndex + 1) + ' dari ' + currentQuestions.length;
      document.getElementById('quizProgress').style.width = (((currentQIndex + 1) / currentQuestions.length) * 100) + '%';
      document.getElementById('quizStreak').textContent = 'Streak: ' + streak + ' 🔥';
      document.getElementById('quizQuestionText').textContent = q.question;

      const container = document.getElementById('quizOptionsContainer');
      container.innerHTML = '';
      document.getElementById('quizFeedback').classList.add('hide');

      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = '<span class="opt-letter">' + letters[idx] + '</span> <span>' + opt + '</span>';
        btn.onclick = () => selectOption(idx);
        container.appendChild(btn);
      });
    }

    function selectOption(idx) {
      if (answered) return;
      answered = true;
      const q = currentQuestions[currentQIndex];
      const buttons = document.getElementById('quizOptionsContainer').children;
      const feedback = document.getElementById('quizFeedback');
      const isCorrect = idx === q.answerIndex;

      if (isCorrect) {
        buttons[idx].classList.add('correct');
        score += 10 + (streak * 2);
        correctCount++;
        streak++;
        playSound('correct');
        feedback.className = 'feedback-box feedback-success';
        document.getElementById('feedbackTitle').textContent = '🎉 Hebat Sekali, Jawabanmu Benar!';
      } else {
        buttons[idx].classList.add('wrong');
        buttons[q.answerIndex].classList.add('correct');
        streak = 0;
        playSound('wrong');
        feedback.className = 'feedback-box feedback-danger';
        document.getElementById('feedbackTitle').textContent = '💡 Belum Tepat, Yuk Pelajari!';
      }

      document.getElementById('feedbackText').textContent = q.explanation;
      feedback.classList.remove('hide');
    }

    function nextQuestion() {
      currentQIndex++;
      if (currentQIndex < currentQuestions.length) {
        renderQuestion();
      } else {
        finishLevel();
      }
    }

    function finishLevel() {
      showScreen('screenResult');
      const total = currentQuestions.length;
      const finalScore = Math.round((correctCount / total) * 100);
      document.getElementById('resultScore').textContent = finalScore;
      document.getElementById('resultAccuracy').textContent = Math.round((correctCount / total) * 100) + '%';
      
      const greetingName = studentName ? studentName + ', ' : '';
      document.getElementById('resultTitle').textContent = studentAvatar + ' Hebat Sekali, ' + greetingName + 'Kamu Selesai!';

      // Record in Leaderboard
      try {
        const cleanName = studentName || 'Petualang Cilik';
        let currentBoard = getLeaderboardData();
        const existingIdx = currentBoard.findIndex(e => e.isCurrentUser || e.name === cleanName);
        const newEntry = {
          name: cleanName,
          avatar: studentAvatar,
          score: score,
          accuracy: finalScore,
          level: 'Level ' + currentLevel,
          isCurrentUser: true,
        };
        if (existingIdx >= 0) {
          currentBoard[existingIdx].score = Math.max(score, currentBoard[existingIdx].score);
          currentBoard[existingIdx].accuracy = finalScore;
          currentBoard[existingIdx].avatar = studentAvatar;
          currentBoard[existingIdx].isCurrentUser = true;
        } else {
          currentBoard.push(newEntry);
        }
        currentBoard.sort((a, b) => b.score - a.score);
        localStorage.setItem('math_leaderboard_data', JSON.stringify(currentBoard));
      } catch(e) {}

      const btnNext = document.getElementById('btnNextLevel');
      if (currentLevel < 10) {
        btnNext.style.display = 'inline-flex';
      } else {
        btnNext.style.display = 'none';
      }
    }

    function startNextLevel() {
      if (currentLevel < 10) {
        startQuiz(currentLevel + 1);
      }
    }

    function toggleFullscreen() {
      const doc = document;
      const el = document.documentElement;
      const isFs = Boolean(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement);
      if (isFs) {
        if (doc.exitFullscreen) doc.exitFullscreen();
        else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
        else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
      } else {
        if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      }
    }

    function autoFullscreen() {
      const el = document.documentElement;
      const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
      if (!isFs) {
        if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
        else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
      }
    }

    // Auto fullscreen on load
    window.addEventListener('load', () => {
      autoFullscreen();
    });

    // Auto fullscreen on first user touch or click
    function onUserGestureFs() {
      autoFullscreen();
      window.removeEventListener('pointerdown', onUserGestureFs);
      window.removeEventListener('touchstart', onUserGestureFs);
      window.removeEventListener('click', onUserGestureFs);
    }
    window.addEventListener('pointerdown', onUserGestureFs, { once: true, passive: true });
    window.addEventListener('touchstart', onUserGestureFs, { once: true, passive: true });
    window.addEventListener('click', onUserGestureFs, { once: true, passive: true });

    document.addEventListener('fullscreenchange', () => {
      const btn = document.getElementById('btnFullscreen');
      if (btn) {
        const isFs = Boolean(document.fullscreenElement);
        btn.textContent = isFs ? '🗗 Layar Normal' : '⛶ Layar Penuh';
      }
    });

    // Initialize on load
    initProfileUI();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Petualangan_Pecahan_Kelas_6.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
