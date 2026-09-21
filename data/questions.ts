export interface Question {
  id: number;
  level: number; // 1 to 10
  tier: 'Mudah' | 'Sedang' | 'Menantang';
  category: string;
  question: string;
  displayMath?: {
    type: 'fraction' | 'mixed' | 'decimal';
    whole?: number;
    numerator?: number;
    denominator?: number;
    decimal?: string;
  };
  options: string[];
  answerIndex: number; // 0, 1, 2, or 3
  explanation: string;
  hint: string;
}

export const QUESTIONS: Question[] = [
  // ==========================================
  // LEVEL 1: MUDAH (Soal 1 - 10)
  // Topik: Pecahan Biasa ke Desimal (Penyebut 10 & 100)
  // ==========================================
  {
    id: 1,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 3/10 adalah...',
    displayMath: { type: 'fraction', numerator: 3, denominator: 10 },
    options: ['0,03', '0,3', '3,0', '0,33'],
    answerIndex: 1,
    explanation: 'Karena penyebutnya 10, maka ada 1 angka di belakang tanda koma. Jadi, 3/10 = 0,3.',
    hint: 'Penyebut 10 artinya memiliki 1 angka di belakang koma (persepuluhan).'
  },
  {
    id: 2,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 7/10 adalah...',
    displayMath: { type: 'fraction', numerator: 7, denominator: 10 },
    options: ['0,7', '0,07', '7,0', '0,77'],
    answerIndex: 0,
    explanation: 'Penyebut 10 memiliki satu tempat desimal di belakang koma. Maka 7/10 = 0,7.',
    hint: 'Ingat konsep persepuluhan: 7 dibagi 10 sama dengan 0,7.'
  },
  {
    id: 3,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 9/10 adalah...',
    displayMath: { type: 'fraction', numerator: 9, denominator: 10 },
    options: ['0,09', '0,19', '0,9', '9,10'],
    answerIndex: 2,
    explanation: '9 dibagi 10 menghasilkan 0,9. Satu nol pada penyebut 10 menandakan 1 angka desimal.',
    hint: 'Satu angka 9 diletakkan tepat setelah tanda koma.'
  },
  {
    id: 4,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 1/10 adalah...',
    displayMath: { type: 'fraction', numerator: 1, denominator: 10 },
    options: ['0,1', '0,01', '1,0', '0,11'],
    answerIndex: 0,
    explanation: '1/10 dibaca satu persepuluh, ditulis dalam bentuk desimal sebagai 0,1.',
    hint: '1 persepuluh = 0,1.'
  },
  {
    id: 5,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 17/100 adalah...',
    displayMath: { type: 'fraction', numerator: 17, denominator: 100 },
    options: ['1,7', '0,017', '0,17', '17,0'],
    answerIndex: 2,
    explanation: 'Penyebut 100 artinya perseratusan (ada 2 angka di belakang koma). Jadi 17/100 = 0,17.',
    hint: 'Penyebut 100 menandakan dua digit di belakang tanda koma.'
  },
  {
    id: 6,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 45/100 adalah...',
    displayMath: { type: 'fraction', numerator: 45, denominator: 100 },
    options: ['4,5', '0,45', '0,045', '45,0'],
    answerIndex: 1,
    explanation: '45 dibagi 100 menghasilkan 0,45 (dua angka di belakang koma).',
    hint: 'Tulis angka 45 dengan dua desimal: 0,45.'
  },
  {
    id: 7,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 8/100 adalah...',
    displayMath: { type: 'fraction', numerator: 8, denominator: 100 },
    options: ['0,8', '0,08', '0,008', '8,0'],
    answerIndex: 1,
    explanation: 'Karena perseratusan butuh 2 digit di belakang koma, kita tambahkan angka 0 di depan 8. Jadi 8/100 = 0,08.',
    hint: 'Hati-hati! 0,8 adalah 8/10. Untuk 8/100 harus ada dua angka di belakang koma: 0,08.'
  },
  {
    id: 8,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 63/100 adalah...',
    displayMath: { type: 'fraction', numerator: 63, denominator: 100 },
    options: ['6,3', '0,063', '0,63', '63,0'],
    answerIndex: 2,
    explanation: 'Penyebut 100 memiliki 2 digit desimal. Jadi 63/100 = 0,63.',
    hint: '63 perseratus ditulis 0,63.'
  },
  {
    id: 9,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 5/100 adalah...',
    displayMath: { type: 'fraction', numerator: 5, denominator: 100 },
    options: ['0,5', '0,05', '0,005', '5,0'],
    answerIndex: 1,
    explanation: '5/100 ditulis dengan 2 angka di belakang koma menjadi 0,05. (Ingat: 0,5 adalah 5/10).',
    hint: 'Butuh 2 angka di belakang koma: 0,05.'
  },
  {
    id: 10,
    level: 1,
    tier: 'Mudah',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari pecahan 99/100 adalah...',
    displayMath: { type: 'fraction', numerator: 99, denominator: 100 },
    options: ['9,9', '0,99', '0,099', '99,0'],
    answerIndex: 1,
    explanation: '99 dibagi 100 bernilai 0,99.',
    hint: 'Sembilan puluh sembilan perseratus = 0,99.'
  },

  // ==========================================
  // LEVEL 2: MUDAH (Soal 11 - 20)
  // Topik: Desimal ke Pecahan Biasa Sederhana (1 Angka di Belakang Koma)
  // ==========================================
  {
    id: 11,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,5 adalah...',
    displayMath: { type: 'decimal', decimal: '0,5' },
    options: ['1/2', '1/5', '5/10', '2/5'],
    answerIndex: 0,
    explanation: '0,5 = 5/10. Bagi pembilang dan penyebut dengan 5 (FPB = 5): 5 ÷ 5 / 10 ÷ 5 = 1/2.',
    hint: '0,5 = 5/10, lalu sederhanakan dengan membagi 5.'
  },
  {
    id: 12,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,2 adalah...',
    displayMath: { type: 'decimal', decimal: '0,2' },
    options: ['1/5', '2/5', '1/2', '2/10'],
    answerIndex: 0,
    explanation: '0,2 = 2/10. Sederhanakan dengan membagi pembilang dan penyebut dengan 2: 2 ÷ 2 / 10 ÷ 2 = 1/5.',
    hint: '2/10 disederhanakan dengan membagi 2 di atas dan bawah.'
  },
  {
    id: 13,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,4 adalah...',
    displayMath: { type: 'decimal', decimal: '0,4' },
    options: ['1/4', '2/5', '4/10', '3/5'],
    answerIndex: 1,
    explanation: '0,4 = 4/10. Sederhanakan dengan membagi 2: 4 ÷ 2 / 10 ÷ 2 = 2/5.',
    hint: 'Bagi 4 dan 10 dengan 2.'
  },
  {
    id: 14,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,6 adalah...',
    displayMath: { type: 'decimal', decimal: '0,6' },
    options: ['3/5', '6/10', '2/3', '3/10'],
    answerIndex: 0,
    explanation: '0,6 = 6/10. Sederhanakan dengan membagi 2: 6 ÷ 2 / 10 ÷ 2 = 3/5.',
    hint: '6/10 sama-sama dibagi 2.'
  },
  {
    id: 15,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,8 adalah...',
    displayMath: { type: 'decimal', decimal: '0,8' },
    options: ['4/5', '8/10', '3/4', '4/10'],
    answerIndex: 0,
    explanation: '0,8 = 8/10. Sederhanakan dengan membagi 2: 8 ÷ 2 / 10 ÷ 2 = 4/5.',
    hint: '8/10 dibagi 2 menjadi 4/5.'
  },
  {
    id: 16,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa dari 0,3 adalah...',
    displayMath: { type: 'decimal', decimal: '0,3' },
    options: ['3/100', '1/3', '3/10', '3/5'],
    answerIndex: 2,
    explanation: 'Satu angka di belakang koma bernilai persepuluhan, sehingga 0,3 = 3/10 (sudah paling sederhana).',
    hint: 'Ada 1 angka di belakang koma, jadi penyebutnya adalah 10.'
  },
  {
    id: 17,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa dari 0,7 adalah...',
    displayMath: { type: 'decimal', decimal: '0,7' },
    options: ['7/10', '7/100', '1/7', '70/10'],
    answerIndex: 0,
    explanation: '0,7 memiliki satu angka di belakang koma, sehingga bernilai 7/10.',
    hint: 'Tulis 7 sebagai pembilang dan 10 sebagai penyebut.'
  },
  {
    id: 18,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa dari 0,9 adalah...',
    displayMath: { type: 'decimal', decimal: '0,9' },
    options: ['9/100', '9/10', '1/9', '9/5'],
    answerIndex: 1,
    explanation: '0,9 sama dengan sembilan persepuluh (9/10).',
    hint: 'Penyebutnya adalah 10.'
  },
  {
    id: 19,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa dari 0,1 adalah...',
    displayMath: { type: 'decimal', decimal: '0,1' },
    options: ['1/10', '1/100', '1/5', '1/2'],
    answerIndex: 0,
    explanation: '0,1 berarti satu persepuluh, yaitu 1/10.',
    hint: '1 angka di belakang koma = per 10.'
  },
  {
    id: 20,
    level: 2,
    tier: 'Mudah',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Pilihlah pasangan bilangan desimal dan pecahan biasa yang BENAR:',
    options: ['0,5 = 1/5', '0,2 = 1/5', '0,4 = 1/4', '0,8 = 3/5'],
    answerIndex: 1,
    explanation: '0,2 = 2/10 = 1/5 (Benar). Sedangkan 0,5 = 1/2; 0,4 = 2/5; 0,8 = 4/5.',
    hint: 'Periksa 0,2 = 2/10, sederhanakan dengan membagi 2.'
  },

  // ==========================================
  // LEVEL 3: MUDAH (Soal 21 - 30)
  // Topik: Pecahan Campuran Dasar ke Pecahan Biasa
  // Rumus: a b/c = (a * c + b) / c
  // ==========================================
  {
    id: 21,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 1 1/2 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 1, denominator: 2 },
    options: ['2/2', '3/2', '1/2', '4/2'],
    answerIndex: 1,
    explanation: 'Gunakan rumus (bilangan bulat × penyebut + pembilang) / penyebut: (1 × 2 + 1) / 2 = 3/2.',
    hint: 'Kalikan 1 dengan 2, lalu tambahkan 1. Penyebut tetap 2.'
  },
  {
    id: 22,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 2 1/3 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 1, denominator: 3 },
    options: ['5/3', '6/3', '7/3', '8/3'],
    answerIndex: 2,
    explanation: '(2 × 3 + 1) / 3 = (6 + 1) / 3 = 7/3.',
    hint: 'Kalikan 2 × 3 = 6, tambah 1 = 7. Penyebutnya 3.'
  },
  {
    id: 23,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 1 3/4 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 3, denominator: 4 },
    options: ['7/4', '5/4', '4/7', '6/4'],
    answerIndex: 0,
    explanation: '(1 × 4 + 3) / 4 = (4 + 3) / 4 = 7/4.',
    hint: '1 × 4 = 4. Tambah pembilang 3 menjadi 7. Maka 7/4.'
  },
  {
    id: 24,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 3 1/2 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 3, numerator: 1, denominator: 2 },
    options: ['6/2', '7/2', '5/2', '8/2'],
    answerIndex: 1,
    explanation: '(3 × 2 + 1) / 2 = (6 + 1) / 2 = 7/2.',
    hint: '3 dikali 2 sama dengan 6, ditambah 1 jadi 7. Hasilnya 7/2.'
  },
  {
    id: 25,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 2 2/5 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 2, denominator: 5 },
    options: ['12/5', '10/5', '9/5', '14/5'],
    answerIndex: 0,
    explanation: '(2 × 5 + 2) / 5 = (10 + 2) / 5 = 12/5.',
    hint: '2 × 5 = 10. Tambah 2 = 12. Jadi 12/5.'
  },
  {
    id: 26,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 4 1/4 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 4, numerator: 1, denominator: 4 },
    options: ['16/4', '17/4', '15/4', '18/4'],
    answerIndex: 1,
    explanation: '(4 × 4 + 1) / 4 = (16 + 1) / 4 = 17/4.',
    hint: '4 × 4 = 16. Tambah 1 = 17. Penyebut tetap 4.'
  },
  {
    id: 27,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 1 2/3 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 2, denominator: 3 },
    options: ['4/3', '5/3', '6/3', '3/5'],
    answerIndex: 1,
    explanation: '(1 × 3 + 2) / 3 = (3 + 2) / 3 = 5/3.',
    hint: '1 × 3 = 3. Ditambah 2 = 5.'
  },
  {
    id: 28,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 3 3/5 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 3, numerator: 3, denominator: 5 },
    options: ['15/5', '18/5', '12/5', '16/5'],
    answerIndex: 1,
    explanation: '(3 × 5 + 3) / 5 = (15 + 3) / 5 = 18/5.',
    hint: '3 × 5 = 15. Tambahkan 3 = 18.'
  },
  {
    id: 29,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 2 3/4 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 3, denominator: 4 },
    options: ['9/4', '10/4', '11/4', '12/4'],
    answerIndex: 2,
    explanation: '(2 × 4 + 3) / 4 = (8 + 3) / 4 = 11/4.',
    hint: '2 × 4 = 8. Ditambah 3 = 11. Hasilnya 11/4.'
  },
  {
    id: 30,
    level: 3,
    tier: 'Mudah',
    category: 'Pecahan Campuran ke Biasa',
    question: 'Pecahan campuran 5 1/2 jika diubah ke pecahan biasa adalah...',
    displayMath: { type: 'mixed', whole: 5, numerator: 1, denominator: 2 },
    options: ['10/2', '11/2', '9/2', '12/2'],
    answerIndex: 1,
    explanation: '(5 × 2 + 1) / 2 = (10 + 1) / 2 = 11/2.',
    hint: '5 × 2 = 10. Tambah 1 = 11.'
  },

  // ==========================================
  // LEVEL 4: SEDANG (Soal 31 - 40)
  // Topik: Pecahan Biasa (Tidak Murni) ke Pecahan Campuran
  // Pembilang dibagi penyebut: Hasil bagi adalah bilangan bulat, sisa jadi pembilang baru
  // ==========================================
  {
    id: 31,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 5/2 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 5, denominator: 2 },
    options: ['2 1/2', '1 3/2', '2 1/5', '3 1/2'],
    answerIndex: 0,
    explanation: '5 dibagi 2 adalah 2 bersisa 1. Jadi, 5/2 = 2 1/2.',
    hint: 'Berapa 5 dibagi 2? Hasil bulatnya 2, sisanya 1.'
  },
  {
    id: 32,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 7/3 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 7, denominator: 3 },
    options: ['2 1/3', '1 4/3', '3 1/3', '2 2/3'],
    answerIndex: 0,
    explanation: '7 dibagi 3 sama dengan 2 dengan sisa 1 (karena 2 × 3 = 6, 7 - 6 = 1). Maka 7/3 = 2 1/3.',
    hint: '3 × 2 = 6, sisa 1 menuju 7.'
  },
  {
    id: 33,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 9/4 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 9, denominator: 4 },
    options: ['1 5/4', '2 1/4', '2 3/4', '3 1/4'],
    answerIndex: 1,
    explanation: '9 ÷ 4 = 2 sisa 1 (2 × 4 = 8, 9 - 8 = 1). Maka 9/4 = 2 1/4.',
    hint: '4 muat 2 kali pada 9, tersisa 1.'
  },
  {
    id: 34,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 11/5 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 11, denominator: 5 },
    options: ['2 1/5', '2 2/5', '1 6/5', '3 1/5'],
    answerIndex: 0,
    explanation: '11 ÷ 5 = 2 sisa 1 (2 × 5 = 10, 11 - 10 = 1). Jadi 11/5 = 2 1/5.',
    hint: '5 × 2 = 10, masih sisa 1.'
  },
  {
    id: 35,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 8/3 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 8, denominator: 3 },
    options: ['2 1/3', '2 2/3', '3 1/3', '1 5/3'],
    answerIndex: 1,
    explanation: '8 ÷ 3 = 2 sisa 2 (karena 2 × 3 = 6, 8 - 6 = 2). Maka 8/3 = 2 2/3.',
    hint: '3 × 2 = 6, sisa 2 untuk menjadi 8.'
  },
  {
    id: 36,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 13/4 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 13, denominator: 4 },
    options: ['3 1/4', '3 2/4', '2 5/4', '4 1/4'],
    answerIndex: 0,
    explanation: '13 ÷ 4 = 3 sisa 1 (karena 3 × 4 = 12, 13 - 12 = 1). Maka 13/4 = 3 1/4.',
    hint: '4 × 3 = 12, selisihnya dengan 13 adalah 1.'
  },
  {
    id: 37,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 14/5 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 14, denominator: 5 },
    options: ['2 4/5', '3 1/5', '2 3/5', '1 9/5'],
    answerIndex: 0,
    explanation: '14 ÷ 5 = 2 sisa 4 (karena 2 × 5 = 10, 14 - 10 = 4). Maka 14/5 = 2 4/5.',
    hint: '5 × 2 = 10, sisa 4.'
  },
  {
    id: 38,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 15/2 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 15, denominator: 2 },
    options: ['6 1/2', '7 1/2', '8 1/2', '7 2/2'],
    answerIndex: 1,
    explanation: '15 ÷ 2 = 7 sisa 1 (karena 7 × 2 = 14, 15 - 14 = 1). Jadi 15/2 = 7 1/2.',
    hint: '2 × 7 = 14, sisa 1.'
  },
  {
    id: 39,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 17/6 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 17, denominator: 6 },
    options: ['2 5/6', '3 1/6', '2 3/6', '2 1/6'],
    answerIndex: 0,
    explanation: '17 ÷ 6 = 2 sisa 5 (karena 2 × 6 = 12, 17 - 12 = 5). Maka 17/6 = 2 5/6.',
    hint: '6 × 2 = 12, sisa 5 untuk mencapai 17.'
  },
  {
    id: 40,
    level: 4,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Campuran',
    question: 'Pecahan biasa 23/5 jika diubah ke pecahan campuran adalah...',
    displayMath: { type: 'fraction', numerator: 23, denominator: 5 },
    options: ['4 3/5', '4 2/5', '5 1/5', '3 8/5'],
    answerIndex: 0,
    explanation: '23 ÷ 5 = 4 sisa 3 (karena 4 × 5 = 20, 23 - 20 = 3). Maka 23/5 = 4 3/5.',
    hint: '5 × 4 = 20, sisa 3.'
  },

  // ==========================================
  // LEVEL 5: SEDANG (Soal 41 - 50)
  // Topik: Pecahan Biasa ke Desimal (Penyebut 2, 4, 5, 20, 25, 50)
  // Jadikan penyebut 10, 100, atau bagi langsung
  // ==========================================
  {
    id: 41,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 1/2 adalah...',
    displayMath: { type: 'fraction', numerator: 1, denominator: 2 },
    options: ['0,2', '0,5', '0,12', '1,2'],
    answerIndex: 1,
    explanation: 'Ubah penyebut menjadi 10: 1/2 = (1 × 5) / (2 × 5) = 5/10 = 0,5.',
    hint: 'Kalikan atas dan bawah dengan 5 agar penyebutnya jadi 10.'
  },
  {
    id: 42,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 1/4 adalah...',
    displayMath: { type: 'fraction', numerator: 1, denominator: 4 },
    options: ['0,4', '0,14', '0,25', '0,75'],
    answerIndex: 2,
    explanation: 'Ubah penyebut menjadi 100: 1/4 = (1 × 25) / (4 × 25) = 25/100 = 0,25.',
    hint: 'Kalikan pembilang dan penyebut dengan 25.'
  },
  {
    id: 43,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 3/4 adalah...',
    displayMath: { type: 'fraction', numerator: 3, denominator: 4 },
    options: ['0,34', '0,75', '0,43', '0,55'],
    answerIndex: 1,
    explanation: '3/4 = (3 × 25) / (4 × 25) = 75/100 = 0,75.',
    hint: '3 × 25 = 75. 75/100 = 0,75.'
  },
  {
    id: 44,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 1/5 adalah...',
    displayMath: { type: 'fraction', numerator: 1, denominator: 5 },
    options: ['0,15', '0,5', '0,2', '0,02'],
    answerIndex: 2,
    explanation: 'Ubah penyebut ke 10: 1/5 = (1 × 2) / (5 × 2) = 2/10 = 0,2.',
    hint: 'Kalikan atas dan bawah dengan 2.'
  },
  {
    id: 45,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 2/5 adalah...',
    displayMath: { type: 'fraction', numerator: 2, denominator: 5 },
    options: ['0,25', '0,4', '0,2', '0,04'],
    answerIndex: 1,
    explanation: '2/5 = (2 × 2) / (5 × 2) = 4/10 = 0,4.',
    hint: '2 × 2 = 4, persepuluh menjadi 0,4.'
  },
  {
    id: 46,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 3/5 adalah...',
    displayMath: { type: 'fraction', numerator: 3, denominator: 5 },
    options: ['0,35', '0,6', '0,3', '0,53'],
    answerIndex: 1,
    explanation: '3/5 = (3 × 2) / (5 × 2) = 6/10 = 0,6.',
    hint: '3 × 2 = 6, maka bernilai 0,6.'
  },
  {
    id: 47,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 4/5 adalah...',
    displayMath: { type: 'fraction', numerator: 4, denominator: 5 },
    options: ['0,8', '0,45', '0,4', '0,08'],
    answerIndex: 0,
    explanation: '4/5 = (4 × 2) / (5 × 2) = 8/10 = 0,8.',
    hint: '4 × 2 = 8. 8/10 = 0,8.'
  },
  {
    id: 48,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 7/20 adalah...',
    displayMath: { type: 'fraction', numerator: 7, denominator: 20 },
    options: ['0,72', '0,35', '0,14', '0,035'],
    answerIndex: 1,
    explanation: 'Ubah penyebut 20 menjadi 100 dengan mengalikan 5: 7/20 = (7 × 5) / (20 × 5) = 35/100 = 0,35.',
    hint: 'Kalikan 20 dengan 5 agar jadi 100. Kalikan 7 dengan 5.'
  },
  {
    id: 49,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 9/25 adalah...',
    displayMath: { type: 'fraction', numerator: 9, denominator: 25 },
    options: ['0,925', '0,45', '0,36', '0,27'],
    answerIndex: 2,
    explanation: 'Ubah penyebut 25 ke 100 dengan mengalikan 4: 9/25 = (9 × 4) / (25 × 4) = 36/100 = 0,36.',
    hint: 'Kalikan pembilang dan penyebut dengan 4.'
  },
  {
    id: 50,
    level: 5,
    tier: 'Sedang',
    category: 'Pecahan Biasa ke Desimal',
    question: 'Bentuk desimal dari 13/50 adalah...',
    displayMath: { type: 'fraction', numerator: 13, denominator: 50 },
    options: ['0,13', '0,26', '0,52', '0,65'],
    answerIndex: 1,
    explanation: 'Ubah penyebut 50 ke 100 dengan mengalikan 2: 13/50 = (13 × 2) / (50 × 2) = 26/100 = 0,26.',
    hint: 'Kalikan pembilang dan penyebut dengan 2: 13 × 2 = 26.'
  },

  // ==========================================
  // LEVEL 6: SEDANG (Soal 51 - 60)
  // Topik: Desimal (2 Angka di Belakang Koma) ke Pecahan Biasa Sederhana
  // Tulis per 100, lalu bagi dengan FPB
  // ==========================================
  {
    id: 51,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,25 adalah...',
    displayMath: { type: 'decimal', decimal: '0,25' },
    options: ['1/4', '2/5', '1/5', '25/10'],
    answerIndex: 0,
    explanation: '0,25 = 25/100. Bagi pembilang dan penyebut dengan 25: 25 ÷ 25 / 100 ÷ 25 = 1/4.',
    hint: '25/100 bisa dibagi 25 di atas dan di bawah.'
  },
  {
    id: 52,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,75 adalah...',
    displayMath: { type: 'decimal', decimal: '0,75' },
    options: ['3/4', '7/5', '75/10', '4/5'],
    answerIndex: 0,
    explanation: '0,75 = 75/100. Bagi kedua angka dengan 25: 75 ÷ 25 / 100 ÷ 25 = 3/4.',
    hint: '75 perseratus disederhanakan dengan membagi 25.'
  },
  {
    id: 53,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,15 adalah...',
    displayMath: { type: 'decimal', decimal: '0,15' },
    options: ['1/15', '3/20', '15/10', '3/10'],
    answerIndex: 1,
    explanation: '0,15 = 15/100. Bagi pembilang dan penyebut dengan 5: 15 ÷ 5 / 100 ÷ 5 = 3/20.',
    hint: '15 dan 100 sama-sama kelipatan 5. Bagi keduanya dengan 5.'
  },
  {
    id: 54,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,35 adalah...',
    displayMath: { type: 'decimal', decimal: '0,35' },
    options: ['7/20', '3/5', '35/10', '7/10'],
    answerIndex: 0,
    explanation: '0,35 = 35/100. Bagi dengan 5: 35 ÷ 5 / 100 ÷ 5 = 7/20.',
    hint: '35 dibagi 5 = 7. 100 dibagi 5 = 20.'
  },
  {
    id: 55,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,45 adalah...',
    displayMath: { type: 'decimal', decimal: '0,45' },
    options: ['4/5', '9/20', '9/10', '45/100'],
    answerIndex: 1,
    explanation: '0,45 = 45/100. Bagi pembilang dan penyebut dengan 5: 45 ÷ 5 / 100 ÷ 5 = 9/20.',
    hint: 'Bagi 45 dan 100 dengan angka 5.'
  },
  {
    id: 56,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,65 adalah...',
    displayMath: { type: 'decimal', decimal: '0,65' },
    options: ['13/20', '6/5', '13/10', '3/5'],
    answerIndex: 0,
    explanation: '0,65 = 65/100. Bagi dengan 5: 65 ÷ 5 / 100 ÷ 5 = 13/20.',
    hint: '65 ÷ 5 = 13, 100 ÷ 5 = 20.'
  },
  {
    id: 57,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,85 adalah...',
    displayMath: { type: 'decimal', decimal: '0,85' },
    options: ['17/20', '8/5', '17/10', '4/5'],
    answerIndex: 0,
    explanation: '0,85 = 85/100. Sederhanakan dengan membagi 5: 85 ÷ 5 / 100 ÷ 5 = 17/20.',
    hint: '85 ÷ 5 = 17.'
  },
  {
    id: 58,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,24 adalah...',
    displayMath: { type: 'decimal', decimal: '0,24' },
    options: ['6/25', '12/50', '24/10', '3/10'],
    answerIndex: 0,
    explanation: '0,24 = 24/100. Bagi pembilang dan penyebut dengan 4: 24 ÷ 4 / 100 ÷ 4 = 6/25.',
    hint: 'Bagi 24 dan 100 dengan FPB-nya, yaitu 4.'
  },
  {
    id: 59,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,12 adalah...',
    displayMath: { type: 'decimal', decimal: '0,12' },
    options: ['3/25', '6/50', '1/12', '3/20'],
    answerIndex: 0,
    explanation: '0,12 = 12/100. Bagi dengan 4: 12 ÷ 4 / 100 ÷ 4 = 3/25.',
    hint: '12 ÷ 4 = 3, 100 ÷ 4 = 25.'
  },
  {
    id: 60,
    level: 6,
    tier: 'Sedang',
    category: 'Desimal ke Pecahan Biasa',
    question: 'Bentuk pecahan biasa paling sederhana dari 0,04 adalah...',
    displayMath: { type: 'decimal', decimal: '0,04' },
    options: ['1/25', '4/10', '1/4', '2/50'],
    answerIndex: 0,
    explanation: '0,04 = 4/100. Bagi dengan 4: 4 ÷ 4 / 100 ÷ 4 = 1/25.',
    hint: '0,04 = 4/100. Sederhanakan dengan membagi 4.'
  },

  // ==========================================
  // LEVEL 7: SEDANG (Soal 61 - 70)
  // Topik: Pecahan Campuran ke Pecahan Desimal
  // Bilangan bulat tetap, pecahan diubah ke desimal lalu dijumlahkan: a b/c = a + (b/c)
  // ==========================================
  {
    id: 61,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 1 1/2 adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 1, denominator: 2 },
    options: ['1,2', '1,5', '1,12', '0,75'],
    answerIndex: 1,
    explanation: 'Bilangan bulat adalah 1. Nilai pecahan 1/2 = 0,5. Jadi 1 + 0,5 = 1,5.',
    hint: 'Pisahkan bilangan bulat dan pecahannya: 1 + 0,5.'
  },
  {
    id: 62,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 1 1/4 adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 1, denominator: 4 },
    options: ['1,4', '1,14', '1,25', '1,75'],
    answerIndex: 2,
    explanation: 'Pecahan 1/4 = 0,25. Maka 1 1/4 = 1 + 0,25 = 1,25.',
    hint: '1/4 nilainya 0,25.'
  },
  {
    id: 63,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 2 3/4 adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 3, denominator: 4 },
    options: ['2,34', '2,75', '2,43', '2,5'],
    answerIndex: 1,
    explanation: 'Pecahan 3/4 = 0,75. Maka 2 3/4 = 2 + 0,75 = 2,75.',
    hint: '3/4 = 0,75. Tambahkan bilangan bulat 2.'
  },
  {
    id: 64,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 3 1/5 adalah...',
    displayMath: { type: 'mixed', whole: 3, numerator: 1, denominator: 5 },
    options: ['3,15', '3,5', '3,2', '3,02'],
    answerIndex: 2,
    explanation: '1/5 = 2/10 = 0,2. Maka 3 1/5 = 3 + 0,2 = 3,2.',
    hint: '1/5 nilainya 0,2.'
  },
  {
    id: 65,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 2 2/5 adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 2, denominator: 5 },
    options: ['2,25', '2,4', '2,2', '2,04'],
    answerIndex: 1,
    explanation: '2/5 = 4/10 = 0,4. Maka 2 2/5 = 2 + 0,4 = 2,4.',
    hint: '2/5 bernilai 0,4.'
  },
  {
    id: 66,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 4 3/5 adalah...',
    displayMath: { type: 'mixed', whole: 4, numerator: 3, denominator: 5 },
    options: ['4,35', '4,6', '4,3', '4,53'],
    answerIndex: 1,
    explanation: '3/5 = 6/10 = 0,6. Maka 4 3/5 = 4 + 0,6 = 4,6.',
    hint: '3/5 = 0,6. Gabungkan dengan 4.'
  },
  {
    id: 67,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 1 4/5 adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 4, denominator: 5 },
    options: ['1,8', '1,45', '1,4', '1,08'],
    answerIndex: 0,
    explanation: '4/5 = 8/10 = 0,8. Maka 1 4/5 = 1 + 0,8 = 1,8.',
    hint: '4/5 = 0,8.'
  },
  {
    id: 68,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 2 1/10 adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 1, denominator: 10 },
    options: ['2,1', '2,01', '2,11', '0,21'],
    answerIndex: 0,
    explanation: '1/10 = 0,1. Maka 2 1/10 = 2 + 0,1 = 2,1.',
    hint: '1/10 adalah 0,1.'
  },
  {
    id: 69,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 3 7/20 adalah...',
    displayMath: { type: 'mixed', whole: 3, numerator: 7, denominator: 20 },
    options: ['3,72', '3,35', '3,14', '3,035'],
    answerIndex: 1,
    explanation: 'Ubah 7/20 menjadi perseratus: 7/20 = (7 × 5) / (20 × 5) = 35/100 = 0,35. Maka 3 7/20 = 3 + 0,35 = 3,35.',
    hint: '7/20 = 35/100 = 0,35.'
  },
  {
    id: 70,
    level: 7,
    tier: 'Sedang',
    category: 'Pecahan Campuran ke Desimal',
    question: 'Bentuk desimal dari pecahan campuran 1 11/25 adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 11, denominator: 25 },
    options: ['1,11', '1,44', '1,22', '1,55'],
    answerIndex: 1,
    explanation: 'Ubah 11/25 ke perseratus: 11/25 = (11 × 4) / (25 × 4) = 44/100 = 0,44. Maka 1 11/25 = 1 + 0,44 = 1,44.',
    hint: 'Kalikan 11 dengan 4 = 44, jadi 0,44.'
  },

  // ==========================================
  // LEVEL 8: MENANTANG (Soal 71 - 80)
  // Topik: Pecahan Desimal ke Pecahan Campuran (Bilangan > 1)
  // Pisahkan angka di depan koma sebagai bilangan bulat, desimal diubah ke pecahan biasa disederhanakan
  // ==========================================
  {
    id: 71,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 1,5 adalah...',
    displayMath: { type: 'decimal', decimal: '1,5' },
    options: ['1 1/2', '1 5/10', '1 1/5', '15/10'],
    answerIndex: 0,
    explanation: 'Angka di depan koma adalah 1. Desimal 0,5 = 5/10 = 1/2. Jadi 1,5 = 1 1/2.',
    hint: '1 tetap sebagai bilangan bulat. 0,5 = 1/2.'
  },
  {
    id: 72,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 1,25 adalah...',
    displayMath: { type: 'decimal', decimal: '1,25' },
    options: ['1 1/4', '1 25/100', '1 1/5', '1 2/5'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 1. Bagian desimal 0,25 = 25/100 = 1/4. Maka hasilnya 1 1/4.',
    hint: '0,25 sama dengan seperempat (1/4).'
  },
  {
    id: 73,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 2,75 adalah...',
    displayMath: { type: 'decimal', decimal: '2,75' },
    options: ['2 3/4', '2 75/100', '2 1/4', '2 4/5'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 2. Desimal 0,75 = 75/100 = 3/4. Maka 2,75 = 2 3/4.',
    hint: '0,75 sama dengan tiga perempat (3/4).'
  },
  {
    id: 74,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 3,2 adalah...',
    displayMath: { type: 'decimal', decimal: '3,2' },
    options: ['3 1/5', '3 2/10', '3 1/2', '3 2/5'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 3. Desimal 0,2 = 2/10 = 1/5. Jadi 3,2 = 3 1/5.',
    hint: '2/10 disederhanakan menjadi 1/5.'
  },
  {
    id: 75,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 2,4 adalah...',
    displayMath: { type: 'decimal', decimal: '2,4' },
    options: ['2 2/5', '2 4/10', '2 1/4', '2 3/5'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 2. Desimal 0,4 = 4/10 = 2/5. Jadi 2,4 = 2 2/5.',
    hint: '4/10 dibagi 2 menjadi 2/5.'
  },
  {
    id: 76,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 4,6 adalah...',
    displayMath: { type: 'decimal', decimal: '4,6' },
    options: ['4 3/5', '4 6/10', '4 2/3', '4 1/2'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 4. Desimal 0,6 = 6/10 = 3/5. Jadi 4,6 = 4 3/5.',
    hint: '6/10 jika disederhanakan menjadi 3/5.'
  },
  {
    id: 77,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 1,8 adalah...',
    displayMath: { type: 'decimal', decimal: '1,8' },
    options: ['1 4/5', '1 8/10', '1 3/4', '1 1/8'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 1. Desimal 0,8 = 8/10 = 4/5. Jadi 1,8 = 1 4/5.',
    hint: '8/10 disederhanakan menjadi 4/5.'
  },
  {
    id: 78,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 2,35 adalah...',
    displayMath: { type: 'decimal', decimal: '2,35' },
    options: ['2 7/20', '2 35/100', '2 3/5', '2 7/10'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 2. Desimal 0,35 = 35/100. Sederhanakan dengan membagi 5: 35 ÷ 5 / 100 ÷ 5 = 7/20. Jadi 2 7/20.',
    hint: 'Bagi 35 dan 100 dengan 5.'
  },
  {
    id: 79,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 3,16 adalah...',
    displayMath: { type: 'decimal', decimal: '3,16' },
    options: ['3 4/25', '3 16/100', '3 8/50', '3 2/25'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 3. Desimal 0,16 = 16/100. Bagi 16 dan 100 dengan 4: 16 ÷ 4 / 100 ÷ 4 = 4/25. Maka 3 4/25.',
    hint: '16 dan 100 sama-sama bisa dibagi 4.'
  },
  {
    id: 80,
    level: 8,
    tier: 'Menantang',
    category: 'Desimal ke Pecahan Campuran',
    question: 'Bentuk pecahan campuran paling sederhana dari 5,5 adalah...',
    displayMath: { type: 'decimal', decimal: '5,5' },
    options: ['5 1/2', '5 5/10', '5 1/5', '55/10'],
    answerIndex: 0,
    explanation: 'Bilangan bulat = 5. Desimal 0,5 = 5/10 = 1/2. Maka 5,5 = 5 1/2.',
    hint: '5 koma 5 sama dengan 5 setengah.'
  },

  // ==========================================
  // LEVEL 9: MENANTANG (Soal 81 - 90)
  // Topik: Ekuivalensi & Analisis Antar Tiga Bentuk Pecahan
  // ==========================================
  {
    id: 81,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Kelompok pecahan berikut yang seluruhnya memiliki nilai yang SAMA adalah...',
    options: [
      '1/4 ; 0,25 ; 25/100',
      '1/2 ; 0,2 ; 5/10',
      '3/4 ; 0,7 ; 75/100',
      '2/5 ; 0,25 ; 4/10'
    ],
    answerIndex: 0,
    explanation: '1/4 = 25/100 = 0,25. Ketiganya bernilai persis sama.',
    hint: 'Periksa nilai 1/4 jika diubah ke desimal (0,25).'
  },
  {
    id: 82,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Pecahan 2 1/2 jika ditulis dalam pecahan biasa dan desimal berturut-turut adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 1, denominator: 2 },
    options: [
      '5/2 dan 2,5',
      '4/2 dan 2,2',
      '5/2 dan 2,2',
      '3/2 dan 2,5'
    ],
    answerIndex: 0,
    explanation: 'Pecahan biasa: (2 × 2 + 1) / 2 = 5/2. Desimal: 2 + 0,5 = 2,5.',
    hint: 'Cari yang pecahan biasanya 5/2 dan desimalnya 2,5.'
  },
  {
    id: 83,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Pecahan biasa 7/4 jika diubah ke bentuk desimal adalah...',
    displayMath: { type: 'fraction', numerator: 7, denominator: 4 },
    options: ['1,74', '1,75', '1,25', '1,50'],
    answerIndex: 1,
    explanation: '7/4 = 1 3/4 = 1 + 0,75 = 1,75. Atau kalikan 25: (7 × 25) / (4 × 25) = 175/100 = 1,75.',
    hint: '7/4 sama dengan 1 3/4.'
  },
  {
    id: 84,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Pecahan biasa 11/4 sama nilainya dengan pecahan campuran...',
    displayMath: { type: 'fraction', numerator: 11, denominator: 4 },
    options: ['2 3/4', '2 1/4', '3 1/4', '2 2/4'],
    answerIndex: 0,
    explanation: '11 dibagi 4 menghasilkan 2 sisa 3 (karena 2 × 4 = 8, 11 - 8 = 3). Maka 11/4 = 2 3/4.',
    hint: '4 × 2 = 8, sisa 3.'
  },
  {
    id: 85,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Urutan pecahan berikut dari yang TERKECIL ke terbesar adalah...',
    options: [
      '0,25 ; 1/2 ; 0,75',
      '1/2 ; 0,25 ; 0,75',
      '0,75 ; 1/2 ; 0,25',
      '1/2 ; 0,75 ; 0,25'
    ],
    answerIndex: 0,
    explanation: 'Samakan ke desimal: 0,25 (tetap), 1/2 = 0,50, dan 0,75. Urutannya: 0,25 < 0,50 < 0,75.',
    hint: 'Ubah semua ke desimal: 1/2 = 0,50.'
  },
  {
    id: 86,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Bentuk desimal dari pecahan 3/8 adalah...',
    displayMath: { type: 'fraction', numerator: 3, denominator: 8 },
    options: ['0,375', '0,38', '0,83', '0,125'],
    answerIndex: 0,
    explanation: 'Kalikan pembilang dan penyebut dengan 125: (3 × 125) / (8 × 125) = 375/1000 = 0,375.',
    hint: 'Penyebut 8 dikalikan 125 menjadi 1000. 3 × 125 = 375.'
  },
  {
    id: 87,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Bentuk pecahan paling sederhana dari 0,125 adalah...',
    displayMath: { type: 'decimal', decimal: '0,125' },
    options: ['1/8', '1/4', '1/5', '1/16'],
    answerIndex: 0,
    explanation: '0,125 = 125/1000. Bagi dengan 125: 125 ÷ 125 / 1000 ÷ 125 = 1/8.',
    hint: '1000 ÷ 125 = 8.'
  },
  {
    id: 88,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Bentuk desimal dari pecahan 5/8 adalah...',
    displayMath: { type: 'fraction', numerator: 5, denominator: 8 },
    options: ['0,625', '0,58', '0,85', '0,525'],
    answerIndex: 0,
    explanation: '5/8 = (5 × 125) / (8 × 125) = 625/1000 = 0,625.',
    hint: '5 × 125 = 625 perseribu.'
  },
  {
    id: 89,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Pernyataan matematika berikut yang bernilai BENAR adalah...',
    options: [
      '3 1/4 = 13/4 = 3,25',
      '2 1/5 = 12/5 = 2,4',
      '1 3/5 = 7/5 = 1,6',
      '4 1/2 = 8/2 = 4,5'
    ],
    answerIndex: 0,
    explanation: '3 1/4 = (3 × 4 + 1) / 4 = 13/4, dan 13/4 = 3 + 0,25 = 3,25. Ketiganya tepat benar.',
    hint: 'Periksa 3 1/4: (3×4+1)/4 = 13/4 dan 1/4 = 0,25.'
  },
  {
    id: 90,
    level: 9,
    tier: 'Menantang',
    category: 'Ekuivalensi Bentuk Pecahan',
    question: 'Pecahan campuran 1 3/8 jika diubah ke bentuk desimal adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 3, denominator: 8 },
    options: ['1,375', '1,38', '1,83', '1,625'],
    answerIndex: 0,
    explanation: 'Pecahan 3/8 = 0,375. Maka 1 3/8 = 1 + 0,375 = 1,375.',
    hint: '3/8 = 0,375. Tambahkan bilangan 1.'
  },

  // ==========================================
  // LEVEL 10: MENANTANG (Soal 91 - 100)
  // Topik: Soal Cerita Kontekstual Sehari-hari (Matematika Berbasis Masalah)
  // ==========================================
  {
    id: 91,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Ibu membeli 2 1/2 kg gula pasir di warung. Bentuk desimal dari berat gula pasir yang dibeli Ibu adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 1, denominator: 2 },
    options: ['2,5 kg', '2,2 kg', '2,12 kg', '0,25 kg'],
    answerIndex: 0,
    explanation: '2 1/2 kg = 2 kg + 1/2 kg = 2 kg + 0,5 kg = 2,5 kg.',
    hint: 'Setengah kilogram (1/2 kg) sama dengan 0,5 kg.'
  },
  {
    id: 92,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Budi memotong seutas tali sepanjang 0,75 meter untuk kerajinan tangan. Berapakah panjang tali tersebut dalam bentuk pecahan biasa paling sederhana?',
    displayMath: { type: 'decimal', decimal: '0,75' },
    options: ['3/4 meter', '7/5 meter', '75/10 meter', '1/4 meter'],
    answerIndex: 0,
    explanation: '0,75 meter = 75/100 meter. Dibagi 25 pada pembilang dan penyebut: 75 ÷ 25 / 100 ÷ 25 = 3/4 meter.',
    hint: '0,75 meter sama dengan 3/4 meter.'
  },
  {
    id: 93,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Sebuah teko berisi 1 1/4 liter susu segar. Bentuk desimal dari volume susu tersebut adalah...',
    displayMath: { type: 'mixed', whole: 1, numerator: 1, denominator: 4 },
    options: ['1,25 liter', '1,4 liter', '1,5 liter', '1,14 liter'],
    answerIndex: 0,
    explanation: '1 1/4 liter = 1 liter + 1/4 liter = 1 + 0,25 = 1,25 liter.',
    hint: '1/4 liter = 0,25 liter.'
  },
  {
    id: 94,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Ayah mengisi bensin sepeda motor sebanyak 3,2 liter di SPBU. Jika ditulis dalam pecahan campuran paling sederhana, volume bensin tersebut adalah...',
    displayMath: { type: 'decimal', decimal: '3,2' },
    options: ['3 1/5 liter', '3 2/10 liter', '3 1/2 liter', '3 2/5 liter'],
    answerIndex: 0,
    explanation: '3,2 = 3 + 0,2 = 3 + 2/10. Sederhanakan 2/10 menjadi 1/5. Jadi, volume bensin adalah 3 1/5 liter.',
    hint: '3 tetap utuh, 0,2 = 2/10 = 1/5.'
  },
  {
    id: 95,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Siti menimbang sekantong tepung terigu dan jarum timbangan menunjukkan 7/2 kg. Pedagang memintanya mengubah ke pecahan campuran. Bentuk yang tepat adalah...',
    displayMath: { type: 'fraction', numerator: 7, denominator: 2 },
    options: ['3 1/2 kg', '3 2/2 kg', '2 1/2 kg', '4 1/2 kg'],
    answerIndex: 0,
    explanation: '7 ÷ 2 = 3 sisa 1 (karena 3 × 2 = 6, 7 - 6 = 1). Maka 7/2 kg = 3 1/2 kg.',
    hint: '7 dibagi 2 menghasilkan 3 sisa 1.'
  },
  {
    id: 96,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Seorang pedagang buah menimbang semangka seberat 3,75 kg. Jika diubah menjadi pecahan biasa (tidak murni), berat semangka tersebut adalah...',
    displayMath: { type: 'decimal', decimal: '3,75' },
    options: ['15/4 kg', '13/4 kg', '17/4 kg', '7/4 kg'],
    answerIndex: 0,
    explanation: '3,75 = 3 3/4. Ubah ke pecahan biasa: (3 × 4 + 3) / 4 = 15/4 kg.',
    hint: '3,75 = 3 3/4. (3×4+3)/4 = 15/4.'
  },
  {
    id: 97,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Edo berlari mengelilingi taman kota sejauh 2 3/5 kilometer. Jarak lari Edo jika dinyatakan dalam bilangan desimal adalah...',
    displayMath: { type: 'mixed', whole: 2, numerator: 3, denominator: 5 },
    options: ['2,6 km', '2,35 km', '2,3 km', '2,53 km'],
    answerIndex: 0,
    explanation: '2 3/5 km = 2 km + 3/5 km = 2 + (3 × 2 / 5 × 2) = 2 + 6/10 = 2,6 km.',
    hint: '3/5 = 6/10 = 0,6.'
  },
  {
    id: 98,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Dalam resep membuat kue tart, diperlukan 0,4 kg cokelat bubuk. Pecahan biasa paling sederhana untuk takaran cokelat tersebut adalah...',
    displayMath: { type: 'decimal', decimal: '0,4' },
    options: ['2/5 kg', '4/10 kg', '1/4 kg', '3/5 kg'],
    answerIndex: 0,
    explanation: '0,4 = 4/10. Sederhanakan dengan membagi pembilang dan penyebut dengan 2: 4 ÷ 2 / 10 ÷ 2 = 2/5 kg.',
    hint: '4 per 10 disederhanakan dibagi 2.'
  },
  {
    id: 99,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Dayu membawa botol minum berisi 1,8 liter air mineral. Dalam bentuk pecahan campuran paling sederhana, volume air tersebut adalah...',
    displayMath: { type: 'decimal', decimal: '1,8' },
    options: ['1 4/5 liter', '1 8/10 liter', '1 3/5 liter', '1 1/8 liter'],
    answerIndex: 0,
    explanation: '1,8 = 1 + 8/10. Sederhanakan 8/10 dengan membagi 2 menjadi 4/5. Jadi 1,8 = 1 4/5 liter.',
    hint: '0,8 = 8/10 = 4/5.'
  },
  {
    id: 100,
    level: 10,
    tier: 'Menantang',
    category: 'Soal Cerita Kontekstual',
    question: 'Kakek memiliki sebidang tanah perkebunan seluas 5 3/4 hektar. Bentuk bilangan desimal dari luas tanah kakek adalah...',
    displayMath: { type: 'mixed', whole: 5, numerator: 3, denominator: 4 },
    options: ['5,75 hektar', '5,34 hektar', '5,43 hektar', '5,50 hektar'],
    answerIndex: 0,
    explanation: '5 3/4 hektar = 5 + 3/4 = 5 + 0,75 = 5,75 hektar.',
    hint: '3/4 = 0,75. Gabungkan dengan 5.'
  }
];

export const LEVEL_INFO = [
  { level: 1, tier: 'Mudah', title: 'Pecahan Biasa ke Desimal (Per 10 & 100)', questionsRange: 'Soal 1 - 10', icon: '🌱' },
  { level: 2, tier: 'Mudah', title: 'Desimal ke Pecahan Biasa (1 Angka Koma)', questionsRange: 'Soal 11 - 20', icon: '🌿' },
  { level: 3, tier: 'Mudah', title: 'Pecahan Campuran ke Pecahan Biasa', questionsRange: 'Soal 21 - 30', icon: '🍀' },
  { level: 4, tier: 'Sedang', title: 'Pecahan Biasa ke Pecahan Campuran', questionsRange: 'Soal 31 - 40', icon: '⭐' },
  { level: 5, tier: 'Sedang', title: 'Pecahan Biasa ke Desimal (Penyebut 2, 4, 5, 20, 25, 50)', questionsRange: 'Soal 41 - 50', icon: '🌟' },
  { level: 6, tier: 'Sedang', title: 'Desimal (2 Angka Koma) ke Pecahan Biasa', questionsRange: 'Soal 51 - 60', icon: '✨' },
  { level: 7, tier: 'Sedang', title: 'Pecahan Campuran ke Pecahan Desimal', questionsRange: 'Soal 61 - 70', icon: '🔮' },
  { level: 8, tier: 'Menantang', title: 'Desimal ke Pecahan Campuran (> 1)', questionsRange: 'Soal 71 - 80', icon: '🔥' },
  { level: 9, tier: 'Menantang', title: 'Ekuivalensi Antar 3 Bentuk Pecahan', questionsRange: 'Soal 81 - 90', icon: '💎' },
  { level: 10, tier: 'Menantang', title: 'Soal Cerita Kontekstual Sehari-hari', questionsRange: 'Soal 91 - 100', icon: '👑' },
];
