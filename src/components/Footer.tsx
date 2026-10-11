export default function Footer() {
  return (
    <footer className="mt-auto border-t border-bazar-base-300 bg-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-bazar-muted">
        <p className="font-medium text-bazar-base-content">
          🛒 বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center sm:text-right italic">
          &ldquo;সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।&rdquo;
        </p>
      </div>
    </footer>
  );
}
