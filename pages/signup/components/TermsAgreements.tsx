import Image from "next/image";
import { TERMS } from "@/constants/signupConstants";
import Clickable from "@/components/atoms/Clickable";
import useHandleTermsCheck from "@/hooks/signup/useHandleTermsCheck";
import checked from "@/public/images/icons/checked.svg";
import notChecked from "@/public/images/icons/notChecked.svg";

export interface SignupContentProps {
  progressStatus: () => void;
}

function TermsAgreements({ progressStatus }: SignupContentProps) {
  const { checkedTerms, handleSingleCheck, handleAllCheck, validateTermCheck } = useHandleTermsCheck({
    progressStatus,
  });

  return (
    <div className="mt-60">
      <div className="absolute right-62">
        <label className="flex gap-8">
          <input
            type="checkbox"
            value="term"
            className="size-18 appearance-none"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkedTerms.length === TERMS.length}
          />
          {checkedTerms.length === TERMS.length ? (
            <Image src={checked} alt="checked" width={20} height={20} />
          ) : (
            <Image src={notChecked} alt="checked" width={20} height={20} />
          )}
          전체 동의
        </label>
      </div>

      {TERMS.map((termContent, key) => {
        return (
          <div key={key}>
            <h5 className="mb-12">{termContent.title}</h5>
            <p className="border-zinc-400 h-200 w-675 overflow-y-auto rounded-[10px] border p-20" key={key}>
              {termContent.content}
            </p>
            <label className="m-10 mb-50 flex items-center gap-12">
              <input
                type="checkbox"
                value="term"
                className="size-18 appearance-none"
                onChange={(e) => handleSingleCheck(e.target.checked, termContent.termNo)}
                checked={checkedTerms.includes(termContent.termNo)}
              />
              {checkedTerms.includes(termContent.termNo) ? (
                <Image src={checked} alt="checked" width={20} height={20} className="absolute" />
              ) : (
                <Image src={notChecked} alt="checked" width={20} height={20} className="absolute" />
              )}
              이용약관에 동의 합니다.
            </label>
          </div>
        );
      })}
      <button className="w-full" onClick={validateTermCheck}>
        <Clickable size="large" className="w-full">
          확인
        </Clickable>
      </button>
    </div>
  );
}

export default TermsAgreements;
