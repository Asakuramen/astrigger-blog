import Button from "components/molecules/Button/Button";
import InputTextBoxE from "components/molecules/InputTextBoxE/InputTextBoxE";

interface Props_ContactForm_Presentation {
  inputName_htmlId: string;
  inputEmail_htmlId: string;
  inputTitle_htmlId: string;
  inputBody_htmlId: string;
  inputName_errormsg: string;
  inputEmail_errormsg: string;
  inputTitle_errormsg: string;
  inputBody_errormsg: string;
  isSending: boolean;
  onSubmit: () => void;
}

const ContactForm_Presentation = (props: Props_ContactForm_Presentation) => {
  const {
    inputName_htmlId,
    inputEmail_htmlId,
    inputTitle_htmlId,
    inputBody_htmlId,
    inputName_errormsg,
    inputEmail_errormsg,
    inputTitle_errormsg,
    inputBody_errormsg,
    isSending,
    onSubmit,
  } = props;

  return (
    <>
      <InputTextBoxE
        title="NAME"
        multiLine={false}
        id={inputName_htmlId}
        placeholder="20文字以内"
        errorMessage={inputName_errormsg}
      />
      <InputTextBoxE
        title="E-MAIL"
        multiLine={false}
        id={inputEmail_htmlId}
        placeholder="メールアドレス"
        errorMessage={inputEmail_errormsg}
      />
      <InputTextBoxE
        title="TITLE"
        multiLine={false}
        id={inputTitle_htmlId}
        placeholder="50文字以内"
        errorMessage={inputTitle_errormsg}
      />
      <InputTextBoxE
        title="MESSAGE"
        multiLine={true}
        id={inputBody_htmlId}
        placeholder="400文字以内"
        errorMessage={inputBody_errormsg}
      />

      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div>
          <p className="pb-2 text-left text-xs text-gray-400">
            ※ bot対策のためreCAPTCHA(v3)による認証機能を設けております。
          </p>
          <p className="pb-2 text-left text-xs text-gray-400">
            ※
            管理者が社会通念上不適切と判断した投稿は、事前通知なしに削除させていただきます。
          </p>
        </div>

        <Button onclick={onSubmit} disabled={isSending}>
          送信
        </Button>
      </div>
    </>
  );
};

export default ContactForm_Presentation;
