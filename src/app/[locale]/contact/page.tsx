import { getTranslations } from "next-intl/server";

export default async function Contact() {
  const t = await getTranslations("contact");

  return (
    <div className="flex flex-col flex-1 px-16 py-20">
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">{t("badge")}</p>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            {t("title")}<br />
            <span className="text-gray-300">{t("titleSpan")}</span>
          </h1>
        </div>
        <p className="text-sm text-gray-500 italic max-w-xs mt-4 leading-relaxed">"{t("quote")}"</p>
      </div>

      <div className="flex gap-10 items-start">
        <div className="flex-1 bg-gray-50 rounded-2xl p-8">
          <div className="flex gap-4 mb-5">
            <div className="flex-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">{t("nameLabel")}</label>
              <input type="text" placeholder={t("namePlaceholder")} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors" />
            </div>
            <div className="flex-1">
              <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">{t("emailLabel")}</label>
              <input type="email" placeholder={t("emailPlaceholder")} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors" />
            </div>
          </div>
          <div className="mb-6">
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">{t("messageLabel")}</label>
            <textarea rows={5} placeholder={t("messagePlaceholder")} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors resize-none" />
          </div>
          <button className="bg-gray-900 text-white text-sm px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">{t("send")}</button>
        </div>

        <div className="w-72 flex flex-col gap-4">
          <div className="w-full h-40 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400 text-sm mb-2">[ Your Image Here ]</div>
          <div className="flex items-center gap-4 border border-gray-100 rounded-2xl px-5 py-4 bg-white">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">✉</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">{t("inquiries")}</p>
              <p className="text-sm text-gray-800 font-medium">hello@alabasterzen.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-gray-100 rounded-2xl px-5 py-4 bg-white">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">📞</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">{t("directLine")}</p>
              <p className="text-sm text-gray-800 font-medium">+1 (555) 000-0000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-gray-100 rounded-2xl px-5 py-4 bg-white">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm flex-shrink-0">📍</div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400">{t("studio")}</p>
              <p className="text-sm text-gray-800 font-medium">123 Zen Lane</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}