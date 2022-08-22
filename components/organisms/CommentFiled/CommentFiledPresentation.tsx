import Button from "components/molecules/Button/Button";
import H1anchor from "components/molecules/H1anchor";
import InputTextBoxE from "components/molecules/InputTextBoxE/InputTextBoxE";
import { Comment } from "lib/microcms/api";
import { AiOutlineComment } from "react-icons/ai";

interface Props_CommentFiledPresentation {
  comments: Comment[];
  inputName_id: string;
  inputBody_id: string;
  inputNameErrormsg: string;
  inputBodyErrormsg: string;
  onsubmit: () => void;
}

const CommentFiledPresentation = (props: Props_CommentFiledPresentation) => {
  const {
    comments,
    inputName_id,
    inputBody_id,
    inputNameErrormsg,
    inputBodyErrormsg,
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
            <div className="mb-6" key={"CommentFiled-show-" + index.toString()}>
              <span className="font-bold">{comment.name}</span>
              <span className="pl-4 text-sm text-gray-400">{comment.publishedAt}</span>

              <p className="my-4 whitespace-pre">{comment.body}</p>

              <hr />
            </div>
          );
        })}

        <InputTextBoxE
          title="ニックネーム"
          multiLine={false}
          id={inputName_id}
          errorMessage={inputNameErrormsg}
        />
        <InputTextBoxE
          title="コメント"
          multiLine={true}
          id={inputBody_id}
          placeholder="記事についてコメントする (400文字以内)"
          errorMessage={inputBodyErrormsg}
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

          <Button onclick={onsubmit}>　送信　</Button>
        </div>
      </div>
    </>
  );
};

export default CommentFiledPresentation;
