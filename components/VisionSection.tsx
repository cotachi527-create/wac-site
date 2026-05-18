"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function VisionSection() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  function handleOpenChange(v: boolean) {
    setOpen(v);
    if (!v) setTimeout(() => setSent(false), 300);
  }

  return (
    <section className="py-40 px-[10%] bg-[#fdfbf7] flex flex-col md:flex-row justify-around items-center gap-16">
      <div
        className="text-[1.5rem] leading-[2.5] tracking-[0.3rem] text-[#333]
                   md:[writing-mode:vertical-rl] [writing-mode:horizontal-tb]"
      >
        世界を、もっと分かりやすく、楽しくする。
        <br />
        不撓不屈の精神で、
        <br />
        昨日まで見えなかった面白さを発見する。
      </div>

      <Separator orientation="vertical" className="hidden md:block h-48 bg-[#333]/20" />

      <div className="max-w-sm space-y-6 leading-loose">
        <h2 className="text-2xl font-light text-[#333]">Philosophy</h2>
        <p className="text-[#555]">
          職人気質のこだわりと、AIの機動力を掛け合わせ、あなたの感性を形にします。
        </p>
        <button
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 text-sm tracking-[0.25em] text-[#333] uppercase
                     border-b border-[#333]/30 pb-1 hover:border-[#333] transition-all duration-300"
        >
          Contact
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md font-[family-name:var(--font-serif)]">
          <DialogHeader>
            <DialogTitle className="text-xl font-light tracking-widest">Contact</DialogTitle>
            <DialogDescription className="text-sm text-[#888]">
              お気軽にご連絡ください。2営業日以内にご返信いたします。
            </DialogDescription>
          </DialogHeader>

          {sent ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-2xl">✉️</p>
              <p className="text-[#333] tracking-wide">送信が完了しました。</p>
              <p className="text-sm text-[#888]">ご連絡ありがとうございます。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm text-[#555] tracking-wide" htmlFor="name">
                  お名前 <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="山田 太郎"
                  className="w-full border border-[#ddd] rounded-none px-4 py-3 text-sm
                             focus:outline-none focus:border-[#333] transition-colors bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#555] tracking-wide" htmlFor="email">
                  メールアドレス <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="example@mail.com"
                  className="w-full border border-[#ddd] rounded-none px-4 py-3 text-sm
                             focus:outline-none focus:border-[#333] transition-colors bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-[#555] tracking-wide" htmlFor="message">
                  メッセージ <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="ご依頼・ご質問の内容をご記入ください。"
                  className="w-full border border-[#ddd] rounded-none px-4 py-3 text-sm
                             focus:outline-none focus:border-[#333] transition-colors bg-white resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-none tracking-widest bg-[#333] hover:bg-[#111] transition-colors"
              >
                {loading ? "送信中…" : "送信する"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
