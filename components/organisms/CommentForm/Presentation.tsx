import Button from "components/molecules/Button/Button";
import H1anchor from "components/molecules/H1anchor";
import InputTextBoxE from "components/molecules/InputTextBoxE/InputTextBoxE";
import { Comment } from "lib/microcms/api";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import EmojiSelectBox from "../EmojiSelectBox/Container";
import styles from "./Presentation.module.css";

interface Props_CommentFiledPresentation {
  comments: Comment[];
  inputNameHtmlId: string;
  inputBodyHtmlId: string;
  inputEmojiHtmlId: string;
  inputNameErrormsg: string;
  inputBodyErrormsg: string;
  isSending: boolean;
  onsubmit: () => void;
}

const CommentForm_Presentaion = (props: Props_CommentFiledPresentation) => {
  const {
    comments,
    inputNameHtmlId,
    inputBodyHtmlId,
    inputEmojiHtmlId,
    inputNameErrormsg,
    inputBodyErrormsg,
    isSending,
    onsubmit,
  } = props;

  return (
    <>
      <div className="p-4 sm:p-8 shadow-md rounded-xl bg-white">
        <div>
          <H1anchor>
            <div className="flex flex-row items-center">
              <AiOutlineComment />
              コメント
            </div>
          </H1anchor>
        </div>

        <hr className="my-6" />

        {comments.map((comment, index) => {
          return (
            <div className="mb-6 flex " key={"CommentFiled-show-" + index.toString()}>
              <div className="flex-none w-12 h-12 mr-3 text-3xl">{comment.emoji}</div>
              <div className={styles.comment_bubble}>
                <p className="">{comment.body}</p>
                <br />

                <p className="text-right">
                  <span className="font-bold ">{comment.name}</span>
                  <span className="block sm:inline-block pl-4 text-sm  text-gray-400">
                    {comment.publishedAt}
                  </span>
                </p>
              </div>

              <hr />
            </div>
          );
        })}

        <div className="h-10"></div>

        <InputTextBoxE
          title="記事についてコメントする"
          multiLine={true}
          id={inputBodyHtmlId}
          placeholder="300文字以内"
          errorMessage={inputBodyErrormsg}
        />

        <div className="flex flex-row">
          <div className="w-20 mr-6">
            <EmojiSelectBox inputHtmlId={inputEmojiHtmlId} />
          </div>
          <div className="flex-1">
            <InputTextBoxE
              title="ニックネーム"
              multiLine={false}
              id={inputNameHtmlId}
              placeholder="10文字以内"
              errorMessage={inputNameErrormsg}
            />
          </div>
        </div>

        <div className="mb-6 sm:w-64">
          <Button onclick={onsubmit} disabled={isSending}>
            送信
          </Button>
        </div>
        <p className="pb-2 text-left text-xs text-gray-400">
          ※ このサイトはreCAPTCHAによって保護されています。Google社の
          <a href="https://policies.google.com/privacy">プライバシーポリシー</a>と
          <a href="https://policies.google.com/terms">利用規約</a>
          が適用されます。
        </p>
        <p className="pb-2 text-left text-xs text-gray-400">
          ※
          管理者が社会通念上不適切と判断した投稿は、事前通知なしに削除させていただきます。
        </p>
      </div>
    </>
  );
};

export default CommentForm_Presentaion;
