import { getTranslations } from "next-intl/server";

export default async function About() {
  const t = await getTranslations("about");

  return (
    <div className="flex flex-col flex-1">
      <section className="text-center py-20 px-16 bg-white">
        <span className="text-xs uppercase tracking-widest text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{t("badge")}</span>
        <h1 className="text-5xl font-bold text-gray-900 mt-5 mb-4">{t("title")}</h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto">{t("subtitle")}</p>
      </section>

      <section className="flex gap-12 px-16 py-14 bg-gray-50 items-start">
        <div className="w-64 h-64 bg-gray-200 rounded-2xl flex-shrink-0 flex items-center justify-center text-gray-400 text-sm">[ Your Image Here ]</div>
        <div className="max-w-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">{t("philosophyTitle")}</h2>
          <div className="w-8 h-0.5 bg-gray-300 mb-5"></div>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{t("p1")}</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">{t("p2")}</p>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">{t("p3")}</p>
          <button className="text-sm text-gray-900 font-medium hover:underline">{t("readManifest")}</button>
        </div>
      </section>

      <section className="px-16 py-16 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{t("coreTenetsTitle")}</h2>
        <p className="text-sm text-gray-400 mb-10">{t("coreTenetsSubtitle")}</p>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-2xl p-6">
            <span className="text-gray-400 text-lg mb-4 block">▦</span>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("spaceTitle")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t("spaceText")}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <span className="text-gray-400 text-lg mb-4 block">A</span>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("honestyTitle")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t("honestyText")}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <span className="text-gray-400 text-lg mb-4 block">◑</span>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">{t("harmonyTitle")}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{t("harmonyText")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}