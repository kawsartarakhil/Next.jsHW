import { getTranslations } from "next-intl/server";
import Image from "next/image";
import pic1 from '@/public/pic1.webp'
export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col flex-1">
      <section className="flex items-center justify-between px-16 py-20 bg-gray-50">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">{t("badge")}</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-5 leading-tight">{t("title")}</h1>
          <p className="text-sm text-gray-500 leading-relaxed mb-8">{t("subtitle")}</p>
          <button className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">{t("getStarted")}</button>
        </div>
        <div className="w-80 h-50 bg-gray-200 rounded-2xl object-cover "><img src="/pic1.webp" className="object-fit" /></div>
      </section>

      <section className="grid grid-cols-3 gap-10 px-16 py-20 bg-white">
        <div>
          <span className="text-lg text-gray-400 mb-4 block">✦</span>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{t("minimalismTitle")}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{t("minimalismText")}</p>
        </div>
        <div>
          <span className="text-lg text-gray-400 mb-4 block">A</span>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{t("precisionTitle")}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{t("precisionText")}</p>
        </div>
        <div>
          <span className="text-lg text-gray-400 mb-4 block">◎</span>
          <h3 className="text-base font-semibold text-gray-900 mb-2">{t("clarityTitle")}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{t("clarityText")}</p>
        </div>
      </section>

      <section className="bg-gray-50 px-16 py-24 flex flex-col items-center text-center">
        <blockquote className="text-2xl italic text-gray-800 max-w-xl leading-snug">"{t("quote")}"</blockquote>
        <p className="text-xs tracking-widest text-gray-400 mt-6 uppercase">— Steve Jobs</p>
      </section>
    </div>
  );
}