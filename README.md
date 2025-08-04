# 🎓 Thesis Genius Recommender System

Rekomendasi topik skripsi berbasis IPK, minat mata kuliah, dan proyek terakhir mahasiswa. Sistem ini memanfaatkan **K-Means Clustering** dan **prompting LLM (Gemini API)** untuk menghasilkan rekomendasi yang dipersonalisasi.
Link : https://lovable.dev/projects/2195d297-3bcf-426c-b825-47edeb4463eb


---

## 🚀 Fitur
- Form input: IPK, minat, dan ringkasan proyek.
- Clustering dengan K-Means.
- Prompt otomatis ke Gemini LLM.
- Output rekomendasi topik skripsi via REST API.

---

## 🔁 Alur Sistem
1. Input user → preprocessing
2. Clustering (K-Means)
3. Prompt dibuat → dikirim ke Gemini
4. Hasil dikembalikan ke user

---

## 🧪 Contoh Input & Output

**Input JSON:**
```json
{
  "ipk": 3.75,
  "minat": ["AI", "Pemrograman"],
  "project_summary": "Bangun chatbot berbasis Python"
}

