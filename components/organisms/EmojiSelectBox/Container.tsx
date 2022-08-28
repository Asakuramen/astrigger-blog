import { IEmojiData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Props_EmojiSelectBox {
  inputHtmlId?: string;
}

const initialEmoji: IEmojiData = {
  activeSkinTone: "neutral",
  emoji: "🙂",
  names: ["slightly smiling face", "slightly_smiling_face"],
  originalUnified: "1f642",
  unified: "1f642",
};

const EmojiSelectBox: React.FC<Props_EmojiSelectBox> = (props) => {
  const { inputHtmlId } = props;

  const inputRef = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>(initialEmoji);
  const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
  };

  // 絵文字Pickerの表示/非表示のイベントを作成
  useEffect(() => {
    const el = inputRef.current;

    const hundleClick = (e: MouseEvent) => {
      // 絵文字Pickerをクリックした時の処理
      if (el?.contains(e.target as Node)) {
        setShowPicker(true);
      }
      // 絵文字Picker以外をクリックした時の処理
      else {
        setShowPicker(false); // 絵文字Pickerを非表示化
      }
    };

    // ウインドウ全体のクリックイベントを作成
    document.addEventListener("click", hundleClick);

    // コンポーネントのアンマウント・再レンダリング時に、クリックイベントを削除
    return () => {
      document.removeEventListener("click", hundleClick);
    };
  }, [inputRef]);

  return (
    <>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3 relative" ref={inputRef}>
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor={inputHtmlId}
          >
            絵文字
          </label>

          <input
            className={
              "block w-full h-12 text-3xl bg-gray-200 text-gray-700 border rounded px-4 mb-3 focus:outline-none focus:bg-white focus:border-gray-500"
            }
            type="button"
            id={inputHtmlId}
            value={chosenEmoji.emoji}
          />

          <div className={"absolute bottom-16" + (showPicker ? "" : " hidden")}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmojiSelectBox;
