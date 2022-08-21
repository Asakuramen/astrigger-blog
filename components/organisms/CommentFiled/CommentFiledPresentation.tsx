import Button from "components/molecules/Button/Button";
import H1anchor from "components/molecules/H1anchor";
import InputTextBoxE from "components/molecules/InputTextBoxE/InputTextBoxE";
import { Comment } from "lib/microcms/api";
import { AiOutlineComment } from "react-icons/ai";

interface Props_CommentFiledPresentation {
  comments: Comment[];
  name_id: string;
  body_id: string;
  onsubmit: () => void;
}

const CommentFiledPresentation = (props: Props_CommentFiledPresentation) => {
  const { comments, name_id, body_id, onsubmit } = props;

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
              <span className="">{comment.name}</span>
              <span className="pl-4 text-sm text-gray-400">{comment.publishedAt}</span>

              <p className="my-4 whitespace-pre">{comment.body}</p>

              <hr />
            </div>
          );
        })}

        <InputTextBoxE
          title="お名前"
          multiLine={false}
          id={name_id}
          placeholder="ニックネームを入力"
        />
        <InputTextBoxE
          title="コメント"
          multiLine={true}
          id={body_id}
          placeholder="記事についてコメントする (400文字以内)"
        />
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <p className="pb-4 text-center sm:text-left text-xs text-gray-400">
            bot対策のためreCAPTCHA(v3)による認証機能を設けております。
          </p>
          <Button onclick={onsubmit}>　送信　</Button>
        </div>
      </div>
    </>
  );
};

export default CommentFiledPresentation;
