import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: `${SITE_NAME}의 개인정보 처리방침 안내 페이지입니다.`,
  robots: { index: true, follow: true },
};

const SERVICE_NAME = SITE_NAME;
/** 개인정보 보호책임자로 표시할 운영자/상호명. 실제 값으로 바꿔 주세요. */
const OPERATOR_NAME = "[운영자명]";
/** 개인정보 관련 문의를 받을 이메일. 실제 값으로 바꿔 주세요. */
const CONTACT_EMAIL = "[연락처 이메일]";
/** 시행일. 내용을 바꾸면 7일 전 고지 후 이 날짜도 갱신한다. */
const EFFECTIVE_DATE = "2026-11-08";

const TOC = [
  ["s1", "개인정보의 처리 목적"],
  ["s2", "처리하는 개인정보의 항목"],
  ["s3", "개인정보의 처리 및 보유 기간"],
  ["s4", "개인정보의 파기 절차 및 방법"],
  ["s5", "개인정보 처리업무의 위탁"],
  ["s6", "정보주체의 권리·의무 및 행사방법"],
  ["s7", "개인정보의 안전성 확보 조치"],
  ["s8", "쿠키 운영 및 거부 방법"],
  ["s9", "개인정보 보호책임자"],
  ["s10", "권익침해 구제방법"],
  ["s11", "처리방침의 변경"],
] as const;

const REMEDY_AGENCIES = [
  ["개인정보분쟁조정위원회", "(국번없이) 1833-6972", "https://www.kopico.go.kr", "www.kopico.go.kr"],
  ["개인정보침해신고센터", "(국번없이) 118", "https://privacy.kisa.or.kr", "privacy.kisa.or.kr"],
  ["대검찰청", "(국번없이) 1301", "https://www.spo.go.kr", "www.spo.go.kr"],
  ["경찰청", "(국번없이) 182", "https://ecrm.cyber.go.kr", "ecrm.cyber.go.kr"],
] as const;

const h2Class = "mb-4 text-[20px] font-semibold leading-[1.3] text-[var(--text)]";
const h3Class = "mb-2 text-base font-semibold leading-[1.6] text-[var(--text)]";
const pClass = "text-base leading-[1.6] text-[var(--text)]";
const noteClass = "mt-3 text-sm leading-[1.4] text-[var(--text-sub)]";
const ulClass = "flex list-disc flex-col gap-2 pl-6 text-base leading-[1.6] text-[var(--text)]";
const olClass = "flex list-decimal flex-col gap-2 pl-6 text-base leading-[1.6] text-[var(--text)]";
const tableClass = "w-full border-collapse text-sm leading-[1.4] text-[var(--text)]";
const thClass = "border border-[var(--border)] bg-[var(--hover-bg)] px-3 py-2 text-left font-semibold";
const tdClass = "border border-[var(--border)] px-3 py-2";
const sectionClass = "scroll-mt-20";

function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="link-accent text-[var(--accent)]">
      {CONTACT_EMAIL}
    </a>
  );
}

/** 로그인 없이 볼 수 있는 개인정보 처리방침. 헤더·사이드바 없이 본문만 가운데 정렬한다. */
export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 pt-10 pb-16">
      <article className="mx-auto flex w-full max-w-[720px] flex-col gap-10">
        <header className="flex flex-col gap-2 border-b border-[var(--border)] pb-6">
          <Link href="/" className="text-base font-semibold text-[var(--text)]">
            {SERVICE_NAME}
          </Link>
          <h1 className="text-[30px] font-bold leading-[1.2] text-[var(--text)]">
            개인정보 처리방침
          </h1>
          <p className="text-sm leading-[1.4] text-[var(--text-sub)]">
            시행일: <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
          </p>
        </header>

        <p className={pClass}>
          {SERVICE_NAME}(이하 &quot;서비스&quot;)은 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및
          관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에
          「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한 절차 및 기준을
          안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
          처리방침을 수립·공개합니다.
        </p>

        <nav aria-label="목차" className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-3 text-base font-semibold leading-[1.6] text-[var(--text)]">목차</h2>
          <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm leading-[1.4] text-[var(--text)]">
            {TOC.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} className="link-accent text-[var(--text)]">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="s1" className={sectionClass}>
          <h2 className={h2Class}>1. 개인정보의 처리 목적</h2>
          <p className={`${pClass} mb-3`}>
            {SERVICE_NAME}은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
            목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」
            제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ol className={olClass}>
            <li>
              <strong>회원 가입 및 관리</strong>
              <br />
              회원 가입 의사 확인, 본인 식별·인증, 회원자격 유지·관리, 비밀번호 재설정, 서비스 부정이용
              방지 목적으로 개인정보를 처리합니다.
            </li>
            <li>
              <strong>서비스 제공</strong>
              <br />
              이용자가 저장한 링크와 폴더를 본인에게만 보여주고 관리할 수 있게 하는 {SERVICE_NAME}의 기능
              제공 및 서비스 운영을 위하여 개인정보를 처리합니다.
            </li>
            <li>
              <strong>고충 처리</strong>
              <br />
              정보주체의 문의사항 확인 및 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를
              처리합니다.
            </li>
          </ol>
        </section>

        <section id="s2" className={sectionClass}>
          <h2 className={h2Class}>2. 처리하는 개인정보의 항목</h2>
          <div className="mb-4">
            <h3 className={h3Class}>가. 이메일 회원가입 시 수집·이용 항목</h3>
            <ul className={ulClass}>
              <li>
                <strong>법적 근거</strong>: 「개인정보 보호법」 제15조제1항제4호(계약 체결·이행)
              </li>
              <li>
                <strong>필수 항목</strong>: 이메일 주소, 비밀번호(단방향 암호화하여 저장, 원문 보관하지
                않음)
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className={h3Class}>나. 카카오 로그인 시 카카오로부터 제공받는 항목</h3>
            <ul className={ulClass}>
              <li>
                <strong>법적 근거</strong>: 「개인정보 보호법」 제15조제1항제4호(계약 체결·이행)
              </li>
              <li>
                <strong>필수 항목</strong>: 카카오 계정 이메일 주소, 닉네임, 프로필 사진
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className={h3Class}>다. 서비스 이용 과정에서 이용자가 직접 생성하는 항목</h3>
            <p className={pClass}>저장한 링크의 주소, 제목, 설명, 미리보기 이미지 주소, 폴더 이름</p>
          </div>
          <div>
            <h3 className={h3Class}>라. 서비스 이용 과정에서 자동 수집되는 항목</h3>
            <p className={pClass}>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 브라우저 정보, 기기 정보</p>
          </div>
        </section>

        <section id="s3" className={sectionClass}>
          <h2 className={h2Class}>3. 개인정보의 처리 및 보유 기간</h2>
          <p className={`${pClass} mb-4`}>
            {SERVICE_NAME}은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
            동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>처리 목적</th>
                  <th className={thClass}>보유 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>회원 가입 및 관리</td>
                  <td className={tdClass}>회원 탈퇴 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>서비스 제공(저장한 링크·폴더)</td>
                  <td className={tdClass}>이용자가 삭제하거나 회원 탈퇴 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteClass}>
            다만, 관계 법령 위반에 따른 수사·조사가 진행 중인 경우 또는 관련 법령에 따른 보존 의무가 있는
            경우에는 해당 기간 종료 시까지 보유합니다.
          </p>
        </section>

        <section id="s4" className={sectionClass}>
          <h2 className={h2Class}>4. 개인정보의 파기 절차 및 방법</h2>
          <p className={`${pClass} mb-3`}>
            {SERVICE_NAME}은 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
            지체 없이 해당 개인정보를 파기합니다.
          </p>
          <ul className={ulClass}>
            <li>
              <strong>파기 절차</strong>: 이용자의 회원 탈퇴 요청 또는 보유기간 만료 시 즉시 파기
            </li>
            <li>
              <strong>파기 방법</strong>: 전자적 파일은 복구 및 재생이 불가능한 방법으로 영구 삭제
            </li>
          </ul>
        </section>

        <section id="s5" className={sectionClass}>
          <h2 className={h2Class}>5. 개인정보 처리업무의 위탁</h2>
          <p className={`${pClass} mb-4`}>
            {SERVICE_NAME}은 원활한 서비스 운영을 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            모든 위탁 업체는 대한민국 리전(Seoul)에서 개인정보를 저장·처리하고 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>수탁업체</th>
                  <th className={thClass}>위탁 업무</th>
                  <th className={thClass}>처리 지역</th>
                  <th className={thClass}>보유·이용 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>Supabase Inc.</td>
                  <td className={tdClass}>
                    회원 정보 저장 및 인증 처리(가입 확인·비밀번호 재설정 메일 발송 포함), 데이터베이스
                    운영
                  </td>
                  <td className={tdClass}>대한민국 (Seoul 리전)</td>
                  <td className={tdClass}>회원 탈퇴 또는 위탁계약 종료 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>Vercel Inc.</td>
                  <td className={tdClass}>웹 서비스 호스팅 및 배포</td>
                  <td className={tdClass}>대한민국 (Seoul Edge)</td>
                  <td className={tdClass}>위탁계약 종료 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>주식회사 카카오</td>
                  <td className={tdClass}>카카오 계정을 이용한 소셜 로그인 인증</td>
                  <td className={tdClass}>대한민국</td>
                  <td className={tdClass}>인증 처리 완료 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={noteClass}>
            {SERVICE_NAME}은 「개인정보 보호법」 제26조에 따라 위탁계약 시 개인정보의 안전한 처리를 위한
            기술적·관리적 보호조치, 재위탁 제한, 관리·감독 등 책임에 관한 사항을 계약에 반영하고 있습니다.
          </p>
        </section>

        <section id="s6" className={sectionClass}>
          <h2 className={h2Class}>6. 정보주체의 권리·의무 및 행사방법</h2>
          <p className={`${pClass} mb-3`}>
            정보주체는 {SERVICE_NAME}에 대해 언제든지 다음과 같은 개인정보 보호 관련 권리를 행사할 수
            있습니다.
          </p>
          <ol className={`${olClass} mb-3`}>
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정·삭제 요구</li>
            <li>개인정보 처리정지 요구</li>
            <li>개인정보 처리에 대한 동의 철회</li>
          </ol>
          <p className={pClass}>
            권리 행사는 <ContactLink />로 서면, 이메일 등을 통하여 하실 수 있으며 {SERVICE_NAME}은 이에
            대해 지체 없이 조치하겠습니다.
          </p>
        </section>

        <section id="s7" className={sectionClass}>
          <h2 className={h2Class}>7. 개인정보의 안전성 확보 조치</h2>
          <ul className={ulClass}>
            <li>
              <strong>기술적 조치</strong>: 접근 권한 관리, 비밀번호 단방향 암호화 저장, HTTPS 통신 암호화,
              Row Level Security(RLS) 적용
            </li>
            <li>
              <strong>관리적 조치</strong>: 개인정보 취급 담당자 최소화, 정기적인 자체 점검
            </li>
            <li>
              <strong>물리적 조치</strong>: 국제 보안 인증(SOC2 등)을 획득한 클라우드 인프라를 대한민국
              리전에서 활용
            </li>
          </ul>
        </section>

        <section id="s8" className={sectionClass}>
          <h2 className={h2Class}>8. 개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부</h2>
          <p className={`${pClass} mb-3`}>
            {SERVICE_NAME}은 로그인 상태 유지 및 이용자 맞춤 서비스 제공을 위해 쿠키(cookie)를 사용합니다.
          </p>
          <ul className={ulClass}>
            <li>
              <strong>사용 목적</strong>: 로그인 세션 유지, 이용자 환경 설정 저장
            </li>
            <li>
              <strong>거부 방법</strong>: 웹브라우저 설정 &gt; 개인정보 보호 및 보안 메뉴에서 쿠키 저장을
              거부할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 로그인이 필요한 일부 서비스 이용에 어려움이
              있을 수 있습니다.
            </li>
          </ul>
        </section>

        <section id="s9" className={sectionClass}>
          <h2 className={h2Class}>9. 개인정보 보호책임자</h2>
          <p className={`${pClass} mb-3`}>
            {SERVICE_NAME}은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한
            정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고
            있습니다.
          </p>
          <div className="flex flex-col gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 text-base leading-[1.6] text-[var(--text)]">
            <p>
              <strong>개인정보 보호책임자</strong>: {OPERATOR_NAME}
            </p>
            <p>
              <strong>연락처</strong>: <ContactLink />
            </p>
          </div>
        </section>

        <section id="s10" className={sectionClass}>
          <h2 className={h2Class}>10. 권익침해 구제방법</h2>
          <p className={`${pClass} mb-3`}>
            정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할
            수 있습니다.
          </p>
          <ul className={ulClass}>
            {REMEDY_AGENCIES.map(([name, phone, href, label]) => (
              <li key={name}>
                {name}: {phone} (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-accent text-[var(--accent)]"
                >
                  {label}
                </a>
                )
              </li>
            ))}
          </ul>
        </section>

        <section id="s11" className={sectionClass}>
          <h2 className={h2Class}>11. 개인정보 처리방침의 변경</h2>
          <p className={pClass}>
            이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령, 정책 또는 보안기술 변경에 따라
            내용이 추가·삭제 및 수정될 경우 변경 사항을 시행일 7일 전부터 서비스 내 공지사항을 통해
            고지합니다.
          </p>
        </section>

        <footer className="flex items-center justify-between border-t border-[var(--border)] pt-6 text-sm leading-[1.4] text-[var(--text-sub)]">
          <p>시행일: {EFFECTIVE_DATE}</p>
          <Link href="/login" className="link-accent text-[var(--accent)]">
            로그인 페이지로 돌아가기
          </Link>
        </footer>
      </article>
    </main>
  );
}
